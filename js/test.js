'use strict'
var zt = {
    count : 0,
    all : [
        "菜亿",
        "萌神",
        "朱大爷",
        "死猫",
        "张天师",
        "艾得闻",
    ]
};


function createDiv(str) {
    var $main = $('<div class="person panel panel-success"><div class="panel-heading"><h3 class="panel-title">'+str+'<span  class="close pull-right glyphicon glyphicon-remove-circle" index="'+str+'"></span></h3></div></div>');
    var $list = $("#list");
    $list.append($main);
}

function init() {
    var l = zt.all.length;
    var i;
    for ( i = 0; i < l; i++ ) {
        createDiv(zt.all[i]);
    }
}

function getOne() {
    return parseInt(Math.random()*zt.all.length);
}

function findSomeOne() {
    var $process = $("#processBar");
    var times = 0;
    var now = "";
    var iterator = setInterval(function(){
        var t = getOne();
        var result;
        times += 1;
        if ( times == 31 ) {
            clearInterval(iterator);
            $("#face").show();
            $("#face").attr("src","./pic/"+parseInt(Math.random()*2)+".png");
        }
        while ( now == zt.all[t] ) {
            t = getOne();
        }
        now = zt.all[t];
        $("#resultContent").html(now);
        $process.css("width",(times/30*100)+"%")
    },100);
}

function start() {
    $("#start").hide();
    $("#list").hide();
    $("#result").show();
    findSomeOne();
}

function closeDiv(event) {
    if ( zt.count == 3 ) {
        alert("据说已经去掉了3个人了");
        return;
    }
    var str = $(event.target).attr('index');
    var i;
    var l = zt.all.length;
    for ( i = 0; i < l; i++ ) {
        if ( zt.all[i] === str ) {
            break;
        }
    }
    zt.all.splice(i,1);
    $(event.target).parents(".person").remove();
}

$(document).ready(function(){
    init();
    $("#startButton").on("click",start);
    $("body").on("click","span",closeDiv);
    $("body").on("touchend","span",closeDiv);
});
