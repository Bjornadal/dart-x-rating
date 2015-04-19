/**
 * Created by Andreas on 17.04.2015.
 */

angular.module('dartXRatingApp').service('DartService', function (LeagueFactory, PlayerFactory, GameFactory, AchievementFactory, $cookies, $q) {
    this.selectedLeague;
    this.getLeagues = function() {
        return LeagueFactory.query();
    };

    this.setLeague = function(league) {
        this.selectedLeague = league;
        $cookies.selectedLeague = angular.toJson(league);
    };

    this.getSelectedLeague = function() {
        if (this.selectedLeague == null) {
            var cookieLeague = angular.fromJson($cookies.selectedLeague);
            if (cookieLeague) {
                this.selectedLeague = cookieLeague;
                return cookieLeague;
            }
        }

        return this.selectedLeague;
    };


    this.addLeague = function(league) {
        return LeagueFactory.save(league).$promise;
    };

    this.getPlayers = function() {
        return PlayerFactory.query({leagueId: this.selectedLeague.leagueId});
    };

    this.addPlayer = function(player) {
        return PlayerFactory.save({leagueId: this.selectedLeague.leagueId}, player).$promise;
    };

    this.addAchievementOnPlayer = function(achievement, player) {
        return PlayerFactory.addAchievement({leagueId: this.selectedLeague.leagueId, playerId: player.playerId}, achievement).$promise;
    };

    this.getGames = function() {
        return GameFactory.query({leagueId: this.selectedLeague.leagueId});
    };

    this.addGame = function(game) {
        return GameFactory.save({leagueId: this.selectedLeague.leagueId}, game).$promise;
    };

    this.getAchievements = function() {
        return AchievementFactory.query();
    };

    this.addAchievement = function(achievement) {
        return AchievementFactory.save(achievement).$promise;
    };
});
