/**
 * Created by admin on 10/9/2015.
 */
protekgps.controller("RenewalController", function($scope) {
    //$scope.renewals.filteritems =[];
    //Renewals popup Fade Out
    $scope.indexRenewalsFadeOut = function(){
        $('#renewal-popup').fadeOut();
    }
    //Renewals history  popup Fade In
    $scope.renewalsHistoryFadeIn = function(){
        $scope.$parent.setDefault();
        $scope.$parent.renewals.listHistoryInstance =[]
        //Getting list Renewals history by current user
        var page = $scope.$parent.page.current;
        for(var index =((page-1)*$scope.$parent.page.number +1); index <=(page*$scope.$parent.page.number);index++){
            var item = {"id": index,"name": "Juan "+ index,"serial_number": "867844001704488","group": "RomyT","transaction_date": "03/26/2015 20:20:20 PM","renewal_valid_from": "03/26/2015 20:20:20 PM","date_expiration": "03/26/2015 20:20:20 PM","amount": "1","renewal_status": "Success","tranid": "7198055239"};
            $scope.$parent.renewals.listHistoryInstance.push(item)
        }
        $('#renewal-popup').fadeOut();
        $('#renewal-history-popup').fadeIn();
    }
    //Renewals summary  popup Fade In
    $scope.renewalsSummaryFadeIn = function(){
        $scope.$parent.renewals.listSummaryInstance =  $scope.renewals.filteritems;
        $('#renewal-popup').fadeOut();
        $('#renewal-summary-popup').fadeIn();
    }
    $scope.search = {}
    $scope.search.renewing =  $scope.selectDevices[0].id;
    $scope.selectedDataAccount = $scope.selectDataAccounts[0];


    //Sort click
    $scope.sortClick = function (field) {
        $scope.$parent.sortClick(field);
        $scope.$parent.renewals.listInstance = $scope.$parent.renewals.listInstance.reverse();

    }

});