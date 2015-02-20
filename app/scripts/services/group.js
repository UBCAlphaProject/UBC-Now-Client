'use strict';

/**
 * @ngdoc service
 * @name ubcNowClientApp.Group
 * @description
 * # Group
 * Service in the ubcNowClientApp.
 */
angular.module('ubcNowClientApp')
  .factory('Group', function ($resource, $rootScope) {
    return $resource($rootScope.apiEndpoint + '/api/v1/group/:id', {}, {
      list: {
        isArray: true
      }
    });
  });
