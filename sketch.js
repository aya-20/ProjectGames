// create the variables
var trex, trexrun, trexcollide; 
var ground, groundimg;
var invisibleGround;
var cloudimg;
var randomOrder;
var obimg1, obimg2, obimg3, obimg4, obimg5, obimg6;

var PLAY = 1;
var END = 0;
var NONE = -1;
var gameState;

var cloudGroup;
var obstacleGroup;
var score;

var restartimg, gameoverimg;
var restart, gameOver;

var jumpsound, gameoversound, scoresound;


function preload(){
  // load animations, imgs and sounds;
  trexrun = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trexcollide = loadAnimation("trex_collided.png");
  
  groundimg = loadImage("ground2.png");
  cloudimg = loadImage("cloud.png");
  
  obimg1 = loadImage("obstacle1.png");
  obimg2 = loadImage("obstacle2.png");
  obimg3 = loadImage("obstacle3.png");
  obimg4 = loadImage("obstacle4.png");
  obimg5 = loadImage("obstacle5.png");
  obimg6 = loadImage("obstacle6.png");
  
    
  
  restartimg = loadImage("restart.png");
  gameoverimg = loadImage("gameOver.png");
  
  jumpsound = loadSound("jump.mp3");
  gameoversound = loadSound("die.mp3");
  scoresound = loadSound("checkPoint.mp3");
  
}

function setup(){
  createCanvas(600,200);
  //create i

 
  invisibleGround = createSprite(300, 190, 600, 10);
  invisibleGround.visible = 0;
  trex = createSprite(50, 170, 20, 40);
  trex.addAnimation("dinosaur", trexrun);
  trex.addAnimation("dinosaur hit object", trexcollide);
  
  trex.scale = .5;
  
  ground = createSprite(300, 180, 600, 10);
  //console.log(ground.x);
  
  ground.addImage(groundimg);
  
  cloudGroup = new Group();
  obstacleGroup = new Group();
  
  restart = createSprite(300, 100, 30, 30);
  restart.addImage(restartimg);
  restart.scale = 0.5;
  restart.visible = 0;
  
    
  gameOver = createSprite(300, 160, 30, 30);
  gameOver.addImage(gameoverimg);
    gameOver.scale = 2.5;
  gameOver.visible = 0;
  
  score = 0;

  gameState = NONE;
  //console.log(World.frameCount);
  
  
  

}


function draw(){
  background("white");
  text("Score: " + score, 330, 100);
  
  if (gameState === NONE){
  if (keyDown("space")){
    gameState = PLAY;
    restart.visible = 0;
  }
  }
  
  
  if (gameState === PLAY){
     score = score + Math.round(getFrameRate()/60);
    restart.visible = 0;
    gameOver.visible = 0;
     if (keyDown("space") && (trex.y >= 161.5) && trex.isTouching(ground)){
      trex.velocityY = -10;
       jumpsound.play();
      }
    trex.velocityY = trex.velocityY + .5;
     ground.velocityX = -10;
    createCloud();
    createObstacle();
    if (score%100 === 0 && score > 0){
      scoresound.play();
      
      
  }
    if (score/900 === 0 && score > 0){
      ground.velocityX = ground.velocityX -2;
      cloudGroup.setVelocityX(cloudGroup.setVelocityX - 2);
      obstacleGroup.setVelocityX(obstacleGroup.setVelocityX - 2);
    }
  
  
    if (trex.isTouching(obstacleGroup)){
      gameoversound.play();
      gameState = END;
      
    }
   
  
    
  }
  
  else if (gameState === END){
    trex.changeAnimation("dinosaur hit object", trexcollide);
    score = 0;
    trex.velocityY = 0;
    ground.velocityX = 0;
    cloudGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(300);
     cloudGroup.setLifetimeEach(134);
    
    restart.visible = 100;

    gameOver.visible = 100;
  
    if (mousePressedOver(restart)){
      reset(); 
      score = 0;
          
    }
  
  }

  
  trex.collide(invisibleGround);
 
  //console.log(ground.x);
  //console.log(World.frameCount);
  if (ground.x < -700){ 
    ground.x = 300;
  }

  
  randomOrder = Math.round((random(50, 100)));
  //console.log(randomOrder);
  drawSprites();
 
 

 
  
}

function createCloud(){
  if (frameCount%40 === 0){
    var cloud = createSprite(600, 90, 10, 10);
    cloud.y = randomOrder;
    cloud.scale = .7;
    cloud.velocityX = -3;
    cloud.addImage(cloudimg);
    trex.depth = cloud.depth+1;
    cloud.lifetime = 200;
    cloudGroup.add(cloud);
    
    //console.log(cloud.depth);
    
  }
  
}

function createObstacle(){
  if (frameCount%60 === 0){
    var obstacle = createSprite(600, 170, 10, 10);
    obstacle.velocityX = -(5 + 2 * score/100);
    var rand = Math.round(random(1, 6));
    switch(rand){
      case 1: obstacle.addImage(obimg1);
        break;
      case 2: obstacle.addImage(obimg2);
        break;
      case 3: obstacle.addImage(obimg3);
        break;
        case 4: obstacle.addImage(obimg4);
        break;
        case 5: obstacle.addImage(obimg5);
        break;
        case 6: obstacle.addImage(obimg6);
         break;
      }
    obstacle.lifetime = 120;
    obstacle.scale = .5; 
    obstacleGroup.add(obstacle);
    
  }
  
}

function reset(){
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  score = 0;
  trex.changeAnimation("dinosaur", trexrun);
   restart.visible = 0;
  gameOver.visible = 0;
  gameState = PLAY;
}


