'use strict';

/**
 * Created by andreasb on 27.02.15.
 */

angular.module('dartXRatingApp').controller('AchievementCtrl', function ($scope, DartService) {

    $scope.players = DartService.getPlayers();
    $scope.achievements = DartService.getAchievements();
    $scope.achievement = {};

    // Register achievement on player
    $scope.ddSelectedAchievement = { name: 'Select achievement'};
    $scope.setAchievement = function(achievement) {
        $scope.ddSelectedAchievement = achievement;
    };
    $scope.ddSelectedPlayer = { name: 'Select player'};
    $scope.setPlayer = function(player) {
        $scope.ddSelectedPlayer = player;
    };

    $scope.registerAchievementOnPlayer = function() {
        DartService.addAchievementOnPlayer($scope.ddSelectedAchievement, $scope.ddSelectedPlayer)
        $scope.ddSelectedPlayer = { name: 'Select player'};
        $scope.ddSelectedAchievement = { name: 'Select achievement'}
    };

    // Register new achievement
    $scope.registerAchievement = function() {
        DartService.addAchievement($scope.achievement);
        $scope.achievements.push($scope.achievement);
        $scope.achievement = {};
    };
});
