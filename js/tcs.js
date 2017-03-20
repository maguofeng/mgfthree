$(function(){
	var box = $("#box");
	//画20*20个方格
	for (var i = 0;i<20;i++) {
		for (var j = 0; j < 20; j++) {
			var div = $("<div>");
			div.id = j + "-"  +i;
			//div.innerHTML =j + "-" + i;
			box.appendChild(div);
		}
	}
	var snake = [{x:0,y:0},{x:1,y:0},{x:2,y:0}];
	for (var i=0; i < snake.length; i++) {
		var id = snake[i].x + "-" +snake[i].y;
		var obj = $("#"+id);
		obj.className = "snake";
	}
	function getfood() {
		do{
			var x =Math.floor(Math.random()*20);
			var y =Math.floor(Math.random()*20);
		}while (check(x,y));
		var food = $("#"+x+"-"+y);
		food.className = "food";
		return {x:x,y:y};
	}
	function check(a,b) {
		for (var i = 0; i < snake.length; i++) {
			if (a == snake[i].x&&b==snake[i].y) {
				return true;
			}
		}
		return false;
	}
	var food=getfood();
	//方向
	var direction = "r";
	var t = setInterval(move,200);
	function move() {
		var oldHead = snake[snake.length-1];
		if (direction == "r") {
			var newHeadId = oldHead.x+1 + "-" + oldHead.y;
			var newHeadObj = $("#" + newHeadId);
			if(newHeadObj == null || check(oldHead.x+1,oldHead.y)){
				alert("game over");
				clearInterval(t);
				return;
			}
			newHeadObj.className = "snake";
			snake.push({x:oldHead.x+1,y:oldHead.y});
			if (oldHead.x+1 == food.x && oldHead.y ==food.y) {
				food = getfood();
			}else{
				var snakeEnd = $("#"+snake[0].x + "-" + snake[0].y);
				snakeEnd.className = "";
				snake.shift(snakeEnd);
			}
		}else if (direction == "b") {

			var newHeadId = oldHead.x + "-" + (oldHead.y+1);
			var newHeadObj = $("#" + newHeadId);
			if(newHeadObj == null || check(oldHead.x,oldHead.y+1)){
				alert("game over");
				clearInterval(t);
				return;
			}
			newHeadObj.className = "snake";
			snake.push({x:oldHead.x,y:oldHead.y+1});
			if (oldHead.x == food.x && oldHead.y+1 ==food.y) {
				food = getfood();
			}else{
				var snakeEnd = $("#"+snake[0].x + "-" + snake[0].y);
				snakeEnd.className = "";
				snake.shift(snakeEnd);
			}

		}else if (direction == "l") {

			var newHeadId = oldHead.x-1 + "-" + oldHead.y;
			var newHeadObj = $("#" + newHeadId);
			if(newHeadObj == null || check(oldHead.x-1,oldHead.y)){
				alert("gameover");
				clearInterval(t);
				return;
			}
			newHeadObj.className = "snake";
			snake.push({x:oldHead.x-1,y:oldHead.y});
			if (oldHead.x-1 == food.x && oldHead.y ==food.y) {
				food = getfood();
			}else{
				var snakeEnd = $("#"+snake[0].x + "-" + snake[0].y);
				snakeEnd.className = "";
				snake.shift(snakeEnd);
			}

		}else if (direction == "t") {

			var newHeadId = oldHead.x + "-" + (oldHead.y-1);
			var newHeadObj = $("#" + newHeadId);
			if(newHeadObj == null || check(oldHead.x,oldHead.y-1)){
				alert("gameover");
				clearInterval(t);
				return;
			}
			newHeadObj.className = "snake";
			snake.push({x:oldHead.x,y:oldHead.y-1});
			if (oldHead.x == food.x && oldHead.y-1 ==food.y) {
				food = getfood();
			}else{
				var snakeEnd = $("#"+snake[0].x + "-" + snake[0].y);
				snakeEnd.className = "";
				snake.shift(snakeEnd);
			}

		}
	}
    //添加键盘事件
	document.onkeydown = function (e) {
		var ev = e || window.event;
		if (ev.keyCode == 37) {
			if (direction == "r") {
				return;
			}
			direction = "l";
		}else if (ev.keyCode == 38) {
			if (direction == "b") {
				return;
			}
			direction = "t";
		}else if (ev.keyCode == 39) {
			if (direction == "l") {
				return;
			}
			direction = "r";
		}else if (ev.keyCode == 40) {
			if (direction == "t") {
				return;
			}
			direction = "b";
		}else if (ev.keyCode == 32) {
			clearInterval(t);
		}else if (ev.keyCode == 13) {
			t = setInterval(move,200);
		}
	}
})   