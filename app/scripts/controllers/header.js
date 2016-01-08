'use strict';

/**
 * @ngdoc function
 * @name xgames.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the xgames
 */
angular.module('xgames').controller('HeaderCtrl', function ($scope, $location, $localstorage) {
  $scope.settings = $localstorage.getObject('settings');
  $scope.isActive = function (viewLocation) {
    return viewLocation === $location.path();
  };
});
