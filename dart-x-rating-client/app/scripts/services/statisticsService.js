'use strict';

/**
 * Created by raymondk on 18.03.15.
 */

angular.module('dartXRatingApp').service('StatisticsService', function($q, $filter, PlayerFactory, MatchFactory, $sce) {
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
            player.stats.highestRating = 1500;
            player.stats.lowestRating = 1500;
            player.stats.highestRatingImprovement = 1;
            player.stats.lowestRatingImprovement = 1;
            angular.forEach(matches, function (match) {
                angular.forEach(match.players, function (matchPlayer) {
                    if (matchPlayer.name == player.name) {
                        //Highest rating
                        if (matchPlayer.rating >= player.stats.highestRating) {
                            player.stats.highestRating = matchPlayer.rating;
                        }
                        //Lowest rating
                        if (matchPlayer.rating < player.stats.lowestRating) {
                            player.stats.lowestRating = matchPlayer.rating;
                        }
                        //Highest ratingimprovement
                        if (matchPlayer.ratingAdjustment >= player.stats.highestRatingImprovement) {
                            player.stats.highestRatingImprovement = matchPlayer.ratingAdjustment;
                        }
                        //Lowest ratingimprovement
                        if (matchPlayer.ratingAdjustment < player.stats.lowestRatingImprovement) {
                            player.stats.lowestRatingImprovement = matchPlayer.ratingAdjustment;
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
        var funFacts = ['Dart X Rating Fun Awesome Facts'];
        var playerWithMostMatches = null, playerWithLeastMatches = null, playerWithMostWins = null, playerWithLeastWins = null, playerWithHighestRating = null, playerWithLowestRating = null;

        angular.forEach(players, function(player) {
            console.log(player);
            //Most matches
            if (playerWithMostMatches === null || playerWithMostMatches.stats.matches < player.stats.matches) playerWithMostMatches = player;
            //Least matches
            if (playerWithLeastMatches === null || playerWithLeastMatches.stats.matches > player.stats.matches) playerWithLeastMatches = player;
            //Most wins
            if (playerWithMostWins === null || playerWithMostWins.stats.wins < player.stats.wins) playerWithMostWins = player;
            //Least wins
            if (playerWithLeastWins === null || playerWithLeastWins.stats.wins > player.stats.wins) playerWithLeastWins = player;
            //Highest rating
            if (playerWithHighestRating === null || playerWithHighestRating.stats.highestRating < player.stats.highestRating) playerWithHighestRating = player;
            //Lowest rating
            if (playerWithLowestRating === null || playerWithLowestRating.stats.lowestRating > player.stats.lowestRating) playerWithLowestRating = player;
        });

        funFacts.push('There as been played a totalt of ' + $sce.trustAsHtml('<b>'+matches.length+'</b>') + ' matches');
        funFacts.push($sce.trustAsHtml('<b>'+playerWithMostMatches.name+'</b>') + ' has played the most matches with ' + $sce.trustAsHtml('<b>'+playerWithMostMatches.stats.matches+'</b>'));
        funFacts.push($sce.trustAsHtml('<b>'+playerWithLeastMatches.name+'</b>') + ' has played the least matches with ' + $sce.trustAsHtml('<b>'+playerWithLeastMatches.stats.matches+'</b>'));
        funFacts.push($sce.trustAsHtml('<b>'+playerWithMostWins.name+'</b>') + ' has won the most matches with a totalt of ' + $sce.trustAsHtml('<b>'+playerWithMostWins.stats.wins+'</b>'));
        funFacts.push($sce.trustAsHtml('<b>'+playerWithLeastWins.name+'</b>') + ' has won the least matches with a totalt of only ' + $sce.trustAsHtml('<b>'+playerWithLeastWins.stats.wins+'</b>'));
        funFacts.push($sce.trustAsHtml('<b>'+playerWithHighestRating.name+'</b>') + ' has the all-time highest rating of ' + $sce.trustAsHtml('<b>'+$filter('roundWhole')(playerWithHighestRating.stats.highestRating)+'</b>'));
        funFacts.push($sce.trustAsHtml('<b>'+playerWithLowestRating.name+'</b>') + ' has the all-time lowest rating of ' + $sce.trustAsHtml('<b>'+$filter('roundWhole')(playerWithLowestRating.stats.lowestRating)+'</b>'));

        console.log(funFacts);
        return funFacts;
    };
});
