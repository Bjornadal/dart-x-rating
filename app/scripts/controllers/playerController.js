'use strict';

angular.module('dartXRatingApp')
    .controller('PlayersCtrl', function ($scope, PlayerFactory) {
        $scope.player = {};
        $scope.players = PlayerFactory();

        $scope.registerPlayer = function () {
            $scope.players.registerPlayer($scope.player);
            $scope.player = {};
        };
    });
