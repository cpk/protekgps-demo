/**
 * Created by admin on 10/9/2015.
 */
protekgps.controller("EditUsersController", function($scope) {
    //Edit Users popup Fade Out
    $scope.editUsersFadeOut = function(){
        $('#edit-users-popup').fadeOut();
    }
    $scope.updatedUser =function(){
        alert("updated success!")
    }
    $scope.choosePermission = function(index){
        if($scope.$parent.users.instance.permission[index]!==1) $scope.$parent.users.instance.permission[index] =1;
        else  $scope.$parent.users.instance.permission[index] = 0;
    }
});