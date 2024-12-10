import pyotp
import requests
from django.shortcuts import redirect
from django.contrib.auth import authenticate
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from .serializers import (
    UserSerializer,
    LoginSerializer,
    OAuthUserSerializer,
    UserUpdateSerializer,
    UserAccountSerializer,
)

from django.contrib.auth import login as jwt_login

from django.conf import settings
from .models import User
from .misc import get_tokens_for_user

from rest_framework_simplejwt.serializers import TokenRefreshSerializer

from rest_framework.views import APIView


@api_view(["POST"])
def register(request):
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        serialized.save()
        return Response(
            {"message": "User created successfully!"}, status=status.HTTP_201_CREATED
        )
    else:
        return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def login(request):
    serialized = LoginSerializer(data=request.data)
    if serialized.is_valid():
        username = serialized.validated_data["username"]
        password = serialized.validated_data["password"]

        user = authenticate(username=username, password=password)
        if user:
            jwt_login(request=request, user=user)
            token = get_tokens_for_user(user)
            response = Response(
                {"access_token": token["access"]},
                status=status.HTTP_200_OK,
            )
            response.set_cookie(
                "refresh_token",
                token["refresh"],
                httponly=True,
                secure=True,
                samesite=None,
            )
            return response
        else:
            return Response(
                {"message": "The Username or Password is Incorrect!"},
                status=status.HTTP_401_UNAUTHORIZED,
            )
    return Response(serialized._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def logout(request):
    response = Response(status=status.HTTP_200_OK)
    for cookie in request.COOKIES:
        response.delete_cookie(cookie)
    return response


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete(request):
    user = request.user
    user.delete()
    return Response(status=status.HTTP_200_OK)


@api_view(["GET"])
def refresh_token(request):
    refresh_token = request.COOKIES.get("refresh_token")
    if not refresh_token:
        return Response(
            {"detail": "refresh token not provided"}, status=status.HTTP_400_BAD_REQUEST
        )

    serialized = TokenRefreshSerializer(data={"refresh": refresh_token})
    if serialized.is_valid():
        return Response(
            {"access_token": serialized.validated_data.get("access")},
            status=status.HTTP_200_OK,
        )
    return Response(serialized._errors, status=status.HTTP_401_UNAUTHORIZED)


@api_view(["GET"])
def IntraLogin(request):
    auth_url = f"{settings.OAUTH2.intra.AUTH_URI}?client_id={settings.OAUTH2.intra.credentials.CLIENT_ID}&redirect_uri={settings.OAUTH2.intra.REDIRECT_URI}&scope=public&response_type=code&state="
    return redirect(auth_url)


@api_view(["GET"])
def IntraLoginCallback(request):
    code = request.query_params.get("code")
    data = {
        "grant_type": "authorization_code",
        "client_id": settings.OAUTH2.intra.credentials.CLIENT_ID,
        "client_secret": settings.OAUTH2.intra.credentials.CLIENT_SECRET,
        "redirect_uri": settings.OAUTH2.intra.REDIRECT_URI,
        "code": code,
    }
    response = requests.post(settings.OAUTH2.intra.TOKEN_URI, data=data)
    access_token = response.json().get("access_token")
    if not access_token:
        return Response(
            {"detail": "Failed to obtian access token!"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    headers = {"Authorization": f"Bearer {access_token}"}
    response = requests.get(settings.OAUTH2.intra.USERINFO_URI, headers=headers).json()
    userinfo = {
        "username": response.get("login"),
        "email": response.get("email"),
        "first_name": response.get("first_name"),
        "last_name": response.get("last_name"),
    }

    user = User.objects.filter(username=userinfo["username"]).exists()
    if user:
        token = get_tokens_for_user(user=request.user)
        response = Response(
            {"access_token": token["access"]},
            status=status.HTTP_200_OK,
        )
        response.set_cookie(
            "refresh_token", token["refresh"], httponly=True, secure=True, samesite=None
        )
        return response

    serialized = OAuthUserSerializer(data=userinfo)
    if serialized.is_valid():
        serialized.save()
        token = get_tokens_for_user(user=request.user)
        response = Response(
            {"access_token": token["access"]},
            status=status.HTTP_200_OK,
        )
        response.set_cookie(
            "refresh_token", token["refresh"], httponly=True, secure=True, samesite=None
        )
        return response

    return Response({"detail": "Failed to login!"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response(status=status.HTTP_200_OK)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def enable_otp(request):
    user = request.user
    if not user.otp_status:
        user.otp_status = True
        secret = pyotp.random_base32()
        user.otp_secret = secret
        user.save()

    otp_path = pyotp.TOTP(user.otp_secret).provisioning_uri(
        name=user.username, issuer_name="Amine"
    )
    response = Response({"otp_path": otp_path}, status=status.HTTP_200_OK)
    return response


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def validate_otp(request):
    user = request.user
    if user.otp_status:
        otp = request.data["otp"]
        totp = pyotp.TOTP(user.otp_secret)
        if totp.verify(otp=otp):
            return Response({}, status=status.HTTP_200_OK)
    return Response({}, status=status.HTTP_403_FORBIDDEN)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def disable_otp(request):
    user = request.user
    if user.otp_status:
        user.otp_status = False
        user.save()
    return Response({}, status=status.HTTP_200_OK)


@api_view(["PUT", "PATCH"])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    serilized = UserUpdateSerializer(
        user, data=request.data, partial=True, context={"request": request}
    )
    if serilized.is_valid():
        serilized.save()
        return Response(status=status.HTTP_200_OK)
    return Response(serilized._errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_data(request, username=None):
    if username:
        user = User.objects.filter(username=username).first()
        if not user:
            return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        user = request.user
    serialized = UserAccountSerializer(user, context={"request": request})
    return Response(serialized.data, status=status.HTTP_200_OK)