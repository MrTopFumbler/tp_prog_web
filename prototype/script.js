// Elements
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d"); // C'est l'objet qu'on utilise pour dessiner le jeu
const scoreText = document.querySelector("#score");

// Listeners

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Vars de bases

let rightKey = false;
let leftKey = false;
let upKey = false;
let downKey = false; // Si les boutons sont appuyés ou pas
let score = 0;
let isAlive = true;

const duree = 30 * 60; // 30 secondes pour chaque niveau
let timer = duree;

const playZoneUpper = 220;
const playZoneLeft = 40;
const playZoneRight = 720 - 40;


// Vars d'équilibrage

const nbObstacles = 22;
let vitesseInit = 3.0;
let obstacleMinSpeed = 3.0;
let obstacleMaxSpeed = 4.0;
const obstacleSpeedIncrease = 0.3;
const maxLevelObstacleSpeed = 7.0;

// Classes

class Joueur {
    constructor(speed) {
        this.x = canvas.width/2;
        this.y = 3*canvas.height/4;
        this.speed = speed;
        this.radius = 15;
        this.parapluieHP = 0;
    }

    move() {
        if(rightKey){ // C'est dégueu faut que je mette des switch -Robin
            this.x += this.speed;
        }
        if(leftKey){
            this.x -= this.speed;
        }
        if(upKey){
            this.y -= this.speed;
        }
        if(downKey){
            this.y += this.speed;
        }

        if(this.x > playZoneRight) { // Bloque le perso dans la zone de jeu
            this.x = playZoneRight;
        }
        if(this.x < playZoneLeft) {
            this.x = playZoneLeft;
        }
        if(this.y > 480) {
            this.y = 480;
        }
        if(this.y < playZoneUpper) {
            this.y = playZoneUpper;
        }
    }
}

class Obstacle {
    constructor() {
        this.reset();
    }

    move()
    {
        this.x += this.dx;
        this.y += this.speed;
    }

    reset() // C'est pareil que le constructeur mais ça évite de détruire et recréer les obstacles
    {
        this.x = random(0,800); // On fait apparâitre l'obstacle sur n'importe quel x entre 0 et 720
        this.y = -random(25,100); // On fait apparaître l'obstacle entre 25 et 100px au-dessus de l'écran
        this.dx = -0.7; // L'angle de mouvement l'obstacle
        this.speed = random(obstacleMinSpeed,obstacleMaxSpeed); // Vitesse aléatoire en fonc. du niveau
        this.length = 25;
        this.width = -3;
    }
}

class Coin {
    constructor() {
        this.radius = 10;
        this.reset()
    }

    reset() {
        this.x = random(playZoneLeft, playZoneRight);
        this.y = random(playZoneUpper, 480);
    }

    hide() { // Plutôt que de tout détruire et réinit. hehe
        this.x = 5000;
        this.y = 5000;
    }
}

// Créations instances

let joueur = new Joueur(vitesseInit);
let coin = new Coin();

const listeObstacles = []

for (let i = 0; i<nbObstacles; i++)
{
    listeObstacles.push(new Obstacle());
}

// Functions

function random(min, max)
{
    return Math.floor(Math.random()*(max-min) + min);
}

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

function drawPlayer() // Dessine la balle (joueur)
{
    ctx.beginPath();
    ctx.arc(joueur.x, joueur.y, joueur.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "green";
    ctx.fill();
    ctx.closePath();
    // En gros ça marche comme sur Scratch avec le pinceau levé et tt #rpz
}

function drawObstacles() // Dessine les obstacles de la liste
{
    for (item of listeObstacles) {
        ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "blue";
        ctx.moveTo(item.x - 1/2*item.width, item.y - 1/2*item.length); // Move the , pen to (30, 50)
        ctx.lineTo(item.x + 1/2*item.width, item.y + 1/2*item.length); // Draw a line to (150, 100)
        ctx.stroke(); // Render the path
        ctx.closePath();
    }
}

function drawCoin()
{
    ctx.beginPath();
    ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = "yellow";
    ctx.fill();
    ctx.closePath();
}

function scoreUp(){
    score += 1;
    /*if (joueur.speed >= 1.5){
        joueur.speed -= 0.5;
    }*/

    if (obstacleMaxSpeed < maxLevelObstacleSpeed) {
        obstacleMinSpeed += obstacleSpeedIncrease;
        obstacleMaxSpeed += obstacleSpeedIncrease;
    }

    scoreText.textContent = "Score : " + score;
}

function handleCollisions(item) { // Ah fichtre, c'est reparti
        if ((item.x < joueur.x + joueur.radius) && (item.x > joueur.x - joueur.radius)) { // oulalalala c pas bo
            if((item.y < joueur.y + joueur.radius) && (item.y > joueur.y - joueur.radius)) {
                if(joueur.parapluieHP > 0) {
                    joueur.parapluieHP -= 1;
                    item.reset();
                    if(joueur.parapluieHP == 0){
                        coin.reset();
                    }
                }
                else {
                    isAlive = false;
                }
            }
        }
} // Verdict : c'est dégueu (mais ça marche)

function handleCoinPickup(item) {
        if ((item.x < joueur.x + joueur.radius) && (item.x > joueur.x - joueur.radius)) {
            if((item.y < joueur.y + joueur.radius) && (item.y > joueur.y - joueur.radius)) {
                coin.hide();
                joueur.parapluieHP = 2;
            }
        }
}

const id = setInterval(draw, 10); // On dessine notre jeu à chaque frame

function draw()
{
    if (isAlive) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // On efface le canvas à chaque image

    joueur.move();

    // Les objets dessinés en 1er sont en dessous
    drawCoin();
    drawPlayer(); // On dessine le joueur et les obstacles...
    drawObstacles();
    handleCoinPickup(coin);

    for (item of listeObstacles){
        if(item.y>480){ // Quand l'obstacle sort de l'écran
            item.reset(); // On pourrait recréer l'obstacle mais flemme...
        }
        else {
            item.move();
            handleCollisions(item);
        }
    } // On déplace tous les obstacles

    timer -= 1;
    if (timer<=0){
        timer = duree;
        scoreUp();
    }

    }
    else{
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        clearInterval(id);
        document.location.replace("./fin.html");
    }
}