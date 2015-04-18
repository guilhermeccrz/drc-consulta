
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
	text:"A",
	opacity:0
});

//	Create & Define Absolute LabelLetter
var absoluteLabelLetter = Ti.UI.createLabel({
    textAlign:'left',
	left:0,
    font:{fontSize:20},
    width:25,
    height:30,
    text:'A',
    top:"91px",
    left:"40px",
    verticalAlign: 'bottom',
    backgroundColor: 'white',
    zIndex:3
});

var labelPadding = Ti.UI.createLabel({
    textAlign:'left',
	left:0,
    font:{fontSize:20},
    width:25,
    height:30,
    text:'',
    top:"84px",
    left:"40px",
    backgroundColor:'white',
    zIndex:2
});

//	Create & Define Hidden Label to Fix ScrollEvent StopPropagation **HACK SAFADO
var labelOverMask = Ti.UI.createLabel({
	left:"40px",
	color:"#6e6f71",
	backgroundColor:'transparent',
	opacity:1,
	width:'100%',
	height:'1px',
	zIndex:3
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
		if (letters.indexOf(rowLetter) === -1) {
		 	letters.push(rowLetter);
		} else {
		 	rowLetter = '';
		};


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

//	DEFINE ANIMATION & LISTERNERS
var activityShow = 0;
var activityHide = 0;
var animateState = 0;

var animateShow = Ti.UI.createAnimation({
	opacity:1,
	duration:500
});

//	SET VARIABLES TO ABLE LISTENERS TO WORK
var scrolling = null;
var finished = null;
var activityListerner = 0;
	

//	ADD LISTERNERS TENTAR SEM O SETIMEOUT E COLOCAR DELAY
labelLetterBall.addEventListener('aShow',function(e){
	activityListerner = 1;
	labelLetterBall.animate(animateShow,function(){
  		finished = 1;
	});
});

var animateHide= Ti.UI.createAnimation({
	opacity:0,
	duration:500
});

labelLetterBall.addEventListener('aHide',function(e){
  activityListerner = 1;	
  labelLetterBall.animate(animateHide,function(){
	   activityListerner = 0;
  });	
});

	
table.addEventListener('scrollend',function(e){
	if(scrolling == 1){
		setTimeout(function(){
			scrolling = 0;
			labelLetterBall.fireEvent('aHide');
		},1000);
	}
	if(finished == 1){labelLetterBall.fireEvent('aHide');}	
});

table.addEventListener('scroll',function(e){
	
	//define letter
	var firstVisibleItemIndex = e.firstVisibleItem;
	var firstVisibleLetter = (table.data[0].rows[firstVisibleItemIndex].children[2].text).charAt(0);
	var nextVisibleLetter = (table.data[0].rows[firstVisibleItemIndex+1].children[2].text).charAt(0);
	
	//define offset & calcs
	var baseTop = 75;	
	var offsetTop = firstVisibleItemIndex * rowHeight;
	var offsetPercent = (offsetTop/totalHeight) * 100;
	var uiHeight = table.rect.height;
	var offsetScrollTarget = (offsetPercent * uiHeight) / 100;
		offsetScrollTarget = parseInt(offsetScrollTarget.toFixed(2));

	//setting values
	labelLetterBall.setText(firstVisibleLetter);
	absoluteLabelLetter.setText(firstVisibleLetter);
	
	//set top & start animation
	labelLetterBall.setTop(offsetScrollTarget+30);
	
	
	scrolling = 1;
	if(activityListerner == 0){
		labelLetterBall.fireEvent('aShow');
	}		

});

//	ADD objs to window
win.add(labelOverMask);
win.add(labelPadding);
win.add(absoluteLabelLetter);
win.add(labelLetterBall);
win.add(labelTitle);
win.add(table);
win.open();
