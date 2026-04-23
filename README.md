# Mini cours Docker en 3 etapes

Ce repo contient un petit parcours progressif pour expliquer Docker.

L'idee:

1. `step1`: ecrire un `Dockerfile` pour une application Node simple.
2. `step2`: ecrire tous les `Dockerfile` necessaires puis un `docker-compose.yml` pour orchestrer un backend, une migration et une base Postgres.
3. `step3`: ecrire tous les `Dockerfile` necessaires puis un `docker-compose.yml` pour plusieurs microservices qui communiquent entre eux, avec une migration et une base.

Chaque etape contient:

- du code pret a etre conteneurise
- un `README.md` qui explique l'objectif
- aucun `.env` pre-rempli cote eleve
- une route `/verification` qui confirme que tout fonctionne

Important:

- l'eleve ne touche pas au code applicatif
- il ne fait que la partie Docker et la configuration via `.env`
- il doit creer lui-meme les fichiers `.env` necessaires
- des qu'un concept est vu, il doit le refaire seul dans la suite

Choix techniques:

- j'ai utilise de petits services Node/Express pour garder le focus sur Docker
- tous les parametres passent par des variables d'environnement
- `step1` force l'installation d'un package systeme dans le conteneur
- `step2` force a refaire plusieurs `Dockerfile` de zero et a gerer l'ordre de demarrage
- `step3` force a refaire plusieurs `Dockerfile` de zero, a comprendre le reseau Docker et les appels inter-services

Suggestion pour ton cours:

1. Expliquer les concepts: image, container, Dockerfile, build context, couche, port mapping, variables d'environnement, volumes, reseau, docker compose.
2. Faire `step1` ensemble.
3. Le laisser faire `step2` en autonomie sur les `Dockerfile` puis sur Compose, avec juste quelques indices.
4. Le laisser faire `step3` en quasi autonomie complete.

Ordre de difficulte:

- `step1`: debutant
- `step2`: intermediaire
- `step3`: intermediaire plus

Si tu veux, tu peux aussi lui demander a chaque fin d'etape:

- quelle image il a choisie et pourquoi
- ce qui est execute au build vs au runtime
- pourquoi `.env` est utile
- comment les conteneurs se parlent entre eux
- ce qui se passe si une migration ne tourne pas
