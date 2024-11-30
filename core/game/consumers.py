from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async
from .serializers import GameSerializer

import time
import json
import random
import hashlib
from .models import Game, Player

from django.db.models import Q
from users.models import User


class GameConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = None
        self.game = None
        self.user = self.scope["user"]
        if self.user.is_authenticated:
            await self.accept()
            self.player = await self.init_player()
            self.opponent = await self.select_opponent()
            while not self.opponent:
                time.sleep(1)
                self.opponent = await self.select_opponent()
            self.room_group_name = await self.generate_room_name()
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            self.game = await self.init_game()
            # await self.sync_game_data(await self.serialize_game(self.game))
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    "type": "sync_game_data",
                    "data": await self.serialize_game(self.game),
                },
            )
        else:
            await self.close()

    async def disconnect(self, code):
        await self.disconnect_player()
        return super().disconnect(code)

    async def receive(self, text_data=None, bytes_data=None):
        json_data = json.loads(text_data)
        data = {}
        event = json_data.get("event")  # move, bounce, pass
        if event == "move":
            data["paddleY"] = json_data.get("y")
        elif event == "bounce":
            data["angle"] = json_data.get("angle")
        elif event == "point":
            pass
        # await self.sync_game_data(json_data)
        await self.channel_layer.group_send(
            self.room_group_name,
            {"type": "sync_game_data", "data": json_data},
        )

    @database_sync_to_async
    def generate_room_name(self):
        name = self.player.user.username + self.opponent.user.username
        return hashlib.sha1("".join(sorted(name)).encode("utf-8")).hexdigest()

    @database_sync_to_async
    def init_game(self):
        if self.opponent:
            game = Game.objects.filter(
                Q(player=self.player, opponent=self.opponent)
                | Q(player=self.opponent, opponent=self.player)
            ).last()
            if not game or (game and game.is_over):
                game = Game.objects.create(player=self.player, opponent=self.opponent)
            return game

    @database_sync_to_async
    def disconnect_player(self):
        self.player.is_pending = False
        self.player.save()

    @database_sync_to_async
    def init_player(self):
        player = Player.objects.filter(user=self.user).first()
        if not player:
            player = Player.objects.create(user=self.user)
        player.is_pending = True
        player.save()
        return player

    @database_sync_to_async
    def select_opponent(self):
        queryset = Player.objects.filter(is_pending=True).exclude(user=self.user)
        if not queryset:
            return None
        opponent = random.choice(queryset)
        return opponent

    @database_sync_to_async
    def serialize_game(self, game):
        serialized = GameSerializer(game, context={"player": self.player})
        return serialized.data

    async def sync_game_data(self, event):
        data = event["data"]
        await self.send(text_data=json.dumps(data))
