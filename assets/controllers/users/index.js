/**
 * Created by admin on 10/9/2015.
 */
protekgps.controller("UsersController", function($scope) {
    //Edit Users  popup Fade In
    $scope.editUsersFadeIn = function(user){
        var index = $scope.$parent.users.listInstance.indexOf(user);
        if (index != -1) {
            $scope.$parent.users.instance = $scope.$parent.users.listInstance[index];
        }
        $('#users-popup').fadeOut();
        $('#edit-users-popup').fadeIn();
    }
    //Index Users popup Fade Out
    $scope.indexUsersFadeOut = function(){
        $('#users-popup').fadeOut();
    }
    //Add new Users popup Fade in
    $scope.addUsersFadeIn = function(){
        $scope.$parent.users.instance = {"id":"0","firstName":"","lastName:":"","address":"","contractPhone":"","email":"","company":"","dateOfBirth":"","country":"","streetAddress":"","city":"","state":"","zipCode":"","defaultMap":"","timeZone":"","daylightSaving":"","userRole":"","unitSystem":"","group":"","userName":"","password":"","timeOfDayFormat":"","permission":[0,0,0,0,0,0,0,0]};
        $('#users-popup').fadeOut();
        $('#add-users-popup').fadeIn();
    }
    $scope.deletedUser = function (user) {

        var index = $scope.$parent.users.listInstance.indexOf(user);
        if (index != -1) {
            $scope.$parent.users.listInstance.splice(index, 1);
        }
        alert('Deleted User with '+user.id+' Success!');
    }

    //Page CLick
    $scope.pageClick = function (page) {
        $scope.$parent.pageClick(page);
        $scope.$parent.users.listInstance =[];
        //Getting list users  by current user with new page ex: ws.com/users/list/page/number
        var page = $scope.$parent.page.current;
        for(var index =((page-1)*$scope.$parent.page.number +1); index <=(page*$scope.$parent.page.number);index++){
            var item = {"id": index,"firstName":"Romy " + index,"lastName":"Torres " + index,"address":"","contractPhone":"1234567890","email":"romytorres@gmail.com","company":"RTPM","dateOfBirth":"","country":"USA","streetAddress":"streetAddress","city":"city","state":"al","zipCode":"70000","defaultMap":"","timeZone":"","daylightSaving":"","userRole":"","unitSystem":"","group":"","userName":"","password":"","timeOfDayFormat":"","permission":[1,0,0,0,0,0,0,0]};
            $scope.$parent.users.listInstance.push(item)
        }

    }
    //Sort click
    $scope.sortClick = function (field) {
        $scope.$parent.sortClick(field)
        $scope.$parent.users.listInstance = $scope.$parent.users.listInstance.reverse()
    }
});