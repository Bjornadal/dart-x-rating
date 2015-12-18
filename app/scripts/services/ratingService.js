'use strict';

angular.module('xgames').service('RatingService', function () {
    var kValue = 32;

    this.calculateRating = function (players) {
        var currentPlayers = angular.copy(players);

        angular.forEach(players, function (player) {
            var rating = player.rating;
            player.previousRating = rating;
            var ratingAdjustment = 0;
            var wl = (player.winner) ? 1 : 0;
            angular.forEach(currentPlayers, function (comparePlayer) {
                if (player.name !== comparePlayer.name && (player.winner || (!player.winner && comparePlayer.winner))) {
                    var opponentRating = comparePlayer.rating;
                    var winChance = 1 / (1 + (Math.pow(10, ((opponentRating - rating) / 400))));

                    var currentRatingAdjustment = (rating + kValue * (wl - winChance)) - rating;
                    ratingAdjustment += currentRatingAdjustment;

                    console.log("'" + player.name + "' has win chance of " + winChance + " against '" + comparePlayer.name + "'");
                    console.log("'" + player.name + "' gets rating adjusted " + currentRatingAdjustment + " for " + (player.winner ? 'winning' : 'losing') + " against '" + comparePlayer.name + "'");
                }
            });

            player.ratingAdjustment = ratingAdjustment;
            player.rating = rating + ratingAdjustment;

            console.log("'" + player.name + "' gets total adjustment of " + ratingAdjustment + ". New rating " + player.rating + "");
            console.log("=========================================");
        });
    };
});
