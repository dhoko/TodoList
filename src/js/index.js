// Declaration du module, par son nom puis de ses dépendances (*ici vides*)
angular
  .module('todoList', [])

  // Run est une fonction qui se lance lors du démarrage de l'application.
  // > Une fois uniquement

  // On injecte le model
  .run((todoListModel) => {

    // On initialise le model
    todoListModel.init();
  });
