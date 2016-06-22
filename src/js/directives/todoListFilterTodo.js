// On utilise le getter de module Angular
angular.module('todoList')

  // On déclare une directive où l'on injecte le *dispatcher*
  .directive('todoListFilterTodo', (dispatcher) => ({

    // Déclaration d'un scope isolé
    scope: {},

    // On remplace le tag HTML `<todo-list-filter-todo>` par le template
    replace: true,

    // Déclaration du template à afficher
    template: (`
      <nav class="todoList-filter">
        <ul class="todoList-filerList">
          <li class="todoList-filterItem-1">

            <!--
              // > L'attribut \`data-todo-list-current-filter\` correspond à la directive du même nom.
             -->
            <button
              data-todo-list-current-filter
              data-action="todo"
              class="todoList-filterItem-active">En cours</button>
          </li>
          <li class="todoList-filterItem-2">
            <button
              data-todo-list-current-filter
              data-action="done">Terminés</button>
          </li>
          <li class="todoList-filterItem-3">
            <button
              data-todo-list-current-filter
              data-action="reset">Annulés</button>
          </li>
        </ul>
      </nav>
    `),
    link(scope, el) {

      // On séléctionne les boutons uniquement, c'est en quelque sorte un filtre.
      // El correspondant au template compilé où il y a d'autres tags que BUTTON
      el
        .find('button')

        // On écoute le click et on récupère uniquement la clé `target` de l'event qui arrive en tant que paramètre lors d'un click.
        // On pourrait récuperer ce dernier et faire `e.target`.
        .on('click', ({target}) => {
          // Emet une action **CURRENT_FILTER** avec en paramètre la valeur du filtre qui se trouve sur le bouton, dans l'attribut `data-action`
          dispatcher.dispatch('CURRENT_FILTER', target.getAttribute('data-action'));
        });
    }
  }));
