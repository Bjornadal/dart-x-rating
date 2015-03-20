'use strict';

/**
 * Created by Andreas on 28.02.2015.
 */
angular.module('dartXRatingApp').factory("PlayerFactory", function($firebaseArray, $q, defaultConfig) {
    var PlayerFactory = $firebaseArray.$extend({
        registerPlayer: function(player) {
            player.rating = 1500;

            var playerFound = false;
            if (this.$list.length > 0) {
                this.$list.some(function(p) {
                    if (p.email === player.email) {
                        playerFound = true;
                    }
                });
            }
            if (!playerFound) {
                this.$list.$add( {
                    name: player.name,
                    email: player.email,
                    rating: player.rating
                });
            }
        },

        updatePlayer: function(player) {
            this.$save(player);
        },

        getPlayersAsync: function() {
            var deferred = $q.defer();

            this.$loaded(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    });

    return function() {
        var ref = new Firebase(defaultConfig.firebaseBackend + '/players' + (defaultConfig.production ? '' : 'Dev'));
        return new PlayerFactory(ref);
    }
});

angular.module('dartXRatingApp').factory("MatchFactory", function($firebaseArray, $q, defaultConfig) {
    var MatchFactory = $firebaseArray.$extend({
        registerMatch: function(match) {
            match.date = new Date().getTime();
            this.$list.$add(match);
        },

        getMatchesAsync: function() {
            var deferred = $q.defer();
            this.$loaded(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    });

    return function() {
        var ref = new Firebase(defaultConfig.firebaseBackend + '/matches' + (defaultConfig.production ? '' : 'Dev'));
        return new MatchFactory(ref);
    }
});

angular.module('dartXRatingApp').factory("AchievementFactory", function($firebaseArray, $q, defaultConfig) {
    var AchievementFactory = $firebaseArray.$extend({
        registerAchievement: function(achievement) {
            this.$list.$add(achievement);
        },

        getAchievementsAsync: function() {
            var deferred = $q.defer();

            this.$loaded(function(data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    });

    return function() {
        var ref = new Firebase(defaultConfig.firebaseBackend + '/achievements' + (defaultConfig.production ? '' : 'Dev'));
        return new AchievementFactory(ref);
    }
});
