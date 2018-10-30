/// <reference path="genericfunctions.js" />

$(document).ready(function () {
    $('#settingControlListButtons').hide();
    SettingUtilities.GetSettingList();
    $('#divSettingView').delegate('div[litype="settings"]', 'click', function () {

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('#SettingListDiv').hide();
            $(".TreeDiv").removeClass("col-md-4").attr("class", "col-md-11 col-xs-11 col-sm-11 TreeDiv");
        }
        else {
            $('li').find('div').removeClass('active');
            $(this).addClass('active');
            $('#SettingListDiv').show();
            $(".TreeDiv").removeClass("col-md-12").attr("class", "col-md-4 col-xs-11 col-sm-11 TreeDiv");
            var da = $("#frameDemo").contents();
            var settingID = SettingUtilities.getSettingID();
            if (settingID == 1) {
                $('#settingControlListButtons').show();
                $("#SettingControlListDiv h2").html("SAML Settings");
                SAMLUtilities.GetSAMLSettingList();
            } else {
                $('#settingControlListButtons').hide();
                $("#SettingControlListDiv h2").html("Policies");
                SettingControlUtilities.GetSettingControlList();
            }
            $('#SAMLSettingAddEdit').hide();
            $('#SAMLSettingViewInfo').hide();
            $('#SettingControlInfo').hide();
            $('#settingCollap').show();
        }
    });

    //----------Collaps settings ----------------
    $('#btnSettingCollap').click(function () {
        $('#div1').toggle();
        $('#btnSettingCollap >i').toggleClass("fa fa-angle-double-left fa fa-angle-double-right");
        $('#div3').toggleClass("col-md-7 col-md-11");
    });
   

    //---------------------------------------Settings Controls--------------------------------//

    $('#SettingControlListDiv').delegate('td[tdtype="getSettingControlDetails"]', 'click', function () {
        $('#SettingControlListDiv').find('tr').removeClass('active');
        $(this).parent().closest('tr').addClass('active');
        $('#ManageSettingControlDiv').show();
        $('#btnAddNew').show();
        $('#btnUpdate').hide();
        $('#SettingControlInfo').show();
        $('#SAMLSettingAddEdit').hide();
        var SettingControlID = $(this).parent().closest('tr').attr("settingcontrol-id");
        // var settingControlName = $(this).parent().closest('tr').children('td').text();
        $("#ManageSettingControlDiv a").closest('#SettingControlName').html($(this).parent().closest('tr').children('td').text());
        if ($(this).parent().closest('tr').children('td').text() == "Risk Ratings") {
            RiskRatingUtilities.GetRiskRatingList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Consequences") {
            ConsequenceUtilities.GetConsequenceList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Likelihoods") {
            LikelihoodsUtilities.GetLikelihoodsList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Student Impact Levels") {
            StudentImpactLevelsUtilities.GetStudentImpactLevelsList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Classifications") {
            ClassificationsUtilities.GetClassificationsList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Compliance") {
            ComplianceUtilities.GetComplianceList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Compliance Levels") {
            ComplianceLevelUtilities.ComplianceLevelList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Effectiveness") {
            EffectivenessUtilities.GetEffectivenessList(SettingControlID);
        }
        else if ($(this).parent().closest('tr').children('td').text() == "Risk Matrix") {
            $('#btnAddNew').hide();
            $('#btnUpdate').show();
            RiskMatrixUtilities.GetRiskMatrixList();
        }


        $('#div1').hide();
        $('#btnSettingCollap >i').removeClass("fa fa-angle-double-left").addClass("fa fa-angle-double-right");
        $('#div3').removeClass("col-md-7 col-md-11");
    });


    ///-------------------------------------SAML Setting-------------------------------------///

    $('#btnNewSAML').click(function () {
        $('#SAMLSettingAddEdit').show();
        $('#SettingControlInfo').hide();
        $("#SamlId").val(0);
        SAMLUtilities.ClearSaml();
    });


    $('#SettingControlListDiv').delegate('td[tdtype="getSamlDetails"]', 'click', function () {
        $('#SettingControlListDiv').find('tr').removeClass('active');
        $(this).parent().closest('tr').addClass('active');
        var samlID = $(this).parent().closest('tr').attr("saml-id");
        SAMLUtilities.GetSAMLByID(samlID);
        $('#SAMLSettingViewInfo').show();
        $('#SAMLSettingAddEdit').hide();
        $('#div1').hide();
        $('#btnSettingCollap >i').removeClass("fa fa-angle-double-left").addClass("fa fa-angle-double-right");
        $('#div3').removeClass("col-md-7 col-md-11");
    });

    $('#btnSaveSaml').click(function () {
        SAMLUtilities.InsertSAML();

    });

    $('#btnCancelSaml').click(function () {
        SAMLUtilities.ClearSaml();
        SAMLUtilities.HideAddSaml();
    });
    //--------------------------------Edit SAML Setting--------------------------------------//
    $('#SettingControlListDiv').delegate('span[spnType="samlEdit"]', 'click', function () {
        $('#SAMLSettingViewInfo').hide();
        $('#SAMLSettingAddEdit').show();
        var samlID = $(this).parent().closest('tr').attr("saml-id");
        SAMLUtilities.GetSAMLByID(samlID);
    });
    //-------------------------------Delete Saml Settings-------------------------------------//
    $('#SettingControlListDiv').delegate('span[spnType="samlDelete"]', 'click', function () {
        $('#SAMLSettingViewInfo').hide();
        $('#SAMLSettingAddEdit').hide();
        var samlID = $(this).parent().closest('tr').attr("saml-id");
        SAMLUtilities.DeleteSamlSetting(samlID);

    });

    $('#fileLocalCertificate').change(function () {
        $('#lblLocalCertificate').text("");
    });
    $('#filePartnerCertificate').change(function () {
        $('#lblPartnerCertificate').text("");
    });
});


//--------------------------------Settings------------------------------------------------------------//
SettingUtilities = {
    GetSettingList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/_SettingsView", "GET", {}, true);
        AjaxResult.success(function (data) {
            $('#divSettingView').html(data);
            GeneralUtilities.ajaxindicatorstop();
        });
    },
    getSettingID: function () {
        var GetSelectedNode = $('#divSettingView').find('div.active');
        if ($(GetSelectedNode).length > 0)
            return $(GetSelectedNode).attr('data-id');
        return 0;
    },



}
//--------------------------------Settings Controls------------------------------------------------------------//
SettingControlUtilities = {
    GetSettingControlList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/_SettingControlList", "GET", { settingID: SettingUtilities.getSettingID() }, true);
        AjaxResult.success(function (data) {
            $('#divSettingControlList').html(data);
            GeneralUtilities.ajaxindicatorstop();
        });
    },

}


SAMLUtilities = {
    GetSAMLSettingList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/SamlConfig/_SAMLSettingControlList", "GET", {}, true);
        AjaxResult.success(function (data) {
            $('#divSettingControlList').html(data);
            GeneralUtilities.ajaxindicatorstop();
        });
    },
    GetSAMLByID: function (samlID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/SamlConfig/GetSamlById", "GET", { id: samlID }, true);
        AjaxResult.success(function (data) {
            //-----------For Edit---------------------------//
            $("#txtTenantName").val(data.tenantID);
            $("#txtLocalServiceName").val(data.localServiceName);

            $("#txtLocalDescription").val(data.localDescription);
            $("#txtAssertionConsumerServiceUrl").val(data.assertionConsumerServiceUrl);
            $("#txtSingleLogoutServiceUrl").val(data.singleLogoutServiceUrl);
            $("#txtArtifactResolutionServiceUrl").val(data.artifactResolutionServiceUrl);
            $('#lblLocalCertificate').text(data.localCertificate);
            $('#lblPartnerCertificate').text(data.partnerCertificate);

            $("#txtPartnerName").val(data.partnerName);
            $("#txtPartnerIPName").val(data.partnerIPName);
            $("#txtPartnerDescription").val(data.partnerDescription);
            $("#txtSingleSignOnServiceUrl").val(data.singleSignOnServiceUrl);
            $("#txtPartnerSingleLogoutServiceUrl").val(data.partnerSingleLogoutServiceUrl);

            $("#SamlId").val(data.samlId);

            //----------------------------------------For View-------------------------------//
         
            $('#lblTenantName').text(data.tenantID);
            $('#lblLocalServiceName').text(data.localServiceName);
            $('#lblLocalDescription').text(data.localDescription);
            $('#lblAssertionConsumerServiceUrl').text(data.assertionConsumerServiceUrl);
            $('#lblSingleLogoutServiceUrl').text(data.singleLogoutServiceUrl);
            $('#lblArtifactResolutionServiceUrl').text(data.artifactResolutionServiceUrl);
            $('#lblLCertificate').text(data.localCertificate);
            $('#lblPartnerName').text(data.partnerName);
            $('#lblPartnerIPName').text(data.partnerIPName);
            $('#lblPartnerDescription').text(data.partnerDescription);
            $('#lblSingleSignOnServiceUrl').text(data.singleSignOnServiceUrl);
            $('#lblPartnerSingleLogoutServiceUrl').text(data.partnerSingleLogoutServiceUrl);
            $('#lblPCertificate').text(data.partnerCertificate);
            
            $(".TreeDiv").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12 TreeDiv");
            GeneralUtilities.ajaxindicatorstop();
        });
       
    },
    InsertSAML: function () {
        if (!SAMLUtilities.IsValid('SAMLSettingAddEdit'))
            return false;
        var SamlConfigModel = {};
        SamlConfigModel.SamlId = $("#SamlId").val();
        SamlConfigModel.TenantID = $("#txtTenantName").val();
        SamlConfigModel.LocalServiceName = $("#txtLocalServiceName").val();;
        SamlConfigModel.LocalDescription = $("#txtLocalDescription").val();
        SamlConfigModel.AssertionConsumerServiceUrl = $("#txtAssertionConsumerServiceUrl").val();
        SamlConfigModel.SingleLogoutServiceUrl = $("#txtSingleLogoutServiceUrl").val();
        SamlConfigModel.ArtifactResolutionServiceUrl = $("#txtArtifactResolutionServiceUrl").val();

        SamlConfigModel.PartnerName = $("#txtPartnerName").val();
        SamlConfigModel.PartnerIPName = $("#txtPartnerIPName").val();
        SamlConfigModel.PartnerDescription = $("#txtPartnerDescription").val();
        SamlConfigModel.SingleSignOnServiceUrl = $("#txtSingleSignOnServiceUrl").val();
        SamlConfigModel.PartnerSingleLogoutServiceUrl = $("#txtPartnerSingleLogoutServiceUrl").val();

        input = document.getElementById('fileLocalCertificate');
        SamlConfigModel.LCertificate = input.files[0];

        input2 = document.getElementById('filePartnerCertificate');
        SamlConfigModel.PCertificate = input2.files[0];

        var formData = new FormData();
        formData.append('LCertificate', SamlConfigModel.LCertificate);
        formData.append('SamlId', SamlConfigModel.SamlId);
        formData.append('TenantID', SamlConfigModel.TenantID);
        formData.append('LocalServiceName', SamlConfigModel.LocalServiceName);
        formData.append('LocalDescription', SamlConfigModel.LocalDescription);
        formData.append('LocalServiceName', SamlConfigModel.LocalServiceName);
        formData.append('AssertionConsumerServiceUrl', SamlConfigModel.AssertionConsumerServiceUrl);
        formData.append('SingleLogoutServiceUrl', SamlConfigModel.SingleLogoutServiceUrl);
        formData.append('ArtifactResolutionServiceUrl', SamlConfigModel.ArtifactResolutionServiceUrl);

        formData.append('PartnerName', SamlConfigModel.PartnerName);
        formData.append('PartnerIPName', SamlConfigModel.PartnerIPName);
        formData.append('PartnerDescription', SamlConfigModel.PartnerDescription);
        formData.append('SingleSignOnServiceUrl', SamlConfigModel.SingleSignOnServiceUrl);
        formData.append('PartnerSingleLogoutServiceUrl', SamlConfigModel.PartnerSingleLogoutServiceUrl);
        formData.append('PCertificate', SamlConfigModel.PCertificate);

        $.ajax({
            url: "/SamlConfig/AddSaml",
            type: "POST",
            processData: false,
            contentType: false,
            data: formData,
            complete: function (data) {
               $('#SAMLSettingAddEdit').hide();
                SAMLUtilities.GetSAMLSettingList();
                SAMLUtilities.ClearSaml();
            }
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

    ClearSaml: function () {
        $("#txtTenantName").val("").removeClass('error');
        $("#txtLocalServiceName").val("").removeClass('error');
        $("#txtLocalDescription").val("").removeClass('error');
        $("#txtAssertionConsumerServiceUrl").val("").removeClass('error');
        $("#txtSingleLogoutServiceUrl").val("").removeClass('error');
        $("#txtArtifactResolutionServiceUrl").val("").removeClass('error');

        $("#txtPartnerName").val("").removeClass('error');
        $("#txtPartnerIPName").val("").removeClass('error');
        $("#txtPartnerDescription").val("").removeClass('error');
        $("#txtSingleSignOnServiceUrl").val("").removeClass('error');
        $("#txtPartnerSingleLogoutServiceUrl").val("").removeClass('error');
        
        $('#lblLocalCertificate').text("");
        $('#lblPartnerCertificate').text("");
        $("#fileLocalCertificate").val("");
        $("#filePartnerCertificate").val("");
        $("#txtName").removeClass('error');
        $("#tableAnotherControl > tbody").html("");

    },
    HideAddSaml: function () {
        $('#SAMLSettingAddEdit').hide();
    },
    DeleteSamlSetting: function (samlID) {
        var confirmation = confirm("are you sure want to remove this saml setting?");
        if (confirmation) {
            var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/SamlConfig/DeleteSaml", "POST", { id: samlID }, true);
            AjaxResult.success(function (data) {
                GeneralUtilities.ajaxindicatorstop();
                SAMLUtilities.GetSAMLSettingList();
            });
        }
    }, 
}