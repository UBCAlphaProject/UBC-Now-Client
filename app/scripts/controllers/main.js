'use strict';

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
      name: "You've got class!",
      body: 'Woof'
    }, {
      name: "You've got class!",
      body: 'Woof'
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
      moving = [];
      $('.item').animate({
        left: 0,
        opacity: 1
      });
    });
  });
