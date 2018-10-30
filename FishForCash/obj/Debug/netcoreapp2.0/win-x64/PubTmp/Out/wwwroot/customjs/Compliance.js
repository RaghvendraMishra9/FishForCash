/// <reference path="genericfunctions.js" />


$(document).ready(function () {
    //------------------------------------------Compliances------------------------------------------------//
    $("#btnAddNew").click(function () {
        $("#ComplianceTable tbody").append(
            "<tr><td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='color' value='#4286f4'/></td>"
            + "<td><span title='Save' spnType='complianceSave' compliance-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span></td>"
            + "<td><span title='Delete' spnType='complianceDelete' compliance-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span></td>"
            + "</tr>");

    });

    ///--------------------------Save Compliance-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="complianceSave"]', 'click', function () {


        var complianceID = $(this).parent().closest('tr').attr("compliance-id");
        var ComplianceModel = {};
        var par = $(this).parent().closest('tr');
        var ComplianceName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var Colour = par.children("td:nth-child(4)");
        var tdEdit = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");
        debugger;
        if (!ComplianceUtilities.IsValid())
            return false
        if (complianceID && complianceID > 0) {
            ComplianceModel.ComplianceID = complianceID;
        } else {
            ComplianceModel.ComplianceID = 0;
        }

        ComplianceModel.SettingControlID = ComplianceUtilities.getSettingControlID();
        ComplianceModel.ComplianceName = ComplianceName.children("input[type=text]").val();
        ComplianceModel.Description = Description.children("input[type=text]").val();
        ComplianceModel.Weight = Weight.children("input[type=text]").val();
        ComplianceModel.Colour = Colour.children("input[type=color]").val();
       
        ComplianceName.html(ComplianceName.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Delete' spnType='complianceEdit' compliance-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Delete' spnType='complianceDelete' compliance-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>");

        ComplianceUtilities.InsertCompliance(ComplianceModel);

    });

    ///--------------------------Edit Compliance-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="complianceEdit"]', 'click', function () {
        var par = $(this).parent().closest('tr'); //tr 
        var ComplianceName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var Colour = par.children("td:nth-child(4)");
        var tdSave = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");

        ComplianceName.html("<input type='text' ismendatory='true' value='" + ComplianceName.html() + "'/>");
        Description.html("<input type='text' ismendatory='true' value='" + Description.html() + "'/>");
        Weight.html("<input type='text' ismendatory='true' value='" + Weight.html() + "'/>");
        tdSave.html("<span title='Save' spnType='complianceSave' compliance-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='complianceCancel' compliance-id='0' style='cursor: pointer'><i class='fa fa-refresh green-text'></i></span>")


    });
    ///--------------------------Cancel Compliance-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="complianceCancel"]', 'click', function () {
        var par = $(this).parent().closest('tr');
        var ComplianceName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var Colour = par.children("td:nth-child(4)");
        var tdEdit = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");
        ComplianceName.html(ComplianceName.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Edit' spnType='complianceEdit' compliance-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='complianceCancel' compliance-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>")


    });
     ///--------------------------Delete Compliance-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="complianceDelete"]', 'click', function () {
        var confirmation = confirm("are you sure you want to remove this compliance.");
        debugger;
        if (confirmation) {
            var par = $(this).parent().closest('tr');
            par.remove();
            var complianceID = $(this).parent().closest('tr').attr("compliance-id");
            if (complianceID && complianceID > 0) {
                ComplianceUtilities.DeleteCompliance(complianceID);
            }
        }
    });
});


//--------------------------------Compliances-------------------------------------------------------------------//
ComplianceUtilities = {

    GetComplianceList: function (SettingControlID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/_ComplianceList", "GET", { settingControlID: SettingControlID }, true);
        AjaxResult.success(function (data) {
            $('#divManageControlsList').html(data);
            GeneralUtilities.ajaxindicatorstop();

        });
    },

    InsertCompliance: function (ComplianceModel) {


        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/InsertCompliance", "POST", ComplianceModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            ComplianceUtilities.GetComplianceList(ComplianceUtilities.getSettingControlID());
        });

    },

    DeleteCompliance: function (ComplianceID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/DeleteCompliance", "POST", { complianceID: ComplianceID }, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            ComplianceUtilities.GetComplianceList(ComplianceUtilities.getSettingControlID());
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
        $('#ComplianceTable tbody').find('input[type="text"],input[type="password"],textarea,select').removeClass('error');
        $('#ComplianceTable tbody').find('input[type="text"],input[type="password"],textarea').each(function () {
            if ($(this).attr('ismendatory') == "true") {

                if ($(this).val() == "") {
                    $(this).addClass('error');
                    IsValid = 0;
                }
            }
        });
        $('#ComplianceTable tbody').find('select').each(function () {

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
