'use strict';

/**
 * Created by raymondk on 18.03.15.
 */

angular.module('dartXRatingApp').service('StatisticsService', function($q, $filter, PlayerFactory, MatchFactory) {
    var playerFactory = new PlayerFactory;
    var matchFactory = new MatchFactory;
    var players, matches;

    var getPlayerByMail = function(name) {
        var foundPlayer = null;
        angular.forEach(players, function(player) {
            if (foundPlayer == null && player.name == name) {
                foundPlayer = player;
            }
        });
        return foundPlayer;
    };

    var higestRatingimprovement = function() {
        angular.forEach(players, function (player) {
            player.stats.highestRatingImprovement = 0;
            angular.forEach(matches, function (match) {
                angular.forEach(match.players, function (p) {
                    if (p.name == player.name) {
                        if (p.ratingAdjustment >= player.stats.highestRatingImprovement) {
                            player.stats.highestRatingImprovement = p.ratingAdjustment;
                        }
                    }
                });
            });
        });
    };

    var generateStreaks = function() {
        var deferred = $q.defer();
        angular.forEach(players, function (player) {
            player.stats = {};
            player.stats.biggestWinStreak = 0;
            player.stats.biggestLoseStreak = 0;
            var winStreak = 0, loseStreak = 0, currentWinStreak = 0, currentLoseStreak = 0;
            angular.forEach(matches, function (match) {
                angular.forEach(match.players, function (p) {
                    if (p.name == player.name) {
                        if (p.winner) {
                            winStreak++;
                            currentWinStreak++;
                            if (winStreak >= player.stats.biggestWinStreak) {
                                player.stats.biggestWinStreak = winStreak;
                                player.stats.dateBiggestWinStreak = match.date;
                            }
                            loseStreak = 0;
                            currentLoseStreak = 0;
                        } else {
                            loseStreak++;
                            currentLoseStreak++;
                            if (loseStreak >= player.stats.biggestLoseStreak) {
                                player.stats.biggestLoseStreak = loseStreak;
                                player.stats.dateBiggestLoseStreak = match.date;
                            }
                            winStreak = 0;
                            currentWinStreak = 0;
                        }
                    }
                })
            });
            player.stats.currentWinStreak = currentWinStreak;
            player.stats.currentLoseStreak = currentLoseStreak;
            deferred.resolve();
        });
        return deferred.promise;
    };

    this.generateStatistics = function() {
        var deferred = $q.defer();
        playerFactory.getPlayersAsync()
            .then(function(p) {
                players = p;
                matchFactory.getMatchesAsync()
                    .then(function(m) {
                        matches = m;
                        generateStreaks()
                            .then(higestRatingimprovement());
                    })
            })
            .then(function() {
                deferred.resolve(players);
            })
            .catch(function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };


    this.createLineChartRating = function(startDate, endDate) {
        var deferred = $q.defer();

        var chartData = {};

        chartData.options = {
            datasetFill : false,
            responsive: true
        };

        playerFactory.getPlayersAsync()
            .then(function(players) {
                chartData.series = [];
                chartData.rating = [];
                angular.forEach(players, function(player, index) {
                    chartData.series[index] = player.name;
                    chartData.rating[index] = player.rating;
                });

                matchFactory.getMatchesAsync()
                    .then(function(matches) {
                        var fromDate = moment(startDate).format('YYYY-MM-DD');
                        chartData.labels = [];
                        chartData.labels.push(fromDate);
                        chartData.data = [];

                        angular.forEach(matches, function(match, index) {
                            if ($filter('date')(match.date, 'yyyy-MM-dd') >= $filter('date')(startDate, 'yyyy-MM-dd') && $filter('date')(match.date, 'yyyy-MM-dd') <= $filter('date')(endDate, 'yyyy-MM-dd')) {
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
                    })
                    .then(function() {
                        deferred.resolve(chartData);
                    })
                    .catch(function(error) {
                        deferred.reject(error);
                    });
            })
            .catch(function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };
});
