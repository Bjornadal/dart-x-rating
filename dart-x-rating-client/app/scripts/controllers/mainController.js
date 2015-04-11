'use strict';

/**
 * @ngdoc function
 * @name dartXRatingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dartXRatingApp
 */
angular.module('dartXRatingApp').controller('MainCtrl', function ($scope, $filter, RatingService, PlayerFactory, StatisticsService, $timeout, $interval) {
    $scope.players = PlayerFactory();
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

    function updateFunFact(firstRun) {
        var delay = 2000;
        var index = 0;
        if (firstRun) {
            delay = 0;
        } else {
            while (index < 1) index = Math.floor(Math.random() * funFacts.length);
            $scope.showFunFact = false;
        }
        $timeout(function() {
            $scope.funFact = funFacts[index];
            $scope.showFunFact = true;
        }, delay);
    }
});

angular.module('dartXRatingApp').controller('HeaderCtrl', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});
