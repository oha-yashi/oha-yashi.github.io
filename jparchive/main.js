const jpField = $("#jp");

/** 
 * @param {string} utc 協定世界時 
 * @returns {string} 日本標準時
 */
function toJST(utc){
  var time = new Date(utc);
  return time.toLocaleString();
}

$.getJSON("//outbox.json", function(data){
  var tootsize = data.orderedItems.length;
  $("#num").text(tootsize);
  $("#lasttoot").text(toJST( data.orderedItems[tootsize-1].object.published ));

  for(var i=tootsize-1; i>=tootsize-200; i--){
    var toot = data.orderedItems[i];
    if(toot.type==="Create"){
      /** 自分のトゥート */
      var info = $("<li>");
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
          src:"/jparchive"+toot.object.attachment[imgs].url, 
          height:500}
        ).appendTo(info);
      }
    }else if(toot.type==="Announce"){
      /** ブーストのとき */
      info = $("<li>").html(`☆Boost : <a href="${toot.object}">${toot.object}</a>`);
    }
    /** 時刻情報をつけてappend */
    $("<p>").addClass("small").html(
      `No.${i} at ${toJST(toot.published)}`
    ).appendTo(info);

    info.appendTo(jpField);
  }
});