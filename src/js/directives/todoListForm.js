// On utilise le getter de module Angular
angular.module('todoList')

  // On déclare une directive où l'on injecte le *dispatcher*,
  .directive('todoListForm', (dispatcher) => ({

    // Déclaration d'un scope isolé
    scope: {},

    // On remplace le tag HTML `<todo-list-form>` par le template
    replace: true,
    template: (`
      <form
        action="#"
        class="todoList-form"
        novalidate>

        <!--
          // On ajoute un **ng-model** sur l'input afin de pouvoir récupérer la valeur de ce dernier lors de la soumission du formulaire.
        -->
        <input
          class="todoList-input"
          ng-model="newTodo"
          placeholder="Saisir une nouvelle tâche">
        <button class="todoList-btnAdd">Ajouter</button>
      </form>
    `),
    link(scope, el) {

      // On écoute lorsque l'utilisateur va soumettre le formulaire
      el

        // On va récupérer aussi l'event qui est émit
        .on('submit', (e) => {

          // On va empêcher le comportement par défault de cet event submit, qui est de reload la page.
          e.preventDefault();

          // On informare l'application qu'on souhaite créer une nouvelle todo, on récupère la valeur de l'input via le scope.
          // > On utilise `scope.newTodo` car nous avons dans le template sur l'input `ng-model="newTodo`
          dispatcher.dispatch('ADD', scope.newTodo);

          // Vide l'input
          scope.newTodo = '';
        });
    }
  }));
