'use strict';

angular.module('dartXRatingApp').controller('GameCtrl', function ($scope, $filter, $location, DartService) {
    $scope.game = {};
    $scope.games = DartService.getGames();
    $scope.players = DartService.getPlayers();

    $scope.togglePlayer = function(player) {
        player.wasPlaying = !player.wasPlaying;
        player.winner = (player.wasPlaying) ? player.winner : false;
    };

    $scope.setWinner = function(player) {
        angular.forEach($scope.players, function(gamePlayer) {
            gamePlayer.winner = false;
        });
        player.winner = true;
    };

    $scope.registerGame = function() {

        // Build game object
        var game = {
            placements: []
        };
        angular.forEach($scope.players, function(gamePlayer) {
            if (gamePlayer.wasPlaying) {
                game.placements.push({
                    placement: (gamePlayer.winner) ? 1 : 2,
                    player: gamePlayer
                })
            }
        });

        // Save match
        DartService.addGame(game).then(function(response) {
            // Reset form
            $scope.game = {};
            $scope.players = DartService.getPlayers();

            // Redirect to rating summary
            $location.url('/ratings');
        });
    };

    var getPlayerWinStreak = function(player) {
        var winstreak = 0;
        angular.forEach($scope.matches, function (match) {
            angular.forEach(match.players, function (matchPlayer) {
                if (matchPlayer.email == player.email) {
                    if (matchPlayer.winner) {
                        winstreak++;
                    } else {
                        winstreak = 0;
                    }
                }
            });
        });
        return winstreak;
    };

    var getPlayerLoseStreak = function(player) {
        var loseStreak = 0;
        angular.forEach($scope.matches, function(match) {
            angular.forEach(match.players, function (matchPlayer) {
                if (matchPlayer.email == player.email) {
                    if (matchPlayer.winner) {
                        loseStreak = 0;
                    } else {
                        loseStreak++;
                    }
                }
            });
        });
        return loseStreak;
    };

    var hasPlayerAchievement = function(player, achievement) {
        var hasAchievement = false;
        angular.forEach(player.achievements, function(a) {
            if (!hasAchievement && achievement.name == a.name) {
                hasAchievement = true;
            }
        });
        return hasAchievement;
    }
});
