var image = document.getElementById('tank');
var change = 0;
const rejouer = document.getElementById ("btnrejouer") ;
const jouer = document.getElementById ("btnjouer") ;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var score = 0;
var asteroide = document.getElementById('asteroide');

var myAudio = document.createElement("audio");
myAudio.src = "mysprite.mp3";
myAudio.play();
myAudio.pause();

function drawScore() {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Score: " + score, 8, 20);
}

function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
            alert("YOU WIN, CONGRATS!");
            document.location.reload();
            clearInterval(interval); // Needed for Chrome to end game
          }
        }
      }
    }
  }
}

function recommencer_jeu (){

}
function commencer_jeu (){

}
rejouer.addEventListener ("click",recommencer_jeu )
jouer.addEventListener ("click",commencer_jeu )
setInterval(function(){
image.style.left = change+"px";
change+=5;
if(change>200){
clearInterval();
}
},50);
