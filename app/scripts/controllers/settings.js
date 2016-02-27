'use strict';

angular.module('xgames').controller('SettingsCtrl', function ($scope, SettingsService, $localstorage, $location, $window) {
    $scope.page = "set";
    $scope.settings = $localstorage.getObject('settings');
    $scope.leagues = null;
    $scope.gameTypes = null;
    $scope.seasons = null;
    $scope.newGameTypes = ["Dart", "Basket", "Bordtennis"];
    $scope.settings.newLeague = null;
    $scope.settings.newGame = "none";
    $scope.settings.newSeason = null;

    if ($scope.settings == null) {
        $scope.settings = {league:"none",game:"none",season:"none"};
    }

    $scope.loading = SettingsService.getLeagues()
        .then(function(leagues) {
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

    $scope.newLeague = function() {
        $scope.settings = {league: $scope.settings.newLeague, game: $scope.settings.newGame, season: $scope.settings.newSeason};
        $scope.setLeague();
    };

    $scope.setPage = function(page) {
        $scope.page = page;
    }
});
