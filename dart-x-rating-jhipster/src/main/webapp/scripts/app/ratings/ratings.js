'use strict';

angular.module('dartxratingApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ratings', {
                parent: 'site',
                url: '/ratings',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/ratings/ratings.html',
                        controller: 'RatingController'
                    }
                }
            });
    });
