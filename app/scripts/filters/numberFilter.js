/**
 * Created by andreasb on 03.03.15.
 */
var app = angular.module('dartXRatingApp');

app.filter('roundWhole', function () {
    return function (input) {
        return Math.round(input);
    };
});

app.filter('percentage', ['$filter', function ($filter) {
    return function (value, base, decimals) {
        return $filter('number')((value * 100) / base, decimals) + '%';
    };
}]);
