angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Blip) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };

    $scope.items = [];
    var refresh = function() {
      Blip.list(function(blips) {
        console.log(blips);
        $scope.items = _.map(blips, function(blip) {
          return {
            name: blip.title,
            date: blip.time ? moment(blip.time).fromNow() : "",
            type: 'blip',
            options: blip
          };
        });
      });
    };
    refresh();
    $scope.more = function() {
      refresh();
    };
    $scope.drag = function(e) {
      var elem = $(e.target).parents('.card-default');
      elem.data('moving', true)
      var left = e.gesture.deltaX;
      elem.css({
        'transform': 'translate3d('+left+'px,0,0)',
        opacity: Math.abs((100)/left)
      });
      e.stopPropagation();
    };
    $scope.touchEnd = function(e) {
      var elem = $(e.target).parents('.card-default');
      if (!elem.data().moving) {
        return;
      }
      elem.data('moving', false);
      var left = e.gesture.deltaX;
      if (Math.abs(left) > 100) {
        var i = elem.index();
        elem.animate({ opacity: 0, transform: 'translate3d('+left * 2+'px, 0,0)', height: 0 }, {
          complete: function() {
            $scope.items.splice(i, 1);
            $scope.$apply();
          }
        });
      } else {
        elem.animate({
          opacity: 1
        }).css({transform: 'translate3d(0,0,0)'});
      }
    };
});
