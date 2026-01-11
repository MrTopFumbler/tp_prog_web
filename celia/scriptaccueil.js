
const btn = document.getElementById ("btn") ;



btn.addEventListener("click", () => {
  const pseudo = document.getElementById("pseudo").value;

  if (pseudo.trim() === "") {
    alert("Entre un pseudo !");
    return;
  }
  else {
    localStorage.setItem("pseudo", pseudo);
    window.location.href = "./index.html";
    document.location.replace("./index.html");
  }
  
});


