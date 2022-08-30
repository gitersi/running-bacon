var PLAY = 1;
var END = 0;
var gameState = PLAY;
 
var bacon, baconRunningAnimation, baconGameOverAnimation;
var ground, backGround, backgroundImage;
 
var egg, coin, coinImage, eggImage, gameOver, gameOverImage;
 
var score;
 
function preload(){
 baconRunningAnimation = loadAnimation("assets/bacon.ani1.png", "assets/bacon.ani2.png", "assets/bacon.ani3.png", "assets/bacon.ani4.png", "assets/bacon.ani5.png");
 baconGameOverAnimation = loadAnimation("assets/bacon.dead.png")
 backgroundImage = loadImage("assets/infBackground.jpg")
 eggImage = loadImage("assets/brownegg.png")
 coinImage = loadImage("assets/coin.png");
 gameOverImage = loadImage("assets/gameover.png");
}

function setup() { 
  createCanvas(800,400);
  
  backGround = createSprite(0, 0);
  backGround.addImage("bg", backgroundImage);
  backGround.x = backGround.width /2;

  bacon = createSprite(100, 273, 50, 50);
  bacon.addAnimation("running",baconRunningAnimation);
  bacon.addAnimation("collided", baconGameOverAnimation);
  bacon.scale = 0.2;

  ground = createSprite(400, 273, 1600, 5);
  ground.visible = false;

 
  eggGroup = new Group();
  coinGroup = new Group();
  
  bacon.setCollider("rectangle",0,0,bacon.width /2 ,bacon.height /2);
  bacon.debug = true
  score = 0;
  coins = 0;

  gameOver = createSprite(400, 175, 100, 100);
  gameOver.addImage("gameover", gameOverImage);
  gameOver.visible = false;
  }

function draw() {
  background("white"); 
  
  if(gameState === PLAY){
    bacon.changeAnimation("running", baconRunningAnimation);
   
    backGround.velocityX = -(4 + 2 * score/100)

    score = score + Math.round(getFrameRate()/60);

    if (backGround.x < 0){
      backGround.x = backGround.width/3;
    }
   

  if(keyDown("space") && bacon.y >= 210){
    bacon.velocityY = -12
  }
   

  bacon.velocityY = bacon.velocityY + 0.75
  
  bacon.collide(ground);
  
  spawnEggs();
  spawnCoins();
  handleCoins();
  handleEggs();
     
    }

 if (gameState === END) {

     bacon.changeAnimation("collided");

     backGround.velocityX = 0;
     bacon.velocityY = 0
     
    

    eggGroup.setLifetimeEach(0);
    coinGroup.setLifetimeEach(0);
    
     eggGroup.setVelocityXEach(0);
     coinGroup.setVelocityXEach(0); 

     gameOver.visible = true;
    }
  bacon.collide(ground);
  
  drawSprites();

  fill("white");
  textSize(23);
  text("Score: "+score, 675, 325);
  text("Coins: "+coins, 675, 350);
  }

function spawnCoins(){
  if (frameCount % 70 === 0) {
    coin = createSprite(850, 220, 20, 20);
    coin.velocityX = -(6 + score/100);
    coin.addImage(coinImage);
    coin.scale = 0.1;
    coinGroup.add(coin);
    coin.debug = true;
  }
  if (frameCount % 110 === 0) {
    coin = createSprite(850, 125, 20, 20);
    coin.velocityX = -(6 + score/100);
    coin.addImage(coinImage);
    coin.scale = 0.1;
    coinGroup.add(coin);
    coin.debug = true;
  } }
  

function spawnEggs(){
  if (frameCount % 80 === 0){
      var egg = createSprite(850, 220, 20, 20);
      egg.velocityX = -(6 + score/100);
      egg.addImage(eggImage);

      egg.scale = 0.075;
      egg.lifetime = 300;
    
      eggGroup.add(egg);
  
}}

function handleCoins(){
  bacon.overlap(coinGroup, function(collector, collected){
    coins = coins + 1;
    collected.remove();
  })
}

function handleEggs(){
  bacon.overlap(eggGroup, function(collector, collected){
    collected.remove();
    gameState = END
  })
 }
