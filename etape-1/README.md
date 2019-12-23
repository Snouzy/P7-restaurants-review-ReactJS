## Etape 1 : la carte des restaurants
Commencez par les fondations de votre application. Il y aura 2 sections principales :

* Une carte Google Maps, chargée avec l'API de Google Maps

* Une liste de restaurants correspondant à la zone affichée sur la carte Google Maps

Vous placerez ces éléments côte à côte.

* La carte Google Maps sera centrée immédiatement sur la position de l'utilisateur.
* Vous utiliserez l'API de géolocalisation de JavaScript. 
* Un marqueur de couleur spécifique sera placé à l'emplacement de l'utilisateur.

Une liste de restaurants est fournie sous forme de données JSON présentées dans un fichier à part. En temps normal, ces données vous seraient renvoyés par un backend via une API, mais pour cet exercice il sera pour le moment suffisant de charger en mémoire tous les restaurants en mémoire directement.

* Affichez ces restaurants grâce à leurs coordonnées GPS sur la carte. Les restaurants qui sont actuellement visibles sur la carte doivent être affichés sous forme de liste sur le côté de la carte.
* Vous afficherez la moyenne des commentaires de chaque restaurant (qui va de 1 à 5 étoiles).
