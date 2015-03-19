'use strict';

/**
 * Created by raymondk on 18.03.15.
 */

angular.module('dartXRatingApp').service('StatisticsService', function($q, $filter, PlayerFactory, MatchFactory) {
    this.createLineChartRating = function(startDate, endDate) {
        var deferred = $q.defer();
        var playerFactory = new PlayerFactory;
        var matchFactory = new MatchFactory;
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
