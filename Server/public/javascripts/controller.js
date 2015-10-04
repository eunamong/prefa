/**
 * Created by Euna Kang on 2015-09-30.
 */

app.controller('changeScreen', function ($scope) {
    $scope.ChangeScreen = function () {
        location.href = "http://localhost:3000?keyword=" + $scope.keyword;
    }
});

app.controller('', function ($scope) {
    $scope.keyword;
    $scope.result;
    $scope.date;
    $scope.likes;
    $scope.dislikes;
    $http.get("http://localhost:3000/result/recently_result?keyword" + $scope.keyword)
        .success(function (rr_res) {
            $scope.result = rr_res.result;
            $scope.date = rr_res.date;
        });

    $http.get("http://localhost:3000/result/article?keyword=" + $scope.keyword)
        .success(function (at_res) {
            $scope.likes = at_res.likes;
            $scope.dislikes = at_res.dislikes;
        });
})