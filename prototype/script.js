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


// Vars d'équilibrage

const nbObstacles = 6;
let vitesseJoueur = 2.5;

// Classes

class Joueur {
    constructor(speed) {
        this.x = canvas.width/2;
        this.y = canvas.height/2;
        this.speed = speed;
        this.radius = 20;
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

        if(this.x > 720) { // Bloque le perso dans la zone de jeu
            this.x = 720;
        }
        if(this.x < 0) {
            this.x = 0;
        }
        if(this.y > 480) {
            this.y = 480;
        }
        if(this.y < 220) {
            this.y = 220;
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
        this.x = Math.floor(Math.random()*720); // On fait apparâitre l'obstacle sur n'importe quel x entre 0 et 720
        this.y = -Math.floor(Math.random()*(75-25) + 25); // On fait apparaître l'obstacle entre 25 et 75px au-dessus de l'écran
        this.dx = -0.7; // L'angle de mouvement l'obstacle
        this.speed = Math.floor(Math.random()*(5-3) + 3); // Vitesse aléatoire entre 3 et 5
        this.length = 25;
        this.width = -3;
    }
}

// Créations instances

let joueur = new Joueur(vitesseJoueur);

const listeObstacles = []

for (let i = 0; i<nbObstacles; i++)
{
    listeObstacles.push(new Obstacle());
}

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
        ctx.moveTo(item.x, item.y); // Move the , pen to (30, 50)
        ctx.lineTo(item.x + item.width, item.y + item.length); // Draw a line to (150, 100)
        ctx.stroke(); // Render the path
        ctx.closePath();
    }
}

/*function handleCollisions() { // Ah fichtre, c'est reparti
    for (item of listeObstacles) {
        if
    }
}*/

function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height); // On efface le canvas à chaque image

    joueur.move();

    // Les objets dessinés en 1er sont en dessous
    drawPlayer(); // On dessine le joueur et les obstacles...
    drawObstacles();

    for (item of listeObstacles){
        if(item.y>480){ // Quand l'obstacle sort de l'écran
            item.reset(); // On pourrait recréer l'obstacle mais flemme...
        }
        else {
            item.move();
        }
    } // On déplace tous les obstacles

    
}
// TODO: Limiter le mouvement du joueur pour pouvoir voir venir les obstacles
// TODO: Empêcher joueur de sortir de l'écran
setInterval(draw, 10); // On dessine notre jeu à chaque frame