'use strict';

/**
 * Created by Andreas on 28.02.2015.
 */
angular.module('dartXRatingApp').factory("PlayerFactory", function($FirebaseArray, $firebase, $rootScope, $q, defaultConfig) {
    var PlayerFactory = $FirebaseArray.$extendFactory({
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
        // create a reference to the user's profile
        var ref = new Firebase(defaultConfig.firebaseBackend + '/players' + (defaultConfig.production ? '' : 'Dev'));
        // return it as a synchronized object
        var matchArray = $firebase(ref, {arrayFactory: PlayerFactory}).$asArray();

        return matchArray;
    }
});

angular.module('dartXRatingApp').factory("MatchFactory", function($FirebaseArray, $firebase, $rootScope, $q, defaultConfig) {
    var MatchFactory = $FirebaseArray.$extendFactory({
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
        // create a reference to the user's profile
        var ref = new Firebase(defaultConfig.firebaseBackend + '/matches' + (defaultConfig.production ? '' : 'Dev'));
        // return it as a synchronized object
        var matchArray = $firebase(ref, {arrayFactory: MatchFactory}).$asArray();

        return matchArray;
    }
});


angular.module('dartXRatingApp').factory("AchievementFactory", function($FirebaseArray, $firebase, $rootScope, $q, defaultConfig) {
    var AchievementFactory = $FirebaseArray.$extendFactory({
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
        // create a reference to the user's profile
        var ref = new Firebase(defaultConfig.firebaseBackend + '/achievements' + (defaultConfig.production ? '' : 'Dev'));
        // return it as a synchronized object
        var achievementArray = $firebase(ref, {arrayFactory: AchievementFactory}).$asArray();

        return achievementArray;
    }
});
