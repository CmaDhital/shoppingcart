/**
 * Created by Seema on 9/19/2016.
 */


angular.module('app').controller('ShoppingCartCtrl',['$scope', '$http',function($scope, $http){

$scope.contents="Hello World";

    $http.get("/service/customer/1").then(function(response){
       console.log("Logging responses");
        console.log(response);
        console.log("End the Response");
        $scope.contents=response.data;
        console.log($scope.contents);


    });

}]);