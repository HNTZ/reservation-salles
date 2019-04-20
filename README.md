# reservation-salles

Pour lancer le projet:
- Clonez le projet avec `git clone https://github.com/HNTZ/reservation-salles.git`
- Rendez-vous à la racine du projet et lancez la commande `npm install` pour installer les dépendances
- Rendez-vous dans le dossier `bin` de votre dossier `MongoDB` avec par exemple `cd C:\Program Files\MongoDB\Server\4.0\bin`
- Utilisez la commande `mongorestore -d room-reservation path_to_project/db/room-reservation` (ou `./mongorestore`)
- Assurez vous que votre serveur mongodb se situe bien sur le port par default (27017), ou changer le port dans le fichier `config/db.js`
- Lancez ensuite le serveur avec `npm start` et rendez-vous à l'adresse `localhost:3000` pour naviguer l'application