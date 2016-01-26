// On utilise le getter de module Angular
angular.module('todoList')
  // On déclare une nouvelle factory, qui ne reçoit pas de dépendances
  .factory('dispatcher', () => {

    // On déclare une factory.
    // On va pouvoir s'en servir pour communiquer au sein de l'application via deux méthodes:
    //   - dispatch(ACTION, DATA)
    //   - on(ACTION, CALLBACK) // Cette fonction retourne sa méthode unsubscribe
    /**
     * @param  {String} name Namespace
     * @return {Object}
     */
    const dispatcher = name => {

      // Initialise une map (*<key> = <value>*)
      let map = {};
      const noop = () => {};

      // Lister tous les events pour une clé spécifique pour un namespace
      const getEventList = key => {
        const event = name + key;

        // Si c'est la première fois on créé un tableau vide pour cette identifiant
        if (!map[event]) {
          map[event] = [];
        }
        return map[event];
      }

      // Emet une action avec de la data, on peut ainsi communiquer avec un autre composant de notre application qui écoute cette action.
      // On peut écouter plusieurs fois cette action.
      /**
       * @param  {String} key  ACTION
       * @param  {Object} data Donnée à faire transiter
       * @return {void}
       */
      const dispatch = (key, data) => getEventList(key).forEach(cb => cb(data));

       // Ecoute une action et déclanche un callback si cette action arrive.
       // Ce callback reçoit en paramètre la data que l'on fait transiter.
      /**
       * @param  {String}   key      ACTION
       * @param  {Function} callback ce callback recoit 1 paramètre, la donnée.
       * @return {Function}            Méthode unsubscribe
       */
      const on = (key, callback = noop) => {
        const event = name + key;
        const eventList = getEventList(key);
        eventList.push(callback);

        // Met à jour la liste des listeners pour cette Action pour ce namespace
        map[event] = eventList;

        // Méthode unsubscribe, ça supprimer le listener de la liste si on l'utilise.
        return () => {
          // Récupère la position du callback que l'on veut supprimer
          const index = map[event].indexOf(callback);

          // Suppression du callback
          map[event].splice(index, 1);
        };
      };

      return {on, dispatch};
    };

    // Retourne un dispatcher avec un namespace pour cette application.
    // Ainsi il n'est plus nécessaire de préfixer ses actions.
    return dispatcher('todoList');

  });
