'use strict';

var app = angular.module('xgames');

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
