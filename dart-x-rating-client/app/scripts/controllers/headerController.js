/**
 * Created by Andreas on 18.04.2015.
 */


angular.module('dartXRatingApp').controller('HeaderCtrl', function($scope, $location, DartService, $rootScope) {
    $scope.isLeagueAdmin = DartService.isLeagueAdmin();
    $scope.selectedLeague = DartService.getSelectedLeague();

    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        $scope.hasSelectedLeague = ($location.path() != '/');
        $scope.isLeagueAdmin = DartService.isLeagueAdmin();
    });

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.logout = function() {
        DartService.logout();
    };

});
