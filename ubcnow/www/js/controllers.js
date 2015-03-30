angular.module('starter.controllers', [])

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
    /*
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
    */
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
      .on('mousedown', '.card-default', touchStart)
      .on('touchstart', '.card-default', touchStart)
      .on('mousemove', touchMove)
      .on('touchmove', touchMove)
      .on('mouseup', touchEnd)
      .on('touchend', touchEnd);
});
