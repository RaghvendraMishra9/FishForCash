/// <reference path="genericfunctions.js" />

$(document).ready(function () {
    $('#btnEditCategory').hide();

    CategoryUtilities.GetCategoryList();
    $('#divCategoryTreeView').delegate(".collapsible", "click", function (e) {
        e.preventDefault();
        $(this).toggleClass("collapse expand");
        $(this).closest('li').children('ul').slideToggle();
    });

    $('#divCategoryTreeView').delegate('div[litype="parentcategory"]', 'click', function () {

        if ($(this).hasClass('active')) {
            $(this).find('input[type=checkbox]').prop('checked', false);
            $(this).removeClass('active');
            $('#btnEditCategory').hide();
            $('#AssetsDiv').hide();
            $('#AddCategory').hide();
            $(".TreeDiv").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12 TreeDiv");
        }
        else {
            $('li').find('div').removeClass('active');
            $('li').find('input[type=checkbox]').prop('checked', false);
            $(this).find('input[type=checkbox]').prop('checked', true);
            $(this).addClass('active');
            $('#AssetsDiv').show();
            $('#AssetsEditDiv').hide();
            $('#AssetsViewDiv').hide();
            $('#AddCategory').hide();
            $(".TreeDiv").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12 TreeDiv");
            //var categoryId = $(this).attr('data-id');
            $("#btnEditCategory").attr("edit-id", $(this).attr('data-id'));
            $("#btnDeleteCategory").attr("delete-id", $(this).attr('data-id'));
            $('#btnEditCategory').show();
            AssetsUtilities.GetDropdownList();
            AssetsUtilities.GetAssetsList();
           
        }

        //var categoryId = $(this).attr('data-id');
        //CategoryUtilities.GetCategoryByID(categoryId);
    });
    $('#btnEditCategory').click(function () {
        $('#AssetsDiv').hide();
        var CategoryID = $(this).attr("edit-id");
        CategoryUtilities.GetCategoryByID(CategoryID);
    });
    $('#btnSaveCategory').click(function () {
        CategoryUtilities.InsertCategory();
    });
    $('#btnAddCategory').click(function () {
        CategoryUtilities.ClearCategoryField();
        $('#AddCategory').show();
        $('#AssetsDiv').hide();
        $("#CategoryID").val(0);
        $("#PCategoryID").val(CategoryUtilities.getParentCategoryID());
        $(".TreeDiv").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12 TreeDiv");

    });

    $('#btnCancelCategory').click(function () {
        CategoryUtilities.HideAddCategory();
        CategoryUtilities.ClearCategoryField();
    });

    $('#btnDeleteCategory').click(function () {
        var CategoryID = $(this).attr("delete-id");
        CategoryUtilities.DeleteCategory(CategoryID);
    });
    $('#btnRefreshCategory').click(function () {
        location.href = location.href;
       // CategoryUtilities.GetCategoryList();
    });

   // $('#divCategoryTreeView').delegate('txt[search-Id="txtSearchCategory"]', 'keyup', function () {
    $('#divCategoryTreeView').delegate('input[type="search"]','keyup', function () {
       
        var searchText = $(this).val().toLowerCase();

        $('#divCategoryTreeView').find('ul > li').each(function () {

            var currentLiText = $(this).text().toLowerCase(),
                showCurrentLi = currentLiText.indexOf(searchText) !== -1;

            $(this).toggle(showCurrentLi);

        });
    });
    


    //-----------------------------------Assets-------------------------------------------//
    $('#btnNewAsset').click(function () {
        $('#AssetsEditDiv').show();
        $('#AssetsViewDiv').hide();
        $("#AssetID").val(0);
        $("#CategoryID").val(CategoryUtilities.getParentCategoryID());
       
        AssetsUtilities.ClearAssetFields();
    });

    $('#btnAddAsset').click(function () {
        AssetsUtilities.InsertAssets();
    });
    $('#divAssetList').delegate('td[tdtype="getassestdetails"]', 'click', function () {
        $('#divAssetList').find('tr').removeClass('active');
        $(this).parent().closest('tr').addClass('active');
        $('#AssetsViewDiv').show();
        $('#AssetsEditDiv').hide();
        var AssetID = $(this).parent().closest('tr').attr("asset-id");
        AssetsUtilities.GetAssetsByID(AssetID);
    });
    $('#divAssetList').delegate('span[spnType="assetEdit"]', 'click', function () {

        $('#AssetsViewDiv').hide();
        $('#AssetsEditDiv').show();
        var AssetID = $(this).parent().closest('tr').attr("asset-id");
        AssetsUtilities.GetAssetsByID(AssetID);

    });
    $('#divAssetList').delegate('span[spnType="assetDelete"]', 'click', function () {
        $('#AssetsViewDiv').hide();
        $('#AssetsEditDiv').hide();
        var AssetID = $(this).parent().closest('tr').attr("asset-id");
        AssetsUtilities.DeleteAsset(AssetID);
        AssetsUtilities.GetAssetsList();
    });
    $('#btnCancelAsset').click(function () {
        $('#AssetsViewDiv').hide();
        $('#AssetsEditDiv').hide();
        AssetsUtilities.ClearAssetFields();
    });
    $('#AssetsDiv').delegate('input[type="search"]', 'keyup', function () {
        var value = $(this).val().toLowerCase();
        $("#assetsTable tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });

    });

    $('#btnAssetsCollap').click(function () {
        $('#AssetsListDiv').toggle();
        $('#btnAssetsCollap >i').toggleClass("fa fa-angle-double-left fa fa-angle-double-right");
        $('#AssetsInfo').toggleClass("col-md-7 col-md-11");
    });
});

CategoryUtilities = {
    GetCategoryList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Category/_CategoryTreeView", "GET", {}, true);
        AjaxResult.success(function (data) {
            $('#divCategoryTreeView').html(data);
            GeneralUtilities.ajaxindicatorstop();
            var CategoryId = GeneralUtilities.getParameterByName('categoryId');
            if (CategoryId != '') {
                var CurrentEvent = $('div[data-id="' + CategoryId + '"]');
                $(CurrentEvent).addClass('active');
                $(CurrentEvent).find('input[type=checkbox]').prop('checked', true);
                $("#btnEditCategory").attr("edit-id", $(CurrentEvent).attr('data-id'));
                $("#btnDeleteCategory").attr("delete-id", $(CurrentEvent).attr('data-id'));
                $('#btnEditCategory').show();
                AssetsUtilities.GetDropdownList();
                AssetsUtilities.GetAssetsList();
               
                $('#AssetsDiv').show();
                $(".TreeDiv").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12 TreeDiv");
            }
        });
    },
    GetCategoryByID: function (categoryId) {
        $("#btnEditCategory").attr("edit-id", categoryId);
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Category/GetCategoryById", "GET", { id: categoryId }, true);
        AjaxResult.success(function (data) {
            $("#txtCategoryName").val(data.categoryName);
            $("#txtCategoryDescription").val(data.categoryDescription);
            $("#CategoryID").val(data.categoryID);
            $("#PCategoryID").val(data.pCategoryID);
            $('#AddCategory').show();
            $(".TreeDiv").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12 TreeDiv");
            GeneralUtilities.ajaxindicatorstop();

        });
        CategoryUtilities.HideAddCategory();
        CategoryUtilities.ClearCategoryField();

    },
    InsertCategory: function () {
        if (!CategoryUtilities.IsValid('AddCategory'))
            return false;

        var CategoryViewModel = {};
        CategoryViewModel.CategoryID = $("#CategoryID").val();
        CategoryViewModel.CategoryName = $("#txtCategoryName").val();
        CategoryViewModel.CategoryDescription = $("#txtCategoryDescription").val();
        CategoryViewModel.PCategoryID = $("#PCategoryID").val();

        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Category/Index", "POST", CategoryViewModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            CategoryUtilities.HideAddCategory();
            CategoryUtilities.ClearCategoryField();
            CategoryUtilities.GetCategoryList();
        });

    },
    getParentCategoryID: function () {
        var GetSelectedNode = $('#CategoryTreeView').find('div.active');
        if ($(GetSelectedNode).length > 0)
            return $(GetSelectedNode).attr('data-id');
        return 0;
    },
    IsValid: function (divid) {
        debugger;
        var IsValid = 1;
        $('#'+divid+'').find('input[type="text"],input[type="password"],textarea,select').removeClass('error');
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

    DeleteCategory: function (categoryId) {
        var getChildNode = $('#CategoryTreeView').find('div.active').parent().closest('li').find('ul');
        if (($(getChildNode).length > 0)) {
            alert('You can not delete parent category');
            return;
        }
        else {
            var CategoryID = $("#btnDeleteCategory").attr("delete-id");
            var confirmation = confirm("are you sure you want to remove the item?");
            if (confirmation) {
                var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Category/delete", "POST", { id: categoryId }, true);
                AjaxResult.success(function (data) {
                    GeneralUtilities.ajaxindicatorstop();
                });
            }
        }
    },
    HideAddCategory: function () {
        $('#AddCategory').hide();
        $(".TreeDiv").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12 TreeDiv");
    },

    ClearCategoryField: function () {
        $("#txtCategoryName").val("");
        $("#txtCategoryDescription").val("");
        $("#txtCategoryName").removeClass('error');
    }
}

//-----------------------------------Assets-------------------------------------------//
AssetsUtilities = {
    InsertAssets: function () {
        if (!CategoryUtilities.IsValid('AssetsEditDiv'))
            return false;
        var CategoryAssetViewModel = {};
        CategoryAssetViewModel.AssetID = $("#AssetID").val();
        CategoryAssetViewModel.CategoryID = $("#CategoryID").val();
        CategoryAssetViewModel.AssetName = $("#txtAssetName").val();
        CategoryAssetViewModel.AssetDescription = $("#txtAssetDescription").val();
        CategoryAssetViewModel.Owner = $("#txtOwner").val();
        CategoryAssetViewModel.UserBase = $("#txtUserBase").val();
        CategoryAssetViewModel.ClassificationID = $("#ddlClassification").val();
        CategoryAssetViewModel.ConfidentialityID = $("#ddlConfidentiality").val();
        CategoryAssetViewModel.AvailabilityID = $("#ddlAvailability").val();
        CategoryAssetViewModel.IntegrityID = $("#ddlIntegrity").val();
        CategoryAssetViewModel.AccountabilityID = $("#ddlAccountability").val();

        CategoryAssetViewModel.Classification = $("#ddlClassification").find('option:selected').text();
        CategoryAssetViewModel.Confidentiality = $("#ddlConfidentiality").find('option:selected').text();
        CategoryAssetViewModel.Availability = $("#ddlAvailability").find('option:selected').text();
        CategoryAssetViewModel.Integrity = $("#ddlIntegrity").find('option:selected').text();
        CategoryAssetViewModel.Accountability = $("#ddlAccountability").find('option:selected').text();
        CategoryAssetViewModel.LocationPhysical = $("#txtLocationPhysical").val();
        CategoryAssetViewModel.LocationLogical = $("#txtLocationLogical").val();

        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Category/InsertAsset", "POST", CategoryAssetViewModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            AssetsUtilities.GetAssetsList();
            $('#AssetsEditDiv').hide();
            $('#AssetsViewDiv').hide();
            AssetsUtilities.ClearAssetFields();
        });

    },
    GetAssetsList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Category/_AssetList", "GET", { categoryID: CategoryUtilities.getParentCategoryID() }, true);
        AjaxResult.success(function (data) {
            $('#divAssetList').html(data);
            GeneralUtilities.ajaxindicatorstop();

        });
    },
    GetAssetsByID: function (AssetID) {

        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Category/GetAssetById", "GET", { id: AssetID }, true);
        AjaxResult.success(function (data) {
            //for view------------------------
            $("#lblAssetName").text(data.assetName);
            $("#lblAssetDescription").text(data.assetDescription);
            $("#lblOwner").text(data.owner);
            $("#lblUserBase").text(data.userBase);
            $("#lblClassification").text(data.classification);
            $("#lblConfidentiality").text(data.confidentiality);
            $("#lblAvailability").text(data.availability);
            $("#lblIntegrity").text(data.integrity);
            $("#lblAccountability").text(data.accountability);
            $("#lblLocationPhysical").text(data.locationPhysical);
            $("#lblLocationLogical").text(data.locationLogical);

            // for edit----------------------
            $("#txtAssetName").val(data.assetName);
            $("#txtAssetDescription").val(data.assetDescription);
            $("#txtOwner").val(data.owner);
            $("#txtUserBase").val(data.userBase);
            $("#ddlClassification").val(data.classificationID);
            $("#ddlConfidentiality").val(data.confidentialityID);
            $("#ddlAvailability").val(data.availabilityID);
            $("#ddlIntegrity").val(data.integrityID);
            $("#ddlAccountability").val(data.accountabilityID);
            $("#txtLocationPhysical").val(data.locationPhysical);
            $("#txtLocationLogical").val(data.locationLogical);
            $("#AssetID").val(data.assetID);
            $("#CategoryID").val(data.categoryID);
            GeneralUtilities.ajaxindicatorstop();

        });
    },
    DeleteAsset: function (assetID) {
           var confirmation = confirm("are you sure you want to remove this assets?");
            if (confirmation) {
                var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Category/deleteAsset", "POST", { id: assetID }, true);
                AjaxResult.success(function (data) {
                    GeneralUtilities.ajaxindicatorstop();
                    AssetsUtilities.GetAssetsList();
                });
            }
        
    },
    ClearAssetFields: function () {
        $("#txtAssetName").val("");
        $("#txtAssetDescription").val("");
        $("#txtOwner").val("");
        $("#txtUserBase").val("");
        $("#ddlClassification").val("-1");
        $("#ddlAvailability").val("-1");
        $("#ddlIntegrity").val("-1");
        $("#ddlAccountability").val("-1");
        $("#ddlConfidentiality").val("-1");
        $("#txtLocationPhysical").val("");
        $("#txtLocationLogical").val("");
        $("#txtCategoryName").removeClass('error');
    },

    GetDropdownList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Category/GetDropdowns", "GET", {}, false);
        AjaxResult.success(function (data) {

            GeneralUtilities.BindDropdownGeneric('#ddlClassification', data.classification);
            GeneralUtilities.BindDropdownGeneric('#ddlConfidentiality', data.confidentiality);
            GeneralUtilities.BindDropdownGeneric('#ddlAvailability', data.availability)
            GeneralUtilities.BindDropdownGeneric('#ddlIntegrity', data.integrity)
            GeneralUtilities.BindDropdownGeneric('#ddlAccountability', data.accountability)
           
            GeneralUtilities.ajaxindicatorstop();

        });
    },
   
}
