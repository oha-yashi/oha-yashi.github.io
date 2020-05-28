var eye, mouth, shape, arm;

function readElements(){
  eye = $("#eye").val();
  mouth = $("#mouth").val();
  shape = {L:$("#shapeL").val(), R:$("#shapeR").val()};
  arm = {L:$("#armL").val(), R:$("#armR").val()}
}

var result = $("#result");

var makeButton = $("#make").click(function(){
  readElements();
  result.val(arm.L+shape.L+eye+mouth+eye+shape.R+arm.R);
});

var resetButton = $("#reset").click(function(){
  result.val("");
});

var copyButton = $("#copy").click(function(){
  
});