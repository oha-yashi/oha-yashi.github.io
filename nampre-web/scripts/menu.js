/** start menu */

/** input要素 */
var masus = [81];
function printMasu(){
    for(var i=0; i<9; i++){
        newRow = document.createElement("div");
        viewField.appendChild(newRow);
        for(var j=0; j<9; j++){
            roop = i*9 + j;
            masus[roop] = document.createElement("input");
            masus[roop].type = "text";
            masus[roop].id = "box" + roop;
            masus[roop].maxLength = 1;
    
            var st = masus[roop].style;
            st.borderTop    = i%3===0 ? "medium solid" : "thin solid";
            st.borderBottom = i%3===2 ? "medium solid" : "thin solid";
            st.borderLeft   = j%3===0 ? "medium solid" : "thin solid";
            st.borderRight  = j%3===2 ? "medium solid" : "thin solid";
    
            masus[roop].value = data[roop].NUM()===0 ? "" : data[roop].NUM();
            newRow.appendChild(masus[roop]);
        }
    }
}

function masu2data(){
    for(var i=0; i<81; i++){
        var v = Number(document.getElementById("box"+i).value);
        var numv = v<10 ? v : 0 ;
        inputNumandDelete(i, numv);//ok
        //data[i].inputNum(numv);//ok
    }
}

function refreshMasu(){
    for(var i=0; i<81; i++){
        masus[i].value = data[i].NUM();
    }
}

function setButtonFunction(){
    solveButton.addEventListener("click", solve);
    isonlyoneButton.addEventListener("click", findAllOnlyOne);
    resetButton.addEventListener("click", resetDataMasu);
    refreshmasubutton.addEventListener("click", refreshMasu);
}

function solve(){
    //keep行以外はテスト
    var ans = document.createElement("p");
    ans.className = "ptf";
    ans.textContent = "solve: ";
    for(var i=0; i<81; i++){
        var v = Number(document.getElementById("box"+i).value);
        /** ~.valueは一桁なので、0~9またはNaNに変換される */
        var numv = v<10 ? v : 0 ;
        ans.textContent += numv;
        inputNumandDelete(i, numv);//keep
    }
    testField.appendChild(ans);
}

function resetDataMasu(){
    for(var i=0; i<81; i++){
        document.getElementById("box"+i).value = "";
    }
    resetAll();
    var pInTF = document.querySelectorAll(".ptf");
    for(var i=0; i<pInTF.length; i++){
        testField.removeChild(pInTF[i]);
    }
    document.getElementById("box0").focus();
}

/** end menu */