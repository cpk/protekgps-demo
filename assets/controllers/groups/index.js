/**
 * Created by admin on 10/9/2015.
 */
protekgps.controller("GroupsController", function($scope) {
    //Index Groups popup Fade Out
    $scope.indexGroupsFadeOut = function(){
        $('#groups-popup').fadeOut();
    }
    //Add Groups  popup Fade In
    $scope.addGroupsFadeIn = function(){
        $scope.$parent.groups.instance = {
            "id": "0",
            "name": "",
            "company:": "",
            "contactName": ""
        };

        $('#groups-popup').fadeOut();
        $('#test-groups-popup').fadeOut();
        $('#edit-groups-popup').fadeOut();
        $('#add-groups-popup').fadeIn();
    }
    //Edit Groups  popup Fade In
    $scope.editGroupsFadeIn = function(group){
        var index = $scope.$parent.groups.listInstance.indexOf(group);
        if (index != -1) {
            $scope.$parent.groups.instance = $scope.$parent.groups.listInstance[index];
        }
        $('#groups-popup').fadeOut();
        $('#test-groups-popup').fadeOut();
        $('#add-groups-popup').fadeOut();
        $('#edit-groups-popup').fadeIn();
    }
    //Test Groups  popup Fade In
    $scope.testGroupsFadeIn = function(){
        $scope.$parent.groups.testListInstance = [];
        $scope.$parent.setDefault();
        //Getting list Groups show show by current user

        var page = $scope.$parent.page.current;
        for(var index =((page-1)*$scope.$parent.page.number +1); index <=(page*$scope.$parent.page.number);index++){
            var item =  {"id":index,"name":"Device " + index,"state:":"","image":"car2_icon.png"};
            $scope.$parent.groups.testListInstance.push(item);
        }


        $('#groups-popup').fadeOut();
        $('#test-groups-popup').fadeIn();
    }

    $scope.deletedGroup = function (group) {

        var index = $scope.$parent.groups.listInstance.indexOf(group);
        if (index != -1) {
            $scope.$parent.groups.listInstance.splice(index, 1);
        }
        alert('Deleted Group with '+group.id+' Success!');
    }

    //Page CLick
    $scope.pageClick = function (page) {
        $scope.$parent.pageClick(page);
        $scope.$parent.groups.listInstance =[];
        //Getting list groups_detail by current user with new page ex: ws.com/groups_detail/list/page/number
        var page = $scope.$parent.page.current;
        for(var index =((page-1)*$scope.$parent.page.number +1); index <=(page*$scope.$parent.page.number);index++){
            var item = {"id": index,"name":"Torres " +index,"company:":"","contactName":""};
            $scope.$parent.groups.listInstance.push(item)
        }

    }
    //Sort click
    $scope.sortClick = function (field) {
        $scope.$parent.sortClick(field)
        $scope.$parent.groups.listInstance = $scope.$parent.groups.listInstance.reverse()
    }
});