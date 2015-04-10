'use strict';

angular.module('dartXRatingApp').controller('StatisticsCtrl', function ($scope, StatisticsService, PlayerFactory, MatchFactory, AchievementFactory, $interval, $timeout) {
    $scope.players = PlayerFactory();
    $scope.matches = MatchFactory();
    $scope.achievements = AchievementFactory();
    $scope.startDate = new Date(new Date().setDate(new Date().getDate()-7));
    $scope.endDate = new Date();
    var funfact = ["Her kommer det masse random funfacts etter hvert...", "... noen må bare laga all den rare statistikken først..."];

    updateFunFact(true);
    $interval(function() {
        updateFunFact(false);
    }, 10000);

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

    function updateFunFact(firstRun) {
        var delay = 2000;
        var index = Math.floor(Math.random() * funfact.length);
        if (firstRun) {
            delay = 0;
            index = 0;
        } else {
            $scope.showFunFact = false;
        }
        $timeout(function() {
            $scope.funFact = funfact[index];
            $scope.showFunFact = true;
        }, delay);
    }
});
