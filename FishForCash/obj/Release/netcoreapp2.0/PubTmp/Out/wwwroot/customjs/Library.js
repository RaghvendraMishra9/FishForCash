/// <reference path="genericfunctions.js" />

$(document).ready(function () {
    $('#btnEditLibrary').hide();

    LibraryUtilities.GetLibraryList();
    $('#divLibraryTreeView').delegate(".collapsible", "click", function (e) {
        e.preventDefault();
        $(this).toggleClass("collapse expand");
        $(this).closest('li').children('ul').slideToggle();
    });

    $('#btnAssetsCollap').click(function () {
        $('#LibraryControlListDiv').toggle();
        $('#btnAssetsCollap >i').toggleClass("fa fa-angle-double-left fa fa-angle-double-right");
        $('#LibraryControlInfo').toggleClass("col-md-7 col-md-11");
    });
    $('#divLibraryTreeView').delegate('div[litype="parentLibrary"]', 'click', function () {

        if ($(this).hasClass('active')) {
            $(this).find('input[type=checkbox]').prop('checked', false);
            $(this).removeClass('active');
            $('#btnEditLibrary').hide();
            $('#AddLibraryDiv').hide();
            $('#LibraryControlDiv').hide();
            $(".TreeDiv").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12 TreeDiv");
        }
        else {
            $('li').find('div').removeClass('active');
            $('li').find('input[type=checkbox]').prop('checked', false);
            $(this).find('input[type=checkbox]').prop('checked', true);
            $(this).addClass('active');
            $('#LibraryControlDiv').show();
            $('#LibraryControlViewDiv').hide();
            $('#LibraryControlEditDiv').hide();
            $('#AddLibraryDiv').hide();
            $(".TreeDiv").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12 TreeDiv");

            $("#btnEditLibrary").attr("edit-id", $(this).attr('data-id'));
            $("#btnDeleteLibrary").attr("delete-id", $(this).attr('data-id'));
            $('#btnEditLibrary').show();
            LibraryControlsUtilities.GetDropdownList();
            LibraryControlsUtilities.GetLibraryControlsList();
        }

        //var categoryId = $(this).attr('data-id');
        //CategoryUtilities.GetCategoryByID(categoryId);
    });
    $('#btnEditLibrary').click(function () {
        $('#LibraryControlDiv').hide();
        var LibraryID = $(this).attr("edit-id");
        LibraryUtilities.GetLibraryByID(LibraryID);
    });
    $('#btnSaveLibrary').click(function () {
        LibraryUtilities.InsertLibrary();
    });
    $('#btnAddLibrary').click(function () {
        LibraryUtilities.ClearLibraryField();
        $('#AddLibraryDiv').show();
        $('#LibraryControlDiv').hide();
        $("#LibraryID").val(0);
        $("#PLibraryID").val(LibraryUtilities.getParentLibraryID());
        $(".TreeDiv").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12 TreeDiv");

    });

    $('#btnCancelLibrary').click(function () {
        LibraryUtilities.HideAddLibrary();
        LibraryUtilities.ClearLibraryField();
    });

    $('#btnDeleteLibrary').click(function () {
        var LibraryID = $(this).attr("delete-id");
        LibraryUtilities.DeleteLibrary(LibraryID);
    });
    $('#btnRefreshLibrary').click(function () {
        location.href = location.href;
    });

    //---------------------------------------------------Library Controls------------------------------------------------------------------------
    $('#btnNewLibraryControl').click(function () {
        $('#LibraryControlEditDiv').show();
        $('#LibraryControlViewDiv').hide();
        $("#ControlID").val(0);
        $("#LibraryID").val(LibraryUtilities.getParentLibraryID());
        $("#PControlID").val(0);
        LibraryControlsUtilities.ClearLibraryControlFields();
      
    });

    $('#LibraryControlListDiv').delegate('td[tdtype="getLibraryControldetails"]', 'click', function () {
        $('#LibraryControlListDiv').find('tr').removeClass('active');
        $(this).parent().closest('tr').addClass('active');
        $('#LibraryControlViewDiv').show();
        $('#LibraryControlEditDiv').hide();
         var LibraryControlID = $(this).parent().closest('tr').attr("libraryControl-id");
        LibraryControlsUtilities.GetLibraryControlsByID(LibraryControlID);
        });

    $('#LibraryControlListDiv').delegate('span[spnType="libraryControlEdit"]', 'click', function () {

        $('#LibraryControlViewDiv').hide();
        $('#LibraryControlEditDiv').show();
        var LibraryControlID = $(this).parent().closest('tr').attr("libraryControl-id");
        LibraryControlsUtilities.GetLibraryControlsByID(LibraryControlID);
      

    });
    $('#LibraryControlListDiv').delegate('span[spnType="libraryControlDelete"]', 'click', function () {
        $('#LibraryControlViewDiv').hide();
        $('#LibraryControlEditDiv').hide();
        var LibraryControlID = $(this).parent().closest('tr').attr("libraryControl-id");
        LibraryControlsUtilities.DeleteLibraryControls(LibraryControlID);
       
    });
    $('#btnCancelLibraryControl').click(function () {
        $('#LibraryControlViewDiv').hide();
        $('#LibraryControlEditDiv').hide();
        LibraryControlsUtilities.ClearLibraryControlFields();
    });


    $('#btnSaveLibraryControl').click(function () {
        LibraryControlsUtilities.InsertLibraryControls();
    });


    $('#adddata').on('click', function () {

        var anotherControle;
        anotherControle = $("#txtAnotherControle").val();
        var del = "<span class='deleteAnotherControle' title='Delete' spnType='anotherControlDelete' anotherControlDelete-id='0' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>";
        if (anotherControle == "") {
            alert("Fields should not be empty");
        } else {
            var table = "<tr anotherControl-id='0'><td>" + anotherControle + "</td> <td>" + del + "</td></tr>";
            $("#tableAnotherControl").append(table);
        }
        anotherControle = $("#txtAnotherControle").val("");

    });

    $("#tableAnotherControl").on("click", ".deleteAnotherControle", function (e) {
        if (confirm("Are you sure want to delete")) {
            $(this).closest('tr').remove();
        } else {
            e.preventDefault();
        }
    });

    $(document).on('click', 'input[type="checkbox"]', function () {
        $('input[type="checkbox"]').not(this).prop('checked', false);
    });

});


LibraryUtilities = {

    GetLibraryList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/_LibraryTreeView", "GET", {}, true);
        AjaxResult.success(function (data) {
            $('#divLibraryTreeView').html(data);
            GeneralUtilities.ajaxindicatorstop();
            var LibraryID = GeneralUtilities.getParameterByName('LibraryID');
            if (LibraryID != '') {
                var CurrentEvent = $('div[data-id="' + LibraryID + '"]');
                $(CurrentEvent).addClass('active');
                $(CurrentEvent).find('input[type=checkbox]').prop('checked', true);
                $("#btnEditLibrary").attr("edit-id", $(CurrentEvent).attr('data-id'));
                $("#btnDeleteLibrary").attr("delete-id", $(CurrentEvent).attr('data-id'));
                $('#btnEditLibrary').show();
                LibraryControlsUtilities.GetDropdownList();
                LibraryControlsUtilities.GetLibraryControlsList();
                $('#LibraryControlDiv').show();
                $(".TreeDiv").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12 TreeDiv");
            }
        });
    },

    InsertLibrary: function () {
        if (!LibraryUtilities.IsValid('AddLibraryDiv'))
            return false;
        var LibraryViewModel = {};
        LibraryViewModel.LibraryID = $("#LibraryID").val();
        LibraryViewModel.LibraryTitle = $("#txtLibraryTitle").val();
        LibraryViewModel.LibraryDescription = $("#txtLibraryDescription").val();
        LibraryViewModel.PLibraryID = $("#PLibraryID").val();

        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/Index", "POST", LibraryViewModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            LibraryUtilities.HideAddLibrary();
            LibraryUtilities.ClearLibraryField();
            LibraryUtilities.GetLibraryList();
        });

    },
    GetLibraryByID: function (LibraryID) {

        $("#btnEditLibrary").attr("edit-id", LibraryID);
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/GetLibraryByID", "GET", { id: LibraryID }, true);
        AjaxResult.success(function (data) {
            $("#txtLibraryTitle").val(data.libraryTitle);
            $("#txtLibraryDescription").val(data.libraryDescription);
            $("#LibraryID").val(data.libraryID);
            $("#PLibraryID").val(data.pLibraryID);
            $('#AddLibraryDiv').show();
            $(".TreeDiv").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12 TreeDiv");
            GeneralUtilities.ajaxindicatorstop();
        });
        LibraryUtilities.HideAddLibrary();
        LibraryUtilities.ClearLibraryField();
    },
    getParentLibraryID: function () {
        var GetSelectedNode = $('#LibraryTreeView').find('div.active');
        if ($(GetSelectedNode).length > 0)
            return $(GetSelectedNode).attr('data-id');
        return 0;
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

    DeleteLibrary: function (LibraryID) {
        var getChildNode = $('#LibraryTreeView').find('div.active').parent().closest('li').find('ul');
        if (($(getChildNode).length > 0)) {
            alert('You can not delete parent Library');
            return;
        }
        else {
            var confirmation = confirm("are you sure you want to remove the item?");
            if (confirmation) {
                var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/deleteLibrary", "POST", { id: LibraryID }, true);
                AjaxResult.success(function (data) {
                    GeneralUtilities.ajaxindicatorstop();
                });
            }
        }
    },
    HideAddLibrary: function () {
        $('#AddLibraryDiv').hide();
        $(".TreeDiv").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12 TreeDiv");
    },

    ClearLibraryField: function () {
        $("#txtLibraryTitle").val("");
        $("#txtLibraryDescription").val("");
        $("#txtLibraryTitle").removeClass('error');
    }
}


//-----------------------------------------Library Controls---------------------------------
LibraryControlsUtilities = {

    InsertLibraryControls: function () {
       if (!LibraryUtilities.IsValid('AssetsEditDiv'))
            return false;
        var group;
        if ($('#GroupLibraryControlYes').is(":checked")) {
            group = true;
        } else {
            group = false;
        }
        var LibraryControlModel = {};
        LibraryControlModel.ControlLinks = [];
        LibraryControlModel.ControlID = $("#ControlID").val();
        LibraryControlModel.LibraryID = $("#LibraryID").val();
        if (group == true) {
            var pControlID = LibraryControlsUtilities.getParentLibraryCantrolID();
            if (pControlID == undefined)
                pControlID = 0;
            LibraryControlModel.PControlID = pControlID;
        }
        else {
            LibraryControlModel.PControlID = $("#PControlID").val();
        }
       
        LibraryControlModel.Group = group;
        LibraryControlModel.Reference = $("#txtReference").val();
        LibraryControlModel.Name = $("#txtName").val();
        LibraryControlModel.Description = $("#txtDescription").val();
        LibraryControlModel.ComplianceID = $("#ddlCompliance").val();
        LibraryControlModel.ClassificationID = $("#ddlClassification").val();

        LibraryControlModel.Compliance = $("#ddlCompliance").find('option:selected').text();
        LibraryControlModel.Classification = $("#ddlClassification").find('option:selected').text();
        $('#tableAnotherControl tr').each(function (row, tr) {
            var value = $(tr).find('td:eq(0)').text();
            var controlLinkID = $(tr).attr("anotherControl-id");
            if (value.length > 0) {
                var ControlLinks = {};
                ControlLinks.ControlLinkID = controlLinkID;
                ControlLinks.ControlID = 0;
                ControlLinks.LinkedWith = value;
                LibraryControlModel.ControlLinks.push(ControlLinks)
            }
        });
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/InsertLibraryControl", "POST", LibraryControlModel, true);
        AjaxResult.success(function (data) {
            GeneralUtilities.ajaxindicatorstop();
            $('#LibraryControlViewDiv').hide();
            $('#LibraryControlEditDiv').hide();
            LibraryControlsUtilities.GetLibraryControlsList();
            LibraryControlsUtilities.ClearLibraryControlFields();
        });

    },
    GetLibraryControlsList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/_LibraryControlList", "GET", { libraryID: LibraryUtilities.getParentLibraryID() }, true);
        AjaxResult.success(function (data) {
            $('#divLibraryControlList').html(data);
            GeneralUtilities.ajaxindicatorstop();
        });
    },

    //GetLinkWithControlList: function (LibraryControlID) {
    //    var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/_LinkWithControlList", "GET", { controlID: LibraryControlID }, true);
    //    AjaxResult.success(function (data) {
    //        $('#divLinkedWith').html(data);
    //        GeneralUtilities.ajaxindicatorstop();
    //    });
    //},


    DeleteLibraryControls: function (assetID) {
        var confirmation = confirm("are you sure you want to remove this control?");
        if (confirmation) {
            var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/DeleteLibraryControl", "POST", { id: assetID }, true);
            AjaxResult.success(function (data) {
                GeneralUtilities.ajaxindicatorstop();
                LibraryControlsUtilities.GetLibraryControlsList();
            });
        }

    },   
    GetLibraryControlsByID: function (LibraryControlID) {

        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/GetControlById", "GET", { id: LibraryControlID }, true);
        AjaxResult.success(function (data) {
          
            //for view------------------------
            $("#lblReference").text(data.reference);
            $("#lblName").text(data.name);
            $("#lblDescription").text(data.description);
            $("#lblCompliance").text(data.compliance);
            $("#lblClassification").text(data.classification);

            $("#tableAnotherControlView > tbody").html("");
            $.each(data.controlLinks, function (index, obj) {

                 var row = '<tr><td> ' + obj.linkedWith + ' </td></tr>'
                $("#tableAnotherControlView tbody").append(row);
            }); 


            // for edit----------------------
            $("#tableAnotherControl > tbody").html("");
            $.each(data.controlLinks, function (index, obj) {
                var del = "<span class='deleteAnotherControle' title='Delete' spnType='anotherControlDelete' anotherControlDelete-id='" + obj.controlLinkID+"' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>";
                var row = '<tr anotherControl-id="'+obj.controlLinkID+'"><td> ' + obj.linkedWith + ' </td> <td> ' + del + ' </td></tr>'
                $("#tableAnotherControl tbody").append(row);
            }); 


            $('#LibraryControlEditDiv').find('input[type=checkbox]').prop('checked', false);
            if (data.group == true) {
               $('#GroupLibraryControlYes').prop('checked', true);
            }
            else {
                $('#GroupLibraryControlNo').prop('checked', true);
            }
            $("#txtReference").val(data.reference);
            $("#txtName").val(data.name);
            $("#txtDescription").val(data.description);
            $("#ddlCompliance").val(data.complianceID);
            $("#ddlClassification").val(data.classificationID);
                    
            $("#ControlID").val(data.controlID);
            $("#LibraryID").val(data.libraryID);
            $("#PControlID").val(data.pControlID);
            GeneralUtilities.ajaxindicatorstop();

        });
    },

    ClearLibraryControlFields: function () {
        $("#txtReference").val("");
        $("#txtName").val("");
        $("#txtDescription").val("");
        $("#ddlCompliance").val("-1");
        $("#ddlClassification").val("-1");
        $("#txtReference").removeClass('error');
        $("#txtName").removeClass('error');
        $("#tableAnotherControl > tbody").html("");
    },
    GetDropdownList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/GetDropdowns", "GET", {}, false);
        AjaxResult.success(function (data) {

            GeneralUtilities.BindDropdownGeneric('#ddlClassification', data.classification);
            GeneralUtilities.BindDropdownGeneric('#ddlCompliance', data.compliance);
            GeneralUtilities.ajaxindicatorstop();

        });
    },

    getParentLibraryCantrolID: function () {
        var GetSelectedNode = $('#LibraryControlListDiv').find('tr.active');
       if ($(GetSelectedNode).length > 0)
            return $(GetSelectedNode).attr('libraryControl-id');
        return 0;
    },

}
