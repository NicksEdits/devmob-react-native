## Backend - API

### 1. Lancer le backend avec Docker

Le back-end de l'application est développé avec **NestJS**. Pour lancer l'API avec Docker, suivez ces étapes :

1. Installer les dépendances pour le backend

Dans le dossier `nestjs`, installez toutes les dépendances nécessaires :

```bash
cd nestjs
npm install
```

2. Lancez les conteneurs Docker nécessaires pour exécuter l'API :

```bash
make start
```

Cela lancera tous les conteneurs nécessaires pour exécuter l'API dans un environnement Docker.

### 2. Documentation de l'API

Après le lancement des conteneurs Docker, vous pouvez accéder à la documentation complète de l'API à l'adresse :

[Documentation API](http:localhost:3000/api)

### 3. Arrêter et supprimer les conteneurs

Lorsque vous avez terminé, vous pouvez arrêter tous les conteneurs et les supprimer avec la commande suivante :

    make stop
    
Cela arrêtera et supprimera tous les conteneurs Docker.


### 4. Relancer les conteneurs

Vous pouvez relancer les conteneurs avec la commande suivante :

    make restart
    
Cela arrêtera et relancera tous les conteneurs Docker.

### 5. Afficher les Logs 

Vous pouvez afficher les log de l'API la commande suivante :

    make log-api
    
Cela affichera en temps réel les logs de l'API.

### 6. Redemarrer avec un environnement propre 

Vous pouvez redemarrer les contenaires docker avec une image recréer pour integrer toutes les nouvelles dependances ajoutées avec la commande suivante :

    make clean-start
    

---
