'use strict';

/**
 * @ngdoc function
 * @name dartXRatingApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the dartXRatingApp
 */
angular.module('dartXRatingApp')
    .controller('PlayersCtrl', function ($scope, PlayerFactory) {
        $scope.player = {};
        $scope.players = PlayerFactory();

        $scope.registerPlayer = function() {
            $scope.players.registerPlayer($scope.player);
            $scope.player = {};
        };
});
