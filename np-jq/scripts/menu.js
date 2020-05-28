/** start menu */

/** <input>を入れる配列 */
var masus = [];
/** viewFieldに9*9マスを描画する */
function printMasu(){
    for(var i=0; i<9; i++){
        newRow = $("<div>").appendTo(viewField);
        for(var j=0; j<9; j++){
            roop = i*9 + j;
            masus[roop] = $("<input>").attr({
                type:"text", id:"box"+roop, maxLength:1
            }).css({
                borderStyle       : "solid",
                borderColor       : "black", 
                borderTopWidth    : i%3===0 ? "medium" : "thin",
                borderBottomWidth : i%3===2 ? "medium" : "thin",
                borderLeftWidth   : j%3===0 ? "medium" : "thin",
                borderRightWidth  : j%3===2 ? "medium" : "thin"
            }).val(
                data[roop].NUM()===0 ? "" : data[roop].NUM()
            ).appendTo(newRow);
        }
    }
}

/**
 * dataからマス目に現在の情報を写す
 */
function refreshMasu(){
    for(var i=0; i<81; i++){
        masus[i].val(data[i].NUM());
    }
}

/**
 * マス目からdataに値をinputする
 * 最初の一回読み込めば良い
 * 以後はdataを操作する
 */
function scan(){//test行は消してよし
    //var ans = $("<p>").addClass("addtf").text("solve: ");//test
    for(var i=0; i<81; i++){
        var v = $("#box"+i).val();
        /** .val()は一桁なので、0 ~ 9またはNaNに変換される */
        var numv = v<10 ? Number(v) : 0 ;
        //ans.append(numv);//test
        inputNumandDelete(i, numv);//box->data
    }
    //testField.append(ans);//test
}

/**
 * マスのvalをnullにして
 * 内部データをリセットする
 * 追加したテキストを消去して
 * 先頭マスにフォーカスする
 */
function resetDataMasu(){
    for(var i=0; i<81; i++){
        $("#box"+i).val(null);
    }
    resetAll();
    $(".addtf").remove();
    $("#buttonstep").text("各種関数ボタン繰り返し");
    $("#box0").focus();
}

/**
 * 自動解答
 */
function autoSolve(){
    /** ループ限界。解答不可で無限ループになるのを防ぐ */
    let limit = 30;
    /** 内部データで埋まっているマスの数 */
    var count = 0;

    /** 内部データを数える */
    for(var i=0; i<81; i++){
        if(data[i].NUM()){
            count++;
        }
    }
    /** 内部データに数字が残っているとき */
    if(count>0){
        resetAll();
        scan();
    }

    scan();
    while(count < 81 && limit > 0){
        /** 毎回数えるので毎回リセットする */
        count = 0;
        only_two_pair_all();
        findPairAll();
        findAllOnlyOne();
        read_and_delete();
        checkNumAll();
        for(var i=0; i<81; i++){
            if(data[i].NUM()){
                count++;
            }
        }
        limit--;
    }
    refreshMasu();
}

/** end menu */

/**
 * 試験機能（ボタン押す前の情報が出るので不採用）
 * buttonFieldのボタンが押されたら進捗状況を表示する
 */
/*
function showInfo(){
    var count = 0;
    for(var i=0; i<81; i++){
        if(data[i].NUM()){
            count++;
        }
    }
    if(count===81)count="ALL!!"
    infoField.text("解決済みマス : "+count);
}

var infoField = $("<p>").appendTo(buttonField);
$("#buttonField > button").click(showInfo);
//*/