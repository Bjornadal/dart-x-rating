/**
 * Created by andreasb on 03.03.15.
 */
angular.module('dartXRatingApp').filter('roundWhole', function() {
    return function(input) {
        return Math.round(input);
    };
});
