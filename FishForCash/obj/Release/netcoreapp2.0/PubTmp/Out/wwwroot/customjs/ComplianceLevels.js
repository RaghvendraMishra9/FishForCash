/// <reference path="genericfunctions.js" />


$(document).ready(function () {
    //------------------------------------------Compliance Level------------------------------------------------//
    $("#btnAddNew").click(function () {
        $("#ComplianceLevelsTable tbody").append(
            "<tr><td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='color' value='#4286f4'/></td>"
            + "<td><span title='Save' spnType='complianceLevelSave' complianceLevel-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span></td>"
            + "<td><span title='Delete' spnType='complianceLevelDelete' complianceLevel-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span></td>"
            + "</tr>");

    });

    ///--------------------------Save Compliance Level-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="complianceLevelSave"]', 'click', function () {


        var complianceLevelID = $(this).parent().closest('tr').attr("complianceLevel-id");
        var ComplianceLevelsModel = {};
        var par = $(this).parent().closest('tr');
        var ComplianceLevelName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var Colour = par.children("td:nth-child(4)");
        var tdEdit = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");
        debugger;
        if (!ComplianceLevelUtilities.IsValid())
            return false
        if (complianceLevelID && complianceLevelID > 0) {
            ComplianceLevelsModel.ComplianceLevelID = complianceLevelID;
        } else {
            ComplianceLevelsModel.ComplianceLevelID = 0;
        }

        ComplianceLevelsModel.SettingControlID = ComplianceLevelUtilities.getSettingControlID();
        ComplianceLevelsModel.ComplianceLevelName = ComplianceLevelName.children("input[type=text]").val();
        ComplianceLevelsModel.Description = Description.children("input[type=text]").val();
        ComplianceLevelsModel.Weight = Weight.children("input[type=text]").val();
        ComplianceLevelsModel.Colour = Colour.children("input[type=color]").val();

        ComplianceLevelName.html(ComplianceLevelName.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Delete' spnType='complianceLevelEdit' complianceLevel-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Delete' spnType='complianceLevelDelete' complianceLevel-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>");

        ComplianceLevelUtilities.InsertComplianceLevel(ComplianceLevelsModel);

    });

    ///--------------------------Edit Compliance Level-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="complianceLevelEdit"]', 'click', function () {
        var par = $(this).parent().closest('tr'); //tr 
        var ComplianceLevelName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var Colour = par.children("td:nth-child(4)");
        var tdSave = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");

        ComplianceLevelName.html("<input type='text' ismendatory='true' value='" + ComplianceLevelName.html() + "'/>");
        Description.html("<input type='text' ismendatory='true' value='" + Description.html() + "'/>");
        Weight.html("<input type='text' ismendatory='true' value='" + Weight.html() + "'/>");
        tdSave.html("<span title='Save' spnType='complianceLevelSave' complianceLevel-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='complianceLevelCancel' complianceLevel-id='0' style='cursor: pointer'><i class='fa fa-refresh green-text'></i></span>")


    });
    ///--------------------------Cancel Compliance Level-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="complianceLevelCancel"]', 'click', function () {
        var par = $(this).parent().closest('tr');
        var ComplianceLevelName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var Colour = par.children("td:nth-child(4)");
        var tdEdit = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");
        ComplianceLevelName.html(ComplianceLevelName.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Edit' spnType='complianceLevelEdit' complianceLevel-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='complianceLevelCancel' complianceLevel-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>")


    });
    $('#divManageControlsList').delegate('span[spnType="complianceLevelDelete"]', 'click', function () {
        var confirmation = confirm("are you sure you want to remove this compliance level.");
        if (confirmation) {
            var par = $(this).parent().closest('tr');
            par.remove();
            var complianceLevelID = $(this).parent().closest('tr').attr("complianceLevel-id");
            if (complianceLevelID && complianceLevelID > 0) {
                ComplianceLevelUtilities.DeleteComplianceLevel(complianceLevelID);
            }
        }
    });
});


//--------------------------------Compliance Level-------------------------------------------------------------------//
ComplianceLevelUtilities = {

    ComplianceLevelList: function (SettingControlID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/_ComplianceLevelsList", "GET", { settingControlID: SettingControlID }, true);
        AjaxResult.success(function (data) {
            $('#divManageControlsList').html(data);
            GeneralUtilities.ajaxindicatorstop();

        });
    },

    InsertComplianceLevel: function (ComplianceLevelsModel) {


        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/InsertComplianceLevel", "POST", ComplianceLevelsModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            ComplianceLevelUtilities.ComplianceLevelList(ComplianceLevelUtilities.getSettingControlID());
        });

    },

    DeleteComplianceLevel: function (ComplianceLevelID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/DeleteComplianceLevel", "POST", { complianceLevelID: ComplianceLevelID }, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            ComplianceLevelUtilities.ComplianceLevelList(ComplianceLevelUtilities.getSettingControlID());
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
        $('#ComplianceLevelsTable tbody').find('input[type="text"],input[type="password"],textarea,select').removeClass('error');
        $('#ComplianceLevelsTable tbody').find('input[type="text"],input[type="password"],textarea').each(function () {
            if ($(this).attr('ismendatory') == "true") {

                if ($(this).val() == "") {
                    $(this).addClass('error');
                    IsValid = 0;
                }
            }
        });
        $('#ComplianceLevelsTable tbody').find('select').each(function () {

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
