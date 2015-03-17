'use strict';

angular.module('dartXRatingApp').controller('StatisticsCtrl', function ($scope, PlayerFactory, MatchFactory) {
    $scope.options = {
        datasetFill : false,
        responsive: true
    };

    new PlayerFactory().getPlayersAsync().then(function(players) {
        $scope.series = [];
        $scope.rating = [];
        angular.forEach(players, function(player, index) {
            $scope.series[index] = player.name;
            $scope.rating[index] = player.rating;
        });

        new MatchFactory().getMatchesAsync().then(function(matches) {
            var fromDate = moment('2015-03-01').format('YYYY-MM-DD');
            $scope.labels = [];
            $scope.labels.push(fromDate);
            $scope.data = [];

            angular.forEach(matches, function(match) {
                $scope.labels.push(moment(match.date).format('YYYY-MM-DD HH:mm'));
                angular.forEach($scope.series, function(serie, pos) {
                    var playerRatings = [];

                    if (angular.isUndefined($scope.data[pos])) {
                        $scope.data[pos] = [];
                        playerRatings.push(1500);
                        $scope.data[pos] = playerRatings;
                    } else {
                        playerRatings = $scope.data[pos];
                    }

                    var hasPlayed = false;
                    var playerRating = playerRatings[playerRatings.length - 1];
                    angular.forEach(match.players, function(player) {
                        if (serie === player.name) {
                            hasPlayed = true;
                            playerRating = player.rating;
                        }
                    });
                    playerRatings.push(playerRating);
                });
            });
        });
    });
});
