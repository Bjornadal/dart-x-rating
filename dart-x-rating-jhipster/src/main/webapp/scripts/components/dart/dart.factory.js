/**
 * Created by Andreas on 17.04.2015.
 */
angular.module('dartxratingApp').factory("LeagueFactory", function($resource) {
    return $resource("/api/leagues/:leagueId", null,
        {

        })
});

angular.module('dartxratingApp').factory("PlayerFactory", function($resource) {
    return {
        players: function(token) {
            return $resource("/api/leagues/:leagueId/players/:playerId", null,
                {
                    addAchievement: {
                        method:"POST",
                        url: "/api/leagues/:leagueId/players/:playerId/achievements"
                    },
                    save: {
                        method: "POST",
                        headers: { "authToken": token }
                    }
                })
        }
    }
});

angular.module('dartxratingApp').factory("GameFactory", function($resource) {
    return {
        games: function(token) {
            return $resource("/api/leagues/:leagueId/games", null,
                {
                    save: {
                        method: "POST",
                        headers: { "authToken": token }
                    }
                })
        }
    }

});

angular.module('dartxratingApp').factory("AchievementFactory", function($resource) {
    return $resource("/api/leagues/:leagueId/achievements", null,
        {

        })
});

