'use strict';

angular.module('xgames')
    .directive('playerUpdateAnimation', function ($animate) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controllers) {

                scope.$watch('player', function (newValue, oldValue) {
                    if (newValue === oldValue) {return;}

                    if (newValue.playedLastMatch) {
                        $animate.addClass(element, 'playerUpdate').then(function () {
                            element.removeClass('playerUpdate');
                        });
                    }
                }, true);
            }
        };
    });
