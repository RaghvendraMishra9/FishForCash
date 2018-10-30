/// <reference path="genericfunctions.js" />
$(document).ready(function () {
    TargetUtilities.GetTargetList();
    $('#btnAddTarget').click(function () {
        TargetUtilities.ClearTargetField();
        $('#AddTarget').show();
        $('#ViewTarget').hide();
         $("#TargetID").val(0);
         $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");

    });

    $('#btnSaveTarget').click(function () {
        TargetUtilities.InsertTarget();
    });

    $('#divTargetList').delegate('td[tdtype="getTargetdetails"]', 'click', function () {
        $('#divTargetList').find('tr').removeClass('active');
        $(this).parent().closest('tr').addClass('active');
        $('#ViewTarget').show();
        $('#AddTarget').hide();
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        var TargetID = $(this).parent().closest('tr').attr("target-id");
        TargetUtilities.GetTargetByID(TargetID);
    });


    $('#divTargetList').delegate('span[spnType="targetEdit"]', 'click', function () {
        $('#ViewTarget').hide();
        $('#AddTarget').show();
        var TargetID = $(this).parent().closest('tr').attr("target-id");
        TargetUtilities.GetTargetByID(TargetID);

    });

    $('#divTargetList').delegate('span[spnType="targetDelete"]', 'click', function () {
        var TargetID = $(this).parent().closest('tr').attr("target-id");
        TargetUtilities.DeleteTarget(TargetID);
    });

    $('#btnCancelTarget').click(function () {
        $('#ViewTarget').hide();
        $('#AddTarget').hide();
        $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");
    });

    $('#btnRefreshTarget').click(function () {
        location.href = location.href;
        // CategoryUtilities.GetCategoryList();
    });
    $('#DivTargetList').delegate('input[type="search"]', 'keyup', function () {
        var value = $(this).val().toLowerCase();
        $("#TargetTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    });
});

TargetUtilities = {
    GetTargetList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Target/_TargetList", "GET", {}, true);
        AjaxResult.success(function (data) {
            $('#divTargetList').html(data);
            GeneralUtilities.ajaxindicatorstop();

        });
    },
    InsertTarget: function () {
        if (!TargetUtilities.IsValid('AddTarget'))
            return false;

        var TargetViewModel = {};
        TargetViewModel.TargetID = $("#TargetID").val();
        TargetViewModel.TargetReference = $("#txtTargetReference").val();
        TargetViewModel.TargetTitle = $("#txtTargetName").val();
        TargetViewModel.TargetDescription = $("#txtTargetDescription").val();

        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Target/Index", "POST", TargetViewModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            TargetUtilities.HideAddTarget();
            TargetUtilities.GetTargetList();
            TargetUtilities.ClearTargetField();
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
    HideAddTarget: function () {
        $('#AddTarget').hide();
        $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");
    },
    GetTargetByID: function (TargetID) {

        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Target/GetTargetById", "GET", { id: TargetID }, true);
        AjaxResult.success(function (data) {
            //for view------------------------
            $("#lblReference").text(data.targetReference);
            $("#lblTargetName").text(data.targetTitle);
            $("#lblTargetDescription").text(data.targetDescription);
           
            // for edit----------------------
            $("#txtTargetReference").val(data.targetReference);
            $("#txtTargetName").val(data.targetTitle);
            $("#txtTargetDescription").val(data.targetDescription);
           
            $("#TargetID").val(data.targetID);
          
            GeneralUtilities.ajaxindicatorstop();

        });
    },
    DeleteTarget: function (TargetID) {
        var confirmation = confirm("are you sure you want to remove this target?");
        if (confirmation) {
            var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Target/DeleteTarget", "POST", { id: TargetID }, true);
            AjaxResult.success(function (data) {
                GeneralUtilities.ajaxindicatorstop();
                TargetUtilities.GetTargetList();
                $('#ViewTarget').hide();
                $('#AddTarget').hide();
                $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");
            });
        }

    },
    ClearTargetField: function () {
        $("#txtTargetReference").val("");
        $("#txtTargetName").val("");
        $("#txtTargetDescription").val("");
        $("#txtTargetName").removeClass('error');
        $("#txtTargetName").removeClass('error');
    }
}