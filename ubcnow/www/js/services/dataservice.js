'use strict';

/**
 * @ngdoc service
 * @name ubcNowClientApp.DataService
 * @description
 * # DataService
 * Service in the ubcNowClientApp.
 */
angular.module('starter.services')
  .service('DataService', function () {
    var socket = io('http://localhost');
    socket.on('connect', function(){
    });
    socket.on('event', function(data){
    });
    socket.on('disconnect', function(){
    });
    this.isAuthed = function() {
      return false;
    }

  });
