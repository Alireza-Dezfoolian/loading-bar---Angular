//loading bar Example for westpac Australia - by: Alireza Dezfoolian

var app = angular.module("westpac", [])

.directive("lightbox", function lightbox() {
    return {
        restrict: "E",
        templateUrl: "template/lightbox.html",
        controller: "lightbox"
    };
})

.controller("lightbox", function lighbox($scope, $http, $interval) {
    $scope.title = "Progress";
    $scope.loadingData = {};
    $scope.loadingPercentage = 0;
    $scope.loading = true;
    $scope.loaded = false;

    $scope.close = function() {
        $scope.closed = true;
    }

    $http.get("/js/data.json")
        .then(function(res) {
            $scope.loadingData = res.data;
            $scope.$emit('data_fetched');
        });

    $scope.$on('data_fetched', function() {
        $scope.percentage();
    });

    $scope.percentage = function() {
        var lightbox = $scope.loadingData.data.lightbox;
        $scope.loadingPercentage = lightbox.start;
        var loaded = lightbox.finish;
        var loadingTimer = $interval(function() {
            $scope.loadingPercentage++;
            if ($scope.loadingPercentage >= lightbox.finish) {
                $scope.stopTimer();
                $scope.loading = false;
                $scope.loaded = true;
            }
        }, lightbox.duration / 100);
        $scope.stopTimer = function() {
            $interval.cancel(loadingTimer);
        };
    };
});