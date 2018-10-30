/// <reference path="genericfunctions.js" />

$(document).ready(function () {
    if ($('#ExemptiongrantedNo').is(":checked")) {
        $("#single_cal3").attr("disabled", "disabled");
        $("#single_calEndDate").attr("disabled", "disabled");
    } else {
        $("#single_cal3").removeAttr("disabled");
        $("#single_calEndDate").removeAttr("disabled");
    }

    $('#AddApplicabilityDiv').delegate('.exemption-Check', 'click', function () {
        $('.exemption-Check').not(this).attr('checked', false);
        if ($('#ExemptiongrantedNo').is(":checked")) {
            $("#single_cal3").attr("disabled", "disabled");
            $("#single_calEndDate").attr("disabled", "disabled");
        } else {
            $("#single_cal3").removeAttr("disabled");
            $("#single_calEndDate").removeAttr("disabled");
        }
    });
    $('#AddApplicabilityDiv').delegate('.applicable-Check', 'click', function () {
        $('.applicable-Check').not(this).attr('checked', false);
    });
    ApplicabilityUtilities.ComplianceLevelDropdownList();

    $('#divDragControlLibraries').delegate('li[litype="dragLi"]', 'click', function (evt) {
        var controlId = $(this).attr("id");
        var valueType = $(this).attr("valuetype");
        if (valueType == "C") {
            $('li').removeClass('active');
            $(this).addClass('active');
            if (controlId > 0) {
                ControlRecommendationUtilities.GetLibraryControlInfo(controlId);
                ApplicabilityUtilities.GetApplicabilityInfo(controlId);
                LinkWithRecommendation.GetSOALinkWithRecommendationList(controlId);
                ControlRecommendationUtilities.GetSOARecommendationList(controlId);
                $('#div3').css('visibility', 'unset');
                if ($(div3).css('display') == 'none') {
                    $('#div3').toggle();
                    $('#div4').toggle();
                    $('#btnAssetsCollap >i').toggleClass("fa fa-angle-double-right fa fa-angle-double-left");
                }
            }
        }
    });

    $('#btnCreateSOACollap').click(function () {
        $('#AddApplicabilityDiv').toggle();
        $('#addSOARecommendation').toggle();
        $('#btnCreateSOACollap').hide();
    });

    //---------------------------------------SOA Recommendations-------------------------------------//
    $('#ddlSOARoles').multiselect();
    $('#ddlSOAGroups').multiselect();

    $('#btnCreateSOARecommendation').click(function () {
        $('#AddApplicabilityDiv').hide();
        $('#divCreateSOACollap').show();
        $('#addSOARecommendation').show();
        $('#SOARecommendationDiv').hide();
        $('#btnCreateSOACollap').show();
        $("#RecommendationID").val(0);
        ControlRecommendationUtilities.ClearSOARecommendationField();
    });
    $('#btnCancelSOARecommendation').click(function () {
        $('#addSOARecommendation').hide();
    });

    $('#btnAddSOARecommendation').click(function () {
        ControlRecommendationUtilities.InsertSOARecommendation();
    });
    $('#btnLinkWithRecommendations').click(function () {
        $('#SOARecommendationDiv').show();
        $('#addSOARecommendation').hide();

    });

    //--------------------------------------SOA Applicability------------------------------------//
    $('#btnAddApplicable').click(function () {
        var libControlID = ApplicabilityUtilities.getLibraryControlID();
        if (libControlID == 0) {
            alert('Please select library control');
            return;
        }
        else {
            ApplicabilityUtilities.InsertSOAApplicability(libControlID);
        }
    });
    //-----------------------------------SOA Link with Recommendation-------------------------------//
    $('#divSOARecommendationList').delegate('td[tdtype="getRecommendationDetails"]', 'click', function () {

        $('#divSOARecommendationList').find('tr').removeClass('active');
        $('#divSOARecommendationList').find('tr input[type="checkbox"]').prop('checked', false);
        $('#divSOARecommendationList').find('tr').find('td:eq(0) input[type="checkbox"]').prop('checked', false);
        $(this).parent().closest('tr').addClass('active');
        $(this).parent().closest('tr').find('td:eq(0) input[type="checkbox"]').prop('checked', true);

        var sOARecommendationID = $(this).parent().closest('tr').attr("recommendationid-id");
        var RecommendationName = $(this).parent().closest('tr').find('td:eq(2)').text();
        var libControlID = ApplicabilityUtilities.getLibraryControlID();
        if (libControlID == 0) {
            alert('Please select library control');
            return;
        }
        else {
            SOALinkWithRecommendationID = 0;
            LinkWithRecommendation.InsertSOALinkWithRecommendation(libControlID, sOARecommendationID, RecommendationName, SOALinkWithRecommendationID);
            $(this).parent().closest('tr').remove();
        }
    });
    $('#divSOALinkWithRecommendationList').delegate('span[spnType="linkWithRecommendationDelete"]', 'click', function () {
        var linkwithrecommendationID = $(this).parent().closest('tr').attr("linkwithrecommendation-id");
        LinkWithRecommendation.DeleteSOALinkWithRecommendation(linkwithrecommendationID);
    });

    ///--------------------------Edit link With Recommendation-------------------------------------------------//
    $('#divSOALinkWithRecommendationList').delegate('span[spnType="linkWithRecommendationEdit"]', 'click', function () {
        var par = $(this).parent().closest('tr');
        var recommendation = par.children("td:nth-child(1)");
        var tdSave = par.children("td:nth-child(2)");
        var tdCancel = par.children("td:nth-child(3)");
        recommendation.html("<input type='text' ismendatory='true' value='" + recommendation.html() + "'/>");
        tdSave.html("<span title='Save' spnType='linkWithRecommendationSave' linkWithRecommendation-id='0' style='cursor: pointer'><i class='fa fa-save green-text'></i></span>");
        tdCancel.html("<span title='Cancel' spnType='linkWithRecommendationCancel' linkWithRecommendation-id style='cursor: pointer'><i class='fa fa-refresh green-text'></i></span>")


    });
    ///--------------------------Cancel link With Recommendation-------------------------------------------------//
    $('#divSOALinkWithRecommendationList').delegate('span[spnType="linkWithRecommendationCancel"]', 'click', function () {
        var par = $(this).parent().closest('tr');
        var recommendation = par.children("td:nth-child(1)");
        var tdEdit = par.children("td:nth-child(2)");
        var tdDelete = par.children("td:nth-child(3)");
        recommendation.html(recommendation.children("input[type=text]").val());
        tdEdit.html("<span title='Edit' spnType='linkWithRecommendationEdit' linkWithRecommendation-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Delete' spnType='linkWithRecommendationDelete' linkWithRecommendation-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>")
    });
    ///--------------------------Save link With Recommendation-------------------------------------------------//
    $('#divSOALinkWithRecommendationList').delegate('span[spnType="linkWithRecommendationSave"]', 'click', function () {
        var libControlID = ApplicabilityUtilities.getLibraryControlID();
        var sOARecommendationID = $(this).parent().closest('tr').attr("recommendation-id");
        var SOALinkWithRecommendationID = $(this).parent().closest('tr').attr("linkwithrecommendation-id");
        if (!ComplianceModuleUtilities.IsValid('divSOALinkWithRecommendationList'))
            return false

        var par = $(this).parent().closest('tr');
        var recommendation = par.children("td:nth-child(1)");
        var tdEdit = par.children("td:nth-child(2)");
        var tdDelete = par.children("td:nth-child(3)");
        var Recommendation = recommendation.children("input[type=text]").val();
        recommendation.html(recommendation.children("input[type=text]").val());
        tdEdit.html("<span title='Edit' spnType='linkWithRecommendationEdit' linkWithRecommendation-id='0' style='cursor: pointer'><i class='fa fa-edit green-text'></i></span>");
        tdDelete.html("<span title='Delete' spnType='linkWithRecommendationDelete' linkWithRecommendation-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>")

        if (libControlID == 0) {
            alert('Please select library control');
            return;
        }
        else {
            LinkWithRecommendation.UpdateSOALinkWithRecommendation(sOARecommendationID, Recommendation, SOALinkWithRecommendationID);
        }
    });
});



ControlRecommendationUtilities = {

    GetSOARecommendationList: function (controlID) {
        var ComplianceID = ComplianceModuleUtilities.getActiveSoAComplianceID();
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Compliance/_SOARecommendationList", "GET", { complianceID: ComplianceID, libControlID: controlID }, true);
        AjaxResult.success(function (data) {
            $('#divSOARecommendationList').html(data);
            GeneralUtilities.ajaxindicatorstop();
        });
    },

    GetLibraryControlInfo: function (controlID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Compliance/GetLibraryControlById", "GET", { id: controlID }, true);
        AjaxResult.success(function (data) {
            $("#paraControlInfo").text(data.description);
            GeneralUtilities.ajaxindicatorstop();

        });
    },

    InsertSOARecommendation: function () {
        if (!ComplianceModuleUtilities.IsValid('AddSOARecommendationDiv'))
            return false;
        var SOARecommendationModel = {};
        //var id = $("#RecommendationID").val();
        //if (typeof (id) === "undefined" || id == '' || id == null) {
        //    id = 0;
        //}
        SOARecommendationModel.RecommendationID = $("#RecommendationID").val();
        SOARecommendationModel.Reference = $("#txtSOAReference").val();
        SOARecommendationModel.Name = $("#txtSOAName").val();
        SOARecommendationModel.Description = $("#txtSOADescription").val();
        SOARecommendationModel.Status = $("#txtSOAStasus").val();
        SOARecommendationModel.Findings = $("#txtSOAFindings").val();
        SOARecommendationModel.Cost = $("#txtSOACost").val();

        var Roles = ($("#ddlSOARoles").val());
        if (Roles != null) {
            var SelectedRoles = Roles.join(',');
            SOARecommendationModel.Role = SelectedRoles;
        }
        else {
            SOARecommendationModel.Role = -1;
        }

        var Groups = ($("#ddlSOAGroups").val());
        if (Groups != null) {
            var SelectedGroups = Groups.join(',');
            SOARecommendationModel.Group = SelectedGroups;
        } else {
            SOARecommendationModel.Group = -1;
        }

        SOARecommendationModel.AssignToPerson = $("#txtSOAAssignToPerson").val();
        SOARecommendationModel.DudDate = $("#single_calDueDate").val();

        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Compliance/AddSOARecommendation", "POST", SOARecommendationModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            ControlRecommendationUtilities.ClearSOARecommendationField();
            $('#AddApplicabilityDiv').toggle();
            $('#addSOARecommendation').toggle();
            $('#btnCreateSOACollap').hide();
            ControlRecommendationUtilities.GetSOARecommendationList(ApplicabilityUtilities.getLibraryControlID());
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

    ClearSOARecommendationField: function () {
        $("#txtSOAReference").val("").removeClass('error');
        $("#txtSOAName").val("").removeClass('error');
        $("#txtSOADescription").val("");
        $("#txtSOAStasus").val("");
        $("#txtSOAFindings").val("");
        $("#txtSOACost").val("");
        $('#ddlSOARoles').multiselect('deselectAll', false);
        $('#ddlSOARoles').multiselect('updateButtonText');
        $('#ddlSOAGroups').multiselect('deselectAll', false);
        $('#ddlSOAGroups').multiselect('updateButtonText');
        $("#single_calDueDate").val($.datepicker.formatDate('mm/dd/yy', new Date()));
    },
}

ApplicabilityUtilities = {

    InsertSOAApplicability: function (libControlID) {
        if (!ComplianceModuleUtilities.IsValid('AddApplicabilityDiv'))
            return false;
        var SOAApplicabilityModel = {};

        var id = $("#SOAApplicableID").val();
        if (typeof (id) === "undefined" || id == '' || id == null) {
            id = 0;
        }

        var Applicable;
        if ($('#ApplicableYes').is(":checked")) {
            Applicable = true;
        } else {
            Applicable = false;
        }
        var ExemptionGranted;
        if ($('#ExemptiongrantedYes').is(":checked")) {
            ExemptionGranted = true;
        } else {
            ExemptionGranted = false;
        }

        SOAApplicabilityModel.SOAApplicableID = id;
        SOAApplicabilityModel.ComplianceID = ComplianceModuleUtilities.getActiveSoAComplianceID();

        SOAApplicabilityModel.LibreryControlID = libControlID;

        SOAApplicabilityModel.Applicable = Applicable;
        SOAApplicabilityModel.ApplicableReason = $("#txtApplicableReason").val();
        SOAApplicabilityModel.ComplianceLevel = $("#ddlComplianceLevel").val();
        SOAApplicabilityModel.ExemptionGranted = ExemptionGranted;
        SOAApplicabilityModel.ExemptionStartDate = $("#single_cal3").val();
        SOAApplicabilityModel.ExemptionEndDate = $("#single_calEndDate").val();
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Compliance/AddSOAApplicability", "POST", SOAApplicabilityModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();

        });
    },
    getLibraryControlID: function () {
        var GetSelectedNode = $('#divDragControlLibraries').find('li.active');
        if ($(GetSelectedNode).length > 0)
            return $(GetSelectedNode).attr('id');
        return 0;
    },
    GetApplicabilityInfo: function (controlID) {

        var ComplianceID = ComplianceModuleUtilities.getActiveSoAComplianceID();
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Compliance/GetApplicabilityInfo", "GET", { complianceID: ComplianceID, libControlID: controlID }, true);
        AjaxResult.success(function (data) {
            if (data == 'null' || data == null) {
                $('#AddApplicabilityDiv').find('input[type=checkbox]').prop('checked', false);
                $('#ApplicableYes').prop('checked', true);
                $('#ExemptiongrantedYes').prop('checked', true);
                $("#txtApplicableReason").val('');
                $("#txtComplianceLevel").val('');
                $("#single_cal3").val($.datepicker.formatDate('mm/dd/yy', new Date()));
                $("#single_calEndDate").val($.datepicker.formatDate('mm/dd/yy', new Date()));
            }
            else {
                $('#AddApplicabilityDiv').find('input[type=checkbox]').prop('checked', false);
                if (data.model.applicable == true) {
                    $('#ApplicableYes').prop('checked', true);
                }
                else {
                    $('#ApplicableNo').prop('checked', true);
                }
                if (data.exemptionGranted == true) {
                    $('#ExemptiongrantedYes').prop('checked', true);
                }
                else {
                    $('#ExemptiongrantedNo').prop('checked', true);
                }
                $("#SOAApplicableID").val(data.model.soaApplicableID);
                $("#ComplianceID").val(data.model.complianceID);
                $("#LibreryControlID").val(data.model.libreryControlID);

                $("#txtApplicableReason").val(data.model.applicableReason);
                $("#ddlComplianceLevel").val(data.model.complianceLevel);
                $("#single_cal3").val(data.startDate);
                $("#single_calEndDate").val(data.endDate);
            }
            GeneralUtilities.ajaxindicatorstop();
        });
    },
    ComplianceLevelDropdownList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Compliance/ComplianceLevelDropdownList", "GET", {}, false);
        AjaxResult.success(function (data) {
            GeneralUtilities.BindDropdownGeneric('#ddlComplianceLevel', data);
            GeneralUtilities.ajaxindicatorstop();
        });
    },
}

LinkWithRecommendation = {
    GetSOALinkWithRecommendationList: function (controlId) {
        var ComplianceID = ComplianceModuleUtilities.getActiveSoAComplianceID();
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Compliance/_SOALinkWithRecommendationList", "GET", { complianceID: ComplianceID, libControlID: controlId }, true);
        AjaxResult.success(function (data) {
            $('#divSOALinkWithRecommendationList').html(data);
            GeneralUtilities.ajaxindicatorstop();
        });
    },

    InsertSOALinkWithRecommendation: function (libControlID, sOARecommendationID, RecommendationName, SOALinkWithRecommendationID) {

        var SOALinkRecommendationModel = {};

        SOALinkRecommendationModel.SOALinkWithRecommendationID = SOALinkWithRecommendationID;
        SOALinkRecommendationModel.SOARecommendationID = sOARecommendationID;
        SOALinkRecommendationModel.ComplianceID = ComplianceModuleUtilities.getActiveSoAComplianceID();
        SOALinkRecommendationModel.LibreryControlID = libControlID;
        SOALinkRecommendationModel.RecommendationName = RecommendationName;


        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Compliance/AddSOALinkWithRecommendation", "POST", SOALinkRecommendationModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            ControlRecommendationUtilities.ClearSOARecommendationField();
            $('#addSOARecommendation').hide();
            LinkWithRecommendation.GetSOALinkWithRecommendationList(libControlID);
        });
    },
    DeleteSOALinkWithRecommendation: function (linkwithrecommendationID) {
        var confirmation = confirm("are you sure you want to remove this recommendation?");
        if (confirmation) {
            var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Compliance/DeleteSOALinkWithRecommendation", "POST", { id: linkwithrecommendationID }, true);
            AjaxResult.success(function (data) {
                GeneralUtilities.ajaxindicatorstop();

            });
        }

    },

    UpdateSOALinkWithRecommendation: function (sOARecommendationID, RecommendationName, SOALinkWithRecommendationID) {
        debugger
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Compliance/UpdateLinkWithRecommendation", "POST", { sOARecommendationID: sOARecommendationID, RecommendationName: RecommendationName, SOALinkWithRecommendationID: SOALinkWithRecommendationID }, false);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
        });
    },

}

