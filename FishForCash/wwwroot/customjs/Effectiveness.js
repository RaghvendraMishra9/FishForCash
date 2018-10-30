/// <reference path="genericfunctions.js" />


$(document).ready(function () {
    //------------------------------------------Effectiveness------------------------------------------------//
    $("#btnAddNew").click(function () {
        $("#EffectivenessTable tbody").append(
            "<tr><td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='color' value='#4286f4'/></td>"
            + "<td><span title='Save' spnType='effectivenessSave' effectiveness-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span></td>"
            + "<td><span title='Delete' spnType='effectivenessDelete' effectiveness-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span></td>"
            + "</tr>");

    });

    ///--------------------------Save Effectiveness-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="effectivenessSave"]', 'click', function () {


        var effectivenessID = $(this).parent().closest('tr').attr("effectiveness-id");
        var EffectivenessModel = {};
        var par = $(this).parent().closest('tr');
        var EffectivenessName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var Colour = par.children("td:nth-child(4)");
        var tdEdit = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");
        debugger;
        if (!EffectivenessUtilities.IsValid())
            return false
        if (effectivenessID && effectivenessID > 0) {
            EffectivenessModel.EffectivenessID = effectivenessID;
        } else {
            EffectivenessModel.EffectivenessID = 0;
        }

        EffectivenessModel.SettingControlID = EffectivenessUtilities.getSettingControlID();
        EffectivenessModel.EffectivenessName = EffectivenessName.children("input[type=text]").val();
        EffectivenessModel.Description = Description.children("input[type=text]").val();
        EffectivenessModel.Weight = Weight.children("input[type=text]").val();
        EffectivenessModel.Colour = Colour.children("input[type=color]").val();
        
        EffectivenessName.html(EffectivenessName.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Delete' spnType='effectivenessEdit' effectiveness-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Delete' spnType='effectivenessDelete' effectiveness-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>");

        EffectivenessUtilities.InsertEffectiveness(EffectivenessModel);

    });

    ///--------------------------Edit Effectiveness-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="effectivenessEdit"]', 'click', function () {
        var par = $(this).parent().closest('tr'); 
        var EffectivenessName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var Colour = par.children("td:nth-child(4)");
        var tdSave = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");

        EffectivenessName.html("<input type='text' ismendatory='true' value='" + EffectivenessName.html() + "'/>");
        Description.html("<input type='text' ismendatory='true' value='" + Description.html() + "'/>");
        Weight.html("<input type='text' ismendatory='true' value='" + Weight.html() + "'/>");
        tdSave.html("<span title='Save' spnType='effectivenessSave' effectiveness-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='effectivenessCancel' effectiveness-id='0' style='cursor: pointer'><i class='fa fa-refresh green-text'></i></span>")


    });
    ///--------------------------Cancel Effectiveness-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="effectivenessCancel"]', 'click', function () {
        var par = $(this).parent().closest('tr');
        var EffectivenessName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var Colour = par.children("td:nth-child(4)");
        var tdEdit = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");
        EffectivenessName.html(EffectivenessName.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Edit' spnType='effectivenessEdit' effectiveness-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='effectivenessCancel' effectiveness-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>")


    });
    $('#divManageControlsList').delegate('span[spnType="effectivenessDelete"]', 'click', function () {
        var confirmation = confirm("are you sure you want to remove this effectiveness.");
        debugger;
        if (confirmation) {
            var par = $(this).parent().closest('tr');
            par.remove();
            var effectivenessID = $(this).parent().closest('tr').attr("effectiveness-id");
            if (effectivenessID && effectivenessID > 0) {
                EffectivenessUtilities.DeleteEffectiveness(effectivenessID);
            }
        }
    });
});


//--------------------------------Effectiveness-------------------------------------------------------------------//
EffectivenessUtilities = {

    GetEffectivenessList: function (SettingControlID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/_EffectivenessList", "GET", { settingControlID: SettingControlID }, true);
        AjaxResult.success(function (data) {
            $('#divManageControlsList').html(data);
            GeneralUtilities.ajaxindicatorstop();

        });
    },

    InsertEffectiveness: function (EffectivenessModel) {


        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/InsertEffectiveness", "POST", EffectivenessModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            EffectivenessUtilities.GetEffectivenessList(EffectivenessUtilities.getSettingControlID());
        });

    },

    DeleteEffectiveness: function (EffectivenessID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/DeleteEffectiveness", "POST", { effectivenessID: EffectivenessID }, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            EffectivenessUtilities.GetEffectivenessList(EffectivenessUtilities.getSettingControlID());
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
        $('#EffectivenessTable tbody').find('input[type="text"],input[type="password"],textarea,select').removeClass('error');
        $('#EffectivenessTable tbody').find('input[type="text"],input[type="password"],textarea').each(function () {
            if ($(this).attr('ismendatory') == "true") {

                if ($(this).val() == "") {
                    $(this).addClass('error');
                    IsValid = 0;
                }
            }
        });
        $('#EffectivenessTable tbody').find('select').each(function () {

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
