'use strict';

angular.module('xgames').service('SettingsService', function ($q, $filter, LeagueFactory) {
    var leagueFactory = new LeagueFactory();
    this.getLeagues = function() {
        var deferred = $q.defer();
        leagueFactory.getLeaguesAsync()
            .then(function(data) {
                deferred.resolve(data);
            })
            .catch(function(error) {
                deferred.reject(error);
            });
        return deferred.promise;
    }
});