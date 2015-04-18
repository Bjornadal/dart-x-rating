/**
 * Created by Andreas on 17.04.2015.
 */

angular.module('dartXRatingApp').service('DartService', function (LeagueFactory, PlayerFactory, GameFactory, $q) {
    this.selectedLeague;
    this.getLeagues = function() {
        return LeagueFactory.query();
    };

    this.setLeague = function(league) {
      this.selectedLeague = league;
    };

    this.getSelectedLeague = function() {
        return this.selectedLeague;
    };

    this.getPlayers = function() {
        return PlayerFactory.query({leagueId: this.selectedLeague.leagueId});
    };

    this.addPlayer = function(player) {
        PlayerFactory.save({leagueId: this.selectedLeague.leagueId}, player);
    };

    this.getGames = function() {
        return GameFactory.query({leagueId: this.selectedLeague.leagueId});
    };

    this.addGame = function(game) {
        var deferred = $q.defer();

        GameFactory.save({leagueId: this.selectedLeague.leagueId}, game, function(response) {
            deferred.resolve(response);
        });

        return deferred.promise;
    };
});
