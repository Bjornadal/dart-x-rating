'use strict';

/**
 * @ngdoc function
 * @name dartXRatingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dartXRatingApp
 */
angular.module('dartXRatingApp').controller('MainCtrl', function ($scope, $filter, RatingService, PlayerFactory, StatisticsService) {
    var ref = new Firebase("");
    $scope.players = PlayerFactory();
    $scope.startDate = new Date(new Date().setDate(new Date().getDate()-7));
    $scope.endDate = new Date();

    ref.on('value', function(dataSnapshot) {
        StatisticsService.createLineChartRating($scope.startDate, $scope.endDate).then(function(data) {
            console.log(data);
            $scope.chartData = data;
        });
    });

    $scope.$watch('[startDate, endDate]', function(newValue, oldValue) {
        StatisticsService.createLineChartRating($scope.startDate, $scope.endDate).then(function(data) {
            $scope.chartData = data;
        });
    });
});

angular.module('dartXRatingApp').controller('HeaderCtrl', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});
