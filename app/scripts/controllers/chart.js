'use strict';

/**
 * @ngdoc function
 * @name xgames.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the xgames
 */
angular.module('xgames').controller('ChartCtrl', function ($scope, $firebaseArray, defaultConfig, $localstorage, $filter) {
  var settings = $localstorage.getObject('settings');
  var ref = new Firebase(defaultConfig.firebaseBackend + '/leagues/' + settings.league +  '/games/' + settings.game + '/seasons/' + settings.season + '/matches');
  var query = ref.orderByChild("date").limitToLast(15);

  $scope.matches = $firebaseArray(query);
  $scope.chartData = {
    labels: [],
    series: [],
    data: [],
    options: {
      datasetFill: false,
      responsive: true
    }
  };

  $scope.matches.$loaded(function() {
    var playersFirstRating = [];

    angular.forEach($scope.matches, function(match) {
      $scope.chartData.labels.push(moment(match.date).format('YYYY-MM-DD HH:mm'));

      angular.forEach(match.players, function(matchPlayer) {
        if ($scope.chartData.series.indexOf(matchPlayer.name) < 0) {
          $scope.chartData.series.push(matchPlayer.name);

          if (!playersFirstRating[$scope.chartData.series.indexOf(matchPlayer.name)]) {
            playersFirstRating.push(matchPlayer.rating);
          }
        }
      });
    });

    angular.forEach($scope.matches, function(match) {
      angular.forEach($scope.chartData.series, function(player) {
        var matchPlayer = $filter('filter')(match.players, {name: player})[0];

        var index = $scope.chartData.series.indexOf(player);
        if (!$scope.chartData.data[index]) {
          $scope.chartData.data[index] = [];
        }

        if (matchPlayer) {
          $scope.chartData.data[index].push(matchPlayer.rating);
        }
        else {
          var lastIndex = $scope.chartData.data[index].length-1;
          var lastValue = $scope.chartData.data[index][lastIndex];
          $scope.chartData.data[index].push((lastValue) ? lastValue : playersFirstRating[index]);
        }

      });
    });
  });
});
