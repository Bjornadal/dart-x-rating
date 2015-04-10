/**
 * Created by andreasb on 20.03.15.
 */

angular.module('dartXRatingApp').factory("PlayerResource", function(defaultConfig, $resource) {
    return $resource(defaultConfig.deploydBackend + '/players/', {}, {
        query: {method:'GET', params:{}, isArray:true}
    });
});

angular.module('dartXRatingApp').service("PlayerService", function(defaultConfig, PlayerResource, $http) {

        var players = [];

        this.registerPlayer = function(player) {
            $http.post(defaultConfig.deploydBackend + '/players', {
                name: player.name,
                email: player.email,
                rating: 1500
            }).success(function(newPlayer) {
                players.push(newPlayer);
            }).error(function(err) {
                console.log(err);
            });
        };

        this.updatePlayer = function() {

        };

        this.getPlayers = function() {
            return PlayerResource.query();
        };
});
