# Step 2 - Ecrire les Dockerfile puis docker compose

## Objectif

Faire tourner ensemble:

- une base Postgres
- un service de migration
- un backend HTTP

Cette fois, rien n'est fourni pour Docker.

Tu dois:

- ecrire le `Dockerfile` du `backend`
- ecrire le `Dockerfile` du `migrator`
- creer le fichier `.env`
- ecrire le `docker-compose.yml`

## Ce que tu dois faire

1. Creer un `Dockerfile` dans `backend/`.
2. Creer un `Dockerfile` dans `migrator/`.
3. Creer un fichier `.env` dans ce dossier.
4. Y ajouter les variables d'environnement necessaires pour Docker Compose, Postgres, la migration et le backend.
5. Creer un fichier `docker-compose.yml` dans ce dossier.
6. Declarer les services `database`, `migrator` et `backend`.
7. Faire en sorte que:
   - Postgres demarre d'abord
   - `migrator` attend que la base soit prete
   - `backend` demarre seulement quand la migration a fini avec succes
8. Lancer le tout avec le fichier `.env`.
9. Appeler `GET /verification`.

## Ce que tu dois comprendre ici

- `build` vs `image`
- refaire un `Dockerfile` sans modele
- construire un `.env` a partir des besoins du code et de Compose
- `env_file` et `environment`
- `depends_on`
- la notion de healthcheck
- le reseau interne entre conteneurs

## Indices

- L'image de la base peut etre `postgres:16-alpine`.
- Les services Node tournent avec Node 20.
- Tu dois toi-meme deduire les variables necessaires a partir du code et de ton `docker-compose.yml`.
- `DB_HOST` devra pointer vers le nom du service Postgres.
- Tu peux exposer le backend sur le port defini par `BACKEND_PORT`.
- Tu peux exposer la base sur `DB_EXPOSED_PORT` si tu veux la tester depuis ta machine.

## Verification attendue

Quand tout est bon:

- `migrator` cree la table attendue
- `backend` demarre apres la migration
- `GET /verification` renvoie le message configure dans `.env`

## Ce que tu n'as pas a faire

- modifier le code JavaScript
- ajouter de nouvelles routes
- changer la logique applicative

## Pistes de commandes

```bash
docker compose up --build
curl http://localhost:3002/verification
```

Adapte le port si tu changes la configuration.
