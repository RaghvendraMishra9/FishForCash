/// <reference path="genericfunctions.js" />


$(document).ready(function () {
    //------------------------------------------Consequence ------------------------------------------------//
    $("#btnAddNew").click(function () {
        $("#ConsequenceTable tbody").append(
            "<tr><td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><span title='Save' spnType='consequenceSave' consequence-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span></td>"
            + "<td><span title='Delete' spnType='consequenceDelete' consequence-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span></td>"
            + "</tr>");

    });

    ///--------------------------Save Consequence -------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="consequenceSave"]', 'click', function () {


        var consequenceID = $(this).parent().closest('tr').attr("consequence-id");
        var ConsequencesModel = {};
        var par = $(this).parent().closest('tr'); //tr 
        var ConsequenceLevel = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var tdEdit = par.children("td:nth-child(4)");
        var tdDelete = par.children("td:nth-child(5)");
        debugger;
        if (!ConsequenceUtilities.IsValid())
            return false
        if (consequenceID && consequenceID > 0) {
            ConsequencesModel.ConsequenceID = consequenceID;
        } else {
            ConsequencesModel.ConsequenceID = 0;
        }

        ConsequencesModel.SettingControlID = ConsequenceUtilities.getSettingControlID();
        ConsequencesModel.ConsequenceLevel = ConsequenceLevel.children("input[type=text]").val();
        ConsequencesModel.Description = Description.children("input[type=text]").val();
        ConsequencesModel.Weight = Weight.children("input[type=text]").val();
      
        

        ConsequenceLevel.html(ConsequenceLevel.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Delete' spnType='consequenceEdit' consequence-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Delete' spnType='consequenceDelete' consequence-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>");

        ConsequenceUtilities.InsertConsequence(ConsequencesModel);

    });

    ///--------------------------Edit Consequence-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="consequenceEdit"]', 'click', function () {
        var par = $(this).parent().closest('tr'); //tr 
        var ConsequenceLevel = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var tdSave = par.children("td:nth-child(4)");
        var tdDelete = par.children("td:nth-child(5)");

        ConsequenceLevel.html("<input type='text' ismendatory='true' value='" + ConsequenceLevel.html() + "'/>");
        Description.html("<input type='text' ismendatory='true' value='" + Description.html() + "'/>");
        Weight.html("<input type='text' ismendatory='true' value='" + Weight.html() + "'/>");
        tdSave.html("<span title='Save' spnType='consequenceSave' consequence-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='consequenceCancel' consequence-id='0' style='cursor: pointer'><i class='fa fa-refresh green-text'></i></span>")


    });
    ///--------------------------Cancel Consequence-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="consequenceCancel"]', 'click', function () {
        var par = $(this).parent().closest('tr'); //tr 
        var ConsequenceLevel = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var tdEdit = par.children("td:nth-child(4)");
        var tdDelete = par.children("td:nth-child(5)");
        ConsequenceLevel.html(ConsequenceLevel.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Edit' spnType='consequenceEdit' consequence-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='consequenceCancel' consequence-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>")


    });
    $('#divManageControlsList').delegate('span[spnType="consequenceDelete"]', 'click', function () {
        var confirmation = confirm("are you sure you want to remove this consequences.");
           if (confirmation) {
            var par = $(this).parent().closest('tr');
            par.remove();
            var consequenceID = $(this).parent().closest('tr').attr("consequence-id");
            if (consequenceID && consequenceID > 0) {
                ConsequenceUtilities.DeleteConsequence(consequenceID);
            }
        }
    });
});


//--------------------------------Consequence-------------------------------------------------------------------//
ConsequenceUtilities = {

    GetConsequenceList: function (SettingControlID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/_Consequences", "GET", { settingControlID: SettingControlID }, true);
        AjaxResult.success(function (data) {
            $('#divManageControlsList').html(data);
            GeneralUtilities.ajaxindicatorstop();

        });
    },

    InsertConsequence: function (ConsequencesModel) {


        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/InsertConsequences", "POST", ConsequencesModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            ConsequenceUtilities.GetConsequenceList(ConsequenceUtilities.getSettingControlID());
        });

    },

    DeleteConsequence: function (consequenceID) {
        debugger;
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/DeleteConsequences", "POST", { consequenceID: consequenceID }, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            ConsequenceUtilities.GetConsequenceList(ConsequenceUtilities.getSettingControlID());
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
        $('#ConsequenceTable tbody').find('input[type="text"],input[type="password"],textarea,select').removeClass('error');
        $('#ConsequenceTable tbody').find('input[type="text"],input[type="password"],textarea').each(function () {
            if ($(this).attr('ismendatory') == "true") {

                if ($(this).val() == "") {
                    $(this).addClass('error');
                    IsValid = 0;
                }
            }
        });
        $('#ConsequenceTable tbody').find('select').each(function () {

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
