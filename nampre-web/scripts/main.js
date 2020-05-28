const viewField = document.getElementById("viewField");

const buttonField = document.getElementById("buttonField");
const solveButton = document.getElementById("solvebutton");
const isonlyoneButton  = document.getElementById("isonlyonebutton");
const resetButton = document.getElementById("resetbutton");
const refreshmasubutton = document.getElementById("refreshmasubutton");

const testField = document.getElementById("testField");



/** 実行 */

for(var i=0; i<81; i++){
    data[i] = new np(np_reset);
}

printMasu();
setButtonFunction();
document.getElementById("box0").focus();




/** テストスペース */

var randMasu = Math.floor(Math.random()*81);
function text_lrb_of_n(num){
    return `${num} = ${data[num].show()} (${LINE(num)}, ${ROW(num)} : ${BLOCK(num)}) sumKouho=${data[num].sumKouho()}`
}
var test = document.createElement("p");
test.textContent = text_lrb_of_n(randMasu);
test.textContent += " 候補 [ ";
for(var i=1; i<=9; i++){
    if(data[randMasu].FLAG(i)){
        test.textContent += `${i} `;
    }
}
test.textContent += "]"
testField.appendChild(test);

const testbutton1 = document.createElement("button");
testbutton1.textContent="print data";
testbutton1.onclick = function(){
    readData();
}
testField.appendChild(testbutton1);

testField.appendChild(document.createElement("p"));/** 無名の空段落を追加 */

const inFieldtest = document.createElement("input");
inFieldtest.type = "text";
inFieldtest.maxLength = 81;
inFieldtest.size = 90;
/** np59 */
inFieldtest.value = 
"510000007"+"000624000"+"000000900"+
"000000043"+"000000006"+"070080000"+
"096000000"+"403900000"+"200070500";

//510000007000624000000000900000000043000000006070080000096000000403900000200070500
testField.appendChild(inFieldtest);

const testbutton2 = document.createElement("button");
testbutton2.textContent="input!";
testbutton2.onclick = function(){
    var str = inFieldtest.value;
    for(var i=0; i<81; i++){
        masus[i].value = Number(str[i])>0 ? str[i] : "" ;
    }
}
testField.appendChild(testbutton2);

function readData(){
    const allData = document.createElement("div");
    testField.appendChild(allData);
    for(var i=0; i<9; i++){
        var alldatap = document.createElement("p");
        alldatap.className = "ptf"
        testField.appendChild(alldatap);
        for(var j=0; j<9; j++){
            var roop = i*9+j;
            var alldatatext = document.createElement("span");
            alldatatext.textContent = data[roop].show() + " ";
            alldatap.appendChild(alldatatext);
        }
    }
}