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
    var exports = {};
    document.addEventListener('deviceready', function() {
      if (window.plugins && window.plugins.calendar) {
        exports = window.plugins.calendar;
      } else {
        var methods = ['findEvent'];
        _.each(methods, function(method) {
          exports[method] = function() {
            alert('No Calendar Method:', method);
          };
        });
      }
    }, false);
    return exports;
  });
