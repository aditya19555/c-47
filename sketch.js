var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var obstacleTop, obsTop1, obsTop2
var obstacleBottom, obsBottom1, obsBottom2, obsBottom3
var gameState = "play"
function preload(){
bgImg = loadImage("assets/bg.png")

balloonImg = loadAnimation("assets/balloon1.png","assets/balloon2.png","assets/balloon3.png")

obsTop1 = loadImage("assets/obsTop1.png")
obsTop2 = loadImage("assets/obsTop2.png")

restImg = loadImage("assets/restart.png");
gmovrImg = loadImage("assets/gameOver.png");
obsBottom1 = loadImage("assets/obsBottom1.png")
obsBottom2 = loadImage("assets/obsBottom2.png")
obsBottom3 = loadImage("assets/obsBottom3.png")
}

function setup(){

  createCanvas(400,400)
//background image
bg = createSprite(165,485,1,1);
bg.addImage(bgImg);
bg.scale = 1.3


//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
balloon=createSprite(100,50,20,20)
balloon.addAnimation("balloon",balloonImg)
balloon.scale=0.15

obTopGroup = createGroup();

obbottGroup = createGroup();
gameOver = createSprite(200,200,0,0)
  gameOver.addImage(gmovrImg)
  restart = createSprite(200,250,0,0)
  restart.addImage(restImg)

}

function draw() {
  
  background("black");

  if(gameState === "play"){
    if (keyDown("space")) {
      balloon.velocityY= -10

    }
     //adding gravity
      balloon.velocityY = balloon.velocityY + 0.5;

      
     Bar();

     spawnObstaclesTop();
     spawnObstaclesbott();

     if(balloon.isTouching(obTopGroup) || balloon.isTouching(obbottGroup) ){
       gameState ="end"
       
     }

     gameOver.visible = false
     restart.visible = false
  }

  else if (gameState === "end"){
    gameOver.visible = true
    restart.visible = true

    if (mousePressedOver(restart)){
      reset()
    }
    
    obTopGroup.setVelocityEach(0,0)
    obbottGroup.setVelocityEach(0,0)
    balloon.setVelocity(0,0)

  }
        
       
       
   
        drawSprites();
       
       
     


      
}


function spawnObstaclesTop() 
{
     if(World.frameCount % 60 === 0) {
      obstacleTop=createSprite(390,100,20,20)
    //random y positions for top obstacles
    obstacleTop.y = Math.round(random(10,100));


    obstacleTop.scale=0.1
    obstacleTop.velocityX=-5
    //scale the sprite nand give velocity to left
    obstacleTop.y = Math.round(random(10,100));
    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1 : obstacleTop.addImage(obsTop1)
      break;
      case 2 : obstacleTop.addImage(obsTop2)
      break;
      default: break;
    }

     //assign lifetime to the variable
     obstacleTop.lifetime=150
     balloon.depth=obstacleTop.depth
   balloon.depth=balloon.depth+1
   obTopGroup.add(obstacleTop)
      } 

}

 function Bar() 
 {
         if(World.frameCount % 60 === 0)
         {
           var bar = createSprite(400,200,10,800);
          bar.velocityX = -6
          bar.depth = balloon.depth;
          bar.lifetime = 70;
          bar.visible = false;
         }
}

function spawnObstaclesbott() 
{
     if(World.frameCount % 120 === 0) {
      obstaclebott=createSprite(390,350,20,20)
    //random y positions for top obstacles
  


    obstaclebott.scale=0.1
    obstaclebott.velocityX=-5
    //scale the sprite nand give velocity to left
    
    //generate random top obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1 : obstaclebott.addImage(obsBottom1)
      break;
      case 2 : obstaclebott.addImage( obsBottom2)
      break; 
      default: break;
    }

     //assign lifetime to the variable
     obstacleTop.lifetime=150
     balloon.depth=obstacleTop.depth
   balloon.depth=balloon.depth+1
   obbottGroup.add(obstaclebott)
      } 
      
}

  function reset(){
    gameState="play"
    obTopGroup.destroyEach();
    obbottGroup.destroyEach();
   
  }
