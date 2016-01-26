# TodoList

## Traduire cette page HTML en app Angular.

- On ajoute une nouvelle todo via le formulaire,
- Le filtre par default est `todo`.
- Les boutons par todo permettent de changer le type de filtre (*done, reset*)
- Les filtres modifient le comportement de l'application donc de l'affichage de la liste de todos. (sidebar)

Structure d'une todo:

```js
{
  id: Date.now(),
  label: '<todo label>',
  status: 'todo'
}
```

### Principe *avec le dispatcher*

Extraire le HTML en composant qui vont envoyer des actions aux model.

Un des composants doit écouter une action du model, qui va lui permettre d'afficher les todos.

Le model est une factory qui reçoit des actions, manipule la data et émet une action.

## Dev

- `npm install`
- `npm start`

Source [Dispatcher](https://gist.github.com/dhoko/9ef1517c56401bbea6c5) pour l'application.


## Application Angular [Source](https://github.com/dhoko/TodoList/tree/feat/angular)
