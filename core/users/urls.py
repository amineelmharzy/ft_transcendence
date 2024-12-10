from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from . import views

urlpatterns = [
    path("login/", views.login, name="login"),
    path("logout/", views.logout, name="logout"),
    path("register/", views.register, name="register"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", views.refresh_token, name="token_refresh"),
    path("login/42/", views.IntraLogin, name="intra_login"),
    path("login/42/callback/", views.IntraLoginCallback, name="intra_callback"),
    path("otp/enable/", views.enable_otp, name="enable_otp"),
    path("otp/disable/", views.disable_otp, name="disable_otp"),
    path("otp/verify/", views.validate_otp, name="validate_otp"),
    path("user/", views.get_user_data, name="user-account"),
    path("user/update/", views.update_user, name="user-update"),
    path("user/delete/", views.delete, name="user-delete"),
    path("user/<str:username>/", views.get_user_data, name="user-account-get"),
]
