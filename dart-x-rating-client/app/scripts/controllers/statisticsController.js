'use strict';

angular.module('dartXRatingApp').controller('StatisticsCtrl', function ($scope, StatisticsService, PlayerFactory, MatchFactory) {
    $scope.players = PlayerFactory();
    $scope.matches = MatchFactory();
    $scope.startDate = new Date(new Date().setDate(new Date().getDate()-7));
    $scope.endDate = new Date();

    StatisticsService.generateStatistics().then(function(players) {
        $scope.players = players;

        $scope.$watch('[startDate, endDate]', function(newValue, oldValue) {
            StatisticsService.createLineChartRating($scope.startDate, $scope.endDate).then(function(data) {
                $scope.chartData = data;
            });
        });

        $scope.players.$watch(function(event) {
            StatisticsService.updateStatistics().then(function(players) {
                $scope.players = players;
                StatisticsService.createLineChartRating($scope.startDate, $scope.endDate).then(function(data) {
                    $scope.chartData = data;
                });
            });
        });

        StatisticsService.createLineChartRating($scope.startDate, $scope.endDate).then(function(data) {
            $scope.chartData = data;
        });
    });
});
