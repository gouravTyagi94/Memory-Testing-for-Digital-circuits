
$(".btn1").click(function(){
  for(var i = 1; i<10; i++){
    $(".abc").after($("<div style='background-color:red; display: inline-block; width: 10px;height: 10px; margin:3px'></div>"));
  };
});
