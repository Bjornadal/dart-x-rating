'use strict';

angular.module('dartXRatingApp').controller('MatchCtrl', function ($scope, $filter, RatingService, $location, PlayerFactory, MatchFactory, AchievementFactory) {
    var achievementFactory = new AchievementFactory;
    $scope.match = {};
    $scope.matches = MatchFactory();

    PlayerFactory().getPlayersAsync().then(function(players) {
        $scope.players = players;
        $scope.match.players = angular.copy($scope.players);
    });

    $scope.togglePlayer = function(player) {
        player.wasPlaying = !player.wasPlaying;
        player.winner = (player.wasPlaying) ? player.winner : false;
    };

    $scope.setWinner = function(player) {
        angular.forEach($scope.match.players, function(matchPlayer) {
            matchPlayer.winner = false;
        });
        player.winner = true;
    };

    $scope.registerMatch = function() {
        // Copy the selected players to its own object
        var toSave = { players: []};
        angular.forEach($scope.match.players, function(player) {
            if (player.wasPlaying) {
                toSave.players.push(
                    {
                        email: player.email,
                        name: player.name,
                        winner: player.winner,
                        rating: player.rating

                    }
                );
            }
        });

        // Update players
        angular.forEach($scope.players, function(player) {
            player.playedLastMatch = false;
            $scope.players.updatePlayer(player);
        });

        // Update player ratings
        RatingService.calculateRating(toSave.players);

        angular.forEach(toSave.players, function(matchPlayer) {
            angular.forEach($scope.players, function(player) {
                if (matchPlayer.email === player.email) {
                    player.ratingAdjustment = matchPlayer.ratingAdjustment;
                    player.rating = matchPlayer.rating;
                    player.matches = (player.matches) ? player.matches + 1 : 1;
                    player.wins = (player.wins) ? ((matchPlayer.winner) ? player.wins + 1 : player.wins) : ((matchPlayer.winner) ? 1 : 0);
                    player.playedLastMatch = true;

                    // Update form
                    var form = (matchPlayer.winner) ? 'W' : 'L';
                    if(player.form) {
                        if(player.form.length >= 5) {
                            player.form = player.form.slice(1, player.form.length);
                        }

                        player.form += form;
                    } else {
                        player.form = form;
                    }

                    /*
                    * Update achievements
                    * Not yet finished!
                    */
                    //if (player.playedLastMatch && matchPlayer.winner) {
                    //    var playerWinStreak = getPlayerWinStreak(player) + 1;
                    //    console.log(player.name + " has winstreak of " + playerWinStreak + " and rating of " + player.rating);
                    //    achievementFactory.getAchievementsAsync()
                    //        .then(function(achievements) {
                    //            angular.forEach(achievements, function(achievement) {
                    //                console.log(player.name + " has achivement " + achievement.name + " ? " + hasPlayerAchievement(player, achievement));
                    //                if (!hasPlayerAchievement(player, achievement)) {
                    //                    achievement.date = moment();
                    //                    if (angular.isUndefined(player.achievements)) {
                    //                        player.achievements = [];
                    //                    }
                    //                    if (achievement.name === 'Over 1600 rating' && player.rating >= 1600) {
                    //                        console.log(player.name + " is rewarded with the achievement " + achievement.name);
                    //                        player.achievements.push(achievement);
                    //                    } else if (achievement.name === 'Over 1700 rating' && player.rating >= 1700) {
                    //                        console.log(player.name + " is rewarded with the achievement " + achievement.name);
                    //                        player.achievements.push(achievement);
                    //                    } else if (achievement.name === 'Over 1800 rating' && player.rating >= 1800) {
                    //                        console.log(player.name + " is rewarded with the achievement " + achievement.name);
                    //                        player.achievements.push(achievement);
                    //                    } else if (achievement.name === 'Over 1900 rating' && player.rating >= 1900) {
                    //                        console.log(player.name + " is rewarded with the achievement " + achievement.name);
                    //                        player.achievements.push(achievement);
                    //                    } else if (achievement.name === 'Over 2000 rating' && player.rating >= 2000) {
                    //                        console.log(player.name + " is rewarded with the achievement " + achievement.name);
                    //                        player.achievements.push(achievement);
                    //                    }
                    //
                    //                    if (achievement.name === 'Win streak 3x' && playerWinStreak == 3) {
                    //                        console.log(player.name + " is rewarded with the achievement " + achievement.name);
                    //                        player.achievements.push(achievement);
                    //                    } else if (achievement.name === 'Win streak 5x' && playerWinStreak == 5) {
                    //                        console.log(player.name + " is rewarded with the achievement " + achievement.name);
                    //                        player.achievements.push(achievement);
                    //                    } else if (achievement.name === 'Win streak 10x' && playerWinStreak == 10) {
                    //                        console.log(player.name + " is rewarded with the achievement " + achievement.name);
                    //                        player.achievements.push(achievement);
                    //                    }
                    //                }
                    //            })
                    //        });
                    //}
                    $scope.players.updatePlayer(player);
                }
            })
        });

        // Save match
        MatchFactory().registerMatch(toSave);

        // Reset form
        $scope.match = {};
        $scope.match.players = angular.copy($scope.players);

        // Redirect to rating summary
        $location.url('/');
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
