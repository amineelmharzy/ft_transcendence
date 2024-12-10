const API_ENDPOINTS = {
    "chat": "http://localhost:8000/api/chat/",
    "user": "http://localhost:8000/auth/user/",
    "login": "http://localhost:8000/auth/login/",
    "logout": "http://localhost:8000/auth/logout/",
    "register": "http://localhost:8000/auth/register/",
    "otp/enable": "http://localhost:8000/auth/otp/enable/",
    "otp/disable": "http://localhost:8000/auth/otp/disable/",
    "user/update": "http://localhost:8000/auth/user/update/",
    "opt/confirm": "http://localhost:8000/auth/otp/verify/",
    "token/refresh": "http://localhost:8000/auth/token/refresh/",
    "oauth/intra": "http://localhost:8000/auth/login/42/",
    "notification": "http://localhost:8000/api/notification/",
}

export { API_ENDPOINTS }