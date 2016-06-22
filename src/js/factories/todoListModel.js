// On utilise le getter de module Angular
angular.module('todoList')

  // On déclare une nouvelle factory, qui sera notre model dans l'application.
  // On va charger une dépendance pour cette factory, le **dispatcher**.
  .factory('todoListModel', (dispatcher) => {

    // Initialise le model
    let list = [];

    // valeur par défault
    let currentFilterTodo = 'todo';

    // On écoute la création de nouvelle todo, lorsque cette action arrive:
    //  - on créé une nouvelle todo
    dispatcher.on('ADD', data => newTodo(data));

    // On écoute lorsque l'on va donner un status à une todo.
    dispatcher.on('SET_STATUS', data => setStatus(data));

    // On écoute lorsque l'utilisateur souhaite supprimer une todo
    dispatcher.on('REMOVE', data => remove(data));

    // On écoute la selection d'un filtre d'affichage. Ces filtres  sont disponibles dans la sidebar.
    dispatcher.on('CURRENT_FILTER', data => currentFilter(data));

    // Filtre une collection de todo par le status.
    // On retourne uniquement les todos qui possèdent le status actuel:
    //   - En cours (todo)
    //   - Terminé (done)
    //   - Annulé (reset)
    /**
     * Filtre la collection pour retourner celles du status en cours d'usage
     * @param  {Array} collection Liste de todos
     * @return {Array}            Liste avec le filtre appliqué
     */
    const currentList = collection => collection.filter(todo => todo.status === currentFilterTodo);

    //
    // Informe l'application d'un changement au sein de l'application
    //   Input:
    //     - Ajout d'une nouvelle todo
    //     - Suppression d'une todo
    //     - Changement de status d'une todo
    //     - Filtrage par status
    //   Output:
    //     - Action CHANGE, liste de todo par status en cours d'usage
    //
    const emitChange = () => dispatcher.dispatch('CHANGE', currentList(list));

    //Création d'une nouvelle todo dans le model.
    /**
     * @param  {String} label La todo à faire
     * @return {void}
     */
    const newTodo = label => {
      list.push({
        // Identifiant unique
        id: Date.now(),
        // Status par défault, En cours
        status: 'todo',
        // Equivalent de label: label, c'est l'intitulé de la todo
        label
      });
      emitChange();
    };

    // On va assigner un nouveau status à une todo
    /**
     * @param  {Object} options.todo   TodoList de référence pour la modification
     * @param  {String} options.status Status
     * @return {void}
     */
    const setStatus = ({todo, status}) => {
      list = list
        .map(item => {

          // On va modifier la todoList du model qui a le même id que celle que l'on passe
          if (todo.id === item.id) {
            // On affecte à cette todo le nouveau status
            item.status = status;
          }

          // On retourne l'objet, c'est spécifique à Array.map
          return item;
        });

      emitChange();
    };


    // On va supprimer une todo dans le model, pour ça on va filtrer
    // la collection de todo (le model), pour retourner toutes les todos qui répondent à cette condition
    //    - id différent de l'id de la todo
    /**
     * Supprime une todo dans le model
     * @param  {Object} todo
     * @return {void}
     */
    const remove = todo => {
      list = list.filter(item => todo.id !== item.id);
      emitChange();
    };

    // On va mettre à jour le status en cours d'utilisation.
    // Ce dernier va servir à toujours afficher au sein de
    // l'interface uniquement les todos qui sont du même status.
    /**
     * @param  {String} status
     * @return {void}
     */
    const currentFilter = status => {
      // Met à jour le status en cours d'utilisation
      currentFilterTodo = status;
      emitChange();
    };

    // Remise à zero de la liste de todo au boot
    const init = () => list.length = 0;


    // Cette factory retourne une méthode: init
    return {init};
  });
