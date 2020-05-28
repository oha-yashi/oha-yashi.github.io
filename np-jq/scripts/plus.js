var counter = 0;

var place = $("#expPlus");
$("<p>").addClass("addjQ").html("追加の説明をjQueryで入れている").appendTo($("#expPlus"));

var showPlace = $("<p>").addClass("addjQ");
showPlace.html("かうんたー: "+counter).appendTo(place);

var plusButton = $("<button>").addClass("addjQ").text("プラス");
plusButton.appendTo(place);

plusButton.click(function(){
    counter++;
    showPlace.text("かうんたー: "+counter);
});

$("<button>").addClass("addjQ").text("リセット").click(test).appendTo(place);
function test(){
    counter = 0;
    showPlace.text("かうんたー: " + counter);
}

place.append($("<p>").addClass("addjQ"));

var boxArray = [];
var i, j, r;
for(i=0; i<3; i++)for(j=0; j<3; j++){
    r = i*3+j;
    boxArray[r] = $("<input>").addClass("addjQ");
    boxArray[r].attr({type:"text", value:r, maxLength:3})
    boxArray[r].css({borderTop: "medium solid"});
    place.append(boxArray[r]);

    if(r%3===2){
        place.append($("<br>").addClass("addjQ"));
    }
}

var arr2d = [];
for(i=0; i<10; i++){
    arr2d[i] = [];
}

function Array2Dnull(p, q){
    var a = new Array(p);
    /*
    for(var i=0; i<p; i++){
        a[i] = new Array(q);
    }
    */
    return a;
}
var arr2d_2 = Array2Dnull(10, 2);

/**
 * 追加機能
 * ボタンを押すとjQaの要素がボタンの前に並ぶ
 * jQa===nullの時は*.addjQをjQaに入れる
 */

var jQa;
$("<button>").text("open/close addjQ").appendTo(place).click(openclose)
function openclose(){
    if(jQa){
        jQa.insertBefore(this);
        jQa = null;
    }else{
        jQa = $(".addjQ").detach();
    }
};

$(openclose);
//*/

//アニメーション : 連続で要素をフェードする
/*
$("<button>").text("fadeToggle addjQ").appendTo(place).click(function(){
    $(".addjQ").first().fadeToggle("fast", function fTnext(){
        $(this).next(".addjQ").fadeToggle("fast", fTnext);
    });
});
//*/

/* jQで追加したものは赤で表示 */
$( ".addjQ" ).css( "color", "red" );


/*
var counter = 0;

place = document.getElementById("expPlus");

plusExp = document.createElement("p");
plusExp.textContent = "追加の説明をJavaScriptで入れている";
place.appendChild(plusExp);

showPlace = document.createElement("p");
showPlace.textContent = "かうんたー: " + counter;
place.appendChild(showPlace);

plusButton = document.createElement("Button");
plusButton.textContent = "プラス";
place.appendChild(plusButton);
plusButton.onclick = function(){
    counter++;
    showPlace.textContent = "かうんたー: " + counter;
}

plusButton2 = document.createElement("Button");
plusButton2.textContent = "リセット";
place.appendChild(plusButton2);
plusButton2.addEventListener("click", test); 
function test(){
    counter = 0;
    showPlace.textContent = "かうんたー: " + counter;
}

place.appendChild(document.createElement("p"));// 無名の空段落を追加


var boxArray = [];
var a, b;
for(a=0; a<3; a++)for(b=0; b<3; b++){
    i = a*3+b;
    boxArray[i] = document.createElement("input");
    boxArray[i].type = "text";
    boxArray[i].value = i;
    boxArray[i].maxLength = 3;

    var st = boxArray[i].style;
    st.borderTop = "medium solid";

    place.appendChild(boxArray[i]);
    if(i%3===2){
        place.appendChild(document.createElement("br"));
    }
}
*/