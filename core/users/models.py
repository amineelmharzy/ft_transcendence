from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db.models import Q


class UserManger(BaseUserManager):
    def create_user(self, username, email, password=None, **extra_fields):
        if not username:
            raise ValueError("username is required in register process!")
        user = self.model(
            username=username, email=self.normalize_email(email), **extra_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email, password=None, **extra_fields):
        extra_fields.setdefault("is_admin", True)
        user = self.create_user(
            username=username, email=email, password=password, **extra_fields
        )
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    first_name = models.CharField("first name", max_length=20, blank=True)
    last_name = models.CharField("last name", max_length=20, blank=True)
    username = models.CharField("username", max_length=20, unique=True, db_index=True)
    email = models.EmailField(
        "email address", max_length=128, unique=True, db_index=True
    )
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    last_login = models.DateTimeField("last login", auto_now_add=True)
    date_joined = models.DateTimeField("created at", auto_now_add=True)

    bio = models.CharField("bio", max_length=255, blank=True)

    otp_secret = models.CharField(max_length=32)
    otp_status = models.BooleanField(default=False)

    profile_picture = models.ImageField(upload_to="profile_pictures/", default="profile.jpg")
    background_picture = models.ImageField(upload_to="profile_pictures/", default="background.avif")
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email"]

    objects = UserManger()

    class Meta:
        db_table = "users"
        ordering = ["username"]

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def has_module_perms(self, app_label, obj=None):
        return True

    def has_perm(self, perm):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class Friendship(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="user_friendship"
    )
    target_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="target_friendship"
    )
    is_friend = models.BooleanField(default=False)
    requested_at = models.DateField(auto_now_add=True)
    friend_at = models.DateField(null=True, blank=True)

    class Meta:
        unique_together = ["user", "target_user"]

    # def send_friend_request(self, target_user):
    #     if not Friendship.objects.filter(Q(user=self.user, target_user=target_user) | Q(user=target_user, target_user=self.user)):
    #         return Friendship.objects.create(user=self.user, target_user=target_user)

    # def accept_friend_request(self, target_user):
    #     return Friendship.objects.filter(user=target_user, target_user=self.user).update(is_friend=True)

    # def reject_friend_request(self, target_user):
    #     return Friendship.objects.filter(user=target_user, target_user=self.user, is_friend=False).delete()

    # def get_friend_requests(self):
    #     return Friendship.objects.filter(target_user=self.user, is_friend=False)

    # def get_friends(self):
    #     return Friendship.objects.filter(Q(user=self.user, is_friend=True) | Q(target_user=self.user, is_friend=True))

    # def delete_friend(self, target_user):
    #     return Friendship.objects.filter(Q(user=self.user, is_friend=True) | Q(target_user=self.user, is_friend=True)).delete()
