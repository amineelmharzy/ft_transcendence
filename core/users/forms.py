# from typing import Any
# from django import forms
# from django.contrib.auth.forms import AuthenticationForm, ReadOnlyPasswordHashField
# from .models import UserModel

# class UserCreationForm(forms.ModelForm):
#     password = forms.CharField(widget=forms.PasswordInput, label="Password")
#     password_confirm = forms.CharField(widget=forms.PasswordInput, label="Confirm Password")

#     class Meta:
#         model = UserModel
#         fields = ['first_name', 'last_name', 'username', 'email', 'password']

#     def clean(self):
#         cleaned_data = super().clean()
#         password = cleaned_data.get("password_confirm")
#         password_confirm = cleaned_data.get("password_confirm")

#         if password and password_confirm and password != password_confirm:
#             raise forms.ValidationError("Passwords do not match")
#         return cleaned_data
    
#     def save(self, commit=True):
#         user = super().save(commit)
#         user.set_password(self.cleaned_data["password"])
#         if (commit):
#             user.save()
#         return user

# class UserChangeForm(forms.ModelForm):
#     password = ReadOnlyPasswordHashField()

#     class Meta:
#         model = UserModel
#         fields = ['first_name', 'last_name', 'email', 'password']
    

# class LoginForm(AuthenticationForm):
#     username = forms.CharField(label='Username')
#     password = forms.CharField(widget=forms.PasswordInput, label='Password')
