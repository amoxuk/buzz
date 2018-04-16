var setting = {
    show: function showInfo(res) {

        if (res && res.status == 0) {
            $('.head').attr("src",  res['data'].icons );
            $('.tit').html(res['data'].nickname);//nickname
            $('.data i').html(res['data'].sex === '男' ? '&#xe662;' : '&#xe661;');//sex
            $('.data ').find('li')[1].innerHTML = Math.floor((Date.now() - res['data'].birth) / 1000 / 60 / 60 / 365 / 24) + '岁';//old
            $('.data ').find('li')[2].innerHTML = res['data'].city;//city
            $('.inf ')[1].innerHTML = !res['data']['indroduce'] ? '无。' : res['data']['indroduce'];//city
            $('.inf ')[3].innerHTML = res['data'].email;//city
        }
    }
    ,error:function (res) {
        layer.msg('错误码：' + res.status);
    }
    ,permission:function (res) {

        var permit = res;
        for (var key in permit) {
            var dds=$('select[name='+key+']').parent().find("dd");
            for(var i=0;i<dds.length;i++){
                if(dds[i].getAttribute("lay-value")==permit[key]){
                    dds[i].click();
                }
            }
        }
        /*class选择器 调用点击事件 控制是否出现在附近*/
        if (permit['nearby'] === 1) {
            $('.layui-unselect.layui-form-switch:not(.layui-form-onswitch)').click();
        }else {
            $('.layui-unselect.layui-form-switch.layui-form-onswitch').click();
        }

    }
    ,reload:function () {
        layui.sessionData("user", null);
        $.get("/user/info/0", function (res) {
            layui.sessionData("user", {key: 'user', value: res});
        });
    }
};
layui.use(['element', 'jquery'], function () {
    var element = layui.element;
    var $ = layui.jquery;
    var userInfo = layui.sessionData("user").user;
    if (true || $.isEmptyObject(userInfo)) {
        /*0表示自身ID*/
        $.ajaxSettings.async = false;
        $.get("/user/info/0", function (res) {
            layui.sessionData("user", {key: 'user', value: res});
            userInfo = res;
        });
    }

    setting.show(userInfo);
    if (userInfo) {

        var sex = userInfo['data'].sex;

        $("input[title=" + sex + "]").attr("checked", true);
        $("#date").val(new Date(userInfo['data'].birth).format("yyyy-mm-dd"));
        $("input[name=city]").val(userInfo['data'].city);
        $("textarea[name=indroduce]").val(userInfo['data'].indroduce);
    }

});
layui.use(['jquery','layer'], function () {
    var layer = layui.layer;
    var $ = layui.jquery;
    $(".f-opt").on('click',function () {
            var node = this.className;
            if (node.find('send')) {
                console.log("send");
                var toId = $(this).attr("data-id");/*获取ID放前面，不然会获取的是加载层*/
                layer.prompt({
                    formType: 2,
                    value: '',
                    title: '发送消息',
                }, function(value, index, elem){
                    console.log(value); //得到value

                    var idx = layer.load();

                    $.ajax({
                        async: false
                        , type: 'post'
                        ,url:"/msg/"+toId
                        , data: {'data':aes.encrypt(value)}
                        ,success:function (res) {
                            layer.close(idx);
                            if (res.status === 0 ) {
                                layer.msg(res.msg);
                            }else {
                                layer.msg(res.msg);
                            }
                            return false;
                        }
                        ,error:function (res) {
                            layer.close(idx);
                            layer.alert("网络错误，错误码：" + res.status);
                            return false;
                        }
                    });
                });
                return false;
            }else if (node.find('zone')) {
                console.log("zone");
                /*return false;*/
            }else if (node.find('cancel')) {
                /*取消关注*/
                console.log("cancel");
                var toId = $(this).attr("data-id");
                layer.confirm('确定取消关注'+$(this).attr("data-name"), {icon: 3, title:'提示'}, function(index){
                    //do something
                    console.log("sure remove " + toId);
                    var idx = layer.load();

                    $.ajax({
                        async: false
                        ,type: 'delete'
                        ,url:"/friend/"+toId
                        ,success:function (res) {
                            layer.close(idx);
                            if (res.status === 0 ) {
                                layer.msg(res.msg);
                            }else {
                                layer.msg(res.msg);
                            }
                            return false;
                        }
                        ,error:function (res) {
                            layer.close(idx);
                            layer.alert("网络错误，错误码：" + res.status);
                            return false;
                        }
                    });
                });
                return false;
            }else {
                console.log(this.className);
            }
        }
    );
});
