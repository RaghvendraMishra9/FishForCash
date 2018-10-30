/// <reference path="genericfunctions.js" />

$(document).ready(function () {
    LibraryControlsUtilities.GetDropdownList();
    $("#txtLibraryDescription").Editor();
    $("#txtDescription").Editor();
    
    
    $('#divLibraryTreeView').delegate('#ChkLibrary', 'click', function () {
        if ($('#ChkLibrary').is(":checked")) {
            $('#divLibraryTreeView li').find('input[type=checkbox]').prop('checked', false);
            $('#divLibraryTreeView div').removeClass('active');
            $('#LibraryControlDiv').show();
            $('#LibraryControlViewDiv').hide();
            $('#LibraryControlEditDiv').hide();
            $('#AddLibraryDiv').hide();
            $(".TreeDiv").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12 TreeDiv");
            LibraryControlsUtilities.GetLibraryControlsList(0);
        }
        else {
            $('#btnEditLibrary').hide();
            $('#AddLibraryDiv').hide();
            $('#LibraryControlDiv').hide();
            $(".TreeDiv").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12 TreeDiv");
        }
    });

    $('#btnEditLibrary').hide();
    LibraryUtilities.GetLibraryList();
    $('#divLibraryTreeView').delegate(".collapsible", "click", function (e) {
        e.preventDefault();
        $(this).toggleClass("collapse expand");
        $(this).closest('li').children('ul').slideToggle();
    });

    $('#divLibraryControlTreeView').delegate(".collapsible", "click", function (e) {
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
            $("#LibraryID").val(0);
            $(".TreeDiv").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12 TreeDiv");
        }
        else {
            $('li').find('div').removeClass('active');
            $('li').find('input[type=checkbox]').prop('checked', false);
            $('#divLibraryTreeView').find('input[type=checkbox]').prop('checked', false);
            $(this).find('input[type=checkbox]').prop('checked', true);
            $(this).addClass('active');
            $('#LibraryControlDiv').show();
            $('#LibraryControlViewDiv').hide();
            $('#LibraryControlEditDiv').hide();
            $('#AddLibraryDiv').hide();
            $(".TreeDiv").removeClass("col-md-12").attr("class", "col-md-4 col-xs-12 col-sm-12 TreeDiv");
            $("#LibraryID").val($(this).attr('data-id'));
            $("#btnEditLibrary").attr("edit-id", $(this).attr('data-id'));
            $("#btnDeleteLibrary").attr("delete-id", $(this).attr('data-id'));
            $('#btnEditLibrary').show();
            LibraryControlsUtilities.GetLibraryControlsList(LibraryUtilities.getParentLibraryID());
        }
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
    $('#divLibraryTreeView').delegate('input[type="search"]', 'keyup', function () {

        var searchText = $(this).val().toLowerCase();

        $('#divLibraryTreeView').find('ul > li').each(function () {

            var currentLiText = $(this).text().toLowerCase(),
                showCurrentLi = currentLiText.indexOf(searchText) !== -1;
            $(this).toggle(showCurrentLi);

        });
    });

    //---------------------------------------------------Library Controls------------------------------------------------------------------------
    $('#btnNewLibraryControl').click(function () {
        debugger;
        $("#ControlID").val(0);
        if ($("#LibraryID").val() == 0) {
            alert("Please select library or control");
            return false;
        }
        $('#LibraryControlEditDiv').show();
        $('#LibraryControlViewDiv').hide();
        LibraryControlsUtilities.GetReferenceID();
        LibraryControlsUtilities.ClearLibraryControlFields();

    });

    $('#LibraryControlListDiv').delegate('div[litype="parentLibraryControl"]', 'click', function () {
        $('#LibraryControlListDiv').find('li').find('div').removeClass('active');
        $(this).addClass('active');
        $('#LibraryControlViewDiv').show();
        $('#LibraryControlEditDiv').hide();
        var LibraryControlID = $(this).attr("libraryControl-id");
        LibraryControlsUtilities.GetLibraryControlsByID(LibraryControlID);
    });


    $('#LibraryControlListDiv').delegate('span[spnType="libraryControlEdit"]', 'click', function () {
        $('#LibraryControlViewDiv').hide();
        $('#LibraryControlEditDiv').show();

        var LibraryControlID = $(this).attr("libraryControl-id");
        LibraryControlsUtilities.GetLibraryControlsByID(LibraryControlID);
        return false;

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

    $('#LibraryControlListDiv').delegate('input[type="search"]', 'keyup', function () {
        var searchText = $(this).val().toLowerCase();
        $('#LibraryControlListDiv').find('ul > li').each(function () {
            var currentLiText = $(this).text().toLowerCase(),
                showCurrentLi = currentLiText.indexOf(searchText) !== -1;
            $(this).toggle(showCurrentLi);
        });
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
                LibraryControlsUtilities.GetLibraryControlsList(LibraryUtilities.getParentLibraryID());
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
        LibraryViewModel.LibraryDescription = $("#txtLibraryDescription").Editor("getText");
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
            $("#txtLibraryDescription").Editor("setText", data.libraryDescription);
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
                    LibraryUtilities.GetLibraryList();
                    GeneralUtilities.ajaxindicatorstop();
                    $('#AddLibraryDiv').hide();
                    $('#LibraryControlDiv').hide();
                    $(".TreeDiv").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12 TreeDiv");
                });
            }
        }
    },
    HideAddLibrary: function () {
        $('#AddLibraryDiv').hide();
        $(".TreeDiv").removeClass("col-md-4").attr("class", "col-md-12 col-xs-12 col-sm-12 TreeDiv");
    },

    ClearLibraryField: function () {
        $("#txtLibraryTitle").val("").removeClass('error');
         $("#txtLibraryDescription").Editor("setText", "");
     }
}

//-----------------------------------------Library Controls---------------------------------
LibraryControlsUtilities = {

    GetReferenceID: function () {
        debugger;
        var controlid = LibraryControlsUtilities.getParentLibraryCantrolID();;
        var pcontrolid = $("#PControlID").val();
        var libraryID = LibraryUtilities.getParentLibraryID();
        if (controlid > 0) {
            var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/GetComplianceReferenceChild", "POST", { controlID: controlid, pcontrolID: pcontrolid, libraryID: libraryID }, true);
            AjaxResult.success(function (data) {
                GeneralUtilities.ajaxindicatorstop();
                $("#txtReference").val(data);
            });
        } else {
            var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/GetComplianceReferenceForParent", "POST", { libraryID: libraryID }, true);
            AjaxResult.success(function (data) {
                GeneralUtilities.ajaxindicatorstop();
                $("#txtReference").val(data);
            });
        }

    },


    InsertLibraryControls: function () {
        debugger;
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
        debugger;
        LibraryControlModel.ControlID = $("#ControlID").val();
        if ($("#LibraryID").val() == 0) {
            $("#LibraryID").val(LibraryUtilities.getParentLibraryID());
        }
        LibraryControlModel.LibraryID = $("#LibraryID").val();
        if ($("#ControlID").val() > 0) {
            LibraryControlModel.PControlID = $("#PControlID").val();
        } else {
            if (group == true) {
                var pControlID = LibraryControlsUtilities.getParentLibraryCantrolID();
                if (pControlID == undefined)
                    pControlID = 0;
                LibraryControlModel.PControlID = pControlID;
            }
            else {
                LibraryControlModel.PControlID = $("#PControlID").val();
            }
        }

        LibraryControlModel.Group = group;
        LibraryControlModel.Reference = $("#txtReference").val();
        LibraryControlModel.Name = $("#txtName").val();
        LibraryControlModel.Description = $("#txtDescription").Editor("getText");
        LibraryControlModel.ComplianceID = $("#ddlCompliance").val();
        var Classification = ($("#ddlClassification").val());
        if (Classification != null) {
            var SelectedClassification = Classification.join(',');
            LibraryControlModel.ClassificationID = SelectedClassification;
        }
        else {
            LibraryControlModel.ClassificationID = -1;
        }
        LibraryControlModel.Compliance = $("#ddlCompliance").find('option:selected').text();
        var Classification = $(".multiselect").attr('title');
        LibraryControlModel.Classification = Classification;
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
            LibraryControlsUtilities.GetLibraryControlsList(LibraryUtilities.getParentLibraryID());
            LibraryControlsUtilities.ClearLibraryControlFields();
        });

    },
    GetLibraryControlsList: function (libraryID) {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/_LibraryControlTreeView", "GET", { libraryID: libraryID }, true);
        AjaxResult.success(function (data) {
            $('#divLibraryControlTreeView').html(data);
              GeneralUtilities.ajaxindicatorstop();
        });
    },

    DeleteLibraryControls: function (assetID) {
        var confirmation = confirm("are you sure you want to remove this control?");
        if (confirmation) {
            var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/DeleteLibraryControl", "POST", { id: assetID }, true);
            AjaxResult.success(function (data) {
                GeneralUtilities.ajaxindicatorstop();
                LibraryControlsUtilities.GetLibraryControlsList(LibraryUtilities.getParentLibraryID());
            });
        }

    },
    GetLibraryControlsByID: function (LibraryControlID) {

        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/GetControlById", "GET", { id: LibraryControlID }, true);
        AjaxResult.success(function (data) {

            //for view------------------------
            $("#lblReference").text(data.reference);
            $("#lblName").text(data.name);
            //$("#lblDescription").text(data.description);
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
                var del = "<span class='deleteAnotherControle' title='Delete' spnType='anotherControlDelete' anotherControlDelete-id='" + obj.controlLinkID + "' style='cursor: pointer'><i class='fa fa-trash green-text'></i></span>";
                var row = '<tr anotherControl-id="' + obj.controlLinkID + '"><td> ' + obj.linkedWith + ' </td> <td> ' + del + ' </td></tr>'
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
            $("#txtDescription").Editor("setText", data.description);
            $("#ddlCompliance").val(data.complianceID);
            var dataClassification = data.classificationID;
            if (dataClassification != null) {
                var dataClassificationArray = dataClassification.split(",");
                $("#ddlClassification").val(dataClassificationArray);
                $("#ddlClassification").multiselect("refresh");
            } else {
                $('#ddlClassification').multiselect('deselectAll', false);
                $('#ddlClassification').multiselect('updateButtonText');
            }
            //   $("#ddlClassification").val(data.classificationID);

            $("#ControlID").val(data.controlID);
            $("#LibraryID").val(data.libraryID);
            $("#PControlID").val(data.pControlID);
            GeneralUtilities.ajaxindicatorstop();

        });
    },

    ClearLibraryControlFields: function () {
        $("#txtReference").val("").removeClass('error');
        $("#txtName").val("").removeClass('error');
        $("#txtDescription").Editor("setText", "");
        $("#ddlCompliance").val("-1");
        $('#ddlClassification').multiselect('deselectAll', false);
        $('#ddlClassification').multiselect('updateButtonText');
        $("#tableAnotherControl > tbody").html("");
    },
    GetDropdownList: function () {
        var AjaxResult = GeneralUtilities.callajaxReturnSuccess("/Library/GetDropdowns", "GET", {}, false);
        AjaxResult.success(function (data) {
            GeneralUtilities.BindMultipleDropdownGeneric('#ddlClassification', data.classification);
            GeneralUtilities.BindDropdownGeneric('#ddlCompliance', data.compliance);
            GeneralUtilities.ajaxindicatorstop();
            $('#ddlClassification').multiselect();
        });
    },

    getParentLibraryCantrolID: function () {
        var GetSelectedNode = $('#LibraryControlListDiv').find('div.active');
        if ($(GetSelectedNode).length > 0)
            return $(GetSelectedNode).attr('libraryControl-id');
        return 0;
    },
}
