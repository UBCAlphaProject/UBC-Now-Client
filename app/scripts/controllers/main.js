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
      name: 'Time to Home',
      type: 'directions'
    }];
    var shownClasses = false;
    $scope.more = function() {
      if (!shownClasses) {
        $scope.items.push({
          name: 'Classes Today',
          type: 'classes'
        });
        shownClasses = true;
      }
    };
    var moving = [];
    function touchStart(e) {
      var x = e.clientX || e.originalEvent.touches[0].pageX;
      moving.push([this, x]);
      e.preventDefault();
    }
    function touchMove(e) {
      _.each(moving, function(v) {
        var elem = v[0];
        var x = v[1];
        var left = (e.clientX || e.originalEvent.touches[0].pageX) - x;
        $(elem).css({
          left: left,
          opacity: Math.abs((100)/left)
        });
      });
    }
    function touchEnd(e) {
      _.each(moving, function(v) {
        var elem = v[0];
        var x = v[1];
        var left = (e.clientX || e.originalEvent.changedTouches[0].pageX) - x;
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
    }
    $('body')
      .on('mousedown', '.item', touchStart)
      .on('touchstart', '.item', touchStart)
      .on('mousemove', touchMove)
      .on('touchmove', touchMove)
      .on('mouseup', touchEnd)
      .on('touchend', touchEnd);
  });
