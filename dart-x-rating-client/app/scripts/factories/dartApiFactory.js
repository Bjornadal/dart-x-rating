/**
 * Created by Andreas on 17.04.2015.
 */
angular.module('dartXRatingApp').factory("LeagueFactory", function($resource, defaultConfig) {
    return $resource(defaultConfig.dartApi + "/leagues/:leagueId", null,
        {

        })
});

angular.module('dartXRatingApp').factory("PlayerFactory", function($resource, defaultConfig, $cookies) {
    return $resource(defaultConfig.dartApi + "/leagues/:leagueId/players/:playerId", null,
        {
            addAchievement: {
                method:"POST",
                url: defaultConfig.dartApi + "/leagues/:leagueId/players/:playerId/achievements"
            },
            save: {
                method: "POST",
                headers: { "authToken": $cookies.authToken }
            }
        })
});

angular.module('dartXRatingApp').factory("GameFactory", function($resource, defaultConfig, $cookies) {
    return $resource(defaultConfig.dartApi + "/leagues/:leagueId/games", null,
        {
            save: {
                method: "POST",
                headers: { "authToken": $cookies.authToken }
            }
        })
});

angular.module('dartXRatingApp').factory("AchievementFactory", function($resource, defaultConfig) {
    return $resource(defaultConfig.dartApi + "/achievements", null,
        {

        })
});

