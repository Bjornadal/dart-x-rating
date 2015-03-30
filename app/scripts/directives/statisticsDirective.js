'use strict';

angular.module('dartXRatingApp').directive('chartRatingLine', function() {
    return {
        restrict: 'E',
        templateUrl: 'views/statistics/lineChartRating.html'
    };
});
