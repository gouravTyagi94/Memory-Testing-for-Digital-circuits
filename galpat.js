var fault;
var faultLocationRow;
var faultLocationCol;
var faultLocation;
var manualFault;
// var faultType;
var arr;
var stuckAtFault1;
var stuckAtFault0;
var bcx;
var bcy;
var row;
var col;

var tfp1;
var tfp2;
var sap1;
var sap2;
var RisingTransition;
var FallingTransition;
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
		bcx = $(".base-x").val();
		bcy = $(".base-y").val();
    if(faultLocationRow===undefined && faultLocationCol===undefined && faultLocation===$(".manual").text()){
      faultLocationRow=Number($(".manual-fr").val());
			faultLocationCol=Number($(".manual-fc").val());
    }
    else{
			faultLocationRow = Math.floor((Math.random() * row)+1);
			faultLocationCol = Math.floor((Math.random() * col)+1);
			faultLocationRow-=1;
			faultLocationCol-=1;
    }

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


				arr = [];
				for(var x = 0; x < row; x++){
						arr[x] = [];
						for(var y = 0; y < col; y++){
								arr[x][y] = 0;
						}
				}
			 arr[bcx][bcy] = 1;


					tfp1=0;
					tfp2=0;
					sap1=0;
					sap2=0;


					RisingTransition=false;
					FallingTransition=false;


					// read 0 and write 1
					for(var i=0;i<row;i++) {
						for(var j=0;j<col;j++) {

							if(i===bcx && j===bcy) {
								// System.out.print("B ");
								continue;
							}
							else if(fault==="Stuck at 0 fault" && i===faultLocationRow && j===faultLocationCol) {
								// System.out.print(Arra[i][j]+" ");
								tfp1=i;
								tfp2=j;
								RisingTransition=true;
							}
							else if(arr[i][j]!=arr[bcx][bcy]) {
								arr[i][j]=1;
								// System.out.print(Arra[i][j]+" ");
							}

							else {
								// System.out.print(Arra[i][j]+" ");
							}
						}
						// System.out.println()
					}

					 // write 1 and read 0
					arr[bcx][bcy]=0;
					// System.out.println();

					for(var i=0;i<row;i++) {
						for(var j=0;j<col;j++) {

							if((i===bcx && j===bcy)) {
								// System.out.print("B ");
								continue;
							}
							else if(fault==="Stuck at 1 fault" && i===faultLocationRow && j==faultLocationCol) {
								arr[i][j]=1;
								// System.out.print(Arra[i][j]+" ");
								    tfp1=i;
								    tfp2=j;
								FallingTransition=true;
							}
							else if(arr[i][j]!=0) {

								arr[i][j]=0;
								// System.out.print(Arra[i][j]+" ");
							}
							else {
								// System.out.print(Arra[i][j]+" ");
							}

						}
						// System.out.println();

					}
			//
			// 		if(RisingTransition) {
			// 			System.out.println("Stuck at  0 along with Rising Transition Fault at the cell ("+tfp1+" ,"+tfp2+" )");
			// 		}
			//
			// 		else if(FallingTransition) {
			// 			System.out.println("Stuck at  1 along with Decreasing Transition Fault at the cell ("+tfp1+" ,"+tfp2+" )");
			// 		}
			// 		else {
			// 			System.out.println("No fault");
			// 		}
			// 	}
			//
			// }


    for(var i = 0; i<row; i++){
			for(var j=0; j<col; j++){
				if(i==bcx && j==bcy){
					$(".memory-map").append($("<div style='background-color:#9900ff; display: inline-block; width: 12px;height: 12px; margin:3px'></div>"));
	        console.log(i+ " "+ j + " Purple");
				}
				else{
      	if(FallingTransition===true && i===tfp1 && j===tfp2){
        	$(".memory-map").append($("<div style='background-color:red; display: inline-block; width: 12px;height: 12px; margin:3px'></div>"));
        	console.log(i+ " "+ j + " Red");
      }
      else if(RisingTransition===true && i===tfp1 && j===tfp2){
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
    }
    };
    console.log("fault is:- " + fault);
    console.log("faultLocationRow is " + faultLocationRow);
    console.log("faultLocationCol is " + faultLocationCol);
    console.log("manualFault is " + manualFault);
    console.log("faultLocation is " + faultLocation);

    console.log("bcx is " + bcx);
    console.log("bcy is " + bcy);
    console.log("Rows are " + row);
    console.log("Columns are " + col);

    console.log("tfp1 is " + tfp1);
    console.log("tfp2 is " + tfp2);
    console.log("Sap1 is " + sap1);
    console.log("Sap2 is " + sap2);
    console.log("FallingTransition is " +RisingTransition);
    console.log("FallingTransition is " +FallingTransition);
    console.log("arr is ");
    console.log(arr);
  });
