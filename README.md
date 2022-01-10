# Malou
# Outils de consommation de l'API ProductHunt

Il s'agit d'un outil connecté à l'API Product Hunt permettant de récupérer les produits sortis à une certaine date et d'en faire une visualisation.
Les principales fonctionnalités sont donc:
  - Choisir une date
  - Affichage de la liste des produits sortis à cette datte
  - Affichage d'un pie chart montrant la répartition du nombre de produits par catégorie.
## Cloner le repo
```sh
$ git clone https://github.com/meriembader/Malou.git
$ cd Malou
```
## Partie Backend
* Technologie: [node.js]
* Call Rest API ProductHunt
### Installation & start
```sh
$ cd BackApp
$ npm install
$ npm run dev
```
Serveur Backend lancé sur le port 3000
## Partie Frontend
* Technologie: [angular]
* Affichage de la liste des produits sortis à la date choisie avec pagination
* Affichage d'un pie chart montrant la répartition du nombre de produits par catégorie(topic) (Les dix premières catégories ayant le plus de produits )
### Installation & start
```sh
$ cd FrontApp
$ npm install
$ ng serve
```
Serveur Frontend lancé sur le port 4200
## Naviguer sur http://localhost:4200/
