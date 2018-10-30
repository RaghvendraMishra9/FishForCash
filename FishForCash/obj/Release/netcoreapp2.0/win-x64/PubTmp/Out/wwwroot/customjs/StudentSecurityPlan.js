/// <reference path="genericfunctions.js" />
$(document).ready(function () {
    $("#txtStudentDescription").Editor();

    $('#ddlRoles').multiselect();
    $('#ddlGroups').multiselect();

    $("#btnEditSSP").hide();
    $("#btnDeleteSSP").hide();
    $("#btnViewSSP").hide();

    SSPModuleUtilities.GetSSPList();
    SSPModuleUtilities.GetClassificationList();
    SSPModuleUtilities.GetSOAList();
    //-------------------Add Student security plan---------------------------//
    $('#btnAddSSP').click(function () {
        $('#AddSSP').show();
        $('#ViewSSA').hide();
        $("#SSPID").val(0);
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        $("#AddEditSSP h2").html("New SSP");
        SSPModuleUtilities.ClearSSPFields();
    });
    //------------------View SSP------------------------//
    $('#btnViewSSP').click(function () {
        $('#AddSSP').hide();
        $('#ViewSSA').show();
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        var SSPID = $(this).attr("view-id");
        SSPModuleUtilities.GetSSPByID(SSPID);
    });

     //------------------EDIT SSP------------------------//
    $('#btnEditSSP').click(function () {
        var SSPID = $(this).attr("edit-id");
        $('#AddSSP').show();
        $('#ViewSSA').hide();
        $("#div1").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12");
        $("#AddEditSSP h2").html("Edit SSP");
        SSPModuleUtilities.GetSSPByID(SSPID);
    });

     //------------------Delete SSP------------------------//
    $('#btnDeleteSSP').click(function () {
        var SSPID = $(this).attr("delete-id");
        SSPModuleUtilities.DeleteSSPField(SSPID);
    });

    $('#DivSSPList').delegate('td[tdtype="getSSPDetails"]', 'click', function (e) {
        e.preventDefault();
        if ($(this).parent().closest('tr').hasClass('active')) {
            $('#DivSSPList').find('tr input[type="checkbox"]').prop('checked', false);
            $('#DivSSPList').find('tr').removeClass('active');
            $('#AddSSP').hide();
            $('#ViewSSA').hide();
            $("#btnEditSSP").hide();
            $("#btnDeleteSSP").hide();
            $("#btnViewSSP").hide();
            $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");
         }
        else {
            $('#DivSSPList').find('tr').removeClass('active');
            $('#DivSSPList').find('tr input[type="checkbox"]').prop('checked', false);
            $('#DivSSPList').find('tr').find('td:eq(0) input[type="checkbox"]').prop('checked', false);
            $(this).parent().closest('tr').addClass('active');
            $(this).parent().closest('tr').find('td:eq(0) input[type="checkbox"]').prop('checked', true);
            $('#AddSSP').hide();
            $('#ViewSSA').hide();
            $("#btnEditSSP").show();
            $("#btnDeleteSSP").show();
            $("#btnViewSSP").show();
            $("#btnViewSSP").attr("view-id", $(this).parent().closest('tr').attr("sspid-id"));
            $("#btnEditSSP").attr("edit-id", $(this).parent().closest('tr').attr("sspid-id"));
            $("#btnDeleteSSP").attr("delete-id", $(this).parent().closest('tr').attr("sspid-id"));
            $("#div1").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12");
         }
    });
    //------------------Save Student security plan---------------------------//
    $('#btnSaveSSP').click(function () {
        SSPModuleUtilities.InsertSSP();
    });
    //----------------Cancel SSP---------------------------------------------//
    $('#btnCancelSSP').click(function () {
        SSPModuleUtilities.HideAddSSP();
        SSPModuleUtilities.ClearSSPFields();
    });
    $('#btnRefreshSSP').click(function () {
        location.href = location.href;
    });

    $('#DivSSPList').delegate('input[type="search"]', 'keyup', function () {
        var value = $(this).val().toLowerCase();
        $("#SSPTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    });
});

SSPModuleUtilities = {
    GetSSPList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/StudentSecurityPlan/_StudentSecurityPlanList", "GET", {}, true);
        AjaxResult.success(function (data) {
            $('#divSSPList').html(data);
            GeneralUtilities.ajaxindicatorstop();
        });
    },

    InsertSSP: function () {
        if (!SSPModuleUtilities.IsValid('AddSSP'))
            return false;
        var StudentSecurityPlanModel = {};
        StudentSecurityPlanModel.SSPID = $("#SSPID").val();
        StudentSecurityPlanModel.Name = $("#txtName").val();
        StudentSecurityPlanModel.Summary = $("#txtSummary").val();
        StudentSecurityPlanModel.StudentName = $("#txtStudentName").val();

        StudentSecurityPlanModel.StudentDescription = $("#txtStudentDescription").Editor("getText");
        StudentSecurityPlanModel.StudentOwner = $("#txtStudentOwner").val();

        var Classification = ($("#ddlClassification").val());
        if (Classification != null) {
            var SelectedClassification = Classification.join(',');
            StudentSecurityPlanModel.Classification = SelectedClassification;
        }
        else {
            StudentSecurityPlanModel.Classification = -1;
        }

      
        StudentSecurityPlanModel.Introduction = $("#txtIntroduction").val();
        StudentSecurityPlanModel.Purpose = $("#txtPurpose").val();
        StudentSecurityPlanModel.Scope = $("#txtScope").val();
                   
        
        var Roles = ($("#ddlRoles").val());
        if (Roles != null) {
            var SelectedRoles = Roles.join(',');
            StudentSecurityPlanModel.Roles = SelectedRoles;
        }
        else {
            StudentSecurityPlanModel.Roles = -1;
        }

        var Groups = ($("#ddlGroups").val());
        if (Groups != null) {
            var SelectedGroups = Groups.join(',');
            StudentSecurityPlanModel.Grops = SelectedGroups;
        } else {
            StudentSecurityPlanModel.Grops = -1;
        }

        var LinkToSOA = ($("#ddlLinkToSoA").val());
        if (LinkToSOA != null) {
            var SelectedLinkToSOA = LinkToSOA.join(',');
            StudentSecurityPlanModel.LinkToSOAID = SelectedLinkToSOA;
        }
        else {
            StudentSecurityPlanModel.LinkToSOAID = -1;
        }

        var LinkToSOA = $('#LinkToSOADiv').find(".multiselect").attr('title');
        StudentSecurityPlanModel.LinkToSOA = LinkToSOA;

        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/StudentSecurityPlan/AddSSP", "POST", StudentSecurityPlanModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            SSPModuleUtilities.GetSSPList();
            SSPModuleUtilities.HideAddSSP();
            SSPModuleUtilities.ClearSSPFields();
        });

    },

    ClearSSPFields: function () {
        $("#txtName").val("").removeClass('error'); 
        $("#txtSummary").val("").removeClass('error'); 
        $("#txtStudentName").val("").removeClass('error'); 
        $("#txtStudentDescription").Editor("setText", "");
        $("#txtStudentOwner").val("").removeClass('error'); 
        $('#ddlClassification').multiselect('deselectAll', false);
        $('#ddlClassification').multiselect('updateButtonText');
        $("#txtIntroduction").val("");
        $("#txtPurpose").val("");
        $("#txtScope").val("");
        $('#ddlRoles').multiselect('deselectAll', false);
        $('#ddlRoles').multiselect('updateButtonText');
        $('#ddlGroups').multiselect('deselectAll', false);
        $('#ddlGroups').multiselect('updateButtonText');
        $('#ddlLinkToSoA').multiselect('deselectAll', false);
        $('#ddlLinkToSoA').multiselect('updateButtonText');
   },

    GetSSPByID: function (SSPID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/StudentSecurityPlan/GetSSPById", "GET", { id: SSPID }, true);
        AjaxResult.success(function (data) {
          
            ///-------for edit---------//
            $("#SSPID").val(data.sspid);
            $("#txtName").val(data.name);
            $("#txtSummary").val(data.summary);
            $("#txtStudentName").val(data.studentName);
            $("#txtStudentDescription").Editor("setText", data.studentDescription);
            $("#txtStudentOwner").val(data.studentOwner);

            var dataClassification = data.classification;
            if (dataClassification != null) {
                var dataClassificationArray = dataClassification.split(",");
                $("#ddlClassification").val(dataClassificationArray);
                $("#ddlClassification").multiselect("refresh");
            } else {
                $('#ddlClassification').multiselect('deselectAll', false);
                $('#ddlClassification').multiselect('updateButtonText');
            }

            $("#txtIntroduction").val(data.introduction);
            $("#txtPurpose").val(data.purpose);
            $("#txtScope").val(data.scope);
           
            var dataRoles = data.roles;
            if (dataRoles != null) {
                var dataRolesArray = dataRoles.split(",");
                $("#ddlRoles").val(dataRolesArray);
                $("#ddlRoles").multiselect("refresh");
            } else {
                $('#ddlRoles').multiselect('deselectAll', false);
                $('#ddlRoles').multiselect('updateButtonText');
            }


            var dataGroups = data.grops;
            if (dataGroups != null) {
                var dataGroupsArray = dataGroups.split(",");
                $("#ddlGroups").val(dataGroupsArray);
                $("#ddlGroups").multiselect("refresh");
            }
            else {
                $('#ddlGroups').multiselect('deselectAll', false);
                $('#ddlGroups').multiselect('updateButtonText');
            }
            var dataLinkToSOAID = data.linkToSOAID;
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
            $("#lblSummary").text(data.summary);
            $("#lblStudentName").text(data.studentName);
            //$("#lblStudentDescription").text(data.studentDescription);
            $("#lblStudentOwner").text(data.studentOwner);
           
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

            $("#lblIntroduction").text(data.introduction);
            $("#lblPurpose").text(data.purpose);
            $("#lblScope").text(data.scope);

            GeneralUtilities.ajaxindicatorstop();

        });
    },
    DeleteSSPField: function (SSPID) {
        var confirmation = confirm("are you sure want to remove this SSP?");
        if (confirmation) {
            var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/StudentSecurityPlan/DeleteSSP", "POST", { id: SSPID }, true);
            AjaxResult.success(function (data) {
                GeneralUtilities.ajaxindicatorstop();
                SSPModuleUtilities.GetSSPList();
                $("#btnEditSSP").hide();
                $("#btnDeleteSSP").hide();
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

    HideAddSSP: function () {
        $('#AddSSP').hide();
        $('#ViewSSA').hide();
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

}