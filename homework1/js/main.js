/**
 * Created by wangbicong on 2017/4/1.
 */

function onNextButton() {
    var isChecked = true;
    if (isChecked){
        $('#processBar').css("width", "0%");
        $('#nextModal').modal();
    }else{

    }
}

function onCommitButton(){
    $('#processBar').css("width", "100%");
    setTimeout(function(){
        $('#processBar').html("提交成功，1秒后关闭窗口");
        setTimeout(function () {
            $('#processBar').html("正在关闭");
            window.location.reload();
        }, 1000);
    }, 1000);
}

