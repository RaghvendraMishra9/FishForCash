/// <reference path="genericfunctions.js" />
$(document).ready(function () {
    $('#divManageControlsList').delegate('select[selectType = "riskRating"]', 'change', function () {
        var ColorCode = $('option:selected', this).attr('color-code');
        $(this).css('background-color', ColorCode);
    });

    $("#btnUpdate").click(function () {
        var RiskList = [];
        $('#RiskMatrixTable tbody>tr').each(function (i, row) {
            $(this).find('td').each(function (j, col) {
                if (j > 0) {
                    var RiskMatrixViewModel = {};
                    RiskMatrixViewModel.RiskMatrixID = 0;
                    RiskMatrixViewModel.RiskRatingID = $(this).find('select option:selected').val();
                    RiskMatrixViewModel.ConsequenceID = $(row).find('td:eq(0)').attr('consequence-id');
                    RiskMatrixViewModel.LikelihoodID = $('#RiskMatrixTable thead').find('th:eq(' + j + ')').attr('likelihoods-id');
                    RiskMatrixViewModel.SettingControlID = RiskMatrixUtilities.getSettingControlID();
                    RiskMatrixViewModel.Col = j;
                    RiskMatrixViewModel.Row = i;
                    RiskList.push(RiskMatrixViewModel);
                }
            });
        });
        RiskMatrixUtilities.InsertRiskMatrix(RiskList);
    });
});

RiskMatrixUtilities = {
    InsertRiskMatrix: function (RiskList) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/InsertRiskMatrix", "POST", { RiskList: RiskList, settingControlID: RiskRatingUtilities.getSettingControlID() }, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            RiskMatrixUtilities.GetRiskMatrixList();
        });
    },

    GetRiskMatrixList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/_RiskMatrixList", "GET", {}, true);
            AjaxResult.success(function (data) {
             $('#divManageControlsList').html(data);
            GeneralUtilities.ajaxindicatorstop();
            RiskMatrixUtilities.GetRiskMatrixListData();
        });
    },
    getSettingControlID: function () {
        var GetSelectedNode = $('#SettingControlListDiv').find('tr.active');
        if ($(GetSelectedNode).length > 0)
            return $(GetSelectedNode).attr('settingcontrol-id');
        return 0;
    },

    GetRiskMatrixListData: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Setting/GetRiskMatrixBySettingControlID", "GET", { settingControlID: RiskRatingUtilities.getSettingControlID() }, false);
        AjaxResult.success(function (data) {
            $.each(data, function (i, v) {
                var CurrentSelect = $('#RiskMatrixTable tbody').find('tr:eq(' + v.row + ') td:eq(' + v.col + ')').find('select');
                $(CurrentSelect).val(v.riskRatingID);
                var ColorCode = $('#RiskMatrixTable tbody').find('tr:eq(' + v.row + ') td:eq(' + v.col + ')').find('select option:selected').attr('color-code');
                $(CurrentSelect).css('background-color', ColorCode);
            });
            GeneralUtilities.ajaxindicatorstop();
        });
    },
}