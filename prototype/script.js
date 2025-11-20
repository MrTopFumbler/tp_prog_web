// Elements
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d"); // C'est l'objet qu'on utilise pour dessiner le jeu
const scoreText = document.querySelector("#score");

// Listeners

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Vars

let xObstacle = canvas.width/2;
let yObstacle = -50; // La position de l'obstacle
let dxObstacle =-1;
let dyObstacle =+4; // Le mouvement infinitésimal (en gros la vitesse de l'obstacle par frame)

let x = canvas.width/2;
let y = canvas.height/2; // La position de l'objet

let xCoin = canvas.width/2;
let yCoin = canvas.height/2;

let rightKey = false;
let leftKey = false;
let upKey = false;
let downKey = false; // Si les boutons sont appuyés ou pas

let score = 0;

// Functions

function keyDown(btn) // TODO: REMPLACER PAR UN SWITCH
{
    if(btn.key === "ArrowRight")
    {
        rightKey = true;
    }
    else if(btn.key === "ArrowLeft")
    {
        leftKey = true;
    }
    else if(btn.key === "ArrowUp")
    {
        upKey = true;
    }
    else if(btn.key === "ArrowDown")
    {
        downKey = true;
    }
}

function keyUp(btn)
{
    if(btn.key === "ArrowRight")
    {
        rightKey = false;
    }
    else if(btn.key === "ArrowLeft")
    {
        leftKey = false;
    }
    else if(btn.key === "ArrowUp")
    {
        upKey = false;
    }
    else if(btn.key === "ArrowDown")
    {
        downKey = false;
    }
}

function drawBall() // Dessine la balle (joueur)
{
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, Math.PI * 2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
    // En gros ça marche comme sur Scratch avec le pinceau levé et tt #rpz
}

function drawObstacle() // Dessine l'obstacle
{
    ctx.beginPath();
    ctx.arc(xObstacle, yObstacle, 30, 0, Math.PI * 2, false);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawCoin() // Dessine les pieces
{
    ctx.beginPath();
    ctx.arc(xCoin, yCoin, 10, 0, Math.PI * 2, false);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

function handleObstacleDestruction()
{
    if(Math.random()*10 < 5)
    {
        dxObstacle = -Math.random()*2;
    }
    else {
        dxObstacle = Math.random()*2;
    }
    yObstacle = -50; // On remet l'obstacle en haut
    xObstacle = Math.floor(Math.random()*(720*3/4 - 720/4) + 720/4); // On choisit une position x au hasard

    xCoin = (Math.random() * (700 - 20)) + 20;
    yCoin = (Math.random() * (460 - 20)) + 20;

    score += 1
    scoreText.textContent = "Score : " + score;
}

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height); // On efface le canvas à chaque image
    if(rightKey){
        x += 3;
    }
    if(leftKey){
        x -= 3;
    }
    if(upKey){
        y -= 3;
    }
    if(downKey){
        y += 3;
    } // On change la position du joueur si un bouton est appuyé


    drawCoin(); // Les objets dessinés en 1er sont en dessous
    drawBall(); // On dessine le joueur et les obstacles...
    drawObstacle();

    xObstacle += dxObstacle;
    yObstacle += dyObstacle; // On déplace l'obstacle selon sa vitesse

    if(yObstacle>480){ // Quand l'obstacle sort de l'écran
        handleObstacleDestruction();
    }
}

setInterval(draw, 10); // On dessine notre jeu à chaque frame