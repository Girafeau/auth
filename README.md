# Service d'authentification ☂️

1. Formulaire de connexion
```
GET /authentication?client_id=<ID>&redirect_uri=<URI>&grant_type=authorization_code&response_type=code&state=<HASH_STATE>
```

2. Récupérer le token avec le code d'autorisation
```
POST /access

{
    "client_id": <ID>,
    "client_secret": <SECRET>,
    "grant_type": "authorization_code",
    "authorization_code": <CODE>
}
```

3. Accéder aux resources privées
```
GET /secure
```

4. Rafraichir son token
```
POST /access

{
    "client_id": <ID>,
    "client_secret": <SECRET>,
    "grant_type": "refresh_token",
    "refresh_token": <TOKEN>
}
```
