/// <reference path="genericfunctions.js" />


$(document).ready(function () {
    //------------------------------------------Risk Ratings------------------------------------------------//
    $("#btnAddNew").click(function () {
           $("#RiskRatingTable tbody").append(
            "<tr><td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='color' value='#4286f4'/></td>"
            //+ "<td><input type='text' class='demo1' value='#5367ce'/></td>"
            + "<td><span title='Save' spnType='riskRatingSave' riskRating-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span></td>"
            + "<td><span title='Delete' spnType='riskRatingDelete' riskRating-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span></td>"
            + "</tr>");

    });

    ///--------------------------Save Risk Rating-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="riskRatingSave"]', 'click', function () {


        var riskratingID = $(this).parent().closest('tr').attr("riskrating-id");
        var RiskRatingModel = {};
        var par = $(this).parent().closest('tr'); //tr 
        var RiskExposure = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var Colour = par.children("td:nth-child(4)");
        var tdEdit = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");
            if (!RiskRatingUtilities.IsValid())
            return false
        if (riskratingID && riskratingID > 0) {
            RiskRatingModel.RiskRatingID = riskratingID;
        } else {
            RiskRatingModel.RiskRatingID = 0;
        }
      
        RiskRatingModel.SettingControlID = RiskRatingUtilities.getSettingControlID();
        RiskRatingModel.RiskExposure = RiskExposure.children("input[type=text]").val();
        RiskRatingModel.Description = Description.children("input[type=text]").val();
        RiskRatingModel.Weight = Weight.children("input[type=text]").val();
        RiskRatingModel.Colour = Colour.children("input[type=color]").val();
      

        RiskExposure.html(RiskExposure.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Delete' spnType='riskRatingEdit' riskRating-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Delete' spnType='riskRatingDelete' riskRating-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>");

        RiskRatingUtilities.InsertRiskRating(RiskRatingModel);

    });

    ///--------------------------Edit Risk Rating-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="riskRatingEdit"]', 'click', function () {
        var par = $(this).parent().closest('tr'); //tr 
        var RiskExposure = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var Colour = par.children("td:nth-child(4)");
        var tdSave = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");

        RiskExposure.html("<input type='text' ismendatory='true' value='" + RiskExposure.html() + "'/>");
        Description.html("<input type='text' ismendatory='true' value='" + Description.html() + "'/>");
        Weight.html("<input type='text' ismendatory='true' value='" + Weight.html() + "'/>");
        tdSave.html("<span title='Save' spnType='riskRatingSave' riskRating-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='riskRatingCancel' riskRating-id='0' style='cursor: pointer'><i class='fa fa-refresh green-text'></i></span>")


    });
    ///--------------------------Cancel Risk Rating-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="riskRatingCancel"]', 'click', function () {
        var par = $(this).parent().parent(); //tr 
        var RiskExposure = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var Colour = par.children("td:nth-child(4)");
        var tdEdit = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");
        RiskExposure.html(RiskExposure.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Edit' spnType='riskRatingEdit' riskRating-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='riskRatingCancel' riskRating-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>")


    });
    $('#divManageControlsList').delegate('span[spnType="riskRatingDelete"]', 'click', function () {
        var confirmation = confirm("are you sure you want to remove this risk rating.");
             if (confirmation) {
            var par = $(this).parent().parent();
            par.remove();
            var riskratingID = $(this).parent().closest('tr').attr("riskrating-id");
            if (riskratingID && riskratingID > 0) {
                RiskRatingUtilities.DeleteRiskRating(riskratingID);
            }
        }
    });
});


//--------------------------------Risk Ratings-------------------------------------------------------------------//
RiskRatingUtilities = {

    GetRiskRatingList: function (SettingControlID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/_RiskRatings", "GET", { settingControlID: SettingControlID }, true);
        AjaxResult.success(function (data) {
            $('#divManageControlsList').html(data);
            GeneralUtilities.ajaxindicatorstop();

        });
    },

    InsertRiskRating: function (RiskRatingModel) {


        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/InsertRiskRating", "POST", RiskRatingModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            RiskRatingUtilities.GetRiskRatingList(RiskRatingUtilities.getSettingControlID());
        });

    },

    DeleteRiskRating: function (riskratingID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/DeleteRiskRating", "POST", { riskRatingID: riskratingID }, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            RiskRatingUtilities.GetRiskRatingList(RiskRatingUtilities.getSettingControlID());
        });


    },
    getSettingControlID: function () {
        var GetSelectedNode = $('#SettingControlListDiv').find('tr.active');
        if ($(GetSelectedNode).length > 0)
            return $(GetSelectedNode).attr('settingcontrol-id');
        return 0;
    },
    IsValid: function () {
        var IsValid = 1;
        $('#RiskRatingTable tbody').find('input[type="text"],input[type="password"],textarea,select').removeClass('error');
        $('#RiskRatingTable tbody').find('input[type="text"],input[type="password"],textarea').each(function () {
            if ($(this).attr('ismendatory') == "true") {

                if ($(this).val() == "") {
                    $(this).addClass('error');
                    IsValid = 0;
                }
            }
        });
        $('#RiskRatingTable tbody').find('select').each(function () {

            if ($(this).attr('ismendatory') == "true") {
                if ($('option:selected', this).val() == "-1") {
                    $(this).addClass('error');
                    IsValid = 0;
                }
            }
        });
        if (IsValid == 1)
            return true;
        else
            return false;
    },
}
