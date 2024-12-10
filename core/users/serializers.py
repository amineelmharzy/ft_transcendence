import base64
from rest_framework import serializers
from .models import User
from django.core.files.base import ContentFile


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
    photo_url = serializers.SerializerMethodField()
    background_url = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            "id",
            "bio",
            "email",
            "username",
            "first_name",
            "last_name",
            "photo_url",
            "background_url",
            "otp_status",
            "date_joined",
        ]

    def get_photo_url(self, instance):
        request = self.context.get("request")
        if instance.profile_picture:
            return request.build_absolute_uri(instance.profile_picture.url)
        return None

    def get_background_url(self, instance):
        request = self.context.get("request")
        if instance.background_picture:
            return request.build_absolute_uri(instance.background_picture.url)
        return None


class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        required=False, min_length=8, max_length=100, write_only=True, allow_blank=True
    )
    new_password = serializers.CharField(
        required=False, min_length=8, max_length=100, write_only=True, allow_blank=True
    )
    profile_picture = serializers.CharField(required=False, allow_blank=True)
    background_picture = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = [
            "first_name",
            "last_name",
            "username",
            "bio",
            "email",
            "password",
            "new_password",
            "profile_picture",
            "background_picture",
        ]

    # def validate_new_password(self, value):
    #     UserSerializer.validate_password(value=value)
    #     return value

    # def validate(self, attrs):
    #     user = self.context["request"].user
    #     if "password" in attrs:
    #         if not user.check_password(attrs["password"]):
    #             raise serializers.ValidationError({"password": "Incorrect password."})

    #         if not "new_password" in attrs:
    #             raise serializers.ValidationError(
    #                 {"new_password": "Please provide a new password."}
    #             )
    #         else:
    #             if attrs["password"] == attrs["new_password"]:
    #                 raise serializers.ValidationError(
    #                     {
    #                         "new_password": "New password must be different from the old one."
    #                     }
    #                 )
    #     else:
    #         if "new_password" in attrs:
    #             raise serializers.ValidationError(
    #                 {"new_password": "Password is required to update your password."}
    #             )

    #     return attrs

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.bio = validated_data.get("bio", instance.bio)
        instance.username = validated_data.get("username", instance.username)
        instance.email = validated_data.get("email", instance.email)
        if "profile_picture" in validated_data:
            base64_image = validated_data["profile_picture"]
            image_data = base64.b64decode(base64_image)
            filename = f"profile_{instance.username}.jpg"
            instance.profile_picture.save(filename, ContentFile(image_data), save=True)
        if "background_picture" in validated_data:
            base64_image = validated_data["background_picture"]
            image_data = base64.b64decode(base64_image)
            filename = f"background_{instance.username}.jpg"
            instance.background_picture.save(
                filename, ContentFile(image_data), save=True
            )
        # if "new_password" in validated_data:
        #     instance.set_password(validated_data.get("new_password"))

        instance.save()
        return instance
