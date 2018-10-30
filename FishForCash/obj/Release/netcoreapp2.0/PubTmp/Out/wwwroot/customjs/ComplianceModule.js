/// <reference path="genericfunctions.js" />
$(document).ready(function () {
    $("#btnEditCompliance").hide();
    $("#btnDeleteCompliance").hide();
    ComplianceModuleUtilities.GetComplianceList();
    ComplianceModuleUtilities.GetClassificationList();

    $('#ddlRoles').multiselect();
    $('#ddlGroups').multiselect();

    $('#btnAddCompliance').click(function () {
        $('#AddCompliance').show();
        $("#ComplianceID").val(0);
        $('#lblSoA').show();
        $('#ddlSoA').show();
        $('#lblTRA').show();
        $('#ddlTRA').show();
        $('#chkTemplate').show();
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        ComplianceModuleUtilities.ClearComplianceField();
    });

    $('#btnEditCompliance').click(function () {
        var ComplianceID = $(this).attr("edit-id");
        $('#lblSoA').hide();
        $('#ddlSoA').hide();
        $('#lblTRA').hide();
        $('#ddlTRA').hide(); 
        $('#divTemplate').hide();
        $('#AddCompliance').show();
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        ComplianceModuleUtilities.GetComplianceByID(ComplianceID);
    });

    $('#divComplianceList').delegate('td[tdtype="getComplianceDetails"]', 'click', function () {
         if ($(this).parent().closest('tr').hasClass('active')) {
            $(this).find('input[type=checkbox]').prop('checked', false);
            $('#divComplianceList').find('tr').removeClass('active');
            $('#AddCompliance').hide();
            $("#btnEditCompliance").hide();
            $("#btnDeleteCompliance").hide();
            $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12 TreeDiv");
        }
        else {
            $('#divComplianceList').find('tr').removeClass('active');
            $('li').find('input[type=checkbox]').prop('checked', false);
            $(this).find('input[type=checkbox]').prop('checked', true);
            $(this).parent().closest('tr').addClass('active');
           // $('#AddCompliance').show();
            $("#btnEditCompliance").show();
            $("#btnDeleteCompliance").show();
            $("#btnEditCompliance").attr("edit-id", $(this).parent().closest('tr').attr("complianceid-id"));
            $("#btnDeleteCompliance").attr("delete-id", $(this).parent().closest('tr').attr("complianceid-id"));
          // $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
            var complianceID = $(this).parent().closest('tr').attr("complianceid-id");
            //ComplianceModuleUtilities.GetComplianceByID(complianceID);
        }

    });

    $('#btnSaveCompliance').click(function () {
        ComplianceModuleUtilities.InsertCompliance();
    });
    $('#btnCancelCompliance').click(function () {
        $('#AddCompliance').hide();
        $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");
        ComplianceModuleUtilities.ClearComplianceField();
    });
 });

ComplianceModuleUtilities = {
    GetComplianceList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Compliance/_ComplianceList", "GET", {}, true);
        AjaxResult.success(function (data) {
            $('#divComplianceList').html(data);
            GeneralUtilities.ajaxindicatorstop();
        });
    },

    GetClassificationList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Compliance/GetClassificationList", "GET", {}, false);
        AjaxResult.success(function (data) {
            GeneralUtilities.BindDropdownGeneric('#ddlClassification', data);
            GeneralUtilities.ajaxindicatorstop();
        });
    },
    GetComplianceByID: function (complianceID) {

        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Compliance/GetComplianceByID", "GET", { id: complianceID }, true);
        AjaxResult.success(function (data) {
            $("#ComplianceID").val(data.complianceID);
            $("#txtName").val(data.name);
            $("#txtDescription").val(data.description);
            //$("#ddlRoles").text(data.roles);
            //$("#ddlGroups").text(data.roles);
            $("#ddlClassification").val(data.classificationID);
             GeneralUtilities.ajaxindicatorstop();

        });
    },

    InsertCompliance: function () {
            if (!ComplianceModuleUtilities.IsValid('AddCompliance'))
            return false;
        var ComplianceModuleModel = {};
        ComplianceModuleModel.ComplianceID = $("#ComplianceID").val();
        ComplianceModuleModel.Name = $("#txtName").val();
        ComplianceModuleModel.Description = $("#txtDescription").val();
        ComplianceModuleModel.Template = $('#chkTemplate').is(":checked") ? true : false;
        ComplianceModuleModel.Roles = $("#ddlRoles").val();//.find('option:selected').text();
        ComplianceModuleModel.Groups = $("#ddlGroups").find('option:selected').text();
        ComplianceModuleModel.ClassificationID = $("#ddlClassification").val();;
        ComplianceModuleModel.TRA = $("#ddlTRA").val();
        ComplianceModuleModel.SoATemplate = $("#ddlSoA").val();
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Compliance/AddCompliance", "POST", ComplianceModuleModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            ComplianceModuleUtilities.HideAddCompliance();
            ComplianceModuleUtilities.GetComplianceList();
            ComplianceModuleUtilities.ClearComplianceField();
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
    HideAddCompliance: function () {
        $('#AddCompliance').hide();
        $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");
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
    ClearComplianceField: function () {
        $("#txtName").val("");
        $("#txtDescription").val("");
        $("#txtDescription").val("");
        $('#ddlRoles').multiselect('deselectAll', false);
        $('#ddlRoles').multiselect('updateButtonText');
        $('#ddlGroups').multiselect('deselectAll', false);
        $('#ddlGroups').multiselect('updateButtonText');
        $("#ddlTR").val("-1");
        $("#AddlSoA").val("-1");
        $("#ddlClassification").val("-1");
        $("#txtName").removeClass('error');
        
    },

    getComplianceID: function () {
        var GetSelectedNode = $('#divComplianceList').find('tr.active');
        var GetSelectedNode = $('#divComplianceList').find('tr.active');
        if ($(GetSelectedNode).length > 0)
            return $(GetSelectedNode).attr('complianceid-id');
        return 0;
    },

}