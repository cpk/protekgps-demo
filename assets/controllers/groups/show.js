/**
 * Created by admin on 10/9/2015.
 */
protekgps.controller("TestGroupsController", function($scope) {
    //Test Groups popup Fade Out
    $scope.testGroupsFadeOut = function(){
        $('#test-groups-popup').fadeOut();
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
    //Page CLick
    $scope.pageClick = function (page) {
        $scope.$parent.pageClick(page);
        $scope.$parent.groups.testListInstance =[]
        //Getting list groups_detail by current user with new page ex: ws.com/groups_detail/list/page/number
        var page = $scope.$parent.page.current;

        for(var index =((page-1)*$scope.$parent.page.number +1); index <=(page*$scope.$parent.page.number);index++){
            var item =  {"id":index,"name":"Device " + index,"state:":"","image":"car2_icon.png"};
            $scope.$parent.groups.testListInstance.push(item)
        }

    }
    //Sort click
    $scope.sortClick = function (field) {
        $scope.$parent.sortClick(field)
        $scope.$parent.groups.testListInstance = $scope.$parent.groups.testListInstance.reverse()
    }
});