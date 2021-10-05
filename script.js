var memory;
var fault;
var faultLocation;
var manualFault;

var arr;
var stuckAtFault1;
var stuckAtFault0;
var stuckedIndex;

// Select Fault Buttons
$(".sa0").click(function(){
  fault =  $(".sa0").text();
  $("#dropdownMenuButton1").text(fault);
  // alert(fault);
});

$(".sa1").click(function(){
  fault = $(".sa1").text();
  $("#dropdownMenuButton1").text(fault);
  // alert(fault);
});

$(".noFault").click(function(){
  fault = $(".noFault").text();
  $("#dropdownMenuButton1").text(fault);
  // alert(fault);
});

// Fault Location Section
$(".random").click(function(){
  memory = $(".memory-size").val();
  faultLocation = Math.floor((Math.random() * memory) + 1);
  $("#dropdownMenuButton2").text($(".random").text());

  // $(".manualInput").hide();
  // $(".manualInputLabel").hide();     // previously I was hiding label and text-box but now I am only disabling it

  $(".manualInput").attr("disabled","true");
  // alert(faultLocation);
});

$(".manual").click(function(){
  memory = $(".memory-size").val();
  faultLocation = $(".manual").text();
  $("#dropdownMenuButton2").text(faultLocation);
  $(".manualInput").show();
  $(".manualInputLabel").show();
  // alert(faultLocation);
});

//Submit Button

  $(".submit").click(function(){
    $(".memory-map").css("visibility", "visible");
    memory = $(".memory-size").val();
    if(manualFault===undefined && faultLocation===$(".manual").text()){
      manualFault=Number($(".manualInput").val());
    }
    else{
      manualFault = faultLocation;
    }
    if(fault==="No fault"){
    alert("No Fault Detected...");
    }
    else{
      arr = [];
      stuckAtFault1 = false;
      stuckAtFault0 = false;
      stuckedIndex=0;
      for(var i = 0; i<4; i++){
        if(i==0){
          // arr.fill(0, 0, memory);
          for(var x = 0; x<memory; x++){
            arr.push(0);
          }
          if(fault==="Stuck at 1 fault" && manualFault>0 && manualFault<=memory) {
            arr[manualFault-1] = 1;
          }
        }
        else if(i==1) {
          for(var j=0;j<memory;j++) {

            if(arr[j]!=0) {
              stuckAtFault1=true; //needs to generate memory map later for sa1
              stuckedIndex=j+1;
              break;
            }
          }
          if(stuckAtFault1===true) {
            break;
          }
        }

        else if(i==2) {
          // arr.fill(1,0,memory);
          for(var x = 0; x<memory; x++){
            arr[x] = 1;
          }
          if(fault==="Stuck at 0 fault" && manualFault>0 && manualFault<=memory) {
            arr[manualFault-1]=0;
          }
        }
        else if(i==3) {
          for(var j=0;j<memory;j++) {
            if(arr[j]!=1) {
              stuckAtFault0=true;
              stuckedIndex=j+1;
              break;
            }
          }
          if(stuckAtFault0===true) {
            break;
          }
        }
      }
    }

        // alert(memory);
        // alert(fault);
        // alert(faultLocation);
        // alert(stuckedIndex);
        // alert(manualFault);



    for(var i = 1; i<=memory; i++){
      if(stuckAtFault1===true && i==stuckedIndex){
        $(".memory-map").append($("<div style='background-color:red; display: inline-block; width: 12px;height: 12px; margin:3px'></div>"));
        console.log(i);
      }
      else if(stuckAtFault0===true && i==stuckedIndex){
        $(".memory-map").append($("<div style='background-color:LightCoral; display: inline-block; width: 12px;height: 12px; margin:3px'></div>"));//.addClass("tooltip"));
        // $(".tooltip").append($("<span>SA0 Fault</span>"));//.addClass("tooltiptext"));
        // $("tooltiptext").text("gsdhagjgdasj");
        console.log(i);
      }
      else {
        $(".memory-map").append($("<div style='background-color:green; display: inline-block; width: 12px;height: 12px; margin:3px'></div>"));
        console.log(i);
      }
    };

    console.log("Memory size is:- " + memory);
    console.log("fault is:- " + fault);
    console.log("manualFault is " + manualFault);
    console.log("faultLocation is " + faultLocation);

    console.log("StuckAtFault0 is " + stuckAtFault0);
    console.log("StuckAtFault1 is " + stuckAtFault1);
    console.log("Stucked Index is " + stuckedIndex);
    console.log("arr is ");
    console.log(arr);
  });
