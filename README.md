# Service d'authentification ☂️

```
GET /authenticate?client_id=<ID>&redirect_uri=<URI>&grant_type=authorization_code&response_type=code&state=<HASH_STATE>
```

```
POST /request/access

{
    "client_id": <ID>,
    "client_secret": <SECRET>,
    "grant_type": "authorization_code",
    "authorization_code": <CODE>
}
```

```
GET /request/secure
```
