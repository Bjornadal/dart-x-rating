/**
 * Created by Andreas on 17.04.2015.
 */
angular.module('dartXRatingApp').factory("LeagueFactory", function($resource, defaultConfig) {
    return $resource(defaultConfig.dartApi + "/leagues/:leagueId", null,
        {

        })
});

angular.module('dartXRatingApp').factory("PlayerFactory", function($resource, defaultConfig) {
    return $resource(defaultConfig.dartApi + "/leagues/:leagueId/players", null,
        {

        })
});

angular.module('dartXRatingApp').factory("GameFactory", function($resource, defaultConfig) {
    return $resource(defaultConfig.dartApi + "/leagues/:leagueId/games", null,
        {

        })
});
