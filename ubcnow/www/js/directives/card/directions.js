'use strict';

/**
 * @ngdoc directive
 * @name ubcNowClientApp.directive:card/directions
 * @description
 * # card/directions
 */
angular.module('ubcNowClientApp')
  .directive('directions', function () {
    return {
      templateUrl: 'views/cards/directions.html',
      restrict: 'E',
      scope: {
        options: '=',
        configMode: '='
      },
      link: function postLink(scope, element, attrs) {
        scope.width = element.width();
        $(window).resize(function() {
          scope.width = element.width();
          scope.$apply();
        });
      }
    };
  });
