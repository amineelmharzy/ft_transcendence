import os
from requests_oauthlib import OAuth2Session


os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

# Your Google client ID and secret from the Google API Console
client_id = "957644595283-75vcadmit71qjha1m9htusiobs1em19d.apps.googleusercontent.com"
client_secret = "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"
redirect_uri = "http://127.0.0.1:8000"  # Your redirect URI
scope = ["https://www.googleapis.com/auth/userinfo.profile"]

# OAuth2 Endpoints
authorization_base_url = "https://accounts.google.com/o/oauth2/auth"
token_url = "https://accounts.google.com/o/oauth2/token"

# Start the OAuth2 session
google = OAuth2Session(client_id, scope=scope, redirect_uri=redirect_uri)

# Step 1: Redirect user to Google's OAuth2 login page
authorization_url, state = google.authorization_url(authorization_base_url)

# Step 3: Fetch the access token
google.fetch_token(token_url, client_secret=client_secret, authorization_response=redirect_uri)

# Step 4: Check if the OAuth flow was successful
r = google.get('https://www.googleapis.com/oauth2/v1/userinfo')
if r.status_code == 200:
    print("Success")
else:
    print("Failed")

