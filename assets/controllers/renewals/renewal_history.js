/**
 * Created by admin on 10/9/2015.
 */
protekgps.controller("RenewalHistoryController", function($scope) {
    //Renewals history popup Fade Out
    $scope.renewalsHistoryFadeOut = function(){
        $('#renewal-history-popup').fadeOut();
    }

    $scope.selectedDataAccount = $scope.selectDataAccounts[0];
    $scope.selectedDataNumber =  $scope.selectDataNumbers[0].id;
    $scope.searchRenewalsHistory = function(number){
        $scope.$parent.renewals.listHistoryInstance =[]
        $scope.$parent.page.number = parseInt(number, 10);
        $scope.$parent.renewals.historySearch=" search ";
        $scope.$parent.page.current=1;
        var page = $scope.$parent.page.current;
        var search = $scope.$parent.renewals.historySearch;
        for(var index =((page-1)*$scope.$parent.page.number +1); index <=(page*$scope.$parent.page.number);index++){
            var item = {"id": index,"name": "Juan " + search + index,"serial_number": "867844001704488","group": "RomyT","transaction_date": "03/26/2015 20:20:20 PM","renewal_valid_from": "03/26/2015 20:20:20 PM","date_expiration": "03/26/2015 20:20:20 PM","amount": "1","renewal_status": "Success","tranid": "7198055239"};
            $scope.$parent.renewals.listHistoryInstance.push(item)
        }
    }

    //Page CLick
    $scope.pageClick = function (page) {
        $scope.$parent.pageClick(page);
        $scope.$parent.renewals.listHistoryInstance =[]
        //Getting list Renewals history by current user with new page ex: ws.com/renewals_history/list/page/number
//				page = page - 1;
        var search = $scope.$parent.renewals.historySearch;
        var page = $scope.$parent.page.current;

        for(var index =((page-1)*$scope.$parent.page.number +1); index <=(page*$scope.$parent.page.number);index++){
            var item = {"id": index,"name": "Juan " + search + index,"serial_number": "867844001704488","group": "RomyT","transaction_date": "03/26/2015 20:20:20 PM","renewal_valid_from": "03/26/2015 20:20:20 PM","date_expiration": "03/26/2015 20:20:20 PM","amount": "1","renewal_status": "Success","tranid": "7198055239"};
            $scope.$parent.renewals.listHistoryInstance.push(item)
        }

    }
    //Sort click
    $scope.sortClick = function (field) {
        $scope.$parent.sortClick(field)
        $scope.$parent.renewals.listHistoryInstance = $scope.$parent.renewals.listHistoryInstance.reverse()
    }
});