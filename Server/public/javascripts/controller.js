/**
 * Created by Euna Kang on 2015-09-30.
 */
app.controller('article', function($scope, $http) {
    $http.get("http://localhost:3000/result/article?keyword=eunamong")
        .success(function(response) {
            $scope.keyword = response.keyword;
            $scope.likes = response.likes;
            $scope.dislikes = response.dislikes;
        });
});