/// <reference path="genericfunctions.js" />


$(document).ready(function () {
    //------------------------------------------Likelihoods ------------------------------------------------//
    $("#btnAddNew").click(function () {
        $("#LikelihoodsTable tbody").append(
            "<tr><td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><input type='text' ismendatory='true'/></td>"
            + "<td><span title='Save' spnType='likelihoodSave' likelihood-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span></td>"
            + "<td><span title='Delete' spnType='likelihoodDelete' likelihood-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span></td>"
            + "</tr>");

    });

    ///--------------------------Save Likelihoods -------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="likelihoodSave"]', 'click', function () {


        var likelihoodID = $(this).parent().closest('tr').attr("likelihood-id");
        var LikelihoodsModel = {};
        var par = $(this).parent().closest('tr'); 
        var LikelihoodName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var tdEdit = par.children("td:nth-child(4)");
        var tdDelete = par.children("td:nth-child(5)");
        debugger;
        if (!LikelihoodsUtilities.IsValid())
            return false
        if (likelihoodID && likelihoodID > 0) {
            LikelihoodsModel.LikelihoodID = likelihoodID;
        } else {
            LikelihoodsModel.LikelihoodsID = 0;
        }

        LikelihoodsModel.SettingControlID = LikelihoodsUtilities.getSettingControlID();
        LikelihoodsModel.LikelihoodName = LikelihoodName.children("input[type=text]").val();
        LikelihoodsModel.Description = Description.children("input[type=text]").val();
        LikelihoodsModel.Weight = Weight.children("input[type=text]").val();



        LikelihoodName.html(LikelihoodName.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Delete' spnType='likelihoodEdit' likelihood-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Delete' spnType='likelihoodDelete' likelihood-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>");

        LikelihoodsUtilities.InsertLikelihoods(LikelihoodsModel);

    });

    ///--------------------------Edit Likelihoods-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="likelihoodEdit"]', 'click', function () {
        var par = $(this).parent().closest('tr'); //tr 
        var LikelihoodName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var tdSave = par.children("td:nth-child(4)");
        var tdDelete = par.children("td:nth-child(5)");

        LikelihoodName.html("<input type='text' ismendatory='true' value='" + LikelihoodName.html() + "'/>");
        Description.html("<input type='text' ismendatory='true' value='" + Description.html() + "'/>");
        Weight.html("<input type='text' ismendatory='true' value='" + Weight.html() + "'/>");
        tdSave.html("<span title='Save' spnType='likelihoodSave' likelihood-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='likelihoodCancel' likelihood-id='0' style='cursor: pointer'><i class='fa fa-refresh green-text'></i></span>")


    });
    ///--------------------------Cancel Likelihoods-------------------------------------------------//
    $('#divManageControlsList').delegate('span[spnType="likelihoodCancel"]', 'click', function () {
        var par = $(this).parent().closest('tr'); //tr 
        var LikelihoodName = par.children("td:nth-child(1)");
        var Description = par.children("td:nth-child(2)");
        var Weight = par.children("td:nth-child(3)");
        var tdEdit = par.children("td:nth-child(4)");
        var tdDelete = par.children("td:nth-child(5)");
        LikelihoodName.html(LikelihoodName.children("input[type=text]").val());
        Description.html(Description.children("input[type=text]").val());
        Weight.html(Weight.children("input[type=text]").val());
        tdEdit.html("<span title='Edit' spnType='likelihoodEdit' likelihood-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Cancel' spnType='likelihoodCancel' likelihood-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>")


    });
    $('#divManageControlsList').delegate('span[spnType="likelihoodDelete"]', 'click', function () {
        var confirmation = confirm("are you sure you want to remove this likelihoods.");
        if (confirmation) {
            var par = $(this).parent().closest('tr');
            par.remove();
            var likelihoodID = $(this).parent().closest('tr').attr("likelihood-id");
            if (likelihoodID && likelihoodID > 0) {
                LikelihoodsUtilities.DeleteLikelihoods(likelihoodID);
            }
        }
    });
});


//--------------------------------Likelihoods-------------------------------------------------------------------//
LikelihoodsUtilities = {

    GetLikelihoodsList: function (SettingControlID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/_Likelihoods", "GET", { settingControlID: SettingControlID }, true);
        AjaxResult.success(function (data) {
            $('#divManageControlsList').html(data);
            GeneralUtilities.ajaxindicatorstop();

        });
    },

    InsertLikelihoods: function (LikelihoodsModel) {


        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/InsertLikelihoods", "POST", LikelihoodsModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            LikelihoodsUtilities.GetLikelihoodsList(LikelihoodsUtilities.getSettingControlID());
        });

    },

    DeleteLikelihoods: function (likelihoodID) {
        debugger;
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/DeleteLikelihoods", "POST", { likelihoodsID: likelihoodID }, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            LikelihoodsUtilities.GetLikelihoodsList(LikelihoodsUtilities.getSettingControlID());
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
        $('#LikelihoodsTable tbody').find('input[type="text"],input[type="password"],textarea,select').removeClass('error');
        $('#LikelihoodsTable tbody').find('input[type="text"],input[type="password"],textarea').each(function () {
            if ($(this).attr('ismendatory') == "true") {

                if ($(this).val() == "") {
                    $(this).addClass('error');
                    IsValid = 0;
                }
            }
        });
        $('#LikelihoodsTable tbody').find('select').each(function () {

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
