/**
 * Created by Andreas on 17.04.2015.
 */

angular.module('dartXRatingApp').controller('LeagueCtrl', function ($scope, $filter, $location, DartService) {
    $scope.selectedLeague = "";
    $scope.newLeague = {};
    $scope.leagues = DartService.getLeagues();

    $scope.selectLeague = function() {
        DartService.setLeague($scope.selectedLeague);
        $location.path("/ratings");
    };

    $scope.createLeague = function() {
        DartService.addLeague($scope.newLeague).then(function(league) {
            DartService.setLeague(league);
            $location.path("/ratings");
        });
        $scope.newLeague = {};
    };
});
