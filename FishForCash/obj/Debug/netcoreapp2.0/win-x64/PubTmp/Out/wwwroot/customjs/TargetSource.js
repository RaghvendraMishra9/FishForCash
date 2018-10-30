/// <reference path="genericfunctions.js" />
$(document).ready(function () {
    TargetSourceUtilities.GetTargetSourceList();

    $("#txtTargetSourceDescription").Editor();
    $("#lblTargetSourceDescription").Editor();

    $('#btnAddTargetSource').click(function () {
        TargetSourceUtilities.ClearTargetSourceField();
        $('#AddTargetSource').show();
        $('#ViewTargetSource').hide();
        $("#TargetSourceID").val(0);
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");

    });

    $('#btnSaveTargetSource').click(function () {
        TargetSourceUtilities.InsertTargetSource();
    });

    $('#divTargetSourceList').delegate('td[tdtype="getTargetSourcedetails"]', 'click', function () {
        debugger;
        $('#divTargetSourceList').find('tr').removeClass('active');
        $(this).parent().closest('tr').addClass('active');
        $('#ViewTargetSource').show();
        $('#AddTargetSource').hide();
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        var TargetSourceID = $(this).parent().closest('tr').attr("targetSource-id");
        TargetSourceUtilities.GetTargetSourceByID(TargetSourceID);
    });


    $('#divTargetSourceList').delegate('span[spnType="targetSourceEdit"]', 'click', function () {
        $('#ViewTargetSource').hide();
        $('#AddTargetSource').show();
        var TargetSourceID = $(this).parent().closest('tr').attr("targetSource-id");
        TargetSourceUtilities.GetTargetSourceByID(TargetSourceID);
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");

    });

    $('#divTargetSourceList').delegate('span[spnType="targetSourceDelete"]', 'click', function () {
        var TargetSourceID = $(this).parent().closest('tr').attr("targetSource-id");
        TargetSourceUtilities.DeleteTargetSource(TargetSourceID);
    });

    $('#btnCancelTargetSource').click(function () {
        $('#ViewTargetSource').hide();
        $('#AddTargetSource').hide();
        $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");
    });

    $('#btnRefreshTargetSource').click(function () {
        location.href = location.href;
        // CategoryUtilities.GetCategoryList();
    });
    $('#DivTargetSourceList').delegate('input[type="search"]', 'keyup', function () {
        var value = $(this).val().toLowerCase();
        $("#TargetSourceTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    });
});

TargetSourceUtilities = {
    GetTargetSourceList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TargetSource/_TargetSourceList", "GET", {}, true);
        AjaxResult.success(function (data) {
            $('#divTargetSourceList').html(data);
            GeneralUtilities.ajaxindicatorstop();

        });
    },
    InsertTargetSource: function () {
        if (!TargetSourceUtilities.IsValid('AddTargetSource'))
            return false;

        var TargetSourceViewModel = {};
        TargetSourceViewModel.TargetSourceID = $("#TargetSourceID").val();
        TargetSourceViewModel.TargetSourceReference = $("#txtTargetSourceReference").val();
        TargetSourceViewModel.TargetSourceTitle = $("#txtTargetSourceName").val();
        TargetSourceViewModel.TargetSourceDescription = $("#txtTargetSourceDescription").Editor("getText");

        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TargetSource/Index", "POST", TargetSourceViewModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            TargetSourceUtilities.HideAddTargetSource();
            TargetSourceUtilities.GetTargetSourceList();
            TargetSourceUtilities.ClearTargetSourceField();
        });

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
    HideAddTargetSource: function () {
        $('#AddTargetSource').hide();
        $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");
    },
    GetTargetSourceByID: function (TargetSourceID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TargetSource/GetTargetSourceById", "GET", { id: TargetSourceID }, true);
        AjaxResult.success(function (data) {
            //for view------------------------
            $("#lblReference").text(data.targetSourceReference);
            $("#lblTargetSourceName").text(data.targetSourceTitle);
            $("#lblTargetSourceDescription").Editor("setText", data.targetSourceDescription);

            // for edit----------------------
            $("#txtTargetSourceReference").val(data.targetSourceReference);
            $("#txtTargetSourceName").val(data.targetSourceTitle);
            $("#txtTargetSourceDescription").Editor("setText", data.targetSourceDescription);
            $("#TargetSourceID").val(data.targetSourceID);

            GeneralUtilities.ajaxindicatorstop();

        });
    },
    DeleteTargetSource: function (TargetSourceID) {
        var confirmation = confirm("Are you sure you want to remove this target source?");
        if (confirmation) {
            var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TargetSource/DeleteTargetSource", "POST", { id: TargetSourceID }, true);
            AjaxResult.success(function (data) {
                GeneralUtilities.ajaxindicatorstop();
                TargetSourceUtilities.GetTargetSourceList();
                $('#ViewTargetSource').hide();
                $('#AddTargetSource').hide();
                $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");
            });
        }

    },
    ClearTargetSourceField: function () {
        $("#txtTargetSourceReference").val("");
        $("#txtTargetSourceName").val("");
        $("#txtTargetSourceDescription").Editor("setText", "");
        $("#txtTargetSourceName").removeClass('error');
        $("#txtTargetSourceName").removeClass('error');
    }
}