'use strict';

angular.module('dartxratingApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
