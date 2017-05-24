var randomObjects = [];
var onAnimate = 0;
var windowType;
var locationSearchPath;

$(document).ready(function(){

	$('#main-input').on('keyup', function (e) {
	    if (e.keyCode == 13 && $(this).val()!="") {
			var thisVal = $(this).val();
			$(this).val('');
			randomObjects.push(thisVal);
			updateRandomObjects(randomObjects);
	    }
	});
	
	checkWindow();

	updateFirstArrays();

});


function updateFirstArrays(){
	if (location.hash!="") {
		randomObjects = JSON.parse(window.location.hash.substring(1));
		updateRandomObjects(randomObjects);
	}
}

function checkWindow(){
	var windowWidth = $(window).width();
	var windowHeight = $(window).height();

	if (windowWidth > 850) {
		windowType = "Large";
	}else{
		windowType = "Mobile";
	}

	var mainHeight = $('#input-area').height();

	if (windowHeight < mainHeight) {
		$('#input-area').addClass('fit-top');
		$('#container').addClass('fit-height');
	}else{
		$('#input-area').removeClass('fit-top');
		$('#container').removeClass('fit-height');
	}
}

function updateRandomObjects(arrays){

	$('#random-list').empty();

	$.each(arrays,function(id, obj){
		$('#random-list').append('<li>' + obj + '<span onclick="deleteItem('+ id +')">X</span></li>');
	});

	location.hash = JSON.stringify(arrays);

	if (randomObjects.length==0) {
		$('#result-area').removeClass('show');
		$('.tooltip-text').text('Please add item for randomize');
	}else{
		$('.tooltip-text').text('Click for get random item');
	}

	checkWindow();
	
}

function getRandomItem(){
	if (randomObjects.length>0 && onAnimate==0) {
		$('#randomize-button img').hide();
		$('#random-result').text('');
		setTimeout(function(){
			var randomObject = randomObjects[Math.floor(Math.random()*randomObjects.length)];
			$('#random-result').text(randomObject);
		},350);
		showResultAnimation();
		onAnimate=1;
	}
}

function deleteItem(num){
	randomObjects.splice(num, 1)
	updateRandomObjects(randomObjects);
}

function showResultAnimation(){

	$('.sk-circle').show();
	$('#result-area').addClass('show');

	$('.spinner').removeClass('hide');
	$('#random-result').removeClass('show');
	if (windowType=="Large") {
		$('#result-area .result-left').css('left','320px');
		$('#result-area .result-right').css('right','320px');
	}else{
		$('#result-area .result-left').css('left','30%');
		$('#result-area .result-right').css('right','30%');
	}

	setTimeout(function(){

		var resultWidth = $('#random-result').width();

		$('.sk-circle').hide();
		$('#randomize-button img').show();


		if (windowType=="Large") {
			if (resultWidth < 100) {
				$('.spinner').addClass('hide');
				$('#random-result').addClass('show');
				$('#result-area .result-left').css('left','300px');
				$('#result-area .result-right').css('right','300px');
				onAnimate=0;
			}else{
				$('.spinner').addClass('hide');
				var positionMath = 300 - (resultWidth/2);
				$('#random-result').addClass('show');
				$('#result-area .result-left').css('left', positionMath+'px');
				$('#result-area .result-right').css('right', positionMath+'px');
				onAnimate=0;
			}
		}else{
				$('.spinner').addClass('hide');
				$('#random-result').addClass('show');
				$('#result-area .result-left').css('left','0%');
				$('#result-area .result-right').css('right','0%');
				onAnimate=0;
		}		

	},2000);

}