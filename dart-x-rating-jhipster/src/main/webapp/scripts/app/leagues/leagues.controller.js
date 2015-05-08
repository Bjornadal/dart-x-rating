'use strict';

angular.module('dartxratingApp')
    .controller('LeagueController', function ($scope, $filter, $state, DartService) {
        $scope.selectedLeague = DartService.getSelectedLeague();;
        $scope.newUserLeague = "";
        $scope.newUser = {};
        $scope.newLeague = {};
        $scope.leagues = DartService.getLeagues();

        $scope.addPlayerToLeague = function() {
            DartService.addPlayer($scope.newUser, $scope.newUserLeague).then(function() {
                $scope.newUserLeague = "";
                $scope.newUser = {};
            });
        };

        $scope.selectLeague = function(league) {
            DartService.setLeague(league);
            $scope.selectedLeague = league;
        };

        $scope.createLeague = function() {
            DartService.addLeague($scope.newLeague).then(function(league) {
                $scope.newLeague = {};
                $scope.leagues.push(league);
            });
        };
    });
