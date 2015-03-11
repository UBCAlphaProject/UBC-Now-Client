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
  .controller('MainCtrl', function ($scope, Blip, Calendar) {
    $scope.items = [];
    document.addEventListener('deviceready', function() {
      try {
        window.plugins.calendar.listEventsInRange(new Date(), moment().add(moment.duration(2, 'weeks')).toDate(), function(message) {
          alert(JSON.stringify(message));
        }, function(message) {
          alert(message);
        });
      } catch(e) {
        alert(JSON.stringify(e));
      }
    }, false);
    var refresh = function() {
      Blip.list(function(blips) {
        $scope.items = _.map(blips, function(blip) {
          return {
            name: blip.name,
            type: 'blip',
            options: blip
          }
        });
      });
    }
    $scope.more = function() {
      refresh();
    };
    var moving = [];
    function touchStart(e) {
      var x = e.clientX || e.originalEvent.touches[0].pageX;
      moving.push([this, x]);
    }
    function touchMove(e) {
      _.each(moving, function(v) {
        var elem = v[0];
        var x = v[1];
        var left = (e.clientX || e.originalEvent.touches[0].pageX) - x;
        $(elem).css({
          'transform': 'translate3d('+left+'px,0,0)',
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
          $(elem).animate({ opacity: 0, transform: 'translate3d('+left * 2+'px, 0,0)', height: 0 }, {
            complete: function() {
              $scope.items.splice(i, 1);
              $scope.$apply();
            }
          });
        } else {
          $(elem).animate({
            opacity: 1
          }).css({transform: 'translate3d(0,0,0)'});
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
