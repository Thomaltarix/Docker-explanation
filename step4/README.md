# Step 4 - Concevoir toi-meme l'architecture complete

## Objectif

Dans cette etape, rien n'est fourni.

Tu dois imaginer et construire toi-meme un petit backend compose de 3 microservices.

## Contraintes

1. Il doit y avoir 3 microservices au total.
2. Au moins un microservice doit appeler un autre microservice pour construire sa reponse.
3. Les microservices ne doivent pas tous etre developpes dans le meme langage.
4. Au moins 2 langages differents doivent etre utilises dans le projet.
5. Toute la configuration doit passer par Docker, Docker Compose et des fichiers `.env`.

## Ce que tu dois faire

1. Choisir un cas d'usage simple.
2. Choisir les 3 microservices et leur responsabilite.
3. Choisir 2 langages differents minimum.
4. Ecrire le code applicatif.
5. Ecrire tous les `Dockerfile`.
6. Ecrire le `docker-compose.yml`.
7. Creer les fichiers `.env` necessaires.
8. Faire communiquer les services entre eux.
9. Exposer un point d'entree principal pour tester facilement le projet.

## Exemple d'idee possible

Tu peux par exemple faire:

- un `api-gateway` en Node.js
- un `quote-service` en Python
- un `profile-service` en Go

Dans cet exemple:

- le gateway recoit la requete utilisateur
- le gateway appelle `quote-service`
- `quote-service` appelle `profile-service` ou retourne une reponse enrichie avec ses donnees

## Verification attendue

Quand tout est bon:

- `docker compose up --build` lance toute l'architecture
- un endpoint principal repond correctement
- on voit qu'un microservice appelle bien un autre
- au moins 2 langages differents sont presents dans les services

## Ce que tu travailles ici

- conception d'architecture
- separation des responsabilites
- communication inter-services
- reutilisation de tout ce qui a ete vu avant
- Dockerfiles multiples
- Docker Compose
- variables d'environnement

## Ce que tu n'as pas a faire

- ajouter une base de donnees si tu n'en as pas besoin
- faire quelque chose de complexe cote metier
- gerer de l'authentification ou de la securite avancee

Le but est surtout de montrer que tu sais penser une architecture Docker multi-services en autonomie.
