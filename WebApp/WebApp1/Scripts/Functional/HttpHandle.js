var http = function () { }
var HttpHandle = new http();

//同步處理(post by json)
//1.url 2.post data 3.success callback  4.fail callback 
http.prototype.SendPost = function (url, postData, callbackSuccess, callbackError) {

    //alert(JSON.stringify(postData));
    var headers = {};
    headers['__RequestVerificationToken'] = $("input[name='__RequestVerificationToken']").val();
    var linkchar = "?";
    if (url.lastIndexOf('?') > -1) {
        linkchar = "&";
    }
    //if (element != null) this.loadBlocker(element);

    $.ajax({
        type: "POST",
        headers: headers,
        url: url + linkchar + new Date().getTime(),
        data: JSON.stringify(postData),
        contentType: "application/json; charset=utf-8",
        timeout: 10000,
        cache: false,
        async: false,
        dataType: "json",
        success: function (result, extStatus, jqXHR) {
            if (callbackSuccess != null) callbackSuccess(result);
        },
        error: function (xhr, status, err) {
            //console.log(xhr.responseText);
            if (callbackError != null) {
                var confirmBoxArg = {
                    title: "發生錯誤",
                    type: "error",
                    confirmButtonColor: "#8277dd",
                    confirmButtonText: "確定",
                    closeOnConfirm: false,
                    callback: function () {
                        window.location.reload();
                    }
                };

                //ShowConfirmBox(confirmBoxArg);
                alert("發生錯誤");

                callbackError(err);
            } else {
                //if (status === "timeout") {
                //    Message.Show("", MessageType.Error, "等待時間過長，請檢察API。");
                //} else {

                //    Message.Show("", MessageType.Error, "系統異常。");
                //}
            }
        },
        complete: function () { }
    });
};