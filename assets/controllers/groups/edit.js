/**
 * Created by admin on 10/9/2015.
 */
protekgps.controller("EditGroupsController", function($scope) {
    //Add Groups popup Fade Out
    $scope.editGroupsFadeOut = function(){
        $('#edit-groups-popup').fadeOut();
    }

    $scope.updatedGroup = function(){
        alert('Updated Group  Success!');
    }
});