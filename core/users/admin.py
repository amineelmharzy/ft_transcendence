from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User
# from .forms import UserCreationForm, UserChangeForm
from django.contrib.auth.models import Group

# class UserAdmin(BaseUserAdmin):
#     form = UserChangeForm
#     add_form = UserCreationForm

#     list_display = ["email", "is_admin"]
#     list_filter = ["is_admin"]
#     fieldsets = [
#         (None, {"fields": ["email", "password"]}),
#         ("Permistion", {"fields": ["is_admin"]})
#     ]

#     add_fieldsets = [
#         (
#         None, {
#             "classes": ["wide"],
#             "fileds": ["email", "password1", "password2"],
#         }
#         )
#     ]

#     search_fields = ["username", "email"]
#     ordering = ["username"]
#     filter_horizontal = []

# class UserAdmin(BaseUserAdmin):
#     # The forms to add and change user instances
#     form = UserChangeForm
#     add_form = UserCreationForm
#     model = User

#     # list_display = ["username", "email", "creation_time", "is_admin"]
#     # list_filter = ["is_admin"]
#     # fieldsets = [
#     #     (None, {"fields": ["email", "password"]}),
#     #     ("Permissions", {"fields": ["is_admin"]}),
#     # ]
#     # # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
#     # # overrides get_fieldsets to use this attribute when creating a user.
#     # add_fieldsets = [
#     #     (
#     #         None,
#     #         {
#     #             "classes": ["wide"],
#     #             "fields": ["username", "email", "password"],
#     #         },
#     #     ),
#     # ]
#     # search_fields = ["email"]
#     # ordering = ["email"]
#     # filter_horizontal = []
#     list_display = ("email", "is_admin", "is_active",)
#     list_filter = ("email", "is_admin", "is_active",)
#     fieldsets = (
#         (None, {"fields": ("email", "password")}),
#         ("Permissions", {"fields": ("is_admin", "is_active")}),
#     )
#     add_fieldsets = (
#         (None, {
#             "classes": ("wide",),
#             "fields": (
#                 "email", "password", "password_confirm", "is_admin",
#             )}
#         ),
#     )
#     search_fields = ("email",)
#     ordering = ("email",)
#     filter_horizontal = []

admin.site.register(User)
# admin.site.unregister(Group)