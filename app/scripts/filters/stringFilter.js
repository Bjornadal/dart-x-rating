'use strict';

angular.module('dartXRatingApp')
    .filter('split', function () {
        return function (input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar)[splitIndex];
        }
    })
    .filter('bold', function ($sce) {
        return function (value) {
            return $sce.trustAsHtml('<b>' + value + '</b>');
        }
    });
