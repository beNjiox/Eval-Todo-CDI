A rendre

— Un fichier api.rb
— Un fichier client.html
— Email a benjamin@guez.fr avant 17h30

Todo API
===========================

Une Todo est composé "d'item" representé par un objet javascript comme ceci

{ item: "Coder une API" }

Une todo avec plusieurs items ressemblera donc a un tableau d'objets

[ { item: "Comprendre les APIs" }, { item: "Coder une API" }, { item: "Utiliser une API" } ]

Etape 1
===========================

Retourner la Todo 

GET /items
— Retourne vide initiallement (vu qu'il n'y a rien)
— status 200
— L'interface doit afficher
	— La liste avec tous les items

Etape 2
===========================

Ajouter un "item" a notre todo
POST /items

— prends en parametre un objet 
  — exemple: `{ item: "Acheter le pain" }`
— en cas de succés retourne 
	— status 201
	— `{ message: "Item added" }`
— en cas d'erreur (chaine ayant moins de 3 lettres), retourne
	— 400
	- `{message: "Error while adding an item"}`

— L'interface doit afficher un champs vide ou on pourra ecrire un text ainsi qu'un bouton "Ajouter"
— L'interface doit afficher le message renvoyé apres un click sur "Ajouter"
— L'interface doit afficher mettre a jour la liste avec l'item nouvellement ajouté (si ca a marché uniquement)


Etape 3 - BONUS
===========================

Gestion de l'etat 'checked' / 'unchecked'.
Necessite: 
— Un attribut supplementaire dans l'objet avec item
— Un nouveau block dans l'API pour gerer le passage de checked a unchecked. Un seul block pour gerer l'activation et desactivation!

Conseil
===========================

— Ne passez du temps sur le design que si vous pouvez vous le permettre!
