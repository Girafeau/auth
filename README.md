# OAuth2 authentication service 🦉


*• Get login form :*
```
GET /signin?client_id=<ID>&redirect_uri=<URI>&grant_type=authorization_code&response_type=code&state=<HASH_STATE>
```

*• Get tokens with authorization code :*
```
POST /token

{
    "client_id": <ID>,
    "client_secret": <SECRET>,
    "grant_type": "authorization_code",
    "authorization_code": <CODE>
}
```

*• Get user infos :*
```
GET /user/<ID>
```

*• Refresh token :*
```
POST /token

{
    "client_id": <ID>,
    "client_secret": <SECRET>,
    "grant_type": "refresh_token",
    "refresh_token": <TOKEN>
}
```
