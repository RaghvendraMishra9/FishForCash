/// <reference path="genericfunctions.js" />


$(document).ready(function () {
    //------------------------------------------StudentImpactLevels ------------------------------------------------//
    $("#btnAddNew").click(function () {
        $("#StudentImpactLevelsTable tbody").append(
            "<tr><td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><span title='Save' spnType='studentImpactLevelSave' studentImpactLevel-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span></td>"
            + "<td><span title='Delete' spnType='studentImpactLevelDelete' studentImpactLevel-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span></td>"
            + "</tr>");

    });

    ///--------------------------Save StudentImpactLevels -------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="studentImpactLevelSave"]', 'click', function () {


        var studentImpactLevelID = $(this).parent().closest('tr').attr("studentImpactLevel-id");
        var StudentImpactLevelsModel = {};
        var par = $(this).parent().closest('tr');
        var LevelName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var tdEdit = par.children("td:nth-child(4)");
        var tdDelete = par.children("td:nth-child(5)");
        debugger;
        if (!StudentImpactLevelsUtilities.IsValid())
            return false
        if (studentImpactLevelID && studentImpactLevelID > 0) {
            StudentImpactLevelsModel.StudentImpactLevelID = studentImpactLevelID;
        } else {
            StudentImpactLevelsModel.StudentImpactLevelID = 0;
        }

        StudentImpactLevelsModel.SettingControlID = StudentImpactLevelsUtilities.getSettingControlID();
        StudentImpactLevelsModel.LevelName = LevelName.children("input[type=text]").val();
        StudentImpactLevelsModel.Description = Description.children("input[type=text]").val();
        StudentImpactLevelsModel.Weight = Weight.children("input[type=text]").val();



        LevelName.html(LevelName.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Delete' spnType='studentImpactLevelEdit' studentImpactLevel-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Delete' spnType='studentImpactLevelDelete' studentImpactLevel-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>");

        StudentImpactLevelsUtilities.InsertStudentImpactLevels(StudentImpactLevelsModel);

    });

    ///--------------------------Edit StudentImpactLeves-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="studentImpactLevelEdit"]', 'click', function () {
        var par = $(this).parent().closest('tr'); //tr 
        var LevelName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var tdSave = par.children("td:nth-child(4)");
        var tdDelete = par.children("td:nth-child(5)");

        LevelName.html("<input type='text' ismendatory='true' value='" + LevelName.html() + "'/>");
        Description.html("<input type='text' ismendatory='true' value='" + Description.html() + "'/>");
        Weight.html("<input type='text' ismendatory='true' value='" + Weight.html() + "'/>");
        tdSave.html("<span title='Save' spnType='studentImpactLevelSave' studentImpactLevel-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='studentImpactLevelCancel' studentImpactLevel-id='0' style='cursor: pointer'><i class='fa fa-refresh green-text'></i></span>")


    });
    ///--------------------------Cancel StudentImpactLevels-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="studentImpactLevelCancel"]', 'click', function () {
        var par = $(this).parent().closest('tr'); //tr 
        var LevelName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var tdEdit = par.children("td:nth-child(4)");
        var tdDelete = par.children("td:nth-child(5)");
        LevelName.html(LevelName.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Edit' spnType='studentImpactLevelEdit' studentImpactLevel-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='studentImpactLevelCancel' studentImpactLevel-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>")


    });
    $('#divManageControlsList').delegate('span[spnType="studentImpactLevelDelete"]', 'click', function () {
        var confirmation = confirm("are you sure you want to remove this student Impact Levels.");
        if (confirmation) {
            var par = $(this).parent().closest('tr');
            par.remove();
            var studentImpactLevelID = $(this).parent().closest('tr').attr("studentImpactLevel-id");
            if (studentImpactLevelID && studentImpactLevelID > 0) {
                StudentImpactLevelsUtilities.DeleteStudentImpactLevels(studentImpactLevelID);
            }
        }
    });
});


//--------------------------------StudentImpactLevels-------------------------------------------------------------------//
StudentImpactLevelsUtilities = {

    GetStudentImpactLevelsList: function (SettingControlID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/_StudentImpactLevels", "GET", { settingControlID: SettingControlID }, true);
        AjaxResult.success(function (data) {
            $('#divManageControlsList').html(data);
            GeneralUtilities.ajaxindicatorstop();

        });
    },

    InsertStudentImpactLevels: function (StudentImpactLevelsModel) {


        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/InsertStudentImpactLevels", "POST", StudentImpactLevelsModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            StudentImpactLevelsUtilities.GetStudentImpactLevelsList(StudentImpactLevelsUtilities.getSettingControlID());
        });

    },

    DeleteStudentImpactLevels: function (studentImpactLevelID) {
        debugger;
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/DeleteStudentImpactLevels", "POST", { studentImpactLevelsID: studentImpactLevelID }, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            StudentImpactLevelsUtilities.GetStudentImpactLevelsList(StudentImpactLevelsUtilities.getSettingControlID());
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
        $('#StudentImpactLevelsTable tbody').find('input[type="text"],input[type="password"],textarea,select').removeClass('error');
        $('#StudentImpactLevelsTable tbody').find('input[type="text"],input[type="password"],textarea').each(function () {
            if ($(this).attr('ismendatory') == "true") {

                if ($(this).val() == "") {
                    $(this).addClass('error');
                    IsValid = 0;
                }
            }
        });
        $('#StudentImpactLevelsTable tbody').find('select').each(function () {

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
