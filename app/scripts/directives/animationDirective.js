'use strict';

/**
 * Created by Andreas on 01.03.2015.
 */
angular.module('dartXRatingApp')
    .directive('playerUpdateAnimation', function($animate) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controllers) {

                scope.$watch('player', function(newValue, oldValue) {
                    if (newValue === oldValue) return;

                    if (newValue.playedLastMatch) {
                        $animate.addClass(element, 'playerUpdate').then(function() {
                            element.removeClass('playerUpdate');
                        });
                    }
                }, true);
            }
        }
    });
