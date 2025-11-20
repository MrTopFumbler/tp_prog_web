var image = document.getElementById('tank');
var change = 0;
var mc = document.getElementById("bonom")
var change1 = 0;
const bouton = document.getElementById("bouton");

//bouton.addEventListener("click", updatemc);

setInterval(function(){
    image.style.left = change+"px";
    change+=5;
    if(change>200){
        clearInterval();
    }
},50);

setInterval(function updatemc(){
    console.log("ok");
    console.log(mc.value);
    if (change1 ==0){
        mc.src="sprites/NewPiskel(1).png";
        change1= 1;
    }else if (change1 ==1){
        mc.src="sprites/NewPiskel.png";
        change1 = 2;
    }else if (change1 ==2){
        mc.src="sprites/NewPiskel(2).png";
        change1 =3;
    }else if (change1 ==3){
        mc.src="sprites/NewPiskel.png";
        change1 =0;
    }
},500);