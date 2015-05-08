/**
 * Created by Andreas on 01.05.2015.
 */
/**
 * Created by andreasb on 03.03.15.
 */
angular.module('dartxratingApp')
    .filter('split', function() {
        return function(input, splitChar, splitIndex) {
            // do some bounds checking here to ensure it has that index
            return input.split(splitChar)[splitIndex];
        }
    })
    .filter('bold', function($sce) {
        return function(value) {
            return $sce.trustAsHtml('<b>' + value + '</b>');
        }
    });
