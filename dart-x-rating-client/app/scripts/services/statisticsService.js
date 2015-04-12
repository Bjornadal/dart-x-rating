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
            .then(wins)
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
            .then(wins)
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
            player.stats.lowestRatingImprovement = {};
            player.stats.lowestRatingImprovement.value = 1;
            player.stats.lowestRatingImprovement.date = moment('01.03.2015', DATE_FORMAT);
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
                        //Highest ratingimprovement
                        if (matchPlayer.ratingAdjustment >= player.stats.highestRatingImprovement.value) {
                            player.stats.highestRatingImprovement.value = matchPlayer.ratingAdjustment;
                            player.stats.highestRatingImprovement.date = match.date;
                        }
                        //Lowest ratingimprovement
                        if (matchPlayer.ratingAdjustment < player.stats.lowestRatingImprovement.value) {
                            player.stats.lowestRatingImprovement.value = matchPlayer.ratingAdjustment;
                            player.stats.lowestRatingImprovement.date = match.date;
                        }
                    }
                });
            });
        });
        deferred.resolve();
        return deferred.promise;
    };

    var wins = function() {
        var deferred = $q.defer();
        angular.forEach(players, function (player) {
            if (angular.isUndefined(player.stats)) {
                player.stats = {};
            }
            player.stats.matches = player.matches;
            player.stats.wins = player.wins;
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

    this.getFunFacts = function() {
        var funFacts = ['Dart X Rating Awesome Fun Facts'];
        var playerWithMostMatches = null, playerWithFewestMatches = null, playerWithMostWins = null, playerWithFewestWins = null, playerWithHighestRating = null, playerWithLowestRating = null;
        var playerWithHighestRatingImprovement = null, playerWithLowestRatingImprovement = null;
        var playersWithHighestWinStreak = [], playersWithHighestLoseStreak = [];

        angular.forEach(players, function(player) {
            //Most matches
            if (playerWithMostMatches === null || playerWithMostMatches.stats.matches < player.stats.matches) playerWithMostMatches = player;
            //Least matches
            if (playerWithFewestMatches === null || playerWithFewestMatches.stats.matches > player.stats.matches) playerWithFewestMatches = player;
            //Most wins
            if (playerWithMostWins === null || playerWithMostWins.stats.wins < player.stats.wins) playerWithMostWins = player;
            //Least wins
            if (playerWithFewestWins === null || playerWithFewestWins.stats.wins > player.stats.wins) playerWithFewestWins = player;
            //Highest rating
            if (playerWithHighestRating === null || playerWithHighestRating.stats.highestRating.value < player.stats.highestRating.value) playerWithHighestRating = player;
            //Lowest rating
            if (playerWithLowestRating === null || playerWithLowestRating.stats.lowestRating.value > player.stats.lowestRating.value) playerWithLowestRating = player;
            //Highest rating improvement
            if (playerWithHighestRatingImprovement === null || playerWithHighestRatingImprovement.stats.highestRatingImprovement.value < player.stats.highestRatingImprovement.value) playerWithHighestRatingImprovement = player;
            //Lowest rating improvement
            if (playerWithLowestRatingImprovement === null || playerWithLowestRatingImprovement.stats.lowestRatingImprovement.value < player.stats.lowestRatingImprovement.value) playerWithLowestRatingImprovement = player;
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
        });

        funFacts.push('There as been played a totalt of ' + $filter('bold')(matches.length) + ' matches');
        funFacts.push($filter('bold')(playerWithMostMatches.name) + ' has played the most matches with ' + $filter('bold')(playerWithMostMatches.stats.matches));
        funFacts.push($filter('bold')(playerWithFewestMatches.name) + ' has played the fewest matches with ' + $filter('bold')(playerWithFewestMatches.stats.matches));
        funFacts.push($filter('bold')(playerWithMostWins.name) + ' has won the most matches with a totalt of ' + $filter('bold')(playerWithMostWins.stats.wins));
        funFacts.push($filter('bold')(playerWithFewestWins.name) + ' has won the fewest matches with a totalt of only ' + $filter('bold')(playerWithFewestWins.stats.wins));
        funFacts.push($filter('bold')(playerWithHighestRating.name) + ' has the all-time highest rating of ' + $filter('bold')($filter('roundWhole')(playerWithHighestRating.stats.highestRating.value)) + ' - ' + moment(playerWithHighestRating.stats.highestRating.date).format(DATE_FORMAT));
        funFacts.push($filter('bold')(playerWithLowestRating.name) + ' has the all-time lowest rating of ' + $filter('bold')($filter('roundWhole')(playerWithLowestRating.stats.lowestRating.value)) + ' - ' + moment(playerWithHighestRating.stats.lowestRating.date).format(DATE_FORMAT));
        funFacts.push($filter('bold')(playerWithHighestRatingImprovement.name) + ' gained the highest improvement in rating with ' + $filter('bold')($filter('number')(playerWithHighestRatingImprovement.stats.highestRatingImprovement.value, 2)) + ' - ' + moment(playerWithHighestRating.stats.highestRatingImprovement.date).format(DATE_FORMAT));
        funFacts.push($filter('bold')(playerWithLowestRatingImprovement.name) + ' gained the lowest improvement in rating with ' + $filter('bold')($filter('number')(playerWithLowestRatingImprovement.stats.lowestRatingImprovement.value, 2)) + ' - ' + moment(playerWithHighestRating.stats.lowestRatingImprovement.date).format(DATE_FORMAT));
        funFacts.push(buildFact(playersWithHighestWinStreak, playersWithHighestWinStreak[0].stats.biggestWinStreak, ' has the most wins in a row with '));
        funFacts.push(buildFact(playersWithHighestLoseStreak, playersWithHighestLoseStreak[0].stats.biggestLoseStreak, ' has the most losses in a row with '));

        return funFacts;
    };

    var buildFact = function(players, stat, text) {
        var string = "";
        if (players.length === 1) {
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
        string += text + $filter('bold')(stat.value);
        return string;
    };
});
