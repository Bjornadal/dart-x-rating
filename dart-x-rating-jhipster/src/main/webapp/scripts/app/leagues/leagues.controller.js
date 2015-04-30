'use strict';

angular.module('dartxratingApp')
    .controller('LeagueController', function ($scope, $filter, $state, DartService) {
        $scope.selectedLeague = "";
        $scope.newLeague = {};
        $scope.leagues = DartService.getLeagues();

        $scope.selectLeague = function() {
            DartService.setLeague($scope.selectedLeague);
            DartService.authenticate($scope.selectedLeague).then(function(success) {
                if (success) {
                    //$state.go("ratings");
                }
                else {
                    $scope.wrongPassword = true;
                }
            });
        };

        $scope.createLeague = function() {
            var newLeague = $scope.newLeague;
            DartService.addLeague($scope.newLeague).then(function(league) {
                league.password = newLeague.password;
                DartService.setLeague(league);
                DartService.authenticate(league).then(function(success) {
                    if (success) {
                        //$state.go("ratings");
                    }
                    else {
                        $scope.wrongPassword = true;
                    }
                });
            });
            $scope.newLeague = {};
        };
    });
