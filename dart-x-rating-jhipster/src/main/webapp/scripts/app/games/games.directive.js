'use strict';

/**
 * Created by Andreas on 28.02.2015.
 */
angular.module('dartxratingApp')
    .directive('gameValidation', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs, controllers) {
                scope.$watch('players', function() {
                    var totalPlayers = 0, hasWinner = false;
                    angular.forEach(scope.players, function(player) {
                        totalPlayers += (player.wasPlaying) ? 1 : 0;
                        hasWinner = (player.winner) ? true : hasWinner;
                    });

                    scope.gameForm.$setValidity('incomplete', (totalPlayers > 1 && hasWinner))
                }, true);
            }
        };
    });
