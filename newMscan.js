
$(".submit").click(function(){
  if(fault==="No Fault"){
  alert("No Fault Detected...")
  }
  else{
    var arr = [];
    var stuckAtFault1 = false;
    var stuckAtFault0 = false;
    var stuckedIndex;
    for(var i = 0; i<4; i++){
      if(i==0){
        arr.fill(0, 0, memory);
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
        if(stuckAtFault1) {
          break;
        }
      }

      else if(i==2) {
        arr.fill(1,0,memory);
        if(fault==="Stuck at 0 fault" && manualFault>0 && manualFault<=memory) {
          arr[manualFault-1]=0;
        }
      }
      else if(i==3) {
        for(var j=0;j<memory;j++) {
          if(arr[j]!=1) {
            // stuckAtfault0=true;
            // stuckedIndex=j;
            break;
          }
        }
        if(stuckAtFault0) {
          break;
        }
      }
    }
  }


  for(var i = 1; i<memory; i++){
    if(stuckAtFault1===true && i===stuckedIndex){
      $("body").after($("<div style='background-color:red; display: inline-block; width: 10px;height: 10px; margin:3px'></div>"));
    }
    else if(stuckAtFault0===true && i===stuckedIndex){
      $("body").after($("<div style='background-color:LightCoral; display: inline-block; width: 10px;height: 10px; margin:3px'></div>"));
    }
    else {
      $("body").after($("<div style='background-color:green; display: inline-block; width: 10px;height: 10px; margin:3px'></div>"));
    }
  };
});
