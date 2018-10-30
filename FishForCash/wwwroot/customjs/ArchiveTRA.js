/// <reference path="genericfunctions.js" />
$(document).ready(function () {

    $('#ddlRoles').multiselect();
    $('#ddlGroups').multiselect();
    $("#btnViewTRA").hide();
   
    TRAModuleUtilities.GetTRAList();
    TRAModuleUtilities.GetClassificationList();
    TRAModuleUtilities.GetSOAList();
 
    //------------------View TRA------------------------//
    $('#btnViewTRA').click(function () {
        $('#ViewTRA').show();
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        var TRAID = $(this).attr("view-id");
        TRAModuleUtilities.GetTRAByID(TRAID);
    });

    $('#DivTRAList').delegate('td[tdtype="getTRADetails"]', 'click', function (e) {
        e.preventDefault();
        if ($(this).parent().closest('tr').hasClass('active')) {
            $('#DivTRAList').find('tr input[type="checkbox"]').prop('checked', false);
            $('#DivTRAList').find('tr').removeClass('active');
            $('#AddTRA').hide();
            $('#ViewTRA').hide();
            $("#btnEditTRA").hide();
            $("#btnDeleteTRA").hide();
            $("#btnViewTRA").hide();
            $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");
        }
        else {
            $('#DivTRAList').find('tr').removeClass('active');
            $('#DivTRAList').find('tr input[type="checkbox"]').prop('checked', false);
            $('#DivTRAList').find('tr').find('td:eq(0) input[type="checkbox"]').prop('checked', false);
            $(this).parent().closest('tr').addClass('active');
            $(this).parent().closest('tr').find('td:eq(0) input[type="checkbox"]').prop('checked', true);
            $('#AddTRA').hide();
            $('#ViewTRA').hide();
            $("#btnEditTRA").show();
            $("#btnDeleteTRA").show();
            $("#btnViewTRA").show();
            $("#btnViewTRA").attr("view-id", $(this).parent().closest('tr').attr("TRA-id"));
            $("#btnEditTRA").attr("edit-id", $(this).parent().closest('tr').attr("TRA-id"));
            $("#btnDeleteTRA").attr("delete-id", $(this).parent().closest('tr').attr("TRA-id"));
            $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");

        }
    });
    
    $('#btnRefreshTRA').click(function () {
        location.href = location.href;
    });

    $('#DivTRAList').delegate('input[type="search"]', 'keyup', function () {
        var value = $(this).val().toLowerCase();
        $("#TRATable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    });
});

TRAModuleUtilities = {
    GetTRAList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/ArchiveTRA/_ArchiveTRAList", "GET", {}, true);
        AjaxResult.success(function (data) {
            debugger;
            $('#divArchiveTRAList').html(data);
            GeneralUtilities.ajaxindicatorstop();
        });
    },
   
    GetTRAByID: function (TRAID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/ArchiveTRA/GetTRAById", "GET", { id: TRAID }, true);
        AjaxResult.success(function (data) {
            var dataClassification = data.classification;
            if (dataClassification != null) {
                var dataClassificationArray = dataClassification.split(",");
                $("#ddlClassification").val(dataClassificationArray);
                $("#ddlClassification").multiselect("refresh");
            } else {
                $('#ddlClassification').multiselect('deselectAll', false);
                $('#ddlClassification').multiselect('updateButtonText');
            }
            var dataRoles = data.roles;
            if (dataRoles != null) {
                var dataRolesArray = dataRoles.split(",");
                $("#ddlRoles").val(dataRolesArray);
                $("#ddlRoles").multiselect("refresh");
            } else {
                $('#ddlRoles').multiselect('deselectAll', false);
                $('#ddlRoles').multiselect('updateButtonText');
            }
            var dataGroups = data.groups;
            if (dataGroups != null) {
                var dataGroupsArray = dataGroups.split(",");
                $("#ddlGroups").val(dataGroupsArray);
                $("#ddlGroups").multiselect("refresh");
            }
            else {
                $('#ddlGroups').multiselect('deselectAll', false);
                $('#ddlGroups').multiselect('updateButtonText');
            }
            var dataLinkToSOAID = data.createFromSOATemplate;
            if (dataLinkToSOAID != null) {
                var dataLinkToSOAIDArray = dataLinkToSOAID.split(",");
                $("#ddlLinkToSoA").val(dataLinkToSOAIDArray);
                $("#ddlLinkToSoA").multiselect("refresh");
            }
            else {
                $('#ddlLinkToSoA').multiselect('deselectAll', false);
                $('#ddlLinkToSoA').multiselect('updateButtonText');
            }

            $("#lblName").text(data.name);
            $("#lblScopeOfTheAssessment").text(data.scopeTRA);
            $("#lblWhatHasBeenAssessed").text(data.assessedTRA);
            $("#lblSummaryOfAssessment").text(data.summary);
            $("#lblType").text(data.type);

            var roles = [];
            var groups = [];
            var linkToSOAID = [];
            var classification = [];

            $("#ddlRoles option:selected").each(function () {
                roles.push(this.text);
            });
            $('#lblRoles').text(roles.join(','));

            $("#ddlGroups option:selected").each(function () {
                groups.push(this.text);
            });
            $('#lblGroups').text(groups.join(','));

            $("#ddlClassification option:selected").each(function () {
                classification.push(this.text);
            });
            $("#lblClassification").text(classification.join(','));
            debugger;
            $("#ddlLinkToSoA option:selected").each(function () {
                linkToSOAID.push(this.text);
            });
            $("#lblLinkToSOA").text(linkToSOAID.join(','));

            GeneralUtilities.ajaxindicatorstop();

        });
    },
   
    GetClassificationList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/StudentSecurityPlan/GetClassification", "GET", {}, false);
        AjaxResult.success(function (data) {
            GeneralUtilities.BindMultipleDropdownGeneric('#ddlClassification', data);
            GeneralUtilities.ajaxindicatorstop();
            $('#ddlClassification').multiselect();
        });
    },
    GetSOAList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/StudentSecurityPlan/GetSOAList", "GET", {}, false);
        AjaxResult.success(function (data) {
            GeneralUtilities.BindMultipleDropdownGeneric('#ddlLinkToSoA', data);
            GeneralUtilities.ajaxindicatorstop();
            $('#ddlLinkToSoA').multiselect();
        });
    },

}