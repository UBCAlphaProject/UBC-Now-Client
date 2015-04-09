'use strict';

/**
 * @ngdoc directive
 * @name ubcNowClientApp.directive:card/classes
 * @description
 * # card/classes
 */
angular.module('ubcNowClientApp')
  .directive('classes', function () {
    return {
      templateUrl: 'views/cards/classes.html',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
      }
    };
  });
