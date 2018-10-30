/// <reference path="genericfunctions.js" />


$(document).ready(function () {
    //------------------------------------------Classifications ------------------------------------------------//
    $("#btnAddNew").click(function () {
        $("#ClassificationsTable tbody").append(
            "<tr><td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><span title='Save' spnType='classificationSave' classification-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span></td>"
            + "<td><span title='Delete' spnType='classificationDelete' classification-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span></td>"
            + "</tr>");

    });

    ///--------------------------Save Classifications -------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="classificationSave"]', 'click', function () {


        var classificationID = $(this).parent().closest('tr').attr("classification-id");
        var ClassificationsModel = {};
        var par = $(this).parent().closest('tr');
        var ClassificationName = par.children("td:nth-child(1)");
        var Abbreviation = par.children("td:nth-child(2)");
        var Description = par.children("td:nth-child(3)");
        var Weight = par.children("td:nth-child(4)");
        var tdEdit = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");
        debugger;
        if (!ClassificationsUtilities.IsValid())
            return false
        if (classificationID && classificationID > 0) {
            ClassificationsModel.ClassificationID = classificationID;
        } else {
            ClassificationsModel.ClassificationID = 0;
        }

        ClassificationsModel.SettingControlID = ClassificationsUtilities.getSettingControlID();
        ClassificationsModel.ClassificationName = ClassificationName.children("input[type=text]").val();
        ClassificationsModel.Abbreviation = Abbreviation.children("input[type=text]").val();
        ClassificationsModel.Description = Description.children("input[type=text]").val();
        ClassificationsModel.Weight = Weight.children("input[type=text]").val();



        ClassificationName.html(ClassificationName.children("input[type=text]").val());
        Abbreviation.html(Abbreviation.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Delete' spnType='classificationEdit' classification-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Delete' spnType='classificationDelete' classification-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>");

        ClassificationsUtilities.InsertClassification(ClassificationsModel);

    });

    ///--------------------------Edit Classifications-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="classificationEdit"]', 'click', function () {
        var par = $(this).parent().closest('tr'); //tr 
        var ClassificationName = par.children("td:nth-child(1)");
        var Abbreviation = par.children("td:nth-child(2)");
        var Description = par.children("td:nth-child(3)");
        var Weight = par.children("td:nth-child(4)");
        var tdSave = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");

        ClassificationName.html("<input type='text' ismendatory='true' value='" + ClassificationName.html() + "'/>");
        Abbreviation.html("<input type='text' ismendatory='true' value='" + Abbreviation.html() + "'/>");
        Description.html("<input type='text' ismendatory='true' value='" + Description.html() + "'/>");
        Weight.html("<input type='text' ismendatory='true' value='" + Weight.html() + "'/>");
        tdSave.html("<span title='Save' spnType='classificationSave' classification-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='classificationCancel' classification-id='0' style='cursor: pointer'><i class='fa fa-refresh green-text'></i></span>")


    });
    ///--------------------------Cancel Classifications-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="classificationCancel"]', 'click', function () {
        var par = $(this).parent().closest('tr'); //tr 
        var ClassificationName = par.children("td:nth-child(1)");
        var Abbreviation = par.children("td:nth-child(2)");
        var Description = par.children("td:nth-child(3)");
        var Weight = par.children("td:nth-child(4)");
        var tdEdit = par.children("td:nth-child(5)");
        var tdDelete = par.children("td:nth-child(6)");
        ClassificationName.html(ClassificationName.children("input[type=text]").val());
        Abbreviation.html(Abbreviation.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Edit' spnType='classificationEdit' classification-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='classificationCancel' classification-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>")


    });
    $('#divManageControlsList').delegate('span[spnType="classificationDelete"]', 'click', function () {
        var confirmation = confirm("are you sure you want to remove this classification.");
        if (confirmation) {
            var par = $(this).parent().closest('tr');
            par.remove();
            var classificationID = $(this).parent().closest('tr').attr("classification-id");
            if (classificationID && classificationID > 0) {
                ClassificationsUtilities.DeleteClassification(classificationID);
            }
        }
    });
});


//--------------------------------Classifications-------------------------------------------------------------------//
ClassificationsUtilities = {

    GetClassificationsList: function (SettingControlID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/_ClassificationsList", "GET", { settingControlID: SettingControlID }, true);
        AjaxResult.success(function (data) {
            $('#divManageControlsList').html(data);
            GeneralUtilities.ajaxindicatorstop();

        });
    },

    InsertClassification: function (ClassificationsModel) {


        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/InsertClassification", "POST", ClassificationsModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            ClassificationsUtilities.GetClassificationsList(ClassificationsUtilities.getSettingControlID());
        });

    },

    DeleteClassification: function (classificationID) {
        debugger;
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/DeleteClassification", "POST", { classificationID: classificationID }, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            ClassificationsUtilities.GetClassificationsList(ClassificationsUtilities.getSettingControlID());
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
        $('#ClassificationsTable tbody').find('input[type="text"],input[type="password"],textarea,select').removeClass('error');
        $('#ClassificationsTable tbody').find('input[type="text"],input[type="password"],textarea').each(function () {
            if ($(this).attr('ismendatory') == "true") {

                if ($(this).val() == "") {
                    $(this).addClass('error');
                    IsValid = 0;
                }
            }
        });
        $('#ClassificationsTable tbody').find('select').each(function () {

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
