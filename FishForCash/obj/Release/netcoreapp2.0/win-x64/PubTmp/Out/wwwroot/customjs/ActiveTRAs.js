/// <reference path="genericfunctions.js" />
$(document).ready(function () {

    $('#AddEditTRA').delegate('.type', 'click', function () {
        $('.type').not(this).attr('checked', false);
    });



    //$('#div3').find(".toggle-accordion").on("click", function () {
    //    var accordionId = $(this).attr("accordion-id"),
    //        numPanelOpen = $(accordionId + ' .collapse.in').length;

    //    $(this).toggleClass("active");

    //    if (numPanelOpen == 0) {
    //        openAllPanels(accordionId);
    //    } else {
    //        closeAllPanels(accordionId);
    //    }
    //})

    //openAllPanels = function (aId) {
    //    console.log("setAllPanelOpen");
    //    $(aId + ' .panel-collapse:not(".in")').collapse('show');
    //}
    //closeAllPanels = function (aId) {
    //    console.log("setAllPanelclose");
    //    $(aId + ' .panel-collapse.in').collapse('hide');
    //}



    $('#divCategoryAssets').delegate(".collapsible", "click", function (e) {
        e.preventDefault();
        $(this).toggleClass("collapse expand");
        $(this).closest('li').children('ul').slideToggle();
    });
    $('#ddlRoles').multiselect();
    $('#ddlGroups').multiselect();

    $("#btnEditTRA").hide();
    $("#btnDeleteTRA").hide();
    $("#btnViewTRA").hide();
    $("#btnArchiveTRA").hide();

    TRAModuleUtilities.GetTRAList();
    TRAModuleUtilities.GetClassificationList();
    TRAModuleUtilities.GetSOAList();

    //-------------------Add Student security plan---------------------------//
    $('#btnAddTRA').click(function () {
        $('#AddTRA').show();
        $('#ViewTRA').hide();
        $("#TRAID").val(0);
        $("#btnArchiveTRA").hide();
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        $("#AddEditTRA h2").html("New Active TRA");
        TRAModuleUtilities.ClearTRAFields();
    });
    //------------------View TRA------------------------//
    $('#btnViewTRA').click(function () {
        $('#AddTRA').hide();
        $('#ViewTRA').show();
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        var TRAID = $(this).attr("view-id");
        TRAModuleUtilities.GetTRAByID(TRAID);
    });

    //------------------EDIT TRA------------------------//
    $('#btnEditTRA').click(function () {
        var TRAID = $(this).attr("edit-id");
        $('#AddTRA').show();
        $('#ViewTRA').hide();
        $("#btnArchiveTRA").show();
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        $("#AddEditTRA h2").html("Edit Active TRA");
        TRAModuleUtilities.GetTRAByID(TRAID);
    });

    //------------------Delete TRA------------------------//
    $('#btnDeleteTRA').click(function () {
        var TRAID = $(this).attr("delete-id");
        TRAModuleUtilities.DeleteTRAField(TRAID);
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
            if ($(div3).css('display') == 'block') {
                $('#div3').toggle();
                $('#div4').toggle();
                $('#btnAssetsCollap >i').toggleClass("fa fa-angle-double-right fa fa-angle-double-left");
            }
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
            $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
            $('#DragCategoryAsset').show();
            $('#btnColap').show();
            //$('#div3').css('visibility', 'hidden');
            TRAModuleUtilities.GetCategoryAssetList();
            TRAModuleUtilities.GetDragCategoryAsset();
        }
    });
    //------------------Save Student security plan---------------------------//
    $('#btnSaveTRA').click(function () {
        TRAModuleUtilities.InsertTRA();
    });
    //----------------Cancel TRA---------------------------------------------//
    $('#btnCancelTRA').click(function () {
        TRAModuleUtilities.HideAddTRA();
        TRAModuleUtilities.ClearTRAFields();
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
    //-------------------------------Draged Assets----------------------------
    $('#divDragControlAssets').delegate('td[tdtype="getDragassetsdetails"]', 'click', function () {
        $('#divDragControlAssets').find('tr').removeClass('active');
        $(this).parent().closest('tr').addClass('active');
        $('#divDragControlAssets').find('tr').find('td:eq(0) input[type="checkbox"]').prop('checked', false);
        $(this).parent().closest('tr').find('td:eq(0) input[type="checkbox"]').prop('checked', true);
      
    });



    $('#btnArchiveTRA').click(function () {
        TRAModuleUtilities.UpdateArchiveTRA();
    });



    $('#btnAssetsCollap').click(function () {
        $('#div3').toggle();
        $('#div4').toggle();
        $('#btnAssetsCollap >i').toggleClass("fa fa-angle-double-right fa fa-angle-double-left");

    });

});

TRAModuleUtilities = {
    GetTRAList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TeachersRiskAssessment/_ActiveTeachersRiskAssessmentList", "GET", {}, true);
        AjaxResult.success(function (data) {
            $('#divTRAList').html(data);
            GeneralUtilities.ajaxindicatorstop();
        });
    },
    UpdateArchiveTRA: function () {
        var traID = $("#TRAID").val();
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TeachersRiskAssessment/UpdateArchiveTRA", "POST", { id: traID }, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            TRAModuleUtilities.GetTRAList();
            TRAModuleUtilities.HideAddTRA();
            TRAModuleUtilities.ClearTRAFields();
        });
    },
    InsertTRA: function () {
        if (!TRAModuleUtilities.IsValid('AddTRA'))
            return false;
        var type;
        if ($('#QuickTRA').is(":checked")) {
            type = "Quick";
        } else if ($('#FullTRA').is(":checked")) {
            type = "Full";
        }
        var TeachersRiskAssessmentModel = {};
        TeachersRiskAssessmentModel.TRAID = $("#TRAID").val();
        TeachersRiskAssessmentModel.Name = $("#txtName").val();
        TeachersRiskAssessmentModel.Type = type;
        TeachersRiskAssessmentModel.ScopeTRA = $("#txtScopeOfTheAssessment").val();

        TeachersRiskAssessmentModel.AssessedTRA = $("#txtWhatHasBeenAssessed").val();
        TeachersRiskAssessmentModel.Summary = $("#txtSummaryOfAssessment").val();
        TeachersRiskAssessmentModel.Archive = false;
        var Classification = ($("#ddlClassification").val());
        if (Classification != null) {
            var SelectedClassification = Classification.join(',');
            TeachersRiskAssessmentModel.Classification = SelectedClassification;
        }
        else {
            TeachersRiskAssessmentModel.Classification = -1;
        }

        var Roles = ($("#ddlRoles").val());
        if (Roles != null) {
            var SelectedRoles = Roles.join(',');
            TeachersRiskAssessmentModel.Roles = SelectedRoles;
        }
        else {
            TeachersRiskAssessmentModel.Roles = -1;
        }

        var Groups = ($("#ddlGroups").val());
        if (Groups != null) {
            var SelectedGroups = Groups.join(',');
            TeachersRiskAssessmentModel.Groups = SelectedGroups;
        } else {
            TeachersRiskAssessmentModel.Groups = -1;
        }

        var LinkToSOA = ($("#ddlLinkToSoA").val());
        if (LinkToSOA != null) {
            var SelectedLinkToSOA = LinkToSOA.join(',');
            TeachersRiskAssessmentModel.CreateFromSOATemplate = SelectedLinkToSOA;
        }
        else {
            TeachersRiskAssessmentModel.CreateFromSOATemplate = -1;
        }

        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TeachersRiskAssessment/AddTRA", "POST", TeachersRiskAssessmentModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            TRAModuleUtilities.GetTRAList();
            TRAModuleUtilities.HideAddTRA();
            TRAModuleUtilities.ClearTRAFields();
        });

    },

    ClearTRAFields: function () {
        $("#txtName").val("").removeClass('error');
        $("#txtSummaryOfAssessment").val("").removeClass('error');
        $("#txtScopeOfTheAssessment").val("").removeClass('error');
        $("#txtWhatHasBeenAssessed").val("").removeClass('error');
        $('#ddlClassification').multiselect('deselectAll', false);
        $('#ddlClassification').multiselect('updateButtonText');
        $('#ddlRoles').multiselect('deselectAll', false);
        $('#ddlRoles').multiselect('updateButtonText');
        $('#ddlGroups').multiselect('deselectAll', false);
        $('#ddlGroups').multiselect('updateButtonText');
        $('#ddlLinkToSoA').multiselect('deselectAll', false);
        $('#ddlLinkToSoA').multiselect('updateButtonText');
        $('#FullTRA').prop('checked', false);
    },

    GetTRAByID: function (TRAID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TeachersRiskAssessment/GetTRAById", "GET", { id: TRAID }, true);
        AjaxResult.success(function (data) {
            debugger;
            ///-------for edit---------//
            if (data.type == "Quick") {
                $('#QuickTRA').prop('checked', true);
            }
            else if (data.type == "Full") {
                $('#FullTRA').prop('checked', true);
            }
            $("#TRAID").val(data.traid);
            $("#txtName").val(data.name);
            $("#txtScopeOfTheAssessment").val(data.scopeTRA);
            $("#txtWhatHasBeenAssessed").val(data.assessedTRA);
            $("#txtSummaryOfAssessment").val(data.summary);


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

            ///---- for view -------////
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
    DeleteTRAField: function (TRAID) {
        var confirmation = confirm("are you sure want to remove this TRA?");
        if (confirmation) {
            var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TeachersRiskAssessment/DeleteTRA", "POST", { id: TRAID }, true);
            AjaxResult.success(function (data) {
                GeneralUtilities.ajaxindicatorstop();
                TRAModuleUtilities.GetTRAList();
                $("#btnEditTRA").hide();
                $("#btnDeleteTRA").hide();
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

    HideAddTRA: function () {
        $('#AddTRA').hide();
        $('#ViewTRA').hide();
        $("#btnEditTRA").hide();
        $("#btnDeleteTRA").hide();
        $("#btnViewTRA").hide();
        $("#btnArchiveTRA").hide();
        $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12 TreeDiv");
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

    GetCategoryAssetList: function () {
        var activeTRAID = TRAModuleUtilities.GetTRAID();
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TeachersRiskAssessment/_CategoryAssetsTreeView", "GET", { traID: activeTRAID }, true);
        AjaxResult.success(function (data) {
            $('#divCategoryAssets').html(data);
            $("ul[sortid='sortable']").sortable({
                connectWith: ".connectedSortable",
                start: function (event, ui) {
                    $('#dropAbleDiv').css('background-color', '#b4eceb');
                },
                stop: function (event, ui) {
                    var activeTRAID = TRAModuleUtilities.GetTRAID();
                    var liType = $(ui.item).attr('litype');
                    var id = $(ui.item).attr('id');
                    var name = $(ui.item).text();
                    debugger;
                    if (liType == "A") {
                        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TeachersRiskAssessment/AddDragCategoryAsset", "POST", { id: id, name: name, liType: liType, activeTRAID: activeTRAID }, false);
                        AjaxResult.success(function (data) {
                            GeneralUtilities.ajaxindicatorstop();
                            TRAModuleUtilities.GetDragCategoryAsset();
                        });
                    }
                    else {
                        TRAModuleUtilities.GetCategoryAssetList();
                        TRAModuleUtilities.GetDragCategoryAsset();
                    }
                    $(ui.item).hide();
                    $('#dropAbleDiv').css('background-color', '');
                }
            }).disableSelection();

            GeneralUtilities.ajaxindicatorstop();
        });
    },

    GetTRAID: function () {
        var GetSelectedNode = $('#DivTRAList').find('tr.active');
        if ($(GetSelectedNode).length > 0)
            return $(GetSelectedNode).attr('tra-id');
        return 0;
    },

    GetDragCategoryAsset: function () {
        var activeTRAID = TRAModuleUtilities.GetTRAID();
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TeachersRiskAssessment/_DragAssetsList", "GET", { activeTRAID: activeTRAID }, true);
        AjaxResult.success(function (data) {
            $('#divDragControlAssets').html(data);
            GeneralUtilities.ajaxindicatorstop();
            //$('#div3').css('visibility', 'hidden');

        });
    },

}