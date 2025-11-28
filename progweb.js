const score = 0 ; 

const rejouer = document.getElementById ("btnrejouer") ;
const jouer = document.getElementById ("btnjouer") ;
const joueur = document.getElementById ("joueur") ;


function recommencer_jeu (){
    //if (perdu)
    //alert ("Hola") ; 
    audio.play ();
    //lance à nouveau le jeu
}
function commencer_jeu (){
    //if (classement empty)
    alert ("Bonjour") ;
    //lance le jeu 
}
rejouer.addEventListener ("click",recommencer_jeu )
jouer.addEventListener ("click",commencer_jeu )