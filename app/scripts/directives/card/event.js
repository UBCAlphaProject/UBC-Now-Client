'use strict';

/**
 * @ngdoc directive
 * @name ubcNowClientApp.directive:card/event
 * @description
 * # card/event
 */
angular.module('ubcNowClientApp')
  .directive('event', function () {
    return {
      templateUrl: 'views/cards/event.html',
      restrict: 'E',
      scope: {
        options: '=',
        configMode: '='
      },
      link: function postLink(scope, element, attrs) {
      }
    };
  });
