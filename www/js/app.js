// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services', 'starter.directives', 'uiGmapgoogle-maps', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $cordovaLocalNotification, $cordovaCalendar) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.cordova) {
      $cordovaLocalNotification.add({
        id: 'some_notification_id',
        title: "Some AMS Event",
        text: "In 15 seconds!",
        firstAt: moment().add(15, 'seconds').toDate(),
      }).then(function () {
        console.log('callback for adding background notification');
      });
      $cordovaCalendar.listEventsInRange(
        moment().toDate(),
        moment().add(1, 'month').toDate()
      ).then(function (result) {
        alert(JSON.stringify(result));
      }, function (err) {
        alert(JSON.stringify(error));
      });
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $rootScope.apiEndpoint = 'https://alphaproject.me/ubcnow';
})

.config(function(uiGmapGoogleMapApiProvider) {
    uiGmapGoogleMapApiProvider.configure({
        key: 'AIzaSyDTZ4kppfY99CdUlkAjY66QrPi_dtjbDMw',
        v: '3.17',
        libraries: 'weather,geometry,visualization'
    });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/main.html"
      }
    }
  })

  .state('app.browse', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "templates/settings.html"
      }
    }
  })

  .state('app.admin', {
    url: "/admin",
    views: {
      'menuContent': {
        templateUrl: "templates/admin.html"
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});

angular.module('starter.services', ['ngResource']);
angular.module('starter.directives', ['ngResource']);
