/// <reference path="genericfunctions.js" />

$(document).ready(function () {

    SettingUtilities.GetSettingList();
    $('#divSettingView').delegate('div[litype="settings"]', 'click', function () {

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('#SettingListDiv').hide();
            $(".TreeDiv").removeClass("col-md-4").attr("class", "col-md-11 col-xs-11 col-sm-11 TreeDiv");
        }
        else {
            $('li').find('div').removeClass('active');
            $(this).addClass('active');
            $('#SettingListDiv').show();
            $(".TreeDiv").removeClass("col-md-12").attr("class", "col-md-4 col-xs-11 col-sm-11 TreeDiv");
            SettingControlUtilities.GetSettingControlList();
            $('#settingCollap').show();
        }
    });

    //----------Collaps settings ----------------
    $('#btnSettingCollap').click(function () {
        $('#div1').toggle();
        $('#btnSettingCollap >i').toggleClass("fa fa-angle-double-left fa fa-angle-double-right");
        $('#div3').toggleClass("col-md-7 col-md-11");
    });

    //---------------------------------------Settings Controls--------------------------------//

    $('#SettingControlListDiv').delegate('td[tdtype="getSettingControlDetails"]', 'click', function () {
        $('#SettingControlListDiv').find('tr').removeClass('active');
        $(this).parent().closest('tr').addClass('active');
        $('#ManageSettingControlDiv').show();
        $('#btnAddNew').show();
        $('#btnUpdate').hide();
        var SettingControlID = $(this).parent().closest('tr').attr("settingcontrol-id");
        // var settingControlName = $(this).parent().closest('tr').children('td').text();
        $("#ManageSettingControlDiv a").closest('#SettingControlName').html($(this).parent().closest('tr').children('td').text());
        if ($(this).parent().closest('tr').children('td').text() == "Risk Ratings") {
            RiskRatingUtilities.GetRiskRatingList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Consequences") {
            ConsequenceUtilities.GetConsequenceList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Likelihoods") {
            LikelihoodsUtilities.GetLikelihoodsList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Student Impact Levels") {
            StudentImpactLevelsUtilities.GetStudentImpactLevelsList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Classifications") {
            ClassificationsUtilities.GetClassificationsList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Compliance") {
            ComplianceUtilities.GetComplianceList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Compliance Levels") {
            ComplianceLevelUtilities.ComplianceLevelList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Effectiveness") {
            EffectivenessUtilities.GetEffectivenessList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Risk Matrix") {
            $('#btnAddNew').hide();
            $('#btnUpdate').show();
            RiskMatrixUtilities.GetRiskMatrixList();
        }
       
       
        $('#div1').hide();
        $('#btnSettingCollap >i').removeClass("fa fa-angle-double-left").addClass("fa fa-angle-double-right");
        $('#div3').removeClass("col-md-7 col-md-11");
     });


   
    
});


//--------------------------------Settings------------------------------------------------------------//
SettingUtilities = {
    GetSettingList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/_SettingsView", "GET", {}, true);
        AjaxResult.success(function (data) {
            $('#divSettingView').html(data);
            GeneralUtilities.ajaxindicatorstop();
        });
    },
    getSettingID: function () {
        var GetSelectedNode = $('#divSettingView').find('div.active');
        if ($(GetSelectedNode).length > 0)
            return $(GetSelectedNode).attr('data-id');
        return 0;
    },




}
//--------------------------------Settings Controls------------------------------------------------------------//
SettingControlUtilities = {
    GetSettingControlList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/_SettingControlList", "GET", { settingID: SettingUtilities.getSettingID() }, true);
        AjaxResult.success(function (data) {
            $('#divSettingControlList').html(data);
            GeneralUtilities.ajaxindicatorstop();

        });
    },
   


}


