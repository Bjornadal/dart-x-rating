'use strict';

angular.module('dartXRatingApp').controller('StatisticsCtrl', function ($scope, StatisticsService, PlayerFactory, MatchFactory, AchievementFactory, $interval, $timeout) {
    $scope.players = PlayerFactory();
    $scope.matches = MatchFactory();
    $scope.achievements = AchievementFactory();
    $scope.startDate = new Date(new Date().setDate(new Date().getDate()-7));
    $scope.endDate = new Date();

    var funFacts = ["Dart X Rating Awesome Fun Facts"];
    updateFunFact(true);
    $interval(function() {
        updateFunFact(false);
    }, 10000);

    StatisticsService.generateStatistics().then(function(players) {
        $scope.players = players;

        funFacts = StatisticsService.getFunFacts();

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
        var index = 0;
        if (firstRun) {
            delay = 0;
        } else {
            while (index < 1) {
                index = Math.floor(Math.random() * funFacts.length);
            }
            $scope.showFunFact = false;
        }
        $timeout(function() {
            $scope.funFact = funFacts[index];
            $scope.showFunFact = true;
        }, delay);
    }
});
