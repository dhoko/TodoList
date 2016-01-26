// On utilise le getter de module Angular
angular.module('todoList')

  // On déclare une directive où l'on injecte le *dispatcher*
  .directive('todoListStatus', (dispatcher) => ({

    // Déclaration d'un scope isolé, avec une clé todo dedans.
    // La valeur de todo provient d'un attribut model dans la déclaration de la directive:
    // `<todo-list-status data-model="xxx">`
    scope: {
      todo: '=model'
    },

    // On remplace le tag HTML `<todo-list-status>` par le template
    replace: true,

    // Déclaration du template à afficher
    template: (`
      <div class="todoList-btnGroup">
        <!--
          // \`ng-show\` : Afficher le bouton uniquement lorsque le status de la todo n'est pas *En cours*.
        -->
        <todo-list-remove
          ng-show="'todo' !== todo.status"
          data-model="todo"></todo-list-remove>

        <!--
          // \`ng-show\` : Afficher le bouton uniquement lorsque le status de la todo n'est pas *Terminé*.
        -->
        <button
          class="todoList-btnDone"
          ng-show="'done' !== todo.status"
          data-action="done">Terminer</button>


        <!--
          // \`ng-show\` : Afficher le bouton uniquement lorsque le status de la todo n'est pas *Annulé*.
        -->
        <button
          class="todoList-btnReset"
          type="reset"
          ng-show="'reset' !== todo.status"
          data-action="reset">Annuler</button>
      </div>
    `),
    link(scope, el) {

      // Action que l'on va déclancher lors du click, on récupère uniquement la clé `target` de l'event qui arrive en tant que paramètre lors d'un click.
      // On pourrait récuperer ce dernier et faire `e.target`.
      const onClick = ({target}) => {

        // Vérification pour savoir si on click bien sur un bouton d'action pour le status
        if (target.hasAttribute('data-action')) {

          // On émet une action **SET_STATUS** pour informer l'application qu'une todo souhaite changer de status
          // On va envoyer en paramètre un object avec deux clés
          //  - todo
          //  - status
          dispatcher.dispatch('SET_STATUS', {
            // La todo qui souhaite changer
            todo: scope.todo,

            // Le status qu'elle souhaite obtenir
            status: target.getAttribute('data-action')
          });
        }
      };

      // On écoute le click
      el.on('click', onClick);

      // Losque que cette directive ne va plus s'afficher, c'est à dire:
      //  - Change de status de todo à done
      //  - On va afficher uniquement les todos de status todo
      //  - On ne va plus afficher celles !todo
      //  - Angular va détruire *cette directive pour cette todo*
      //
      // > Il faut supprimer les listeners afin de ne pas laisser en mémoire des écouteurs sur des éléments qui ne sont plus dans le dom.
      scope
        .$on('$destroy', () => {
          el.off('click', onClick);
        });
    }
  }));
