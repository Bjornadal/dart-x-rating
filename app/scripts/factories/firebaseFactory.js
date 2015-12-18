'use strict';

angular.module('xgames').factory("PlayerFactory", function ($firebaseArray, $q, defaultConfig, $localstorage) {
    var settings = $localstorage.getObject('settings');

    var PlayerFactory = $firebaseArray.$extend({
        registerPlayer: function (player) {
            player.rating = 1500;

            var playerFound = false;
            if (this.$list.length > 0) {
                this.$list.some(function (p) {
                    if (p.name === player.name) {
                        playerFound = true;
                    }
                });
            }
            if (!playerFound) {
                this.$list.$add({
                    name: player.name,
                    rating: player.rating
                });
            }
        },

        updatePlayer: function (player) {
            this.$save(player);
        },

        getPlayersAsync: function () {
            var deferred = $q.defer();

            this.$loaded(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    });

    return function () {
        var ref = new Firebase(defaultConfig.firebaseBackend + '/leagues/' + settings.league +  '/games/' + settings.game + '/seasons/' + settings.season + '/players');
        return new PlayerFactory(ref);
    }
});

angular.module('xgames').factory("MatchFactory", function ($firebaseArray, $q, defaultConfig, $localstorage) {
    var settings = $localstorage.getObject('settings');

    var MatchFactory = $firebaseArray.$extend({
        registerMatch: function (match) {
            match.date = new Date().getTime();
            this.$list.$add(match);
        },

        getMatchesAsync: function () {
            var deferred = $q.defer();
            this.$loaded(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    });

    return function () {
        var ref = new Firebase(defaultConfig.firebaseBackend + '/leagues/' + settings.league +  '/games/' + settings.game + '/seasons/' + settings.season + '/matches');
        return new MatchFactory(ref);
    }
});

angular.module('xgames').factory("AchievementFactory", function ($firebaseArray, $q, defaultConfig, $localstorage) {
    var settings = $localstorage.getObject('settings');

    var AchievementFactory = $firebaseArray.$extend({
        registerAchievement: function (achievement) {
            this.$list.$add(achievement);
        },

        getAchievementsAsync: function () {
            var deferred = $q.defer();

            this.$loaded(function (data) {
                deferred.resolve(data);
            });

            return deferred.promise;
        }
    });

    return function () {
        var ref = new Firebase(defaultConfig.firebaseBackend + '/achievements');
        return new AchievementFactory(ref);
    }
});
