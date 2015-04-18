/**
 * Created by Andreas on 18.04.2015.
 */


angular.module('dartXRatingApp').controller('HeaderCtrl', function($scope, $location, DartService) {
    $scope.selectedLeague = DartService.getSelectedLeague();
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});
