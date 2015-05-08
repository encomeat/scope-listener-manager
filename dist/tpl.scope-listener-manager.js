(function () {
  'use strict';
  angular.module('tpl.scope-listener-manager', []);
}());
(function () {
  'use strict';
  angular.module('tpl.scope-listener-manager').service('scopeListenerManager', [function () {
      var unbindFunctions = {};
      var scopeWatches = {};
      ////////////////////////////////////////////////////////////////////////////
      // PRIVATE FUNCTIONS
      ////////////////////////////////////////////////////////////////////////////
      var callControllersUnbindFunction = function callControllersUnbindFunction(scopeId) {
        angular.forEach(unbindFunctions[scopeId], function (unbindFunction) {
          unbindFunction();
        });
        delete unbindFunctions[scopeId];
      };
      var unbindScopeWatch = function unbindScopeWatch(scopeId) {
        scopeWatches[scopeId]();
        delete scopeWatches[scopeId];
      };
      ////////////////////////////////////////////////////////////////////////////
      // PUBLIC FUNCTIONS
      ////////////////////////////////////////////////////////////////////////////
      var exports = {};
      exports.saveAddListener = function saveAddListener(controllerScope, unbindFunction) {
        if (!scopeWatches[controllerScope.$id]) {
          scopeWatches[controllerScope.$id] = controllerScope.$on('$destroy', function () {
            callControllersUnbindFunction(controllerScope.$id);
            unbindScopeWatch(controllerScope.$id);
          });
          unbindFunctions[controllerScope.$id] = [];
          unbindFunctions[controllerScope.$id].push(unbindFunction);
        } else {
          unbindFunctions[controllerScope.$id].push(unbindFunction);
        }
      };
      return exports;
    }]);
}());
