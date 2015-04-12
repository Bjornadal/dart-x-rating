'use strict';

/**
 * Created by raymondk on 18.03.15.
 */

angular.module('dartXRatingApp').service('StatisticsService', function($q, $filter, PlayerFactory, MatchFactory) {
    var DATE_FORMAT = 'DD.MM.YYYY';
    var playerFactory = new PlayerFactory;
    var matchFactory = new MatchFactory;
    var players, matches;

    this.generateStatistics = function() {
        var deferred = $q.defer();
        loadData()
            .then(ratingStats)
            .then(matchStats)
            .then(function() {
                deferred.resolve(players);
            })
            .catch(function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    this.updateStatistics = function() {
        var deferred = $q.defer();
        ratingStats()
            .then(matchStats)
            .then(function() {
                deferred.resolve(players);
            })
            .catch(function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    var loadData = function() {
        var deferred = $q.defer();
        playerFactory.getPlayersAsync()
            .then(function(p) {
                players = p;
            })
            .then(matchFactory.getMatchesAsync)
            .then(function(m) {
                matches = m;
            })
            .then(function() {
                deferred.resolve(players);
            })
            .catch(function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };

    var ratingStats = function() {
        var deferred = $q.defer();
        angular.forEach(players, function (player) {
            if (angular.isUndefined(player.stats)) {
                player.stats = {};
            }
            player.stats.highestRating = {};
            player.stats.highestRating.value = 1500;
            player.stats.highestRating.date = moment('01.03.2015', DATE_FORMAT);
            player.stats.lowestRating = {};
            player.stats.lowestRating.value = 1500;
            player.stats.lowestRating.date = moment('01.03.2015', DATE_FORMAT);
            player.stats.highestRatingImprovement = {};
            player.stats.highestRatingImprovement.value = 1;
            player.stats.highestRatingImprovement.date = moment('01.03.2015', DATE_FORMAT);
            player.stats.highestRatingLoss = {};
            player.stats.highestRatingLoss.value = 1;
            player.stats.highestRatingLoss.date = moment('01.03.2015', DATE_FORMAT);
            angular.forEach(matches, function (match) {
                angular.forEach(match.players, function (matchPlayer) {
                    if (matchPlayer.name == player.name) {
                        //Highest rating
                        if (matchPlayer.rating >= player.stats.highestRating.value) {
                            player.stats.highestRating.value = matchPlayer.rating;
                            player.stats.highestRating.date = match.date;
                        }
                        //Lowest rating
                        if (matchPlayer.rating < player.stats.lowestRating.value) {
                            player.stats.lowestRating.value = matchPlayer.rating;
                            player.stats.lowestRating.date = match.date;
                        }
                        //Highest rating improvement
                        if (matchPlayer.ratingAdjustment >= player.stats.highestRatingImprovement.value) {
                            player.stats.highestRatingImprovement.value = matchPlayer.ratingAdjustment;
                            player.stats.highestRatingImprovement.date = match.date;
                        }
                        //Highest rating loss
                        if (matchPlayer.ratingAdjustment < player.stats.highestRatingLoss.value) {
                            player.stats.highestRatingLoss.value = matchPlayer.ratingAdjustment;
                            player.stats.highestRatingLoss.date = match.date;
                        }
                    }
                });
            });
        });
        deferred.resolve();
        return deferred.promise;
    };

    var matchStats = function() {
        var deferred = $q.defer();
        angular.forEach(players, function (player) {
            if (angular.isUndefined(player.stats)) {
                player.stats = {};
            }
            player.stats.matches = {};
            player.stats.matches.value = player.matches;
            player.stats.wins = {};
            player.stats.wins.value = player.wins;
            player.stats.biggestWinStreak = {};
            player.stats.biggestWinStreak.value = 0;
            player.stats.biggestWinStreak.date = moment('01.03.2015', DATE_FORMAT);
            player.stats.biggestLoseStreak = {};
            player.stats.biggestLoseStreak.value = 0;
            player.stats.biggestLoseStreak.date = moment('01.03.2015', DATE_FORMAT);
            var winStreak = 0, loseStreak = 0, currentWinStreak = 0, currentLoseStreak = 0;
            angular.forEach(matches, function (match) {
                angular.forEach(match.players, function (p) {
                    if (p.name == player.name) {
                        if (p.winner) {
                            winStreak++;
                            currentWinStreak++;
                            if (winStreak >= player.stats.biggestWinStreak.value) {
                                player.stats.biggestWinStreak.value = winStreak;
                                player.stats.biggestWinStreak.date = match.date;
                            }
                            loseStreak = 0;
                            currentLoseStreak = 0;
                        } else {
                            loseStreak++;
                            currentLoseStreak++;
                            if (loseStreak >= player.stats.biggestLoseStreak.value) {
                                player.stats.biggestLoseStreak.value = loseStreak;
                                player.stats.biggestLoseStreak.date = match.date;
                            }
                            winStreak = 0;
                            currentWinStreak = 0;
                        }
                    }
                })
            });
            player.stats.currentWinStreak = currentWinStreak;
            player.stats.currentLoseStreak = currentLoseStreak;
        });
        deferred.resolve();
        return deferred.promise;
    };

    this.createLineChartRating = function(startDate, endDate) {
        var deferred = $q.defer();
        var dateFormat = "yyyy-MM-dd";
        var chartData = {};
        chartData.options = {
            datasetFill : false,
            responsive: true
        };
        chartData.series = [];
        chartData.rating = [];
        angular.forEach(players, function(player, index) {
            chartData.series[index] = player.name;
            chartData.rating[index] = player.rating;
        });
        var fromDate = moment(startDate).format('YYYY-MM-DD');
        chartData.labels = [];
        chartData.labels.push(fromDate);
        chartData.data = [];

        angular.forEach(matches, function(match, index) {
            if ($filter('date')(match.date, dateFormat) >= $filter('date')(startDate, dateFormat) && $filter('date')(match.date, dateFormat) <= $filter('date')(endDate, dateFormat)) {
                chartData.labels.push(moment(match.date).format('YYYY-MM-DD HH:mm'));
                angular.forEach(chartData.series, function (serie, pos) {
                    var playerRatings = [];

                    if (angular.isUndefined(chartData.data[pos])) {
                        chartData.data[pos] = [];
                        playerRatings.push(1500);
                        chartData.data[pos] = playerRatings;
                    } else {
                        playerRatings = chartData.data[pos];
                    }

                    var hasPlayed = false;
                    var playerRating = playerRatings[playerRatings.length - 1];
                    angular.forEach(match.players, function (player) {
                        if (serie === player.name) {
                            hasPlayed = true;
                            playerRating = player.rating;
                        }
                    });
                    playerRatings.push(playerRating);
                });
            }
        });
        deferred.resolve(chartData);
        return deferred.promise;
    };

    this.generateFunFacts = function() {
        var funFacts = ['Dart X Rating Awesome Fun Facts'];
        var playersWithMostMatches = [], playersWithFewestMatches = [], playersWithMostWins = [], playersWithFewestWins = [], playersWithHighestRating = [], playersWithLowestRating = [];
        var playersWithHighestRatingImprovement = [], playersWithHighestRatingLoss = [];
        var playersWithHighestWinStreak = [], playersWithHighestLoseStreak = [];
        var playersWithMostAchievements = [];

        angular.forEach(players, function(player) {
            //Most matches
            if (playersWithMostMatches.length === 0) {
                playersWithMostMatches.push(player);
            } else {
                if (player.stats.matches.value > playersWithMostMatches[playersWithMostMatches.length-1].stats.matches.value) {
                    playersWithMostMatches = [];
                    playersWithMostMatches.push(player);
                } else if (player.stats.matches.value === playersWithMostMatches[playersWithMostMatches.length-1].stats.matches.value) {
                    playersWithMostMatches.push(player);
                }
            }
            //Fewest matches
            if (playersWithFewestMatches.length === 0) {
                playersWithFewestMatches.push(player);
            } else {
                if (player.stats.matches.value < playersWithFewestMatches[playersWithFewestMatches.length-1].stats.matches.value) {
                    playersWithFewestMatches = [];
                    playersWithFewestMatches.push(player);
                } else if (player.stats.matches.value === playersWithFewestMatches[playersWithFewestMatches.length-1].stats.matches.value) {
                    playersWithFewestMatches.push(player);
                }
            }
            //Most wins
            if (playersWithMostWins.length === 0) {
                playersWithMostWins.push(player);
            } else {
                if (player.stats.wins.value > playersWithMostWins[playersWithMostWins.length-1].stats.wins.value) {
                    playersWithMostWins = [];
                    playersWithMostWins.push(player);
                } else if (player.stats.wins.value === playersWithMostWins[playersWithMostWins.length-1].stats.wins.value) {
                    playersWithMostWins.push(player);
                }
            }
            //Fewest wins
            if (playersWithFewestWins.length === 0) {
                playersWithFewestWins.push(player);
            } else {
                if (player.stats.wins.value < playersWithFewestWins[playersWithFewestWins.length-1].stats.wins.value) {
                    playersWithFewestWins = [];
                    playersWithFewestWins.push(player);
                } else if (player.stats.wins.value === playersWithFewestWins[playersWithFewestWins.length-1].stats.wins.value) {
                    playersWithFewestWins.push(player);
                }
            }
            //Highest rating
            if (playersWithHighestRating.length === 0) {
                playersWithHighestRating.push(player);
            } else {
                if ($filter('number')(player.stats.highestRating.value, 2) > $filter('number')(playersWithHighestRating[playersWithHighestRating.length-1].stats.highestRating.value, 2)) {
                    playersWithHighestRating = [];
                    playersWithHighestRating.push(player);
                } else if ($filter('number')(player.stats.highestRating.value, 2) === $filter('number')(playersWithHighestRating[playersWithHighestRating.length-1].stats.highestRating.value, 2)) {
                    playersWithHighestRating.push(player);
                }
            }
            //Lowest rating
            if (playersWithLowestRating.length === 0) {
                playersWithLowestRating.push(player);
            } else {
                if ($filter('number')(player.stats.lowestRating.value, 2) < $filter('number')(playersWithLowestRating[playersWithLowestRating.length-1].stats.lowestRating.value, 2)) {
                    playersWithLowestRating = [];
                    playersWithLowestRating.push(player);
                } else if ($filter('number')(player.stats.lowestRating.value, 2) === $filter('number')(playersWithLowestRating[playersWithLowestRating.length-1].stats.lowestRating.value, 2)) {
                    playersWithLowestRating.push(player);
                }
            }
            //Highest rating improvement
            if (playersWithHighestRatingImprovement.length === 0) {
                playersWithHighestRatingImprovement.push(player);
            } else {
                if ($filter('number')(player.stats.highestRatingImprovement.value, 2) < $filter('number')(playersWithHighestRatingImprovement[playersWithHighestRatingImprovement.length-1].stats.highestRatingImprovement.value, 2)) {
                    playersWithHighestRatingImprovement = [];
                    playersWithHighestRatingImprovement.push(player);
                } else if ($filter('number')(player.stats.highestRatingImprovement.value, 2) === $filter('number')(playersWithHighestRatingImprovement[playersWithHighestRatingImprovement.length-1].stats.highestRatingImprovement.value, 2)) {
                    playersWithHighestRatingImprovement.push(player);
                }
            }
            //Highest rating loss
            if (playersWithHighestRatingLoss.length === 0) {
                playersWithHighestRatingLoss.push(player);
            } else {
                if ($filter('number')(player.stats.highestRatingLoss.value, 2) > $filter('number')(playersWithHighestRatingLoss[playersWithHighestRatingLoss.length-1].stats.highestRatingLoss.value, 2)) {
                    playersWithHighestRatingLoss = [];
                    playersWithHighestRatingLoss.push(player);
                } else if ($filter('number')(player.stats.highestRatingLoss.value, 2) === $filter('number')(playersWithHighestRatingLoss[playersWithHighestRatingLoss.length-1].stats.highestRatingLoss.value, 2)) {
                    playersWithHighestRatingLoss.push(player);
                }
            }

            //Highest win streak
            if (playersWithHighestWinStreak.length === 0) {
                playersWithHighestWinStreak.push(player);
            } else {
                if (player.stats.biggestWinStreak.value > playersWithHighestWinStreak[playersWithHighestWinStreak.length-1].stats.biggestWinStreak.value) {
                    playersWithHighestWinStreak = [];
                    playersWithHighestWinStreak.push(player);
                } else if (player.stats.biggestWinStreak.value === playersWithHighestWinStreak[playersWithHighestWinStreak.length-1].stats.biggestWinStreak.value) {
                    playersWithHighestWinStreak.push(player);
                }
            }
            //Highest lose streak
            if (playersWithHighestLoseStreak.length === 0) {
                playersWithHighestLoseStreak.push(player);
            } else {
                if (player.stats.biggestLoseStreak.value > playersWithHighestLoseStreak[playersWithHighestLoseStreak.length-1].stats.biggestLoseStreak.value) {
                    playersWithHighestLoseStreak = [];
                    playersWithHighestLoseStreak.push(player);
                } else if (player.stats.biggestLoseStreak.value === playersWithHighestLoseStreak[playersWithHighestLoseStreak.length-1].stats.biggestLoseStreak.value) {
                    playersWithHighestLoseStreak.push(player);
                }
            }
            //Most achievements
            if (!angular.isUndefined(player.achievements)) {
                player.stats.achievements = {};
                player.stats.achievements.value = player.achievements.length;
                if (playersWithMostAchievements.length === 0) {
                    playersWithMostAchievements.push(player);
                } else {
                    if (player.achievements.length > playersWithMostAchievements[playersWithMostAchievements.length - 1].achievements.length) {
                        playersWithMostAchievements = [];
                        playersWithMostAchievements.push(player);
                    } else if (player.achievements.length === playersWithMostAchievements[playersWithMostAchievements.length - 1].achievements.length) {
                        playersWithMostAchievements.push(player);
                    }
                }
            }
        });

        funFacts.push('There as been played a totalt of ' + $filter('bold')(matches.length) + ' matches');
        funFacts.push(buildFact(playersWithMostMatches, playersWithMostMatches[0].stats.matches, ' has played the most matches with ', 0));
        funFacts.push(buildFact(playersWithFewestMatches, playersWithFewestMatches[0].stats.matches, ' has played the fewest matches with ', 0));
        funFacts.push(buildFact(playersWithMostWins, playersWithMostWins[0].stats.wins, ' has won the most matches with a totalt of ', 0));
        funFacts.push(buildFact(playersWithFewestWins, playersWithFewestWins[0].stats.wins, ' has won the fewest matches with a totalt of only ', 0));
        funFacts.push(buildFact(playersWithHighestRating, playersWithHighestRating[0].stats.highestRating, ' has the all-time highest rating of ', 2));
        funFacts.push(buildFact(playersWithLowestRating, playersWithLowestRating[0].stats.lowestRating, ' has the all-time lowest rating of ', 2));
        funFacts.push(buildFact(playersWithHighestRatingImprovement, playersWithHighestRatingImprovement[0].stats.highestRatingImprovement, ' gained the highest improvement in rating with ', 2));
        funFacts.push(buildFact(playersWithHighestRatingLoss, playersWithHighestRatingLoss[0].stats.highestRatingLoss, ' has the highest loss of rating with ', 2));
        funFacts.push(buildFact(playersWithHighestWinStreak, playersWithHighestWinStreak[0].stats.biggestWinStreak, ' has won the most matches in a row with ', 0));
        funFacts.push(buildFact(playersWithHighestLoseStreak, playersWithHighestLoseStreak[0].stats.biggestLoseStreak, ' has lost the most matches in a row with ', 0));
        funFacts.push(buildFact(playersWithMostAchievements, playersWithMostAchievements[0].stats.achievements, ' has the most achievements with ', 0));

        console.log(funFacts);
        return funFacts;
    };

    var buildFact = function(players, stat, text, decimals) {
        var string = "";
        if (players.length === 1 && !angular.isUndefined(stat.date)) {
            string += moment(stat.date).format(DATE_FORMAT) + ' - ';
        }
        angular.forEach(players, function(player, index) {
            string += $filter('bold')(player.name);
            if ((index + 2) < players.length) {
                string += ', ';
            } else if ((index + 2) === players.length) {
                string += ' and ';
            }
        });
        string += text + $filter('bold')($filter('number')(stat.value, decimals));
        return string;
    };
});
