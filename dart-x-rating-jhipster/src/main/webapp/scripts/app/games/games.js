'use strict';

angular.module('dartxratingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('games', {
                parent: 'site',
                url: '/games',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/games/games.html',
                        controller: 'GameController'
                    }
                }
            });
    });
