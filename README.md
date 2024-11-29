# Super Voisin - Application Mobile 🏘️

## 📝 **Concept :**  
Une application communautaire où les utilisateurs peuvent proposer ou demander de l’aide pour des petites tâches locales, comme des réparations à domicile, des courses, ou du tutorat.

---

## ✨ Fonctionnalités

- **Poster des tâches** : Les utilisateurs peuvent proposer des services ou demander de l’aide pour des petites tâches locales.
- **Géolocalisation** : Le système de géolocalisation permet aux utilisateurs de trouver des personnes disponibles dans leur voisinage pour les aider.

---

## 📦 Prérequis

Avant de démarrer le projet en local, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js** (version 16 ou plus récente)
- **npm** (généralement inclus avec Node.js)
- **Docker** (pour le back-end)
- **Expo CLI** (si vous travaillez avec Expo pour React Native)

---

## 🚀 Installation

### 1. Cloner le projet

Commencez par cloner le repository Git :

```bash
git clone git@github.com:NicksEdits/devmob-react-native.git
cd super-voisin
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
npw expo start
```
Ou
```bash
nmp start
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

1. Accédez au dossier du backend :

```bash
cd nestjs
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

## 🛠 Technologies utilisées

- **Front-end** : React Native, Expo
- **Back-end (API)** : NestJS
- **Base de données** : PostgreSQL
- **Docker** : Pour la gestion des conteneurs back-end

---

### 🏗️ Architecture Front-end : Atomic Design

L'architecture front-end de Super Voisin utilise la méthodologie **Atomic Design**, une approche de conception systématique pour construire des interfaces utilisateur modulaires et évolutives.

Pour en savoir plus :

[Atomic Design](https://rjroopal.medium.com/atomic-design-pattern-structuring-your-react-application-970dd57520f8)

---
