/// <reference path="genericfunctions.js" />
$(document).ready(function () {
    DashboardUtilities.GetCounts();
});


DashboardUtilities = {
    GetCounts: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Dashboard/GetCounts", "GET", {}, true);
        AjaxResult.success(function (data) {
            $("#countCategories h2").text(data.countCategory);  
            $("#countAssets h2").text(data.countAssets); 
            $("#LastModifiedAsset h2").text(data.lastModified); 
            GeneralUtilities.ajaxindicatorstop();

        });
    },
}