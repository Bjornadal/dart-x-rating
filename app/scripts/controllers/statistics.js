'use strict';

angular.module('xgames').controller('StatisticsCtrl', function ($scope, StatisticsService, PlayerFactory, MatchFactory, AchievementFactory) {
    $scope.players = PlayerFactory();
    $scope.matches = MatchFactory();
    $scope.achievements = AchievementFactory();
    $scope.startDate = new Date(new Date().setDate(new Date().getDate() - 7));
    $scope.endDate = new Date();

    StatisticsService.generateStatistics().then(function (players) {
        $scope.players = players;

        $scope.players.$watch(function (event) {
            StatisticsService.updateStatistics().then(function (players) {
                $scope.players = players;
            });
        });
    });
});
