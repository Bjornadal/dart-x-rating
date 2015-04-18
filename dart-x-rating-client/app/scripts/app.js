'use strict';

/**
 * @ngdoc overview
 * @name dartXRatingApp
 * @description
 * # dartXRatingApp
 *
 * Main module of the application.
 */
angular
    .module('dartXRatingApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'firebase',
        'ui.bootstrap',
        'chart.js'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/leagues.html',
                controller: 'LeagueCtrl'
            })
            .when('/ratings', {
                templateUrl: 'views/ratings.html',
                controller: 'RatingCtrl'
            })
            .when('/players', {
                templateUrl: 'views/players.html',
                controller: 'PlayerCtrl'
            })
            .when('/achievements', {
                templateUrl: 'views/achievements.html',
                controller: 'AchievementCtrl'
            })
            .when('/games', {
                templateUrl: 'views/games.html',
                controller: 'GameCtrl'
            })
            .when('/statistics', {
                templateUrl: 'views/statistics/statistics.html',
                controller: 'StatisticCtrl'
            })
            .when('/admin', {
                templateUrl: 'views/admin/index.html',
                controller: 'AdminCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).run(function($rootScope, $location, DartService) {
        $rootScope.createGuid = function() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }

        $rootScope.$on( "$routeChangeStart", function(event, next, current) {
            if (!DartService.getSelectedLeague()) {
                // no logged user, redirect to /login
                if ( next.templateUrl === "views/leagues.html") {
                } else {
                    $location.path("/");
                }
            }
        });
    });
