const viewField = $("#viewField");

const buttonField = $("#buttonField");
const scanButton = $("#scanButton");
const onlytwopairButton = $("onlytwopairButton");
const findpairButton = $("#findpairButton");
const readAndDeleteButton = $("#read_and_deleteButton");
const findAllOnlyOneButton = $("#findAllOnlyOneButton");
const checknumButton = $("#checknumButton");

const autoButton = $("#autoButton");
const refreshButton = $("#refreshmasuButton");
const resetButton = $("#resetButton");

const testField = $("#testField");

/** ボタンに関数を割り当てる */
function setButtonFunction(){
    scanButton.click(scan);
    onlytwopairButton.click(only_two_pair_all);
    findpairButton.click(findPairAll);
    findAllOnlyOneButton.click(findAllOnlyOne);
    readAndDeleteButton.click(read_and_delete);
    checknumButton.click(checkNumAll);

    autoButton.click(autoSolve);
    refreshButton.click(refreshMasu);
    resetButton.click(resetDataMasu);
}

/** 実行 */

for(var i=0; i<81; i++){
    data[i] = new np(np_reset);
}

printMasu();
setButtonFunction();
$("#box0").focus();


/** テストスペース */

$("<label>").text("16進数データから候補を出力").attr({for:"hexdata"}).appendTo(testField);
/** 16進数データを入力すると候補を書き出す */
var hexbox = $("<input>").attr({
    id: "hexdata",
    placeholder: "例:02a5",
    maxlength: 4
}).appendTo(testField);
$("<button>").text("--候補-->").click(function(){
    if(hexbox.val()==""){
        hexbox.focus();
        return;
    }
    var d = new np(parseInt(hexbox.val(), 16));
    var str = "";
    for(var i=1; i<=9; i++){
        if(d.FLAG(i)){
            str+=i+" ";
        }
    }
    ansbox.val(str);
}).appendTo(testField);
var ansbox = $("<input>").attr({
    placeholder:"例:2 5 7 9 "
}).appendTo(testField);


$("<br>").appendTo(testField);
const testbutton1 = $("<button>").text("print data").click(readData);
testField.append(testbutton1);

$("<span>").html("内部16進数データの書き出し<br>").appendTo(testField);
//testField.append($("<p>"));// 無名の空段落を追加

/** 内部データの書き出し */
function readData(){
    var allData = $("<div>");
    testField.append(allData);
    for(var i=0; i<9; i++){
        var alldatap = $("<p>").addClass("addtf").appendTo(testField);
        for(var j=0; j<9; j++){
            var roop = i*9+j;
            var alldatatext = $("<span>").text(data[roop].hex() + " ");
            alldatap.append(alldatatext);
        }
    }
}