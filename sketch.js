var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
 
}



function setup() {
createCanvas(600,600);

monkey = createSprite(80,315,20,20);
monkey.addAnimation("moving",monkey_running);
monkey.scale = 0.1;
  
ground = createSprite(400,350,900,10)
ground.velocityX = -4;
console.log(ground.x);
  
score = 0; 
survivalTime = 0;

foodGroup = new Group();
obstacleGroup = new Group();
}


function draw() {
background("white");

//resetting the ground
if(ground.x<0){
ground.x = ground.width/2;
}
  
//to make the monkey collide with the ground and not fall off
monkey.collide(ground);

spawnFood();
spawnObstacles();
  
//make monkey jump when space is pressed
if (keyDown("space")) {
monkey.velocityY = -12;
}
  
//add gravity to monkey
monkey.velocityY = monkey.velocityY + 0.8

drawSprites();

stroke("white");
textSize(20);
fill("white");
text("Score:"+score,500,50);

stroke("black");
textSize(20);
fill("black");
survivalTime = Math.ceil(frameCount/frameRate())
text("Survival Time:"+survivalTime,100,50);
  
if(obstacleGroup.isTouching(monkey)){
ground.velocityX = 0;
monkey.velocityY = 0;
obstacleGroup.setVelocityXEach(0);
foodGroup.setVelocityXEach(0);
obstacleGroup.setLifetimeEach(-1);
foodGroup.setLifetimeEach(-1); 
}
}

function spawnFood(){
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.07;
    banana.velocityX = -5;
    
    //assign lifetime to the variable
    banana.lifetime = 300;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = banana.depth + 1;
    
    //add each Banana to the group
    foodGroup.add(banana);
  }
}

function spawnObstacles(){  
  if (frameCount % 300 === 0) {
    obstacle = createSprite(400,320,40,10);
    obstacle.addImage(obstaceImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -6;
    
     //assign lifetime to the variable
    obstacle.lifetime = 300;
    
    //add each obstacles to the group
    obstacleGroup.add(obstacle);
  }
}