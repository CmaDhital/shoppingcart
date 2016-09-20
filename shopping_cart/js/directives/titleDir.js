/**
 * Created by Seema on 9/12/2016.
 */

angular.module('app').directive('titleDir', function(){

    return{
        restrict : 'EAMC',
        templateUrl : '/views/title.html',
        controller : function($scope){

            $scope.title='Shopping Market Cart';
        },

//When you get a data from a database and wants to manipulate and modify before posting to user that's why we use this kind of formate and functions

        link : function(scope){
            scope.title ="Shopping Center";
        }









    };


});
