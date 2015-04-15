
//	Create & Define Window
Ti.UI.backgroundColor = 'white';
var win = Ti.UI.createWindow({
	 backgroundColor: 'white'
});

//	Create & Define Title Label
var labelTitle = Ti.UI.createLabel({
	width: "100%",
	height: "65px",
	color: "#fefffd",
	backgroundColor:"#5090cd",
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	top:"0",
	text:"1. Escolha sua especialidade"
});

//	Create & Define Tooltip Label
var labelLetterBall = Ti.UI.createLabel({
	backgroundColor:"#5090cd",
	width:"100px",
	height:"100px",
	right:15,
	top:54,
	borderRadius:50,
	zIndex:2,
	color:'white',
	textAlign:'center',
	font:{fontSize:30},
	text:"A"
});

//	Define Data /Parse JSON
var tableData = [];
var tableJsonDataClean = '{"consultas":[{"title":"Almoço"},{"title":"Almoço"},{"title":"Almoço"},{"title":"Almoço"},{"title":"Almoço"},{"title":"Almoço"},{"title":"Almoço"},{"title":"Almoço"},{"title":"Almoço"},{"title":"Almoço"},{"title":"Almoço"},{"title":"Beirute"},{"title":"Beirute"},{"title":"Beirute"},{"title":"Beirute"},{"title":"Beirute"},{"title":"Beirute"},{"title":"Beirute"},{"title":"Caldo de Cana"},{"title":"Caldo de Cana"},{"title":"Caldo de Cana"},{"title":"Caldo de Cana"},{"title":"Caldo de Cana"},{"title":"Caldo de Cana"},{"title":"Caldo de Cana"},{"title":"Caldo de Cana"},{"title":"Caldo de Cana"},{"title":"Caldo de Cana"}]}';
var	tableJsonData = JSON.parse(tableJsonDataClean);
	
var tableDataLength = tableJsonData.consultas.length;

var letters = [];

//	START LOOP INTO DATA ARRAY
for (var i=1; i<tableDataLength; i++){
	
	//	Define data after parse
	var rowData = tableJsonData.consultas[i];
	var rowLetter = (rowData.title).charAt(0);
		
	//	VERIFY tableData to see if there is any same rowLetter
		/*for (var index=0; index<tableData.length; index++){
			var letter = tableData[index].rowLetter;

			if(rowLetter == letter ){
				rowLetter = '';
			} else{}
		}*/	
		
		
		if (letters.indexOf(rowLetter) === -1) {
		 	letters.push(rowLetter);
		} else {
		 	rowLetter = '';
		};
		
		console.log(letters);

	//	Define TableRow
	var row = Ti.UI.createTableViewRow({
	    className:'forumEvent',
		rowIndex:i,
		rowLetter: rowLetter,
	    height:50
	});


	//	Define & Add TableRow Childrens
	var labelLetter = Ti.UI.createLabel({
	    textAlign:'left',
		left:0,
	    font:{fontSize:20},
	    width:25,
	    text:rowLetter
	});
	
	row.add(labelLetter);
	
	
	var labelIcon = Ti.UI.createLabel({
		textAlign:'center',
	    font:{fontSize:10},
	    left:35,
	    width:30,
	    text:'Icon'
	});
	
	row.add(labelIcon);
	
	
	var labelDetails = Ti.UI.createLabel({
	    font:{fontSize:10},
	    left:80,
	    width:130,
	    text:rowData.title
	});
	
	row.add(labelDetails);
	
	var labelPrice = Ti.UI.createLabel({
	   	left:80,
	    width:130,
	    font:{fontSize:9},
	    top:30,
	    text:'R$9 a 120'
	});
	
	row.add(labelPrice);

//	Pushing Row
tableData.push(row);


}// END LOOP

//	Define Table
var table = Ti.UI.createTableView({
  	data: tableData,
  	top:"84px",
	left:"40px",
	color:"#6e6f71"
});

//	SETTING OFFSET POS
var rowHeight = 95;
var totalHeight = (parseInt(table.data[0].rowCount))*rowHeight;
var rowCount = table.data[0].rowCount;

//	ADD LISTERNERS
table.addEventListener('scroll',function(e){
	
	//define letter
	var firstVisibleItemIndex = e.firstVisibleItem;
	var firstVisibleLetter = (table.data[0].rows[firstVisibleItemIndex].children[2].text).charAt(0);
	var nextVisibleLetter = (table.data[0].rows[firstVisibleItemIndex+1].children[2].text).charAt(0);
	
	//define offset & calcs
	/*var offsetTop = firstVisibleItemIndex * rowHeight;
	var offsetPercent = (offsetTop/totalHeight) * 100;
	var uiHeight = table.rect.height;
	var offsetScrollTarget = (offsetPercent * uiHeight) / 100;
		labelLetterBall.setTop(offsetScrollTarget);*/
	
	//setting values
	labelLetterBall.setText(firstVisibleLetter);
	table.data[0].rows[firstVisibleItemIndex].children[0].setText(firstVisibleLetter);
	
	//Verify next element of FirstVisible data index and set BlankText
	if(firstVisibleLetter == nextVisibleLetter){
		table.data[0].rows[firstVisibleItemIndex+1].children[0].setText(' ');
	}
	
});

//	ADD objs to window
win.add(labelLetterBall);
win.add(labelTitle);
win.add(table);
win.open();
