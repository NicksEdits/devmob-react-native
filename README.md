# Super Voisin - Application Mobile 🏘️

## 📝 **Concept :**

Une application communautaire où les utilisateurs peuvent proposer ou demander de l'aide pour des petites tâches locales, comme des réparations à domicile, des courses, ou du tutorat.

---

## ✨ Fonctionnalités

- **Conexion/Inscription** : Les utilisateurs peuvent s'inscrire et se connecter sur l'application.
- **Modifixcation des informations du compte** : Les utilisateurs peuvent modifier leur mot de passe ainsi que leur nom d'utilisateur.
- **Poster des demandes d'aide** : Les utilisateurs peuvent demander de l'aide pour des petites tâches locales.
- **Consulter les demandes d'aide autour de soi** : Les utilisateurs peuvent voir les demandes d'aides qu'il y a autour d'eux.

---

## 📦 Prérequis

Avant de démarrer le projet en local, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js** (version 20 ou plus récente)
- **npm** (généralement inclus avec Node.js)
- **Docker** (pour le back-end)
- **Expo CLI** (pour lancer l'application en mode développement ou simplement la build)

---

## 🚀 Installation

### 1. Cloner le projet

Commencez par cloner le repository Git :

```bash
git clone git@github.com:NicksEdits/devmob-react-native.git
cd devmob-react-native
```

### 2. Installer les dépendances pour le front-end

Dans le dossier `react-native`, installez toutes les dépendances nécessaires :

```bash
 cd react-native
npm install
```

Cela va télécharger toutes les dépendances nécessaires pour le bon fonctionnement de l'application mobile.

### 3. Lancer l'application mobile

#### Démarrer le serveur de développement

Pour démarrer l'application en mode développement, exécutez la commande suivante :

```bash
npx expo start
```

Ou

```bash
npm start
```

---

Puis

```bash
› Appuyez sur s │ switch to development build

› Appuyez sur a │ ouvrir un Android
› Appuyez sur i │ ouvrir un iOS simulator
› Appuyez sur w │ ouvrir sur web

› Appuyez sur j │ ouvrir un debugger
› Appuyez sur r │ recharger l'app
› Appuyez sur m │ ouvrir le menu

› Press ? │ voir toutes les commandes
```

#### Options de lancement

Une fois le serveur démarré, plusieurs options s'offrent à vous pour exécuter l'application :

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go)

---

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

## 🛠 Technologies utilisées

- **Front-end** : React Native, Expo
- **Back-end (API)** : NestJS
- **Base de données** : PostgreSQL/PostGIS
- **Docker** : Pour la gestion des conteneurs back-end

---

### 🏗️ Architecture Front-end : Atomic Design

L'architecture front-end de Super Voisin utilise la méthodologie **Atomic Design**, une approche de conception systématique pour construire des interfaces utilisateur modulaires et évolutives.

Pour en savoir plus :

[Atomic Design](https://rjroopal.medium.com/atomic-design-pattern-structuring-your-react-application-970dd57520f8)

---
