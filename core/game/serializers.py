from rest_framework import serializers
from .models import Game


class GameSerializer(serializers.ModelSerializer):
    opponent = serializers.SerializerMethodField()
    player = serializers.SerializerMethodField()
    opening = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = [
            "id",
            "player",
            "opponent",
            "player_score",
            "opponent_score",
            "timestamp",
            "opening",
        ]

    def get_player(self, instance):
        player = instance.player
        return {
            "id": player.user.id,
            "username": player.user.username,
            "first_name": player.user.first_name,
            "last_name": player.user.last_name,
        }

    def get_opponent(self, instance):
        opponent = instance.opponent
        # if instance.opponent == self.context.get("player"):
        #     opponent = instance.player
        return {
            "id": opponent.user.id,
            "username": opponent.user.username,
            "first_name": opponent.user.first_name,
            "last_name": opponent.user.last_name,
        }

    def get_opening(self, instance):
        return instance.player.user.id
