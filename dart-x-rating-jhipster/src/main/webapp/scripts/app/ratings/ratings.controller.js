'use strict';

angular.module('dartxratingApp')
    .controller('RatingController', function ($scope, $filter, $state, DartService) {
        $scope.selectedLeague = DartService.getSelectedLeague();
        $scope.players = DartService.getPlayers();

    });
