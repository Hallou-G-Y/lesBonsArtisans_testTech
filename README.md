Deux fichiers .env sont nécessaire au bon fonctionnement du projet.
Le premier sera inclue dans le dossier frontend et contiendra la variable REACT_APP_API_URL
Le deuxième sera inclue dans le dossier backend et contiendra les variables DATABASE_URL, PORT, ACCESS_TOKEN_SECRET

Après avoir créer les fichiers .env, vous pouvez installer les node_modules des dossiers frontend et backend via deux terminaux distinct avec "cd frontend && npm install" et "cd backend && npm install".
Pour finir vous pouvez lancer les serveurs frontend et backend avec respectivement les commandes "npm run dev" et "npm run server".
