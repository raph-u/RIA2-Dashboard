#RIA2-Dashboard

## Description
Ce projet à pour but de regrouper différents flux d'informations en relation avec [The verge](https://www.theverge.com).
Les informations affichées proviennent des API de Twitter, NewsApi ainsi que Youtube.

## Installation
### Prérequis
Un serveur web compatible PHP 5.4 est nécessaire pour exécuter l'application.

### Procédure
1. Clonez le projet
2. Placez le projet à la racine de votre serveur
3. Visitez la page index.php

## Reprise du projet
### Principe de fonctionnement
Le projet contient un dossier par source de données.
Exemple: un dossier pour Twitter, un pour NewsApi, et pour youtube

Chacun de ces dossiers contient un fichier php qui se charge de faire une requête vers l'API à laquelle il correspond. En cas de succès, il retourne le résultat de la requête sous forme de json.
Pour chacun de ces fichiers php, il existe un fichier js dont le but est de faire une requête sur le fichier PHP correspondant de manière à récupérer le json contenant les données nécessaires.

## Améliorations
### Design
Le design a complètement été retravaillé de manière à recréer le "look and feel" du site [The verge](https://www.theverge.com).
**Note:** Le site est principalement destiné à un usage sur navigateur desktop. Pour une meilleur expérience, veillez à utiliser **Google Chrome** ainsi qu'un écran dont la résolution est **au moins 1440x900**.
### Intégration d'Instagram
#### Informations nécessaires à l'usage optimal de l'API
* Client ID
* Client Secret

Ces informations doivent être fournies par le détenteur du compte qui doit ajouter une nouvelle application depuis le panel de gestion de clients de son compte.

Lors de l'ajout de, cette nouvelle application, un ```Client ID``` et ```Client Secret``` seront générés et pourront être utilisés pour récupérer les informations relatives au compte Instagram.
#### Indicateurs potentiellement intégrables
**Informations de profil**
* Nombre de posts effectués
* Nombre de comptes qui nous suivent
* Nombre de comptes que l'on suit
* Nombre de vues / like 

**Infos associées à un poste**
* Nombre de likes
* Date du poste
* Nombre de commentaire + commentaires en eux-mêmes

#### Etapes nécessaires à l'implémentation de l'API au sein du dashboard
1. Développer une logique PHP permettant d'envoyer des requêtes d'interrogation à l'API d'instagram en se basant sur les fonctions suivantes contenues dans ```functions.php```: 
```loadConfig()```: Permet charger le Client ID / Client Secret depuis le fichier ```config.json``` pour pouvoir intégrer ces information dans les requêtes d'authentification vers l'API.
```request($type, $url, $headerData = null)``` pour effectuer une requête vers l'API.
Les données doivent ensuite être retournées au format JSON.
Exemple de fichier du même rôle: ```YoutubeFeed/index.php```.

2. Développer un une logique javascript permettant de traiter les informations retournées par l'API et de créer des éléments HTML les comportant afin de les intégrer au DOM pour les afficher à l'utilisateur.

   **Note**: En l'état, ce fichier est responsable de faire une requête AJAX vers un fichier assumant le rôle expliqué au point précédent de manière à ce que ce dernier fasse une requête vers l'API, puis retourne les données au format JSON. Ces données seront donc traitées en javascript.

3. Intégrer les informations relatives à l'API dans ```config.json``` en respectant la structure présente et en en prenant compte lors de chargement de données via l'usage de la fonction ```loadConfig()```.

**Note**: JSON est actuellement employé mais XML ou autre pourraient l'être également, à partir moment où le fichier assumant le rôle expliqué au premier point retourne du XML, par ex. Et, que le fichier décrit au deuxième point, soit en mesure de traiter ces données.

### Refactorisation
#### Changements nécessaires à la limitation d'interventions
Dans l'état actuel, ce projet nécessite effectivement l'intervention d'un développeur afin de déployer une nouvelle API. Il ne serait pas possible de complètement s'affranchir de l'intervention d'un développeur, étant donné qu'e' intégrer une nouvelle API revient à interroger une API qui possède une structure qui lui est propre. Tout déploiment d'une nouvelle API nécessiterai l'implémentation de la logique de communication qui lui est associée. C'est la raison pour laquelle un ne peut pas ajouter de nouveaux réseaux sociaux par lui-même.

En revanche, il serait possible de permettre à l'utilisateur d'activer / désactiver le support d'un réseau social. Pour cela, il serait nécessaire d'implémenter les logiques de communication avec les API des réseaux sociaux les plus populaires. A titre d'exemple, le projet intègre la logique de communication avec les API de Twitter, NewsApi et Youtube. la logique d'interrogation de ces API se trouve dans les fichiers ```index.php```, placés chacun dans les dossiers ```twitterFeed```, ```newsFeed``` et ```youtubeFeed```. Ces fichiers possèdent en eux la manière d'envoyer des requêtes aux différentes API de manière à récupérer les informations adéquates. Une fois les informations récupérées, elles sont transmises aux fichiers javascript respectifs ```tweet.js```, ```news.js``` et ```youtube.js``` qui vont se charger de parser les données afin de les insérer dans la structure HTML du dashboard.

L'idée serait donc d'implémenter à l'avance une logique de récupération et de traitement pour les réseaux sociaux potentiellement intéressants et de laisser l'utilisateur les activer / désactiver via une interface dans laquelle il pourrait choisir les réseaux sociaux traités par le dashboard et spécifier les informations nécessaires à la communication avec les API, par exemple les clé d'API et autres tokens essentiels à la récupération de données.