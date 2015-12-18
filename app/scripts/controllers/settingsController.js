'use strict';

angular.module('xgames').controller('SettingsCtrl', function ($scope, $localstorage, $location, $window) {
    $scope.settings = $localstorage.getObject('settings')
    $scope.setLeague = function() {
        $localstorage.setObject("settings", $scope.settings);

        $location.path('/');
        $window.location.reload();
    };
});
