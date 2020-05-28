var myRedComment = document.querySelector('#yellow-big');
myRedComment.textContent = "big yellow letter, black back!"

document.querySelector('h1').onclick = function() {
    alert('タイトルをクリックしました');
}

var myImage = document.querySelector('img');

myImage.onclick = function() {
    var mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/myimg-1.jpg') {
      myImage.setAttribute ('src','images/img-nyan.jpg');
    } else {
      myImage.setAttribute ('src','images/myimg-1.jpg');
    }
}

var myButton = document.querySelector('button');
var myHeading = document.querySelector('h1');

function setUserName() {
    var myName = prompt('あなたの名前を入力してください。');
    if(!myName || myName === null) {
        setUserName();
    }else{
        localStorage.setItem('name', myName);
        myHeading.textContent = `Hello, ${myName}!`;
    }
}

if(!localStorage.getItem('name')) {
    setUserName();
} else {
    var storedName = localStorage.getItem('name');
    myHeading.textContent = `Hello, ${storedName}!`;
}

myButton.onclick = function() {
    setUserName();
}