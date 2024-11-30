from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.serializers import ValidationError


def validate_password(value):
    if not value:
        raise ValidationError("Password must be provided!")
    if len(value) < 8:
        raise ValidationError("Password must be at least 8 characters long.")
    if not any(char.isdigit() for char in value):
        raise ValidationError("Password must contain at least one digit.")
    if not any(char.isalpha() for char in value):
        raise ValidationError("Password must contain at least one letter.")
    if not any(char.isupper() for char in value):
        raise ValidationError("Password must contain at least one uppercase letter.")
    return value


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        "refresh": str(refresh),
        "access": str(refresh.access_token),
    }
