'use strict';

angular.module('dartXRatingApp').controller('StatisticsCtrl', function ($scope, StatisticsService) {
    var ref = new Firebase("");
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

    StatisticsService.createLineChartRating($scope.startDate, $scope.endDate).then(function(data) {
        $scope.chartData = data;
    });
});
