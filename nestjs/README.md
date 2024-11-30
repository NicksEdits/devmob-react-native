## Backend - API

### 1. Lancer le backend avec Docker

Le back-end de l'application est développé avec **NestJS**. Pour lancer l'API avec Docker, suivez ces étapes :

1. Lancez les conteneurs Docker nécessaires pour exécuter l'API :

Dans le dossier `nestjs`, installez toutes les dépendances nécessaires :

```bash
cd nestjs
make start
```

Cela va télécharger toutes les dépendances et images nécessaires, ainsi que monter notre image principale, pour le bon fonctionnement de l'application mobile.

### 2. Documentation de l'API

Après le lancement des conteneurs Docker, vous pouvez accéder à la documentation complète de l'API à l'adresse :

[Documentation API](http:localhost:3000/api)

### 3. Arrêter et supprimer les conteneurs

Lorsque vous avez terminé, vous pouvez arrêter tous les conteneurs et les supprimer avec la commande suivante :

```bash
make stop
```

Cela arrêtera et supprimera tous les conteneurs Docker.

### 4. Relancer les conteneurs

Vous pouvez relancer les conteneurs avec la commande suivante :

```bash
make restart
```

Cela arrêtera et relancera tous les conteneurs Docker.

### 6. Afficher les Logs

Vous pouvez afficher les log de l'API la commande suivante :

```bash
make log-api
```

Cela affichera en temps réel les logs de l'API.

### 6. Redemarrer avec un environnement propre

Vous pouvez redemarrer les contenaires docker avec une image recréé pour integrer toutes les nouvelles dependances ajoutées avec la commande suivante :

```bash
make clean-start
```

### 7. Modifier les dépendances

Vous pouvez ajouter des dépendances avec la commande suivante :

```bash
make yarn-add dépendance1 dépendance2 ...
```

Et vous pouver retirer des dépendances avec la commande suivante :

```bash
make yarn-remove dépendance1 dépendance2 ...
```

---
