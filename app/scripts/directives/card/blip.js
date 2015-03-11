'use strict';

/**
 * @ngdoc directive
 * @name ubcNowClientApp.directive:card/blip
 * @description
 * # card/event
 */
angular.module('ubcNowClientApp')
  .directive('blip', function () {
    return {
      templateUrl: 'views/cards/blip.html',
      restrict: 'E',
      scope: {
        options: '=',
        configMode: '='
      },
      link: function postLink(scope, element, attrs) {
        // Add moment
        scope.moment = moment;
      }
    };
  });
