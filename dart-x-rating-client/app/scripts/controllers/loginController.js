/**
 * Created by Andreas on 17.04.2015.
 */

angular.module('dartXRatingApp').controller('LoginCtrl', function ($scope, $filter, $location, DartService) {
    $scope.selectedLeague = "";
    $scope.leagues = DartService.getLeagues();

    $scope.selectLeague = function() {
        DartService.setLeague($scope.selectedLeague);
        $location.path("/");
    };
});
