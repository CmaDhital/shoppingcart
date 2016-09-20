/**
 * Created by Seema on 9/12/2016.
 */

angular.module("app").controller("appCtrl",["$scope", "itemTypesService", function($scope, itemTypesService){
    console.log(itemTypesService.itemTypes);
    $scope.abc=itemTypesService.itemTypes;
}]);