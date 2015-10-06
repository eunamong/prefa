/**
 * Created by Euna Kang on 2015-09-30.
 */

app.controller('changeScreen', function($scope) {
    $scope.toggle = function() {
        location.href = "http://localhost:3000?keyword=" + $scope.keyword;
    }
})

app.controller('infoSender', function($scope, $http) {

    $http.get("http://localhost:3000/result/recently_result?keyword=" + query_keyword)
        .success(function(response) {
            $scope.keyword = response.keyword;
            $scope.result = response.result;
            $scope.date = response.date;
        });

    $http.get("http://localhost:3000/result/article?keyword=" + query_keyword)
        .success(function(response) {
            $scope.keyword = response.keyword;
            $scope.likes = response.likes;
            $scope.dislikes = response.dislikes;
        });

    $scope.getLikeStyle = function (result) {
        return { width: (result * 100) + '%'}
    }

    $scope.getDislikeStyle = function (result) {
        return { width: (100 - result * 100) + '%' }
    }
    /*
    $http.get("http://localhost:3000/result/analysis?keyword=" + query_keyword)
        .success(function(response) {

        });
    */
})