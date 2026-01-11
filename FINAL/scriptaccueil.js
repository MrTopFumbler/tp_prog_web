
const btn = document.getElementById ("btn") ;



btn.addEventListener("click", () => {
  let pseudo = document.getElementById("pseudo").value;

  if (pseudo.trim() === "") {
    alert("Entre un pseudo !");
    return;
  }
  else {
    sessionStorage.setItem("pseudo", pseudo);
    window.location.href = "index.html";
    document.location.replace("index.html");
  }
  
});


