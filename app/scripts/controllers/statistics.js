'use strict';

angular.module('xgames').controller('StatisticsCtrl', function ($scope, StatisticsService, PlayerFactory, MatchFactory, AchievementFactory) {
    $scope.players = new PlayerFactory();
    $scope.matches = new MatchFactory();
    $scope.achievements = new AchievementFactory();
    $scope.startDate = new Date(new Date().setDate(new Date().getDate() - 7));
    $scope.endDate = new Date();

    StatisticsService.generateStatistics().then(function (players) {
        $scope.players = players;

        $scope.players.$watch(function () {
            StatisticsService.updateStatistics().then(function (players) {
                $scope.players = players;
            });
        });
    });
});
