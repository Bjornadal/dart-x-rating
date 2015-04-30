'use strict';

angular.module('dartxratingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('leagues', {
                parent: 'site',
                url: '/leagues',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/leagues/leagues.html',
                        controller: 'LeagueController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('main');
                        return $translate.refresh();
                    }]
                }
            });
    });
