const inputField = document.getElementById("inputField");
const namebox = document.getElementById("namebox");
const datebox = document.getElementById("datebox");
const bloodradios = document.getElementsByName("blood");
const submitButton = document.getElementById("submitButton");
const resetButton = document.getElementById("resetButton");

const outputField = document.getElementById("outputField");
const nameout = document.getElementById("nameout");
const dateout = document.getElementById("dateout");
const bloodout = document.getElementById("bloodout");
const unsei = document.getElementById("unsei");

var today = new Date();

start();

function start(){
    namebox.value = "Name";
    datebox.value = "";
    bloodradios[0].checked = "true";
    namebox.focus();
}

submitButton.onclick = function(){
    nameout.textContent = namebox.value;
    dateout.textContent = datebox.value;
    for(var i=0; i<bloodradios.length; i++){
        if(bloodradios[i].checked){
            bloodout.textContent = bloodradios[i].value + "型";
        }
    }
    omikuji();
}

resetButton.onclick = function(){
    namebox.value = "";
    datebox.value = "";
    bloodradios[0].checked = "true";
    namebox.focus();
}

function omikuji(){
    var result = today.getFullYear()*10000 + (today.getMonth()+1)*100 + today.getDate();
    var NAME = namebox.value;
    for(var i=0; i<NAME.length; i++){
        result += NAME.codePointAt(i);
    }
    result += datebox.value/10000 + datebox.value%10000;
    for(var i=0; i<bloodradios.length; i++){
        if(bloodradios[i].checked){
            result *= (i+1);
        }
    }
    result %= 100;
    var unseitxt;
    if(result < 10){unseitxt = "大凶";
    }else if(result < 30){unseitxt = "凶";
    }else if(result < 60){unseitxt = "吉";
    }else if(result < 90){unseitxt = "小吉";
    }else{unseitxt = "大吉";
    }
    unsei.textContent = "今日の運勢は" + unseitxt;
}