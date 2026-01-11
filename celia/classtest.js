let scores = [];

function ajouterScore(score, pseudo) {
  score = Number(score);

  // chercher si le joueur existe déjà
  const joueurExistant = scores.find(j => j.pseudo === pseudo);

  if (joueurExistant) {
    // garder le meilleur score
    if (score > joueurExistant.score) {
      joueurExistant.score = score;
    }
  } else {
    // nouveau joueur
    scores.push({ pseudo, score });
  }

  // tri décroissant
  scores.sort((a, b) => b.score - a.score);

  updateTable();
}

function updateTable() {
  const tableEl = document.querySelector('#tableScore');
  tableEl.innerHTML = '';

  scores.forEach(joueur => {
    const tr = document.createElement('tr');

    const tdPseudo = document.createElement('td');
    tdPseudo.textContent = joueur.pseudo;

    const tdScore = document.createElement('td');
    tdScore.textContent = joueur.score;

    tr.appendChild(tdPseudo);
    tr.appendChild(tdScore);
    tableEl.appendChild(tr);
  });
}

function sauvegarderScore(pseudo, score) {
  let joueurs = JSON.parse(localStorage.getItem("joueurs")) || [];
  joueurs.push({ pseudo, score });
  localStorage.setItem("joueurs", JSON.stringify(joueurs));
}

const pseudo = localStorage.getItem("pseudos");
const score = localStorage.getItem("scores");

sauvegarderScore(pseudo, score) ; 
const joueurs = JSON.parse(localStorage.getItem("joueurs")) || [];

joueurs.forEach(joueur => {
  ajouterScore(joueur.score, joueur.pseudo);
});

const btnrej = document.getElementById ("btnrej") ;
const changPseu = document.getElementById ("btnPseu") ;

/*function resetScores() {
  scores = [];
  localStorage.removeItem("joueurs");
  updateTable();
}

document.getElementById("reset").addEventListener("click", resetScores);


/*const pseudo = localStorage.getItem("pseudos");
const score = localStorage.getItem("scores");

function sauvegarderScore(pseudo, score) {
  let joueurs = JSON.parse(localStorage.getItem("joueurs")) || [];

  joueurs.push({
    pseudo: pseudo,
    score: Number(score)
  });

  localStorage.setItem("joueurs", JSON.stringify(joueurs));
}
sauvegarderScore(pseudo, score);*/