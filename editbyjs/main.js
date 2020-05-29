const showField = $("#show");
const dlButton = $("#dl");
const loadButton = $("#loadjson");
const serverinput = $("#server");
const nameinput = $("#name");
const getfile = document.querySelector(".getfile");

var account = []
//var account = ["qiitadon.com", "oha_yashi"]

var public = "https://www.w3.org/ns/activitystreams#Public"
var follower;

/**
 * 公開範囲を返す
 * @param {Array} to 
 * @param {Array} cc 
 */
function accessRange(to, cc){
  follower = `https://${account[0]}/users/${account[1]}/followers`;
  if(to.includes(public) && cc.includes(follower)){
    return "all";
  }else if(to.includes(follower) && cc.includes(public)){
    return "notAll";
  }else if(to.includes(follower) && !(cc.includes(public) && cc.includes(follower))){
    return "locked";
  }else{
    return "DM";
  }
}

var stringjson;
var inputjson = "outbox.json";
var outputname = "safe.json";
var data;

getfile.onchange = function(){
  console.log("data input")
  var files = getfile.files;
  $.getJSON(URL.createObjectURL(files[0]), function(d){
    data = d;
  }).done(function(){
    console.log("success to get json");
    loadButton.text(files[0].name + "をロード");
  });
}

loadButton.click(function(){
  var instans = serverinput.val();
  if(instans.length>0){
    account[0] = instans;
  }else{
    $("#show").text("サーバー名を入れてください");
    return;
  }
  var username = nameinput.val();
  if(username.length>0){
    account[1] = username;
  }else{
    $("#show").text("アカウント名を入れてください");
    return;
  }
  console.log(account);
  editdata();
});



function editdata(){
  //読み込み確認
  if(typeof data == "undefined"){
    $("#show").text("JSONを読み込んでください");
    return;
  }
  //アカウント情報確認
  if(data.orderedItems[0].actor	!= `https://${account[0]}/users/${account[1]}`){
    $("#show").text("入力したアカウントと読み込んだJSONのアカウントが異なります");
    return;
  }
  var tootsize = data.orderedItems.length;

  for(i=0; i<tootsize; i++){
    var toot = data.orderedItems[i];

    if(toot.type == "Create"){
      //自分のトゥについて
      if(accessRange(toot.to, toot.cc)=="DM"){
        //DMを消す
        toot.type = "DM";
        toot.object = null;
      }if(accessRange(toot.to, toot.cc)=="locked"){
        //鍵トゥ表示だけする
        toot.type = "locked";
        //toot.object = "鍵トゥなので非表示です";
      }if(accessRange(toot.to, toot.cc)=="notAll"){
        //未収載トゥに対する処理
      }
    }
  }

  stringjson = JSON.stringify(data);
  $("#show").text("ダウンロード可能！");

  var blob = new Blob([JSON.stringify(data)], {type : 'application/json'});
  var dlURL = URL.createObjectURL(blob);
  dlButton.attr({
    href: dlURL,
    download: outputname
  });
}