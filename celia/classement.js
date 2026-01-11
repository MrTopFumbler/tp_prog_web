// scores est une liste de deux listes (scores puis pseudos)

let scores=[[],[]];

function ajouterScore(score, pseudo){
    if (scores[0] == []) {
        scores[0].push(score);
        scores[1].push(pseudo);
    }
    else{
        trouve = false;
        l=scores[0].length;
        i=0;
        while (trouve == false && i<l) {
            if (scores[i]<score){
                scores[0].splice(i+1, 0, score);
                scores[1].splice(i+1, 0, pseudo);
                trouve = true
            }
        } 
        if (trouve == false){
            scores[0].push(score);
            scores[1].push(pseudo);
        }
    }
    updateTable();
}

function updateTable() {
        // Getting my element Table using it's ID
        const tableEl = document.querySelector('#tableScore');
        //remove everything from the table
        tableEl.innerHTML = '';

        scores[0].forEach(function (scorePseudo, index) {

            pseudo = scores[1][index];
            score = scorePseudo;


            // Creating a <tr> element, just like the CM n°3
            const tr = document.createElement('TR');pseudo
            // Creating a <td> element, just like the CM n°3
            const td1 = document.createElement('TD');
            // Creating a <td> element, just like the CM n°3
            const td2 = document.createElement('TD');
            // Creating a <span> element, just like the CM n°3
            const span1 = document.createElement('span');
            // setting the span content with my number
            span1.innerHTML = pseudo;
            // Creating a <span> element, just like the CM n°3
            const span2 = document.createElement('span');
            // setting the span content with my number
            span2.innerHTML = score;

            // Here we go again, adding span to my td, button to my td, td to tr, and finally tr to table, yay!
            td1.appendChild(span1);
            tr.appendChild(td1);
            td2.appendChild(span2);
            tr.appendChild(td2);
            tableEl.appendChild(tr);
        });
    }

    const btnrej = document.getElementById ("btnrej") ;
    const changPseu = document.getElementById ("btnPseu") ;

    // Récupère et Affiche PSEUDO//
    const scor = localStorage.getItem("scores");

   /* if (scor) {
    document.getElementById("affichage").textContent =
        `Score : ${scor}`;
    } else {
    document.getElementById("affichage").textContent =
        "Pas de score trouvé";
}*/

  //Récupérer pseudos//
  const pseud = localStorage.getItem("pseudos");

      /*if (pseud) {
    document.getElementById("affpseud").textContent =
        `Pseudo : ${pseud}`;
    } else {
    document.getElementById("affpseud").textContent =
        "Pas de pseudo trouvé"; }*/

ajouterScore (scor, pseud) ; 

//sauvegarder tous les résultats et les afficher//

  /*function sauvegarderScore(pseud, scor) {
  // récupérer la liste existante
  let joueurs = JSON.parse(localStorage.getItem("joueurs"));

  // si vide, on initialise
  if (!joueurs) {
    joueurs = [];
  }

  // ajouter le nouveau joueur
  joueurs.push({ pseud, scor });

  // sauvegarder
  localStorage.setItem("joueurs", JSON.stringify(joueurs));
}
  const joueurs = JSON.parse(localStorage.getItem("joueurs")) || [];

joueurs.forEach(joueur => {
  ajouterScore(joueur.score, joueur.pseudo);
}); 
/*sauvegarderScore (pseud, scor) ; 
const joueurs = JSON.parse(localStorage.getItem("joueurs")) || [];
for (let i = 0; i < joueurs.length; i++) {
    ajouterScore(joueurs[i].scor, joueurs[i].pseud);
    } */

