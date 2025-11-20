var image = document.getElementById('tank');
var change = 0;
const jouer = document.getElementById ("btnjouer") ;

function recommencer_jeu (){
    
}
jouer.addEventListener ("click",recommencer_jeu )

setInterval(function(){
image.style.left = change+"px";
change+=5;
if(change>200){
clearInterval();
}
},50);
