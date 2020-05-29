const jpField = $("#jp");
const firstField = $("#first");
const lastField = $("#last");
const loadButton = $("#loadbutton");

/** 
 * @param {string} utc 協定世界時 
 * @returns {string} 日本標準時
 */
function toJST(utc){
  var time = new Date(utc);
  return time.toLocaleString();
}

var data;
/**
 * アーカイブデータの展開 [first, last) の範囲
 * 昇順も降順も可能
 * @param {Number} first 
 * @param {Number} last 
 */
function showarchive(first, last){
  if(first==last)last=first+1;
  var increase;
  if(first<last){
    increase = 1;
  }else if(first>last){
    increase = -1;
  }
  for(i = first; i!=last; i+=increase){
    var toot = data.orderedItems[i];
    var info = $("<li>");
    if(toot.type == "Create"){
      /** 自分のトゥート */
      if(toot.object.summary!=null){
        /** CWがあるとき */
        $("<p>").text("CW : "+toot.object.summary+" (反転)").appendTo(info);
        $(toot.object.content).addClass("hide").appendTo(info);
      }else{
        info.append(toot.object.content);
      }
      /** 必要に応じて画像を追加 */
      for(imgs=0; imgs<toot.object.attachment.length; imgs++){
        $("<img>").attr({
          src:"."+toot.object.attachment[imgs].url, 
          height:500}
        ).appendTo(info);
      }//*/
    }else if(toot.type == "Announce"){
      /** ブーストのとき */
      info.html(`☆Boost : <a href="${toot.object}">${toot.object}</a>`);
    }else if(toot.type == "DM"){
      /** 追加タイプ DM のとき */
      info.html("<p>❌DMなので非表示です<p>");
    }else if(toot.type == "locked"){
      info.append("<p>🔒 これは鍵トゥです</p>")
      info.append(toot.object.content);
    }
    /** 時刻情報をつけてappend */
    $("<p>").addClass("small").html(
      `No.${i} at ${toJST(toot.published)}`
    ).appendTo(info);

    info.appendTo(jpField);
  }
}

var inputjson = "safe.json";
var tootsize;
$.getJSON(inputjson, function(d){
  data = d;
  tootsize = d.orderedItems.length;
  $("#num").text(tootsize);
  $("#lasttoot").text(toJST( d.orderedItems[tootsize-1].object.published ));  
})
  .done(function(){
    console.log("success");
    firstField.attr({max:tootsize-1});
    lastField.attr({max:tootsize-1});
    showarchive(tootsize-1, tootsize-201);
  })
  .fail(function(){
    console.log("fail")
  })

loadButton.click(function(){
  jpField.text("");
  showarchive(parseInt(firstField.val(),10), parseInt(lastField.val(),10));
})