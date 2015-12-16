'use strict';

/**
 * Created by andreasb on 27.02.15.
 */

angular.module('dartXRatingApp').controller('AchievementsCtrl', function ($scope, AchievementFactory, PlayerFactory) {

    $scope.players = PlayerFactory();
    $scope.achievements = AchievementFactory();
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
        $scope.ddSelectedAchievement.date = new Date().getTime();

        $scope.ddSelectedPlayer.achievements = ($scope.ddSelectedPlayer.achievements) ? $scope.ddSelectedPlayer.achievements : [];
        $scope.ddSelectedPlayer.achievements.push($scope.ddSelectedAchievement);
        $scope.players.updatePlayer($scope.ddSelectedPlayer);

        $scope.ddSelectedPlayer = { name: 'Select player'};
        $scope.ddSelectedAchievement = { name: 'Select achievement'}
    };

    // Register new achievement
    $scope.registerAchievement = function() {
        AchievementFactory().registerAchievement($scope.achievement);
        $scope.achievement = {};
    };
});
