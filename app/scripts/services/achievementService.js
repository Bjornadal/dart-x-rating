'use strict';

/**
 * Created by andreasb on 27.02.15.
 */

angular.module('dartXRatingApp').service('AchievementService', function () {

    var achievements = [
        {name: '180!', description: 'Get 180 with 3 darts'},
        {name: '3x bullseye', description: 'Get 3 bullseyes with 3 darts'},
        {name: 'Double bulleye out', description: 'Win with double bullseye'}
    ];

    this.registerAchievement = function(achievement) {
        achievements.push(achievement);
    }

    this.getAchievements = function() {
        return achievements;
    }
});
