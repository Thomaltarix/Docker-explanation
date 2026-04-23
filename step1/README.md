# Step 1 - Ecrire un Dockerfile

## Objectif

Faire tourner cette application dans Docker en ecrivant toi-meme un `Dockerfile`.

Ce que tu apprends ici devra etre reutilise dans toutes les etapes suivantes: a partir de maintenant, aucun `Dockerfile` ne sera fourni.

## Ce que tu dois faire

1. Creer un fichier `Dockerfile` dans ce dossier.
2. Creer un fichier `.env` dans ce dossier.
3. Y ajouter les variables d'environnement necessaires pour lancer correctement l'application dans Docker.
4. Builder l'image.
5. Lancer le conteneur avec le fichier `.env`.
6. Appeler `GET /verification`.

## Contrainte importante

Cette application a besoin d'un binaire systeme qui n'est pas fourni par defaut dans beaucoup d'images Node.

Si ton conteneur demarre correctement, c'est que ton `Dockerfile` n'a pas seulement un `FROM`: il installe aussi ce qu'il faut pour l'application.

## Indices

- L'application tourne avec Node 20.
- Tu dois creer toi-meme le fichier `.env`.
- Il faudra probablement:
  - choisir une image Node
  - copier `package.json`
  - installer les dependances npm
  - copier le code
  - installer un package systeme
  - exposer le port
  - definir la commande de demarrage
- Le fichier `.env` doit etre pris en compte au lancement du conteneur.
- Pour savoir quelles variables mettre dans `.env`, lis le code source.

## Verification attendue

Quand tout est bon:

- l'application ecoute sur le port defini dans `.env`
- `GET /verification` renvoie un JSON avec un message de succes
- la reponse mentionne aussi la version du binaire systeme detecte dans le conteneur

## Pistes de commandes

Exemple de logique attendue:

```bash
docker build -t docker-course-step1 .
docker run --rm --env-file .env -p 3001:3001 docker-course-step1
curl http://localhost:3001/verification
```

Adapte les commandes si tu choisis un autre nom d'image.
