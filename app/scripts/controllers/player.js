'use strict';

angular.module('xgames')
    .controller('PlayersCtrl', function ($scope, PlayerFactory) {
        $scope.player = {};
        $scope.players = new PlayerFactory();

        $scope.registerPlayer = function () {
            $scope.players.registerPlayer($scope.player);
            $scope.player = {};
        };
    });
