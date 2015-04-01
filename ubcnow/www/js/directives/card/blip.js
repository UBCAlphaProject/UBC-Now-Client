'use strict';

/**
 * @ngdoc directive
 * @name ubcNowClientApp.directive:card/blip
 * @description
 * # card/event
 */
angular.module('starter.directives')
  .directive('blip', function () {
    return {
      templateUrl: 'templates/cards/blip.html',
      restrict: 'E',
      scope: {
        options: '=',
        configMode: '='
      },
      link: function postLink(scope, element, attrs) {
        // Add moment
        scope.moment = moment;
        scope.map = {
          center: {
            latitude: 120,
            longitude: 43
          },
          zoom: 14,
        };
        scope.marker =  {
          center: {
            latitude: 120,
            longitude: 43
          },
        };
        scope.$watch('options', function(options) {
          scope.map.center = {
            latitude: options.lat,
            longitude: options.lng
          };
          scope.marker.center = {
            latitude: options.lat,
            longitude: options.lng
          };
        });
        // This doesn't work.
        scope.nodrag = function(e) {
          e.stopImmediatePropagation();
          e.preventDefault();
        };
      }
    };
  });
