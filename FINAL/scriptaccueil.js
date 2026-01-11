
const btn = document.getElementById("btn");
const lienRapport = document.getElementById("rapport");



btn.addEventListener("click", () => {
  let pseudo = document.getElementById("pseudo").value;

  if (pseudo.trim() === "") {
    alert("Entre un pseudo !");
    return;
  }
  else {
    sessionStorage.setItem("pseudo", pseudo);
    window.location.href = "jeu.html";
    document.location.replace("jeu.html");
  }
  
});

lienRapport.addEventListener("click", () => {
    document.location.replace("rapport.pdf");
});


