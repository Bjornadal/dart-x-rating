'use strict';

angular.module('xgames').controller('SettingsCtrl', function ($scope, $localstorage, $location, $window) {
    $scope.settings = $localstorage.getObject('settings')
    $scope.gameTypes = ["Dart", "Basket", "Bordtennis"];

    $scope.setGameType = function(gameType) {
      $scope.settings.game = gameType;
    };

    $scope.setLeague = function() {
        $localstorage.setObject("settings", $scope.settings);

        $location.path('/');
        $window.location.reload();
    };
});
