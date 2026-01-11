/*const pseudo = document.getElementById("pseudo").value;*/
const btn = document.getElementById ("btn") ;


/*document.getElementById("pseudos").textContent =
  `Joueur : ${pseudo}`;

localStorage.setItem("pseudo", pseudo);*/


btn.addEventListener("click", () => {
  const pseudo = document.getElementById("pseudo").value;

  if (pseudo.trim() === "") {
    alert("Entre un pseudo !");
    return;
  }

  /*document.getElementById("affichage").textContent =
    `Joueur : ${pseudo}`; 
    /*si je supp cette partie le bouton valider enclenche le jeu mais je dois mettre <p id="affichage"></p> dans mon html sinon erreur*/
    /*sinon supp le bouton valiser et faire avec jouer et ne pas lire le pseudo sur cette page*/

  localStorage.setItem("pseudo", pseudo);
  window.location.href = "index.html";
});


/*var requestURL = "test.json" ;
var request = new XMLHttpRequest() ; 
request.open ("GET", requestURL) ; //rentrer des infos dans le jso
request.responseType = "json" ; 
request.send() ; 
request.onload = function () {
  var varia = request.response;
  populateHeader(varia);
  //showHeroes(varia);
};
function afficher (jsonObj) {
    var nom = document.getElementById ("name") ; 
    nom.textContent = jsonObj["pseudo"]
}

bt2.addEventListener ("click", afficher(varia)) 

var myJSON = {age : "38", score :"0"} ; 
var mystring = JSON.stringify(myJSON) //récupérer des infos dans le jso

/*
const pseudos = pseudo
localStorage.setItem("pseudos", JSON.stringify(pseudos)); /*stockage en JSON
window.location.href = "index.html";*/