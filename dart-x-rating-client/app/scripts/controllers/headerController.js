/**
 * Created by Andreas on 18.04.2015.
 */


angular.module('dartXRatingApp').controller('HeaderCtrl', function($scope, $location, DartService, $rootScope) {
    $scope.selectedLeague = DartService.getSelectedLeague();
    $scope.hasSelectedLeague = $location.path() != '/';

    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        $scope.hasSelectedLeague = ($location.path() != '/');
    });

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };


});
