'use strict';

angular.module('xgames').controller('MainCtrl', function ($scope, $filter, RatingService, PlayerFactory, StatisticsService, $timeout, $interval, $localstorage) {
    $scope.settings = $localstorage.getObject('settings');
    $scope.players = PlayerFactory();
    $scope.startDate = new Date(new Date().setDate(new Date().getDate() - 7));
    $scope.endDate = new Date();

    var funFacts = ["Dart X Rating Awesome Fun Facts"];
    var funFactIndex = 0;
    updateFunFact(funFactIndex);
    $interval(function () {
        funFactIndex++;
        if (funFactIndex >= funFacts.length) {
            funFactIndex = 0;
        }
        updateFunFact(funFactIndex);
    }, 10000);

    StatisticsService.generateStatistics().then(function (players) {
        $scope.players = players;
        funFacts = StatisticsService.generateFunFacts();
    });

    function updateFunFact(index) {
        var delay = 2000;
        if (index === 0) {
            delay = 0;
        } else {
            $scope.showFunFact = false;
        }
        $timeout(function () {
            $scope.funFact = funFacts[index];
            $scope.showFunFact = true;
        }, delay);
    }
});

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

angular.module('xgames').controller('HeaderCtrl', function ($scope, $location, $localstorage) {
    $scope.settings = $localstorage.getObject('settings');
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
});
