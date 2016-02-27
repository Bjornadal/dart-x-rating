'use strict';

angular.module('xgames').controller('SettingsCtrl', function ($scope, SettingsService, $localstorage, $location, $window) {
    $scope.settings = $localstorage.getObject('settings');
    $scope.leagues = null;
    $scope.gameTypes = null;
    $scope.seasons = null;

    if ($scope.settings == null) {
        $scope.settings = {league:"none",game:"none",season:"none"};
    }

    $scope.loading = SettingsService.getLeagues()
        .then(function(leagues) {
            console.log(leagues);
            $scope.leagues = leagues;
            if ($scope.settings.league != null && $scope.settings.league != 'none') {
                $scope.getGamesByLeague();
                if ($scope.settings.game != null && $scope.settings.game != 'none') {
                    $scope.getSeasonsByGame();
                }
            }
        })
        .catch(function(error) {
            console.log(error);
        });

    $scope.getGamesByLeague = function() {
        var league = getLeagueById();
        if (league != null) {
            $scope.gameTypes = league.games;
        }
    };

    $scope.getSeasonsByGame = function() {
        if ($scope.settings.league != 'none' && $scope.settings.game != 'none') {
            var league = getLeagueById();
            if (league != null) {
                $scope.seasons = league.games[$scope.settings.game].seasons;
            }
        }
    };

    function getLeagueById() {
        if ($scope.settings.league != 'none') {
            return $scope.leagues.$getRecord($scope.settings.league);
        }
        return null;
    }

    $scope.setGameType = function(gameType) {
      $scope.settings.game = gameType;
    };

    $scope.setLeague = function() {
        $localstorage.setObject('settings', $scope.settings);

        $location.path('/');
        $window.location.reload();
    };
});
