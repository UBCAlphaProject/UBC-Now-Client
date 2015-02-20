'use strict';

/**
 * @ngdoc service
 * @name ubcNowClientApp.Blip
 * @description
 * # Blip
 * Service in the ubcNowClientApp.
 */
angular.module('ubcNowClientApp')
  .factory('Blip', function ($resource, $rootScope) {
    return $resource($rootScope.apiEndpoint + '/api/v1/blip/:id', {}, {
      list: {
        isArray: true
      }
    });
  });
