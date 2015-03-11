'use strict';

/**
 * @ngdoc service
 * @name ubcNowClientApp.Calendar
 * @description
 * # Calendar
 * Service in the ubcNowClientApp.
 */
angular.module('ubcNowClientApp')
  .service('Calendar', function () {
    var exports = this;
    var updateExports = function() {
      var methods = ['findEvent'];
      if (window.plugins && window.plugins.calendar) {
        alert(JSON.stringify(window.plugins.calendar));
        _.each(methods, function(k) {
          exports[k] = window.plugins.calendar[k];
        });
        //exports = window.plugins.calendar;
      } else {
        _.each(methods, function(method) {
          exports[method] = function() {
            alert('No Calendar Method:', method);
          };
        });
      }
    }
    document.addEventListener('deviceready', function() {
      updateExports();
    }, false);
    updateExports();
    return this;
  });
