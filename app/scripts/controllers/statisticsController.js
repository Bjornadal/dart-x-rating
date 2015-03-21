'use strict';

angular.module('dartXRatingApp').controller('StatisticsCtrl', function ($scope, StatisticsService, PlayerFactory) {
    $scope.players = PlayerFactory();
    $scope.startDate = new Date(new Date().setDate(new Date().getDate()-7));
    $scope.endDate = new Date();

    StatisticsService.generateStatistics().then(function(players) {
        $scope.players = players;
    });

    $scope.players.$watch(function() {
        StatisticsService.createLineChartRating($scope.startDate, $scope.endDate).then(function(data) {
            $scope.chartData = data;
        });
    });

    $scope.$watch('[startDate, endDate]', function(newValue, oldValue) {
        StatisticsService.createLineChartRating($scope.startDate, $scope.endDate).then(function(data) {
            $scope.chartData = data;
        });
    });

    StatisticsService.createLineChartRating($scope.startDate, $scope.endDate).then(function(data) {
        $scope.chartData = data;
    });
});
