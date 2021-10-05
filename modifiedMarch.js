var fault;
var faultLocationRow;
var faultLocationCol;
var faultLocation;
var manualFault;
// var faultType;
var arr;
var stuckAtFault1;
var stuckAtFault0;
var row;
var col;

var tfp1;
var tfp2;
var RisingTransitionFault;
var FallingTransitionFault;
var sa0;
var sa1;
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
	row = $(".memory-size-row").val();
	col = $(".memory-size-col").val();
  faultLocationRow = Math.floor((Math.random() * row) + 1);
	faultLocationCol = Math.floor((Math.random() * col) + 1);
  $("#dropdownMenuButton2").text($(".random").text());
  $(".manual-fr").attr("disabled","true");
	$(".manual-fc").attr("disabled","true");
  // $(".manualInput").hide();
  // $(".manualInputLabel").hide();     // previously I was hiding label and text-box but now I am only disabling it

  $(".manualInput").attr("disabled","true");
  // alert(faultLocation);
});

$(".manual").click(function(){
  row = $(".memory-size-row").val();
	col = $(".memory-size-col").val();
	// faultLocationRow = $(".manual-fr").val();
	// faultLocationCol = $(".manual-fc").val();
  faultLocation = $(".manual").text();
  $("#dropdownMenuButton2").text(faultLocation);
  $(".manualInput").show();
  $(".manualInputLabel").show();
  // alert(faultLocation);
});



//Submit Button

  $(".submit").click(function(){
    $(".memory-map").css("visibility", "visible");
    if(faultLocationRow===undefined && faultLocationCol===undefined && faultLocation===$(".manual").text()){
      faultLocationRow=Number($(".manual-fr").val());
			faultLocationCol=Number($(".manual-fc").val());
    }
    else{
      if(fault==="Stuck at 0 fault" && faultLocationRow>=Math.floor((row-1)/2)){
          faultLocationRow = Math.floor((Math.random() * Math.floor((row-1)/2))+1);
      }
      else if(fault==="Stuck at 1 fault" && faultLocationRow<Math.floor((row-1)/2)){
          faultLocationRow = Math.floor(Math.random() * (row - Math.floor((row-1)/2) + 1) + Math.floor((row-1)/2));
      }
			faultLocationCol = Math.floor((Math.random() * col));
    }



    if(fault==="Stuck at 0 fault" && faultLocationRow>=Math.floor((row-1)/2)){
      alert("Wrong Coordinates Selected, Now Coordinates will be selected randomly...");
      faultLocationRow = Math.floor((Math.random() * Math.floor((row-1)/2))+1);
    }
    else if(fault==="Stuck at 1 fault" && faultLocationRow<Math.floor((row-1)/2)){
            alert("Wrong Coordinates Selected, Now Coordinates will be selected randomly...");
      faultLocationRow = Math.floor(Math.random() * (row - Math.floor((row-1)/2) + 1) + Math.floor((row-1)/2));
    }
    //
		// if(faultLocationRow!=0) {
		// 	faultLocationRow-=1;
		// }
		// if(faultLocationCol!=0) {
		// 	faultLocationCol-=1;
		// }

        // alert(memory);
        // alert(fault);
        // alert(faultLocation);
        // alert(stuckedIndex);
        // alert(manualFault);


					tfp1=0;
					tfp2=0;


					RisingTransitionFault=false;
					FallingTransitionFault=false;
          sa0 = false;
          sa1 = false;




          //1. Write 0 In All

          arr = [];
          for(var x = 0; x < row; x++){
              arr[x] = [];
              for(var y = 0; y < col; y++){
                  arr[x][y] = 0;
              }
          }

          //2. Write 0 in  first Subset

          for(var i=0;i<(row-1)/2;i++) {
            for(var j=0;j<col;j++) {
              arr[i][j]=0;
            }
          }

          //3. Write 1 in second Subset

          for(var i=Math.floor((row-1)/2);i<row;i++) {
            for(var j=0;j<col;j++) {
              arr[i][j]=1;
            }
          }

          // Read 0
          for(var i=0;i<Math.floor((row-1)/2);i++) {
            for(var j=0;j<col;j++) {
              if(arr[i][j]==0) {
                // System.out.print(Arra[i][j]+" ");
                arr[i][j]=1;
              }
            }
            // System.out.println();
          }

          //Read 1
          for(var i=Math.floor((row-1)/2);i<row;i++) {
            for(var j=0;j<col;j++) {
              if(arr[i][j]==1) {
                // System.out.print(Arra[i][j]+" ");
                arr[i][j]=0;
              }
            }
            // System.out.println();
          }

          // System.out.println();

          if(fault==="No fault") {

          }else if(faultLocationRow<Math.floor((row-1)/2)) {
            arr[faultLocationRow][faultLocationCol]=0;
          }else if(faultLocationRow>=Math.floor((row-1)/2)) {
            arr[faultLocationRow][faultLocationCol]=1;
          }
          else{
            alert("Wrong Coordinates selected.");
          }



        // read Subset 2

          // System.out.println();

          for(var i=0;i<Math.floor((row-1)/2);i++) {
            for(var j=0;j<col;j++) {

              if(arr[i][j]!=1) {
                tfp1=i;
                tfp2=j;
                sa0=true;
                RisingTransitionFault=true;

              }else {
                arr[i][j]=0;
              }
            }

          }
        // read Subset 2


          for(var i=Math.floor((row-1)/2);i<row;i++) {
            for(var j=0;j<col;j++) {

              if(arr[i][j]!=0) {
                tfp1=i;
                tfp2=j;
                sa1=true;
                FallingTransitionFault=true;

              }else {
                arr[i][j]=1;
              }
            }

          }


    for(var i = 0; i<row; i++){
			for(var j=0; j<col; j++){
      	if(FallingTransitionFault===true && i===tfp1 && j===tfp2){
        	$(".memory-map").append($("<div style='background-color:red; display: inline-block; width: 12px;height: 12px; margin:3px'></div>"));
        	console.log(i+ " "+ j + " Red");
        }
      else if(RisingTransitionFault===true && i===tfp1 && j===tfp2){
        $(".memory-map").append($("<div style='background-color:LightCoral; display: inline-block; width: 12px;height: 12px; margin:3px'></div>"));//.addClass("tooltip"));
        // $(".tooltip").append($("<span>SA0 Fault</span>"));//.addClass("tooltiptext"));
        // $("tooltiptext").text("gsdhagjgdasj");
        console.log(i+ " "+ j + " LightCoral");
      }
      else {
        $(".memory-map").append($("<div style='background-color:green; display: inline-block; width: 12px;height: 12px; margin:3px'></div>"));
        console.log(i+ " "+ j + " Green");
      }
		}
    };
    console.log("fault is:- " + fault);
    console.log("faultLocationRow is " + faultLocationRow);
    console.log("faultLocationCol is " + faultLocationCol);
    console.log("manualFault is " + manualFault);
    console.log("faultLocation is " + faultLocation);


    console.log("Rows are " + row);
    console.log("Columns are " + col);

    console.log("tfp1 is " + tfp1);
    console.log("tfp2 is " + tfp2);
    console.log("sa0 is " + sa0);
    console.log("sa1 is " + sa1);
    console.log("FallingTransition fault is " +RisingTransitionFault);
    console.log("FallingTransition fault is " +FallingTransitionFault);
    console.log("arr is ");
    console.log(arr);
  });
