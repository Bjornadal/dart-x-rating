'use strict';

/**
 * @ngdoc overview
 * @name xgames
 * @description
 * # xgames
 *
 * Main module of the application.
 */
angular
    .module('xgames', [
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
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/players', {
                templateUrl: 'views/players.html',
                controller: 'PlayersCtrl'
            })
            .when('/achievements', {
                templateUrl: 'views/achievements.html',
                controller: 'AchievementsCtrl'
            })
            .when('/match', {
                templateUrl: 'views/match.html',
                controller: 'MatchCtrl'
            })
            .when('/statistics', {
                templateUrl: 'views/statistics.html',
                controller: 'StatisticsCtrl'
            })
            .when('/settings', {
                templateUrl: 'views/settings.html',
                controller: 'SettingsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }).run(function ($rootScope) {
    $rootScope.createGuid = function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
});
