// On utilise le getter de module Angular
angular.module('todoList')

  // On déclare une directive où l'on injecte le *dispatcher*
  .directive('todoListComponent', (dispatcher) => ({

    // Déclaration d'un scope isolé
    scope: {},

    // On remplace le tag HTML `<todo-list-component>` par le template
    replace: true,

    // Déclaration du template à afficher
    template: (`
      <ul class="todoList-list">

        <!--
          // On va boucler sur toutes les todos dans le model
         -->
        <todo-list-item
          ng-repeat="todo in todos track by todo.id"
          data-model="todo"></todo-list-item>
      </ul>
    `),
    link(scope, el) {

      // On affiche les donnée lors de l'action change, où l'on reçoit en paramètre la liste à afficher.
      dispatcher
        .on('CHANGE', list => {

          // Nous sommes hors du cycle de vie du *$scope*, on informe donc la *$digest* qu'elle va devoir effectuer cette action.
          scope
            .$applyAsync(() => {
              // Attache les données du model dans le scope
              scope.todos = list;
            });
        })
    }
  }));
