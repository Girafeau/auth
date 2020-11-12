# Service d'authentification OAuth2 🔥


*Obtenir le formulaire de connexion :*
```
GET /signin?client_id=<ID>&redirect_uri=<URI>&grant_type=authorization_code&response_type=code&state=<HASH_STATE>
```

*Récupérer les tokens avec le code d'autorisation :*
```
POST /token

{
    "client_id": <ID>,
    "client_secret": <SECRET>,
    "grant_type": "authorization_code",
    "authorization_code": <CODE>
}
```

*Accèder aux informations de l'utilisateur :*
```
GET /user/<ID>
```

*Rafraîchir son token d'accès :*
```
POST /token

{
    "client_id": <ID>,
    "client_secret": <SECRET>,
    "grant_type": "refresh_token",
    "refresh_token": <TOKEN>
}
```
