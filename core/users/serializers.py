from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        required=True, min_length=8, max_length=100, write_only=True
    )
    password_confirm = serializers.CharField(
        required=True, min_length=8, max_length=100, write_only=True
    )

    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "password",
            "password_confirm",
        ]

    @staticmethod
    def validate_password(value):
        if not value:
            raise serializers.ValidationError("Password cannot be empty.")
        if len(value) < 8:
            raise serializers.ValidationError(
                "Password must be at least 8 characters long."
            )
        if not any(char.isdigit() for char in value):
            raise serializers.ValidationError(
                "Password must contain at least one digit."
            )
        if not any(char.isalpha() for char in value):
            raise serializers.ValidationError(
                "Password must contain at least one letter."
            )
        if not any(char.isupper() for char in value):
            raise serializers.ValidationError(
                "Password must contain at least one uppercase letter."
            )
        return value

    def validate(self, attrs):
        username = attrs["username"]
        email = attrs["email"]
        password = attrs.get("password")
        password_confirm = attrs.get("password_confirm")
        if User.objects.filter(username=username).exists():
            raise serializers.ValidationError("Username already exists!")
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email already exists!")
        if password != password_confirm:
            raise serializers.ValidationError(
                {"password_confirm": "Password does not match!"}
            )
        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")
        user = User.objects.create(
            username=validated_data["username"],
            email=validated_data["email"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


class OAuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
        ]

    def validate(self, attrs):
        return super().validate(attrs)

    def create(self, validated_data):
        return super().create(validated_data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, max_length=20)
    password = serializers.CharField(required=True, max_length=100)

    def validate(self, attrs):
        return super().validate(attrs)


class UserAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            "first_name",
            "last_name",
            "otp_status",
            "date_joined",
        ]


class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        required=False, min_length=8, max_length=100, write_only=True
    )
    new_password = serializers.CharField(
        required=False, min_length=8, max_length=100, write_only=True
    )

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "password",
            "new_password",
        ]

    def validate_new_password(self, value):
        UserSerializer.validate_password(value=value)
        return value

    def validate(self, attrs):
        user = self.context["request"].user
        if "password" in attrs:
            if not user.check_password(attrs["password"]):
                raise serializers.ValidationError({"password": "Incorrect password."})

            if not "new_password" in attrs:
                raise serializers.ValidationError(
                    {"new_password": "Please provide a new password."}
                )
            else:
                if attrs["password"] == attrs["new_password"]:
                    raise serializers.ValidationError(
                        {
                            "new_password": "New password must be different from the old one."
                        }
                    )
        else:
            if "new_password" in attrs:
                raise serializers.ValidationError(
                    {"new_password": "Password is required to update your password."}
                )

        return attrs

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        if "new_password" in validated_data:
            instance.set_password(validated_data.get("new_password"))

        instance.save()
        return instance
