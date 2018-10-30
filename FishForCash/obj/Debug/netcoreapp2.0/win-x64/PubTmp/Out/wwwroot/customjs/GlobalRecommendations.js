/// <reference path="genericfunctions.js" />
$(document).ready(function () {
    $("#txtDescription").Editor();
    $("#btnEditGlobalRec").hide();
    $("#btnDeleteGlobalRec").hide();
    $("#btnViewGlobalRec").hide();
    
    GlobalRecModuleUtilities.GetGlobalRecList();
    
    //-------------------Add Student security plan---------------------------//
    $('#btnAddGlobalRec').click(function () {
        $('#AddGlobalRec').show();
        $('#ViewGlobalRec').hide();
        $("#GlobalRecID").val(0);
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        $("#AddEditGlobalRecommendation h2").html("New  Global recommendation");
        GlobalRecModuleUtilities.ClearGlobalRecFields();
    });
    //------------------View GlobalRec------------------------//
    $('#btnViewGlobalRec').click(function () {
        $('#AddGlobalRec').hide();
        $('#ViewGlobalRec').show();
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        var GlobalRecID = $(this).attr("view-id");
        GlobalRecModuleUtilities.GetGlobalRecByID(GlobalRecID);
    });
    //------------------EDIT GlobalRec------------------------//
    $('#btnEditGlobalRec').click(function () {
        var GlobalRecID = $(this).attr("edit-id");
        $('#AddGlobalRec').show();
        $('#ViewGlobalRec').hide();
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        $("#AddEditGlobalRecommendation h2").html("Edit Global recommendation");
        GlobalRecModuleUtilities.GetGlobalRecByID(GlobalRecID);
    });

    //------------------Delete GlobalRec------------------------//
    $('#btnDeleteGlobalRec').click(function () {
        var GlobalRecID = $(this).attr("delete-id");
        GlobalRecModuleUtilities.DeleteGlobalRecField(GlobalRecID);
    });

    $('#divGlobalRecList').delegate('td[tdtype="getGlobalRecDetails"]', 'click', function (e) {
        e.preventDefault();
        if ($(this).parent().closest('tr').hasClass('active')) {
            $('#divGlobalRecList').find('tr input[type="checkbox"]').prop('checked', false);
            $('#divGlobalRecList').find('tr').removeClass('active');
            $('#AddGlobalRec').hide();
            $('#ViewGlobalRec').hide();
            $("#btnEditGlobalRec").hide();
            $("#btnDeleteGlobalRec").hide();
            $("#btnViewGlobalRec").hide();
            $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");
        }
        else {
            $('#divGlobalRecList').find('tr').removeClass('active');
            $('#divGlobalRecList').find('tr input[type="checkbox"]').prop('checked', false);
            $('#divGlobalRecList').find('tr').find('td:eq(0) input[type="checkbox"]').prop('checked', false);
            $(this).parent().closest('tr').addClass('active');
            $(this).parent().closest('tr').find('td:eq(0) input[type="checkbox"]').prop('checked', true);
            $('#AddGlobalRec').hide();
            $('#ViewGlobalRec').hide();
            $("#btnEditGlobalRec").show();
            $("#btnDeleteGlobalRec").show();
            $("#btnViewGlobalRec").show();
            $("#btnViewGlobalRec").attr("view-id", $(this).parent().closest('tr').attr("GlobalRec-id"));
            $("#btnEditGlobalRec").attr("edit-id", $(this).parent().closest('tr').attr("GlobalRec-id"));
            $("#btnDeleteGlobalRec").attr("delete-id", $(this).parent().closest('tr').attr("GlobalRec-id"));
            $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");

        }
    });
    //------------------Save Student security plan---------------------------//
    $('#btnSaveGlobalRec').click(function () {
        GlobalRecModuleUtilities.InsertGlobalRec();
    });
    //----------------Cancel GlobalRec---------------------------------------------//
    $('#btnCancelGlobalRec').click(function () {
        GlobalRecModuleUtilities.HideAddGlobalRec();
        GlobalRecModuleUtilities.ClearGlobalRecFields();
    });
    $('#btnRefreshGlobalRec').click(function () {
        location.href = location.href;
    });

    $('#DivGlobalRecList').delegate('input[type="search"]', 'keyup', function () {
        var value = $(this).val().toLowerCase();
        $("#GlobalRecTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    });

});

GlobalRecModuleUtilities = {
    GetGlobalRecList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/GlobalRecommendations/_GlobalRecommendationsList", "GET", {}, true);
        AjaxResult.success(function (data) {
            $('#divGlobalRecList').html(data);
            GeneralUtilities.ajaxindicatorstop();
        });
    },
   
    InsertGlobalRec: function () {
        if (!GlobalRecModuleUtilities.IsValid('AddEditGlobalRecommendation'))
            return false;
        var GlobalRecommendationsModel = {};
        debugger;
        GlobalRecommendationsModel.GlobalRecID = $("#GlobalRecID").val();
        GlobalRecommendationsModel.RecommendationNumber = $("#txtRecommendationNumber").val();
        GlobalRecommendationsModel.Name = $("#txtName").val();
        GlobalRecommendationsModel.Description = $("#txtDescription").Editor("getText");

       
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/GlobalRecommendations/AddGlobalRec", "POST", GlobalRecommendationsModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            GlobalRecModuleUtilities.GetGlobalRecList();
            GlobalRecModuleUtilities.HideAddGlobalRec();
            GlobalRecModuleUtilities.ClearGlobalRecFields();
        });

    },

    ClearGlobalRecFields: function () {
        $("#txtRecommendationNumber").val("").removeClass('error');
        $("#txtName").val("").removeClass('error');
        $("#txtDescription").Editor("setText", "");
    },

    GetGlobalRecByID: function (GlobalRecID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/GlobalRecommendations/GetGlobalRecById", "GET", { id: GlobalRecID }, true);
        AjaxResult.success(function (data) {
            debugger;
            ///-------for edit---------//
            $("#GlobalRecID").val(data.globalRecID);
            $("#txtRecommendationNumber").val(data.recommendationNumber);
            $("#txtName").val(data.name);
            $("#txtDescription").Editor("setText", data.description);
        
            ///---- for view -------////
            $("#lblRecNumber").text(data.recommendationNumber);
            $("#lblName").text(data.name);
            //$("#lblDescription").text(data.description);
            GeneralUtilities.ajaxindicatorstop();

        });
    },
    DeleteGlobalRecField: function (GlobalRecID) {
        var confirmation = confirm("are you sure want to remove this Global Recommendtion?");
        if (confirmation) {
            var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/GlobalRecommendations/DeleteGlobalRec", "POST", { id: GlobalRecID }, true);
            AjaxResult.success(function (data) {
                GeneralUtilities.ajaxindicatorstop();
                GlobalRecModuleUtilities.GetGlobalRecList();
                $("#btnEditGlobalRec").hide();
                $("#btnDeleteGlobalRec").hide();
                $("#btnViewGlobalRec").hide();
            });
        }

    },

    IsValid: function (divid) {
        var IsValid = 1;
        $('#' + divid + '').find('input[type="text"],input[type="password"],textarea,select').removeClass('error');
        $('#' + divid + '').find('input[type="text"],input[type="password"],textarea').each(function () {
            if ($(this).attr('ismendatory') == "true") {

                if ($(this).val() == "") {
                    $(this).addClass('error');
                    IsValid = 0;
                }
            }
        });
        $('#' + divid + '').find('select').each(function () {

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

    HideAddGlobalRec: function () {
        $('#AddGlobalRec').hide();
        $('#ViewGlobalRec').hide();
        $("#btnEditGlobalRec").hide();
        $("#btnDeleteGlobalRec").hide();
        $("#btnViewGlobalRec").hide();
        $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12 TreeDiv");
    },
}