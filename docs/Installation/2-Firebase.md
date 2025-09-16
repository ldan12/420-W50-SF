# Utilisation de Google Firebase

## Qu'est-ce que Firebase ?

**Firebase** est une plateforme de développement d’applications créée par Google. Elle fournit une série de services prêts à l’emploi qui permettent aux développeurs de créer plus rapidement des applications web et mobiles, sans avoir à mettre en place toute l’infrastructure serveur eux-mêmes.

Voici les principaux services que Firebase offre :

🔹 Base de données

Firestore et Realtime Database : bases de données NoSQL hébergées dans le cloud, synchronisées en temps réel entre les clients (web, iOS, Android).

🔹 Authentification

Gestion complète des utilisateurs (inscription, connexion, mot de passe oublié).

Supporte email/mot de passe, Google, Facebook, Apple, GitHub, etc.

🔹 Stockage

Firebase Storage : stockage de fichiers (images, vidéos, PDF, etc.) avec règles de sécurité.

---

## Configuration d'un projet Firebase

1. **Firebase** nécessite un compte **Google**. Si vous n'en n'avez pas, prenez quelques instants pour vous en créer un.

2. Naviguez vers https://firebase.google.com/ et authentifez vous avec votre compte Google, si ce n'est pas déjà fait.

3. Accédez à la console :

![Console](/img/console.png)

4. Créez un nouveau projet **Firebase** :

![Project](/img/project.png)

et nommez-le `ExerciceFirebase`, il sera prêt lorsque le premier exercice sera publié. Dans le processus, **n'activez pas** les options Gemini et Google analytics.

5. Une fois sur le tableau de bord du projet, créez une application web :

![App](/img/app.png)

6. Donnez lui un nom en lien avec le projet (ex : `exerciceApp`). **N'activez pas** le hosting Firebase. Confirmez avec le `Register app`.

7. On vous présentera ensuite la configuration de votre application. Nous y reviendrons plus tard pour l'intégration dans le code. Défilez l'écran et cliquez sur `Return to console`

Note : Pour revenir à cette configuration, il suffira de cliquer sur votre app et ensuite sur ses paramètres.

![App available](/img/app_available.png)

![Settings](/img/settings.png)

8. De retour sur le tableau de bord de votre projet, nous allons activer le module d'auhentification. Ouvrez le menu `build` et sélectionnez `Authentication` :

![Authentication](/img/authentication.png)

9. Démarrez le processus :

![Started](/img/started.png)

10. Activez le module email/password :

![EmailPassword](/img/emailpassword.png)

![EmailPasswordEnabled](/img/emailpassword_enabled.png)

Sauvegardez le tout. Un message de succès devrait apparaître à droite en haut de votre écran. Si ce n'est pas le cas, refaites la procédure dans le navigateur en mode privé.

Votre configuration **Firebase** est maintenant effectuée !
