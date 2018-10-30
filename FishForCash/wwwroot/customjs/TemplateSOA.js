/// <reference path="genericfunctions.js" />
var Ids = "";
var Names = "";
$(document).ready(function () {
    $("#btnEditCompliance").hide();
    $("#btnDeleteCompliance").hide();
    $("#btnViewCompliance").hide();
    ComplianceModuleUtilities.GetComplianceList();
    ComplianceModuleUtilities.GetClassificationList();

    $('#ddlRoles').multiselect();
    $('#ddlGroups').multiselect();

    $('#divLibraryTreeView').delegate(".collapsible", "click", function (e) {
        e.preventDefault();
        $(this).toggleClass("collapse expand");
        $(this).closest('li').children('ul').slideToggle();
    });

    $('#ControlLibraryList').delegate(".collapsible", "click", function (e) {
        e.preventDefault();
        $(this).toggleClass("collapse expand");
        $(this).closest('li').children('ul').slideToggle();
    });

    $('#btnAddCompliance').click(function () {
        $('#AddCompliance').show();

        $('#ControlLibraryList').hide();
        $('#btnColap').hide();
        $('#divLibraryTreeView').hide();
        if ($(div3).css('display') == 'block') {
            $('#div3').toggle();
            $('#div4').toggle();
            $('#btnAssetsCollap >i').toggleClass("fa fa-angle-double-right fa fa-angle-double-left");
        }

        $("#ComplianceID").val(0);
        $('#lblSoA').show();
        $('#ddlSoA').show();
        $('#lblTRA').show();
        $('#ddlTRA').show();
        $('#chkTemplate').show();
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        ComplianceModuleUtilities.ClearComplianceField();
        $("#AddEditCompliance h2").html("New Active SoA");
    });

    $('#btnEditCompliance').click(function () {
        var ComplianceID = $(this).attr("edit-id");
        $('#lblSoA').hide();
        $('#ddlSoA').hide();
        $('#lblTRA').hide();
        $('#ddlTRA').hide();
        $('#divTemplate').hide();
        $('#AddCompliance').show();
        $('#ViewCompliance').hide();

        $('#ControlLibraryList').hide();
        $('#btnColap').hide();
        $('#divLibraryTreeView').hide();

        if ($(div3).css('display') == 'block') {
            $('#div3').toggle();
            $('#div4').toggle();
            $('#btnAssetsCollap >i').toggleClass("fa fa-angle-double-right fa fa-angle-double-left");
        }

        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        ComplianceModuleUtilities.GetComplianceByID(ComplianceID);
        $("#AddEditCompliance h2").html("Edit Active SoA")
    });

    $('#btnDeleteCompliance').click(function () {
        var complianceID = $(this).attr("delete-id");
        ComplianceModuleUtilities.DeleteComplianceField(complianceID);
    });

    $('#btnViewCompliance').click(function () {
        $('#AddCompliance').hide();
        $('#ControlLibraryList').hide();
        $('#btnColap').hide();
        $('#divLibraryTreeView').hide();
        if ($(div3).css('display') == 'block') {
            $('#div3').toggle();
            $('#div4').toggle();
            $('#btnAssetsCollap >i').toggleClass("fa fa-angle-double-right fa fa-angle-double-left");
        }

        $('#ViewCompliance').show();
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        var complianceID = $(this).attr("view-id");
        ComplianceModuleUtilities.GetComplianceByID(complianceID);
    });

    $('#divComplianceList').delegate('td[tdtype="getComplianceDetails"]', 'click', function (e) {
        e.preventDefault();
        if ($(this).parent().closest('tr').hasClass('active')) {
            $('#divComplianceList').find('tr input[type="checkbox"]').prop('checked', false);
            $('#divComplianceList').find('tr').removeClass('active');
            $('#AddCompliance').hide();
            $("#btnEditCompliance").hide();
            $("#btnDeleteCompliance").hide();
            $("#btnViewCompliance").hide();
            $('#ControlLibraryList').hide();
            $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");
            $('#ControlLibraryList').hide();
            if ($(div3).css('display') == 'block') {
                $('#div3').toggle();
                $('#div4').toggle();
                $('#btnAssetsCollap >i').toggleClass("fa fa-angle-double-right fa fa-angle-double-left");
            }
            $('#ControlLibraryList').hide();
            $('#btnColap').hide();
            $('#divLibraryTreeView').hide();
        }
        else {

            $('#divComplianceList').find('tr').removeClass('active');
            $('#divComplianceList').find('tr input[type="checkbox"]').prop('checked', false);
            $('#divComplianceList').find('tr').find('td:eq(0) input[type="checkbox"]').prop('checked', false);
            $(this).parent().closest('tr').addClass('active');
            $(this).parent().closest('tr').find('td:eq(0) input[type="checkbox"]').prop('checked', true);
            $('#AddCompliance').hide();
            $('#ViewCompliance').hide();
            $('#ControlLibraryList').show();
            $('#btnColap').show();
            $('#divLibraryTreeView').show();

            $("#btnEditCompliance").show();
            $("#btnDeleteCompliance").show();
            $("#btnViewCompliance").show();
            $("#btnViewCompliance").attr("view-id", $(this).parent().closest('tr').attr("complianceid-id"));
            $("#btnEditCompliance").attr("edit-id", $(this).parent().closest('tr').attr("complianceid-id"));
            $("#btnDeleteCompliance").attr("delete-id", $(this).parent().closest('tr').attr("complianceid-id"));
            $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
            ComplianceModuleUtilities.GetDragControlLibraries();
            ComplianceModuleUtilities.GetLibraryList();
            $('#div3').css('visibility', 'hidden');
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


    $('#btnAssetsCollap').click(function () {
        $('#div3').toggle();
        $('#div4').toggle();
        $('#btnAssetsCollap >i').toggleClass("fa fa-angle-double-right fa fa-angle-double-left");

    });
    //-------------------------------------------------------------------------------------------//
    $('#divDragControlLibraries').delegate('li[litype="dragLi"]', 'dblclick', function (evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var confirmation = confirm("are you sure want to remove this compliance?");
        if (confirmation) {
            var id = $(this).attr('id');
            var liType = $(this).attr('valuetype');
            var activeSoAComplianceID = ComplianceModuleUtilities.getActiveSoAComplianceID();
            ComplianceModuleUtilities.DeleteDragedControl(id, liType, activeSoAComplianceID);
            $(this).remove();
        }

    });
});

ComplianceModuleUtilities = {
    GetComplianceList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TemplateSOA/_ComplianceList", "GET", {}, true);
        AjaxResult.success(function (data) {
            $('#divComplianceList').html(data);

            GeneralUtilities.ajaxindicatorstop();
        });
    },

    GetClassificationList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TemplateSOA/GetClassificationList", "GET", {}, false);
        AjaxResult.success(function (data) {
            GeneralUtilities.BindDropdownGeneric('#ddlClassification', data);
            GeneralUtilities.ajaxindicatorstop();

        });
    },
    GetComplianceByID: function (complianceID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TemplateSOA/GetComplianceByID", "GET", { id: complianceID }, true);
        AjaxResult.success(function (data) {
            ///-------for edit---------//
            $("#ComplianceID").val(data.complianceID);
            $("#txtName").val(data.name);
            $("#txtDescription").val(data.description);
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

            $("#ddlClassification").val(data.classificationID);

            ///---- for view -------////
            $("#lblName").text(data.name);
            $("#lblDescription").text(data.description);
            var roles = [];
            var groups = [];
            $("#ddlRoles option:selected").each(function () {
                roles.push(this.text);
            });
            $('#lblRoles').text(roles.join(','));
            $("#ddlGroups option:selected").each(function () {
                groups.push(this.text);
            });
            $('#lblGroups').text(groups.join(','));

            $("#lblClassification").text($("#ddlClassification").find('option:selected').text());

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
        var Roles = ($("#ddlRoles").val());
        if (Roles != null) {
            var SelectedRoles = Roles.join(',');
            ComplianceModuleModel.Roles = SelectedRoles;
        }
        else {
            ComplianceModuleModel.Roles = -1;
        }

        var Groups = ($("#ddlGroups").val());
        if (Groups != null) {
            var SelectedGroups = Groups.join(',');
            ComplianceModuleModel.Groups = SelectedGroups;
        } else {
            ComplianceModuleModel.Groups = -1;
        }

        ComplianceModuleModel.ClassificationID = $("#ddlClassification").val();
        ComplianceModuleModel.TRA = $("#ddlTRA").val();
        ComplianceModuleModel.SoATemplate = $("#ddlSoA").val();
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TemplateSOA/AddCompliance", "POST", ComplianceModuleModel, true);
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


    DeleteComplianceField: function (complianceID) {
        var confirmation = confirm("are you sure want to remove this compliance?");
        if (confirmation) {
            var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TemplateSOA/DeleteCompliance", "POST", { id: complianceID }, true);
            AjaxResult.success(function (data) {
                GeneralUtilities.ajaxindicatorstop();
                ComplianceModuleUtilities.GetComplianceList();
                $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");
                $("#btnEditCompliance").hide();
                $("#btnDeleteCompliance").hide();
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

    GetDragControlLibraries: function () {
        var activeSoAComplianceID = ComplianceModuleUtilities.getActiveSoAComplianceID();
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TemplateSOA/_DragControlLibraries", "GET", { activeSoAComplianceID: activeSoAComplianceID }, true);
        AjaxResult.success(function (data) {
            $('#divDragControlLibraries').html(data);
            GeneralUtilities.ajaxindicatorstop();
            $('#div3').css('visibility', 'hidden');
        });
    },


    GetLibraryList: function () {
        var activeSoAComplianceID = ComplianceModuleUtilities.getActiveSoAComplianceID();
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TemplateSOA/_LibraryControlListTreeView", "GET", { activeSoAComplianceID: activeSoAComplianceID }, true);
        AjaxResult.success(function (data) {
            $('#divLibraryTreeView').html(data);
            $("ul[sortid='sortable']").sortable({
                connectWith: ".connectedSortable",
                start: function (event, ui) {
                    $('#dropAbleDiv').css('background-color', '#b4eceb');
                },
                stop: function (event, ui) {
                    var activeSoAComplianceID = ComplianceModuleUtilities.getActiveSoAComplianceID();
                    var liType = $(ui.item).attr('litype');
                    var id = $(ui.item).attr('id');
                    var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TemplateSOA/AddDragLibrariesWithControls", "POST", { id: id, liType: liType, activeSoAComplianceID: activeSoAComplianceID }, false);
                    AjaxResult.success(function (data) {
                        GeneralUtilities.ajaxindicatorstop();
                        ComplianceModuleUtilities.GetDragControlLibraries();
                    });
                    $(ui.item).hide();
                    $('#dropAbleDiv').css('background-color', '');
                }
            }).disableSelection();

            GeneralUtilities.ajaxindicatorstop();
        });
    },
    FindParentLi: function (id) {
        if ($('li[id="' + id + '"]').parent().closest('li').length > 0) {
            var parentid = $('li[id="' + id + '"]').parent().closest('li').attr('id');
            Ids += parentid + ',';
            ComplianceModuleUtilities.FindParentLi(parentid)
        }
    },
    getActiveSoAComplianceID: function () {
        var GetSelectedNode = $('#divComplianceList').find('tr.active');
        if ($(GetSelectedNode).length > 0)
            return $(GetSelectedNode).attr('complianceid-id');
        return 0;
    },
    DeleteDragedControl: function (id, liType, activeSoAComplianceID) {
        debugger;
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/TemplateSOA/DeleteDragedControl", "POST", { id: id, liType: liType, activeSoAComplianceID: activeSoAComplianceID }, true);
        AjaxResult.success(function (data) {

            GeneralUtilities.ajaxindicatorstop();
            ComplianceModuleUtilities.GetLibraryList();
        });

    },

}