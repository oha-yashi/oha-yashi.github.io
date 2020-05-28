const titlespace = document.getElementById("titlespace");
titlespace.textContent = document.title;

const getohabutton = document.getElementById("getohabutton");
const resetbutton = document.getElementById("resetbutton");
const stat = document.getElementById("status");
const result = document.getElementById("result");
const ohaspace = document.getElementById("ohaspace");

getohabutton.onclick = function(){
    stat.textContent = "クリックされました"

    var url = "oha.txt"
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseType = "text";
    xhr.onload = function(){
        result.textContent = "読み込みました↓↓↓"
        ohaspace.textContent = xhr.response;
    }
    xhr.send();
}

resetbutton.onclick = function(){
    stat.textContent = "リセットしました";
    result.textContent = "";
    ohaspace.textContent = "";
}