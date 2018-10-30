GeneralUtilities = {
    callajaxReturnSuccess: function (url, type, form_data, IsLoader) {
        if (IsLoader) {
            GeneralUtilities.ajaxindicatorstart('', 'Please wait');
        }
        return $.ajax({
            url: url,
            type: type,
            data: form_data
        });

    },
    callajaxReturnSuccessForFile: function (url, type, form_data, IsLoader) {
        if (IsLoader) {
            GeneralUtilities.ajaxindicatorstart('', 'Please wait');
        }
        return $.ajax({
            url: url,
            type: type,
            data: form_data,
            enctype: "multipart/form-data",
            contentType: false,
            processData: false
        });

    },
    callajaxWithoutAsync: function (url, type, form_data) {
        var Model = null;
        GeneralUtilities.ajaxindicatorstart('', 'Please wait');
        $.ajax({
            url: url,
            type: type,
            data: form_data,
            async: false,
            success: function (data) {
                Model = data.model;
                GeneralUtilities.ajaxindicatorstop();
            },
            error: function (error) {

            }
        });
        return Model;
    },
    callajaxAsync: function (url, type, form_data) {
        var Model = null;
        GeneralUtilities.ajaxindicatorstart('', 'Please wait');
        $.ajax({
            url: url,
            type: type,
            data: form_data,
            success: function (data) {
                Model = data.model;
                GeneralUtilities.ajaxindicatorstop();
            },
            error: function (error) {

            }
        });
        return Model;
    },
    callajaxforhtml: function (url, type, form_data) {
        var Model = null;
        $.ajax({
            cache: false,
            url: url,
            type: type,
            data: form_data,
            async: false,
            success: function (data) {
                Model = data;
            },
            error: function (error) {

            }
        });
        return Model;
    },
    CalAjaxFunctionRepetitively: function (AjaxRequests, IsAsync, IsPredective) {

        //setup an array of AJAX options, each object is an index that will specify information for a single AJAX request
        // var ajaxes  = [{ url : '<url>', dataType : 'json' }, { url : '<url2>', dataType : 'xml' }],current = 0;
        var ajaxes = AjaxRequests, current = 0;
        //declare your function to run AJAX requests
        function do_ajax() {

            //check to make sure there are more requests to make
            if (current < ajaxes.length) {

                if (ajaxes[current].data == undefined) {
                    ajaxes[current].data = {};
                }
                //make the AJAX request with the given data from the `ajaxes` array of objects
                $.ajax({
                    url: ajaxes[current].url,
                    dataType: ajaxes[current].dataType,
                    data: ajaxes[current].data,
                    async: IsAsync,
                    success: function (serverResponse) {
                        GeneralUtilities.BindDropdownGeneric(ajaxes[current].Controlid, serverResponse.model);
                        if (IsPredective) {
                            $('' + ajaxes[current].Controlid + '').chosen();
                        }
                        current++;

                        do_ajax();
                    }
                });
            }
        }
        do_ajax();
    },
    ajaxindicatorstart: function (Control, text) {

        jQuery('body').append('<div id="resultLoading" style="display:none"><div><img src="../images/ajax-loader.gif"><div>' + text + '</div></div><div class="bg"></div></div>');
        jQuery('#resultLoading').css({
            'width': '100%',
            'height': '100%',
            'position': 'fixed',
            'z-index': '10000000',
            'top': '0',
            'left': '0',
            'right': '0',
            'bottom': '0',
            'margin': 'auto'
        });

        jQuery('#resultLoading .bg').css({
            'background': 'transparent',
            'opacity': '0.7',
            'width': '100%',
            'height': '100%',
            'position': 'absolute',
            'top': '0'
        });

        jQuery('#resultLoading>div:first').css({
            'width': '250px',
            'height': '75px',
            'text-align': 'center',
            'position': 'fixed',
            'top': '0',
            'left': '0',
            'right': '0',
            'bottom': '0',
            'margin': 'auto',
            'font-size': '16px',
            'z-index': '10',
            'color': '##002F29'

        });

        jQuery('#resultLoading .bg').height('100%');
        jQuery('#resultLoading').fadeIn(300);
        //  jQuery('body').css('cursor', 'wait');
    },
    ajaxindicatorstop: function () {
        jQuery('#resultLoading .bg').height('100%');
        jQuery('#resultLoading').fadeOut(300);
        //jQuery('#' + Control + '').css('cursor', 'default');
    },
    ShowErrorMessage: function (message) {
        $.notify(message, { color: "#fff", align: "right", background: "#D44950", icon: "bell", verticalAlign: "top" });
    },
    ShowSuccessMessage: function (message) {
        $("#successMessage").html(message).fadeTo(2000, 500).slideUp(500);
    },
    showSuccessErrorMessage: function (Model, Message) {
        //$("body").scrollTop(0);
        if (Model === true) {
            $.notify(Message, { color: "#fff", background: "#20D67B", icon: "check", align: "right", verticalAlign: "top" });
        }
        else {
            $.notify("Error Occured.Try Again.!!", { color: "#fff", align: "right", background: "#D44950", icon: "bell", verticalAlign: "top" });
        }
    },
    showSmallSuccessErrorMessage: function (SuccessControl, ErrorControl, Model, Message) {

        if (Model === true) {
            $.notify(Message, { color: "#fff", background: "#20D67B", icon: "check", align: "right", verticalAlign: "top" });
        }
        else {
            $.notify("Error Occured.Try Again.!!", { color: "#fff", align: "right", background: "#D44950", icon: "bell", verticalAlign: "top" });
        }
    },
    BindDropdownGeneric: function (controlid, Model) {
        $('' + controlid + '').html('<option value="-1">--Select--</option>');
        $.each(Model, function (i, v) {
            $('' + controlid + '').append('<option value="' + v.value + '">' + v.text + '</option>');
        });

    },
    InitialiseDataTable: function (event) {
        try {
            $(event).DataTable({ destroy: true, order: [] });
        }
        catch (err) {
            console.log(err);
        }
    },
    SetDateTimeFormat: function (OldDate) {
        var MonthName = OldDate.substring(0, 3);
        var NewMonth = ("JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(MonthName) / 3 + 1);
        if (NewMonth.toString().length < 1)
            NewMonth = "0" + NewMonth;

        var NewDay = OldDate.replace(' ', '').replace(MonthName, '').substr(0, 2);

        var NewYear = OldDate.replace(' ', '').replace(MonthName, '').substr(3, 4);

        var Time = OldDate.split('-')[1];

        return NewMonth + "/" + NewDay + "/" + NewYear + Time;
    },
    SetDateFormat: function (OldDate) {
        var MonthName = OldDate.substring(0, 3);
        var NewMonth = ("JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(MonthName) / 3 + 1);
        if (NewMonth.toString().length < 1)
            NewMonth = "0" + NewMonth;

        var NewDay = OldDate.replace(' ', '').replace(MonthName, '').substr(0, 2);

        var NewYear = OldDate.replace(' ', '').replace(MonthName, '').substr(3, 4);

        //var Time = OldDate.split('-')[1];

        return NewMonth + "/" + NewDay + "/" + NewYear;
    },
    ConvertJsonResultToDate: function (JsonDate) {
        var mydate = JsonDate
        if (mydate != null) {
            var date = new Date(parseInt(mydate.replace(/\/Date\((-?\d+)\)\//, '$1')));
            mydate = GeneralUtilities.zeroFill(date.getMonth() + 1) + '/' + GeneralUtilities.zeroFill(date.getDate()) + '/' + GeneralUtilities.zeroFill(date.getFullYear());
            return GeneralUtilities.getFormattedDate(mydate);
        }
        return "";
    },
    zeroFill: function (i) {
        return (i < 10 ? '0' : '') + i
    },
    getFormattedDate: function (input) {
        var pattern = /(.*?)\/(.*?)\/(.*?)$/;
        var result = input.replace(pattern, function (match, p1, p2, p3) {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return months[(p1 - 1)] + " " + (p2 < 10 ? p2 : p2) + " " + p3;
        });

        return (result);
    },
    SetInactiveCheckbox: function (ControlID, Status) {
        $('#' + ControlID + '').find('#no-more-tables').find('.row:eq(0) .col-sm-6').each(function (i, v) {
            if (i == 0) {
                $(this).removeClass('col-sm-6').addClass('col-sm-4');
            }
            else {
                $(this).removeClass('col-sm-6').addClass('col-sm-2');
            }
        });
        $('<div class="col-sm-6" style="text-align: right;"><input type="checkbox" chktype="GetStatusRecord" id="chk' + ControlID + '" ' + Status + '/> Show inactive only</div>').insertAfter($('#' + ControlID + '').find('#no-more-tables').find('.row:eq(0) .col-sm-4'));

    },
    GetTodayDate: function () {
        var m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
        var tdate = new Date();
        var dd = tdate.getDate(); //yields day
        var MM = tdate.getMonth(); //yields month
        var yyyy = tdate.getFullYear(); //yields year

        var currentDate = m_names[MM] + " " + dd + " " + yyyy;
        return currentDate;
    },
    SetAndRemoveUpdateActions: function (UpdatedString, AddType) {
        UpdateActions = UpdateActions + UpdatedString + ",";
    },
    CheckValidationGeneric: function (event) {

        var IsValid = true;
        $(event).find('select[isrequired="true"]').each(function () {

            if ($('option:selected', this).val() == "-1") {
                $(this).addClass('error');
                IsValid = false;
            }

        });
        $(event).find('input[isrequired="true"],textarea[isrequired="true"]').each(function () {

            if ($(this).val() == "") {
                $(this).addClass('error');
                IsValid = false;
            }

        });
        return IsValid;
    },
    getParameterByName: function (name) {
        var regexS = "[\\?&]" + name + "=([^&#]*)",
            regex = new RegExp(regexS),
            results = regex.exec(window.location.search);
        if (results == null) {
            return "";
        } else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }


}