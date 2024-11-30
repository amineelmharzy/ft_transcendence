const API_ENDPOINTS = {
    "user": "http://localhost:8000/auth/user/",
    "chat": "http://localhost:8000/api/chat/",
    "login": "http://localhost:8000/auth/login/",
    "logout": "http://localhost:8000/auth/logout/",
    "register": "http://localhost:8000/auth/register/",
    "enable_otp": "http://localhost:8000/auth/otp/enable/",
    "disable_otp": "http://localhost:8000/auth/otp/disable/",
    "confirm_otp": "http://localhost:8000/auth/otp/verify/",
    "refresh_token": "http://localhost:8000/auth/token/refresh/",
    "notification": "http://localhost:8000/api/notification/",
    "rm_notifications": "http://localhost:8000/api/notification/delete/",
}

export { API_ENDPOINTS }