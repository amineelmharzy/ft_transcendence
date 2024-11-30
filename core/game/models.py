from django.db import models
from users.models import User

from django.db.models import Q


class Player(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="player")
    is_pending = models.BooleanField(default=False)
    is_playing = models.BooleanField(default=False)


class Game(models.Model):
    player = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name="player_games"
    )
    opponent = models.ForeignKey(
        Player, on_delete=models.CASCADE, related_name="opponent_games"
    )
    is_over = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
    player_score = models.IntegerField(default=0)
    opponent_score = models.IntegerField(default=0)
