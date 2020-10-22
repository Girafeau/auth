# Service d'authentification ☂️

### Documentation

#### 1. Obtenir le formulaire de connexion
```
GET /authentication?client_id=<ID>&redirect_uri=<URI>&grant_type=authorization_code&response_type=code&state=<HASH_STATE>
```

#### 2. Récupérer les tokens avec le code d'autorisation
```
POST /access

{
    "client_id": <ID>,
    "client_secret": <SECRET>,
    "grant_type": "authorization_code",
    "authorization_code": <CODE>
}
```

#### 3. Accèder aux informations protégées
```
GET /user?id=<ID>
```

#### 4. Rafraîchir son token d'accès
```
POST /access

{
    "client_id": <ID>,
    "client_secret": <SECRET>,
    "grant_type": "refresh_token",
    "refresh_token": <TOKEN>
}
```
