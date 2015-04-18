'use strict';

/**
 * @ngdoc function
 * @name dartXRatingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dartXRatingApp
 */
angular.module('dartXRatingApp').controller('RatingCtrl', function ($scope, $filter, StatisticsService, $timeout, $location, $interval, DartService) {
    $scope.selectedLeague = DartService.getSelectedLeague();
    $scope.players = DartService.getPlayers();
    $scope.startDate = new Date(new Date().setDate(new Date().getDate()-7));
    $scope.endDate = new Date();


    // TODO: Fix and move to a service

    //var funFacts = ["Dart X Rating Awesome Fun Facts"];
    //var funFactIndex = 0;
    //updateFunFact(funFactIndex);
    //$interval(function() {
    //    funFactIndex++;
    //    if (funFactIndex >= funFacts.length) {
    //        funFactIndex = 0;
    //    }
    //    updateFunFact(funFactIndex);
    //}, 10000);
    //
    //StatisticsService.generateStatistics().then(function(players) {
    //    $scope.players = players;
    //    funFacts = StatisticsService.generateFunFacts();
    //
    //    $scope.players.$watch(function() {
    //        StatisticsService.createLineChartRating($scope.startDate, $scope.endDate).then(function(data) {
    //            $scope.chartData = data;
    //            StatisticsService.generateStatistics().then(function() {
    //                funFacts = StatisticsService.generateFunFacts();
    //            });
    //        });
    //    });
    //
    //    $scope.$watch('[startDate, endDate]', function(newValue, oldValue) {
    //        StatisticsService.createLineChartRating($scope.startDate, $scope.endDate).then(function(data) {
    //            $scope.chartData = data;
    //        });
    //    });
    //});
    //
    //
    //function updateFunFact(index) {
    //    var delay = 2000;
    //    if (index === 0) {
    //        delay = 0;
    //    } else {
    //        $scope.showFunFact = false;
    //    }
    //    $timeout(function() {
    //        $scope.funFact = funFacts[index];
    //        $scope.showFunFact = true;
    //    }, delay);
    //}
});
