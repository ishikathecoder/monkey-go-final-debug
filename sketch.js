var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, survialTime;
var ground;
var backImage,backgr;
var gameover,gameoverimg;



//GameStates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//Preload
function preload(){
  
  gameoverimg=loadImage("gameOver.png");
  backImage=loadImage("jungle.jpg");
  //Monkey
  monkey_running = loadAnimation("monkey_01.png","monkey_02.png","monkey_03.png","monkey_04.png","monkey_05.png","monkey_06.png","monkey_07.png","monkey_08.png","monkey_09.png","monkey_10.png")
  //Banana
  bananaImage = loadImage("banana.png");
  //Obstacle
  obstacleImage = loadImage("stone.png");
 
}


//Setup
function setup() {
  //Canvas

  createCanvas(950,500);
  

   gameover= createSprite(0,0,550,300);
   gameover.addImage(gameoverimg);
   gameover.scale=1;
   gameoverimg.visible=false;

  backgr=createSprite(0,0,950,500);
  backgr.addImage(backImage);
  backgr.scale=1.9;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;

  //Groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  TimeGroup = createGroup();
  
  //Monkey
  monkey = createSprite(50, 250, 10, 10);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale = 0.1;
  



 //Ground

  ground = createSprite(70, 350, 899, 16);
  ground.velocityX = -6;
  ground.x=ground.width/2;
  ground.visible=false;
  
  //score
  score = 0;
  
  
}

//Draw
function draw() {
  


  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score = score+2;
    monkey.scale+= +0.1
    
  }
   //displaying survialtime
  
  
  
  
  //displaying score
   stroke("black");
    fill("black");
      textSize(20);
   text("Score:"+  score, 300, 100);

  
    
 //Monkey
  monkey.collide(ground);
  //PLAY
  if(gameState === PLAY){
      monkey.changeAnimation("running", monkey_running);
    
   
     
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    //jump when the space key is pressed
    if(keyDown("space")) {
        monkey.velocityY = -12;
    }    
    
    
    
   
  //Gravity
  monkey.velocityY = monkey.velocityY + 0.8;
  
    
  
  
  //groups lifetime
  obstacleGroup.setLifetimeEach(-1);
  
  //Adding Functions
  food();
  obstacles();
    
    
      
    
    
    if(obstacleGroup.isTouching(monkey)){
      
     text("GAME OVER!");
     textSize(100);
        gameState = END;
      
    }
  }
  //END
   if (gameState === END) {
     obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
     backgr.velocityX=0;
     monkey.visible=false;

     gameover.visibe=true;
    
     stroke("red");
     fill("red");
        textSize(30);
   text("Game Over", 110, 200);
      
       stroke("black");
     fill("black");
        textSize(30);
      text("Monkey is dead", 100, 240);
     
   }
 

  //draw Sprites
  drawSprites();
}

//Banana
function food() {
  if (frameCount % 70 === 0) {
    banana = createSprite(400,350,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    
    banana.velocityX = -3;
    banana.lifetime = 300;
    
    FoodGroup.add(banana);
  }
}

//Obstacles
function obstacles() {
  if (frameCount % 200 === 0){
    obstacle = createSprite(250,325,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1 ;
     obstacleGroup.add(obstacle);
  }

}

