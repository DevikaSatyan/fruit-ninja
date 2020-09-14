var sword,swordImg;
var gameState=1, PLAY=1, END=0;
var fruitGrp,fruit1,fruit2,fruit3,fruit4;
var monster,monsterGrp,monsterMoving;
var gameOverImg;
var score = 0;

var knifeSound,gameoverSound;
function preload(){
  swordImg = loadImage("sword.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  
  monsterMoving = loadAnimation("alien1.png","alien2.png");
  
  gameOverImg = loadAnimation("gameover.png");

  knifeSound=loadSound("knifeSwooshSound.mp3");
  
  gameoverSound=loadSound("gameover.mp3");
  
}

function setup()
{
  createCanvas(500,400);
  sword = createSprite(100,100,10,10);
  sword.addAnimation("sword",swordImg);
  sword.addAnimation("swordend",gameOverImg);
  
  sword.scale = 0.7;
  sword.setCollider("rectangle",0,0,100,100);
 // sword.debug = true;
    
  fruitGrp = new Group();
  monsterGrp = new Group();
}

function draw(){
  background("lightblue");
 
  if(gameState === PLAY)
  {
     
    //move sword with mouse
    sword.x = World.mouseX;
    sword.y = World.mouseY;

    createfruits();
    createMonster();
    if(fruitGrp.isTouching(sword))
    {
      fruitGrp.destroyEach();
      score = score + 1;
      
  knifeSound.play();
    }
    
  }
  if(monsterGrp.isTouching(sword))
  {
      gameState = END;
      fruitGrp.destroyEach();
      monsterGrp.destroyEach();
      
      fruitGrp.setVelocityXEach(0);
      monsterGrp.setVelocityXEach(0);
    
    gameoverSound.play();
    
      sword.changeAnimation("swordend");
      sword.x = 200;
      sword.y = 200;

  }
 
  drawSprites();
  text("Score : "+score, 300,50);
}

function createfruits()
{
  if(frameCount % 80 === 0)
  {
    
    var fruit = createSprite(350,Math.round(random(50,350)),10,10);
    fruit.scale = 0.2;
    var randFruit = Math.round(random(1,4));
    
    switch(randFruit)
    {
      case 1: fruit.addImage("fruit1",fruit1);
              break;
      case 2: fruit.addImage("fruit2",fruit2);
              break;
      case 3: fruit.addImage("fruit3",fruit3);
              break;
      case 4: fruit.addImage("fruit4",fruit4);
              break;
      default: break;
    }
    position = Math.round(random(1,2));
    
    if(position==1)
    {
    fruit.x=400;
    fruit.velocityX=-(7+(score/4));
    }
    else
    {
      if(position==2){
      fruit.x=0;
      
  //Increase the velocity of fruit after score 4 or 10
      fruit.velocityX= (7+3*(score/4));
      }
    }
    fruit.y=Math.round(random(50,340));
   // fruit.velocityX = -7;
    fruit.lifetime = 100;
    
    fruitGrp.add(fruit);
  }
  
}

function createMonster()
{
  if(frameCount % 100 === 0)
  {
    monster = createSprite(350,200,10,10);
    monster.y = Math.round(random(100,300))
    monster.addAnimation("moving",monsterMoving);
    monster.scale = 0.5;
  //  monster.debug = true;
    monster.setCollider("rectangle",0,0,50,50);
    
    monster.velocityX=-(8+3*(score/10));
    monster.setLifetime=50;
    monsterGrp.add(monster);
 
  }
}