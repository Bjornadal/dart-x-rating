'use strict';

angular.module('xgames').controller('MatchCtrl', function ($scope, $filter, RatingService, $location, PlayerFactory, MatchFactory, AchievementFactory) {
    var achievementFactory = new AchievementFactory();
    $scope.match = {};
    $scope.matches = new MatchFactory();

    new PlayerFactory().getPlayersAsync().then(function (players) {
        $scope.players = players;
        $scope.match.players = angular.copy($scope.players);
    });

    $scope.togglePlayer = function (player) {
        player.wasPlaying = !player.wasPlaying;
        player.winner = (player.wasPlaying) ? player.winner : false;
    };

    $scope.setWinner = function (player) {
        angular.forEach($scope.match.players, function (matchPlayer) {
            matchPlayer.winner = false;
        });
        player.winner = true;
    };

    $scope.registerMatch = function () {
        // Copy the selected players to its own object
        var toSave = {players: []};
        angular.forEach($scope.match.players, function (player) {
            if (player.wasPlaying) {
                toSave.players.push(
                    {
                        name: player.name,
                        winner: player.winner,
                        rating: player.rating

                    }
                );
            }
        });

        // Update players
        angular.forEach($scope.players, function (player) {
            player.playedLastMatch = false;
            $scope.players.updatePlayer(player);
        });

        // Update player ratings
        RatingService.calculateRating(toSave.players);

        angular.forEach(toSave.players, function (matchPlayer) {
            angular.forEach($scope.players, function (player) {
                if (matchPlayer.name === player.name) {
                    player.ratingAdjustment = matchPlayer.ratingAdjustment;
                    player.rating = matchPlayer.rating;
                    player.matches = (player.matches) ? player.matches + 1 : 1;
                    player.wins = (player.wins) ? ((matchPlayer.winner) ? player.wins + 1 : player.wins) : ((matchPlayer.winner) ? 1 : 0);
                    player.playedLastMatch = true;

                    // Update form
                    var form = (matchPlayer.winner) ? 'W' : 'L';
                    if (player.form) {
                        if (player.form.length >= 5) {
                            player.form = player.form.slice(1, player.form.length);
                        }

                        player.form += form;
                    } else {
                        player.form = form;
                    }

                    /*
                     * Automatic registration of achievements
                     */
                    if (player.playedLastMatch) {
                        var playerWinStreak = getPlayerWinStreak(player) + 1;
                        var playerLoseStreak = getPlayerLoseStreak(player) + 1;
                        achievementFactory.getAchievementsAsync()
                            .then(function (achievements) {
                                angular.forEach(achievements, function (achievement) {
                                    if (!hasPlayerAchievement(player, achievement)) {
                                        achievement.date = moment().format('YYYY-MM-DD HH:mm');
                                        if (angular.isUndefined(player.achievements)) {
                                            player.achievements = [];
                                        }

                                        if (matchPlayer.winner) {
                                            if ((achievement.name === '1600 rating' && player.rating >= 1600) ||
                                                (achievement.name === '1700 rating' && player.rating >= 1700) ||
                                                (achievement.name === '1800 rating' && player.rating >= 1800) ||
                                                (achievement.name === '1900 rating' && player.rating >= 1900) ||
                                                (achievement.name === '2000 rating' && player.rating >= 2000) ||
                                                (achievement.name === 'Win streak 3x' && playerWinStreak === 3) ||
                                                (achievement.name === 'Win streak 5x' && playerWinStreak === 5) ||
                                                (achievement.name === 'Win streak 10x' && playerWinStreak === 10)) {

                                                player.achievements.push(achievement);
                                            }
                                        } else {
                                            if (achievement.name === 'Lose streak 10x' && playerLoseStreak === 10) {
                                                player.achievements.push(achievement);
                                            }
                                        }
                                    }
                                });
                            })
                            .then(function () {
                                $scope.players.updatePlayer(player);
                            });
                    } else {
                        $scope.players.updatePlayer(player);
                    }
                }
            });
        });

        // Save match
        new MatchFactory().registerMatch(toSave);

        // Reset form
        $scope.match = {};
        $scope.match.players = angular.copy($scope.players);

        // Redirect to rating summary
        $location.url('/');
    };

    var getPlayerWinStreak = function (player) {
        var winstreak = 0;
        angular.forEach($scope.matches, function (match) {
            angular.forEach(match.players, function (matchPlayer) {
                if (matchPlayer.name === player.name) {
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

    var getPlayerLoseStreak = function (player) {
        var loseStreak = 0;
        angular.forEach($scope.matches, function (match) {
            angular.forEach(match.players, function (matchPlayer) {
                if (matchPlayer.name === player.name) {
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

    var hasPlayerAchievement = function (player, achievement) {
        var hasAchievement = false;
        angular.forEach(player.achievements, function (a) {
            if (!hasAchievement && achievement.name === a.name) {
                hasAchievement = true;
            }
        });
        return hasAchievement;
    };
});
