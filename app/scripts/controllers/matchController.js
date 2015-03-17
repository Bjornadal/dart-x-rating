'use strict';

angular.module('dartXRatingApp').controller('MatchCtrl', function ($scope, $filter, RatingService, $location, PlayerFactory, MatchFactory) {
    $scope.match = {};
    $scope.matches = MatchFactory();

    PlayerFactory().getPlayersAsync().then(function(players) {
        $scope.players = players;
        $scope.match.players = angular.copy($scope.players);
    });

    $scope.togglePlayer = function(player) {
        player.wasPlaying = !player.wasPlaying;
        player.winner = (player.wasPlaying) ? player.winner : false;
    };

    $scope.setWinner = function(player) {
        angular.forEach($scope.match.players, function(matchPlayer) {
            matchPlayer.winner = false;
        });
        player.winner = true;
    };

    $scope.registerMatch = function() {
        // Copy the selected players to its own object
        var toSave = { players: []};
        angular.forEach($scope.match.players, function(player) {
            if (player.wasPlaying) {
                toSave.players.push(
                    {
                        email: player.email,
                        name: player.name,
                        winner: player.winner,
                        rating: player.rating

                    }
                );
            }
        });

        // Update plauers
        angular.forEach($scope.players, function(player) {
            player.playedLastMatch = false;
            $scope.players.updatePlayer(player);
        });

        // Update player ratings
        RatingService.calculateRating(toSave.players);
        angular.forEach(toSave.players, function(matchPlayer) {
            angular.forEach($scope.players, function(player) {
                if (matchPlayer.email === player.email) {
                    player.ratingAdjustment = matchPlayer.ratingAdjustment;
                    player.rating = matchPlayer.rating;
                    player.matches = (player.matches) ? player.matches + 1 : 1;
                    player.wins = (player.wins) ? ((matchPlayer.winner) ? player.wins + 1 : player.wins) : ((matchPlayer.winner) ? 1 : 0);
                    player.playedLastMatch = true;
                    $scope.players.updatePlayer(player);
                }
            })
        });

        // Save match
        MatchFactory().registerMatch(toSave);

        // Reset form
        $scope.match = {};
        $scope.match.players = angular.copy($scope.players);

        // Redirect to rating summary
        $location.url('/');
    };
});
