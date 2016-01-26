// On utilise le getter de module Angular
angular.module('todoList')
  // On déclare une directive où l'on injecte le *dispatcher*
  .directive('todoListCurrentFilter', (dispatcher) => ({
    // On utilisera cette directive en tant qu'attribut HTML.
    // On ne déclare pas de scope isolé pour cette directive
    link(scope, el, attr) {

      // On écoute le fait de changer le **filtre d'affichage** et en conséquence on ajoute ou supprime une classe si notre élément active ce filtre.
      dispatcher
        .on('CURRENT_FILTER', status => {

          if (status === attr.action) {
            el.addClass('todoList-filterItem-active');
          }
          else {
            el.removeClass('todoList-filterItem-active');
          }
        });
    }
  }));
