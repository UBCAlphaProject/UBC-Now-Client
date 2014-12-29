'use strict';
/*global angular, $, _*/

/**
 * @ngdoc function
 * @name ubcNowClientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ubcNowClientApp
 */
angular.module('ubcNowClientApp')
  .controller('MainCtrl', function ($scope) {
    $scope.items = [{
      name: 'Campus Events',
      type: 'event',
      options: {
        events: [{
          name: 'Student Leadership Conference',
          type: 'Student Life',
          date: new Date(),
          link: 'http://students.ubc.ca/slc'
        }]
      }
    }, {
      name: 'Classes Today',
      type: 'classes'
    }];
    var moving = [];
    $('body').on('mousedown', '.item', function(e) {
      console.log('woof', e);
      moving.push([this, e.clientX]);
      e.preventDefault();
    }).on('mousemove', function(e) {
      _.each(moving, function(v) {
        var elem = v[0];
        var x = v[1];
        var left = e.clientX - x;
        $(elem).css({
          left: left,
          opacity: Math.abs((100)/left)
        });
      });
    }).on('mouseup', function(e) {
      _.each(moving, function(v) {
        var elem = v[0];
        var x = v[1];
        var left = e.clientX - x;
        if (Math.abs(left) > 100) {
          var i = $(elem).index();
          $(elem).animate({ opacity: 0, left: left * 2, height: 0 }, {
            complete: function() {
              $scope.items.splice(i, 1);
              $scope.$apply();
            }
          });
        } else {
          $(elem).animate({
            left: 0,
            opacity: 1
          });
        }
      });
      moving = [];
    });
  });
