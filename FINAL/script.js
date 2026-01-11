// EQUILIBRAGE

const nbObstacles = 32; // Nombre d'obstacles affichés en MÊME TEMPS
const vitesseInit = 3.0; // Vitesse de base du joueur
let obstacleMinSpeed = 3.0; // Vitesse min de base des obstacles
let obstacleMaxSpeed = 4.0; // Vitesse max de base des obstacles
const obstacleSpeedIncrease = 0.4; // Augmentation de vitesse des obstacles par niveau
const maxLevelObstacleSpeed = 10.0; // Vitesse min au niveau max des obstacles
const duree = 12 * 100; // nb secondes * 100 frames pour chaque niveau

// Elements //
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d"); // C'est l'objet qu'on utilise pour dessiner le jeu
const scoreText = document.querySelector("#score");

// Listeners //

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Vars de bases //

let rightKey = false;
let leftKey = false;
let upKey = false;
let downKey = false; // Si les boutons sont appuyés ou pas (flemme de faire des masques et tt)
let score = 0;
let isAlive = true;
let gamePaused = false;

let timer = duree;

const playZoneUpper = 280;
const playZoneLeft = 0;
const playZoneRight = 800;

const bg = new Image();
bg.src = "./sprites/map.png"

const joueurSprite0 = new Image();
joueurSprite0.src = "./sprites/Personnage.png"

const joueurSprite1 = new Image();
joueurSprite1.src = "./sprites/PersonnagePara1.png"

const joueurSprite2 = new Image();
joueurSprite2.src = "./sprites/PersonnagePara2.png"

const parapluieSprite = new Image();
parapluieSprite.src = "./sprites/parapluie.png"

const courses = new Image();

// Récupère et Affiche PSEUDO//
let pseudo = sessionStorage.getItem("pseudo");

if (pseudo) {
    document.getElementById("affichage").textContent =
        `Joueur : ${pseudo}`;
} else {
    document.getElementById("affichage").textContent =
        "Aucun pseudo trouvé";
}

// Classes //

class Joueur {
    constructor(speed) {
        this.x = canvas.width/2;
        this.y = 3*canvas.height/4;
        this.speed = speed;
        this.radius = 18.5;
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
        if (this.y > canvas.height) {
            this.y = canvas.height;
        }
        if(this.y < playZoneUpper) {
            this.y = playZoneUpper;
        }
    }
	
    draw() {
        if (this.parapluieHP == 0) {
            ctx.drawImage(joueurSprite0, this.x - 40, this.y - 60, 80, 100);

            //ctx.beginPath();
            //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            //ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
            //ctx.fill();
            //ctx.closePath();
        }
        else if (this.parapluieHP == 1) {
            ctx.drawImage(joueurSprite1, this.x -40, this.y-60, 80, 100);
            //ctx.beginPath();
            //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            //ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
            //ctx.fill();
            //ctx.closePath();
        }
        else {
            ctx.drawImage(joueurSprite2, this.x-40, this.y-60, 80, 100);
            //ctx.beginPath();
            //ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            //ctx.fillStyle = "rgba(255, 0, 0, 0.4)";
            //ctx.fill();
            //ctx.closePath();
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
        this.x = random(0,1000); // On fait apparâitre l'obstacle sur n'importe quel x entre 0 et 800
        this.y = -random(25,100); // On fait apparaître l'obstacle entre 25 et 100px au-dessus de l'écran
        this.dx = -0.7; // L'angle de mouvement l'obstacle
        this.speed = random(obstacleMinSpeed,obstacleMaxSpeed); // Vitesse aléatoire en fonc. du niveau
        this.length = 25;
        this.width = -3;
    }
	
	draw() {
		ctx.beginPath();
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#3dbef5";
        ctx.moveTo(this.x - 1/2*this.width, this.y - 1/2*this.length);
        ctx.lineTo(this.x + 1/2*this.width, this.y + 1/2*this.length);
        ctx.stroke();
        ctx.closePath();
	}
}

class Coin {
    constructor() {
        this.radius = 20;
        this.reset()
    }

    reset() {
        this.x = random(playZoneLeft + 20, playZoneRight -20);
        this.y = random(playZoneUpper + 20, canvas.height - 20);
    }

    hide() { // Plutôt que de tout détruire et réinit. hehe
        this.x = 5000;
        this.y = 5000;
    }
	
    draw() {
        ctx.drawImage(parapluieSprite, this.x - 32, this.y - 32, 64, 64);

		/*ctx.beginPath();
		ctx.arc(coin.x, coin.y, coin.radius, 0, Math.PI * 2, false);
		ctx.fillStyle = "rgba(255,255,0,0.15)";
		ctx.fill();
		ctx.closePath();*/
	}
}

// Créations instances //

let joueur = new Joueur(vitesseInit);
let coin = new Coin();
const listeObstacles = []
for (let i = 0; i<nbObstacles; i++)
{
    listeObstacles.push(new Obstacle());
}
// Fonctions utilitaires //

function random(min, max)
{
    return Math.floor(Math.random()*(max-min) + min);
}
function keyDown(btn) // TODO: Améliorer + Ajouter des touches
{
    if (btn.key === "ArrowRight" || btn.key === "d") {
        rightKey = true;
    }
    else if (btn.key === "ArrowLeft" || btn.key === "q") {
        leftKey = true;
    }
    else if (btn.key === "ArrowUp" || btn.key === "z") {
        upKey = true;
    }
    else if (btn.key === "ArrowDown" || btn.key === "s") {
        downKey = true;
    }
    else if (btn.key === "p") {
        pauseGame();
    }
}
function keyUp(btn)
{
    if(btn.key === "ArrowRight" || btn.key === "d")
    {
        rightKey = false;
    }
    else if(btn.key === "ArrowLeft" || btn.key === "q")
    {
        leftKey = false;
    }
    else if(btn.key === "ArrowUp" || btn.key === "z")
    {
        upKey = false;
    }
    else if(btn.key === "ArrowDown" || btn.key === "s")
    {
        downKey = false;
    }
}

function drawText(){
    ctx.font = "48px arial";
    ctx.fillStyle="orange";
    ctx.fillText(textToShow, canvas.width/2 - 100, 50);
}

// Évènements spontanés //

function levelUp(){
    /*if (joueur.speed >= 1.5){
        joueur.speed -= 0.5;
    }*/

    if (obstacleMaxSpeed < maxLevelObstacleSpeed) {
        obstacleMinSpeed += obstacleSpeedIncrease;
        obstacleMaxSpeed += obstacleSpeedIncrease;
    }
    showText("Level Up!", 3);
}
let textTimer = 0.0;
let textToShow = "";
function showText(text, durationInSeconds){
    textTimer = durationInSeconds * 100;
    textToShow = text;
}

function scoreUp(){
    score += 0.1;
    scoreText.textContent = "Score : " + Math.floor(score);
}

// Gestion du jeu //

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

function manageGame(){
    handleCoinPickup(coin);
    for (item of listeObstacles){
        if(item.y>canvas.height){ // Quand l'obstacle sort de l'écran
            item.reset(); // On pourrait recréer l'obstacle mais flemme...
        }
        else {
            item.move();
            handleCollisions(item);
        }
    } // On déplace tous les obstacles
}
function draw(){
    coin.draw();
    joueur.draw(); // On dessine le joueur et les obstacles...
	for (item of listeObstacles) {
		item.draw();
	}
}

let id = setInterval(main, 10); // On dessine notre jeu à chaque frame

function pauseGame() {
    if (gamePaused == false) {
        clearInterval(id);
        gamePaused = true;
    }
    else {
        id = setInterval(main, 10);
        gamePaused = false;
    }
}

function main()
{
    if (isAlive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // On efface le canvas à chaque image
        ctx.drawImage(bg, 0, 0, 800, 600);
		ctx.webkitImageSmoothingEnabled = false;
    	ctx.mozImageSmoothingEnabled = false;
    	ctx.imageSmoothingEnabled = false;
        joueur.move();

        // On dessine TOUT
        draw();
        // Gère les obstacles, collisions...
        manageGame();
        scoreUp();

        timer -= 1;
        textTimer -=1;
        if (textTimer>0){
            drawText();
        }
        if (timer<=0){
            timer = duree;
            levelUp();
        }

    }
    else {
        const scores = score;
        sessionStorage.setItem("scores", scores);
        window.location.href = "./classement.html";

        const pseudos = pseudo;
        sessionStorage.setItem("pseudos", pseudos);
        window.location.href = "./classement.html";

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        clearInterval(id);
        document.location.replace("./fin.html");
    }
}
