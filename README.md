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
### Intégration d'Instagram
### REfactorisation