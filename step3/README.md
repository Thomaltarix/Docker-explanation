# Step 3 - Tout refaire cote Docker sur plusieurs microservices

## Objectif

Ecrire tous les `Dockerfile` et le `docker-compose.yml` capables de lancer:

- une base Postgres
- un service de migration
- `profile-service`
- `quote-service`
- `gateway-service`

Le but est de comprendre comment plusieurs services Docker peuvent se parler entre eux.

## Architecture attendue

- `migrator` initialise la base avec un profil
- `profile-service` lit le profil depuis Postgres
- `quote-service` appelle `profile-service`
- `gateway-service` appelle `profile-service` et `quote-service`
- `GET /verification` sur `gateway-service` doit renvoyer un agregat final

## Ce que tu dois faire

1. Creer un `Dockerfile` dans `migrator/`.
2. Creer un `Dockerfile` dans `profile-service/`.
3. Creer un `Dockerfile` dans `quote-service/`.
4. Creer un `Dockerfile` dans `gateway-service/`.
5. Creer un fichier `.env`.
6. Y ajouter les variables d'environnement necessaires a toute l'architecture.
7. Creer un `docker-compose.yml`.
8. Declarer les 5 services.
9. Passer les bonnes variables d'environnement a chaque service.
10. Faire en sorte que la base et la migration soient disponibles avant les autres services.
11. Exposer `gateway-service` sur la machine locale.

## Concepts pratiques travailles ici

- noms de services comme DNS interne Docker
- repetition autonome des `Dockerfile`
- construction autonome du `.env`
- communication HTTP entre conteneurs
- base partagee entre services
- ordre de demarrage
- variables d'environnement en cascade

## Indices

- Tous les services Node tournent avec Node 20.
- Tu dois deduire les variables necessaires en lisant le code et en definissant ton architecture Compose.
- `DB_HOST` devra pointer vers le service Postgres.
- `PROFILE_SERVICE_URL` devra pointer vers `http://profile-service:PORT`.
- `QUOTE_SERVICE_URL` devra pointer vers `http://quote-service:PORT`.
- `gateway-service` est le point d'entree.
- `quote-service` depend fonctionnellement de `profile-service`.

## Verification attendue

Quand tout est bon:

- `GET /verification` sur le gateway renvoie:
  - les informations du profil
  - le message compose par `quote-service`
  - un message final de validation

## Ce que tu n'as pas a faire

- modifier le code JavaScript
- changer les appels HTTP entre services
- toucher a la logique metier

## Pistes de commandes

```bash
docker compose up --build
curl http://localhost:3012/verification
```

Adapte le port si besoin.
