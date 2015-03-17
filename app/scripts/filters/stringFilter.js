/**
 * Created by andreasb on 03.03.15.
 */
angular.module('dartXRatingApp').filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar)[splitIndex];
        }
    });
