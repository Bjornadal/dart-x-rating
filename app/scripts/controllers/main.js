'use strict';

angular.module('xgames').controller('MainCtrl', function ($scope, $filter, RatingService, PlayerFactory, StatisticsService, $timeout, $interval, $localstorage) {
    $scope.settings = $localstorage.getObject('settings');
    $scope.players = PlayerFactory();
    $scope.startDate = new Date(new Date().setDate(new Date().getDate() - 7));
    $scope.endDate = new Date();

    var funFacts = ["Dart X Rating Awesome Fun Facts"];
    var funFactIndex = 0;
    updateFunFact(funFactIndex);
    $interval(function () {
        funFactIndex++;
        if (funFactIndex >= funFacts.length) {
            funFactIndex = 0;
        }
        updateFunFact(funFactIndex);
    }, 10000);

    StatisticsService.generateStatistics().then(function (players) {
        $scope.players = players;
        funFacts = StatisticsService.generateFunFacts();
    });

    function updateFunFact(index) {
        var delay = 2000;
        if (index === 0) {
            delay = 0;
        } else {
            $scope.showFunFact = false;
        }
        $timeout(function () {
            $scope.funFact = funFacts[index];
            $scope.showFunFact = true;
        }, delay);
    }
});
