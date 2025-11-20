var image = document.getElementById('tank');
var change = 0;


setInterval(function(){
image.style.left = change+"px";
change+=5;
if(change>200){
clearInterval();
}
},50);
