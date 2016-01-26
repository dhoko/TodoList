// On utilise le getter de module Angular
angular.module('todoList')

  // On déclare une directive où l'on injecte le *dispatcher*
  .directive('todoListRemove', (dispatcher) => ({

    // Déclaration d'un scope isolé, avec une clé todo dedans.
    // La valeur de todo provient d'un attribut model dans la déclaration de la directive:
    // `<todo-list-remove data-model="xxx">`
    scope: {
      todo: '=model'
    },

    // On remplace le tag HTML `<todo-list-remove>` par le template
    replace: true,

    // Déclaration du template à afficher
    template: `<button class="todoList-btnDelete">Supprimer</button>`,
    link(scope, el) {

      // Action à déclancher lors d'un click sur ce bouton.
      // On va informer l'application que l'on souhaite supprimer une todo.
      const onClick = () => dispatcher.dispatch('REMOVE', scope.todo);

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
