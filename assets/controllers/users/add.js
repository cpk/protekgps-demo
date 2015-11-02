/**
 * Created by admin on 10/9/2015.
 */
protekgps.controller("AddUsersController", function($scope) {
    //Add new Users popup Fade Out
    $scope.addUsersFadeOut = function(){
        $('#add-users-popup').fadeOut();
    }
    $scope.savedUser =function(){
        alert("Saved success!")
    }
    $scope.choosePermission = function(index){
        if($scope.$parent.users.instance.permission[index]!==1) $scope.$parent.users.instance.permission[index] =1;
        else  $scope.$parent.users.instance.permission[index] = 0;
    }
});