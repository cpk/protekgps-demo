/**
 * Created by admin on 10/9/2015.
 */
protekgps.controller("AddGroupsController", function($scope) {
    //Add Groups popup Fade Out
    $scope.addGroupsFadeOut = function(){
        $('#add-groups-popup').fadeOut();
    }

    $scope.savedGroup = function(){
        alert('Saved Group  Success!');
    }
});