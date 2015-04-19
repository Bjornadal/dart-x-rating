'use strict';

/**
 * @ngdoc function
 * @name dartXRatingApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dartXRatingApp
 */
angular.module('dartXRatingApp')
    .controller('PlayerCtrl', function ($scope, DartService) {
        $scope.isLeagueAdmin = DartService.isLeagueAdmin();
        $scope.player = {};
        $scope.players = DartService.getPlayers();

        $scope.registerPlayer = function() {
            DartService.addPlayer($scope.player);
            $scope.players.push($scope.player)
            $scope.player = {};
        };
});
