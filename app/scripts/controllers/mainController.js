'use strict';

/**
 * @ngdoc function
 * @name dartXRatingApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the dartXRatingApp
 */
angular.module('dartXRatingApp')
    .controller('MainCtrl', function ($scope, RatingService, PlayerFactory) {
        $scope.players = PlayerFactory();
    });

angular.module('dartXRatingApp')
    .controller('HeaderCtrl', function($scope, $location) {
        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    });
