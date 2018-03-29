// kod projektu Snake
$(document).ready(function(){
const cvs = document.getElementById("gra");
const ctx = cvs.getContext("2d");

// jednostka
const box = 32;

// obrazki

const ziemia = new Image();
ziemia.src = "img/snekowisko.png";

const foodimg = new Image();
foodimg.src = "img/apple.png";

// audio

let rip = new Audio();

rip.src = "audio/dead.mp3";

// niech się stanie snek

let snake = [];

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// możliwe miejsca pojawienia się jedzenia jedzenie

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}

// wynik

let score = 0;

//kierowanie gada

let k;

	$(document).keydown(function(e){
		var key = e.which;
		if(key == "37" && k != "PRAWO") k = "LEWO";
		else if(key == "38" && k != "DOL") k = "GORA";
		else if(key == "39" && k != "LEWO") k = "PRAWO";
		else if(key == "40" && k != "GORA") k = "DOL";
	})

// kolizja
function kolizja(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// rysowanie rzeczy

function draw(){
    
    ctx.drawImage(ziemia,0,0);
    
    for( let i = 0; i < snake.length ; i = i + 1){
        ctx.fillStyle = ( i == 0 )? "#FF8CD0" : "white";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
        
        ctx.strokeStyle = "black";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    
    ctx.drawImage(foodimg, food.x, food.y);
    
    // Rozdzielenia x i y saneka
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // ruch węża
    if( k == "LEWO") snakeX -= box;
    if( k == "GORA") snakeY -= box;
    if( k == "PRAWO") snakeX += box;
    if( k == "DOL") snakeY += box;
    
    // spawn jedzenia
    if(snakeX == food.x && snakeY == food.y){
        score = score + 1;
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
    }else{
        snake.pop();
    }
    
    // dodawanie nowej głowy
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || kolizja(newHead,snake)){
        clearInterval(game);
        rip.play();
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "black";
    ctx.font = "45px Meiryo";
    ctx.fillText(score,17*box,1.6*box);
}

var sonic = 100;

let game = setInterval(draw,sonic);

})


