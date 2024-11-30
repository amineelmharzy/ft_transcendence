from rest_framework import serializers
from .models import Game


class GameSerializer(serializers.ModelSerializer):
    opponent = serializers.SerializerMethodField()
    # opening = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = [
            "id",
            "opponent",
            "player_score",
            "opponent_score",
            "timestamp",
        ]

    def get_opponent(self, instance):
        opponent = instance.opponent
        if instance.opponent == self.context.get("player"):
            opponent = instance.player
        return {
            "id": opponent.user.id,
            "username": opponent.user.username,
            "first_name": opponent.user.first_name,
            "last_name": opponent.user.last_name,
        }

    # def get_opening(self, instance):
    #     player = self.context.get("player")
    #     if instance.player == player:
    #         return True
    #     return False
