// On utilise le getter de module Angular
angular.module('todoList')

  // On déclare une directive où l'on injecte le *dispatcher*
  .directive('todoListItem', (dispatcher) => ({
    // Déclaration d'un scope isolé, avec une clé todo dedans.
    // La valeur de todo provient d'un attribut model dans la déclaration de la directive:
    // `<todo-list-item data-model="xxx">`
    scope: {
      todo: '=model'
    },

    // On remplace le tag HTML `<todo-list-item>` par le template
    replace: true,
    template: (`
      <li class="todoList-item">
        <span class="todoList-label">{{ ::todo.label }}</span>
        <todo-list-status data-model="todo"></todo-list-status>
      </li>
    `)
  }));
