'use strict';

angular.module('dartxratingApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


