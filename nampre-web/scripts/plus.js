var counter = 0;

place = document.getElementById("expPlus");

plusExp = document.createElement("p");
plusExp.textContent = "追加の説明をJavaScriptで入れている";
place.appendChild(plusExp);

showPlace = document.createElement("p");
showPlace.textContent = "かうんたー: " + counter;
place.appendChild(showPlace);

plusButton = document.createElement("button");
plusButton.textContent = "プラス";
place.appendChild(plusButton);
plusButton.onclick = function(){
    counter++;
    showPlace.textContent = "かうんたー: " + counter;
}

plusButton2 = document.createElement("button");
plusButton2.textContent = "リセット";
place.appendChild(plusButton2);
plusButton2.addEventListener("click", test); 
function test(){
    counter = 0;
    showPlace.textContent = "かうんたー: " + counter;
}

place.appendChild(document.createElement("p"));/** 無名の空段落を追加 */


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
