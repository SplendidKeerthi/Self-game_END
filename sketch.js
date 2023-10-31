var wizard, wizardWalking
var ground
var mountain
var gameState = 'play'
var invisibleGround

function preload(){
  groundImage = loadImage("Ground.jpeg")
  mountainImage = loadImage("Rocky_mountain.png")

  wizardWalking = loadAnimation("wiz_1.png","wiz_2.png","wiz_3.png","wiz_4.png","wiz_5.png","wiz_4.png","wiz_3.png","wiz_2.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  
  ground = createSprite(width/2,height/2,width,height);
  ground.addImage("ground", groundImage)
  ground.x = width/2
  ground.scale=2

  wizard = createSprite(170,425,30,30)
  wizard.scale = 1.5
  wizard.addAnimation("walking", wizardWalking);
  wizard.setCollider('rectangle',0,0,30,75)

  invisibleGround = createSprite(170,493,width,10)
  invisibleGround.visible = false

  mountainsGroup = new Group()
}

function draw() {
  background(255,255,255);  

  if(gameState === 'play'){
    ground.velocityX = -5
    drawSprites();

  if(ground.x < width/2){
    ground.x = ground.width
  }

if(keyDown('space')){
  wizard.velocityY = -17
}

wizard.velocityY = wizard.velocityY + 0.8
wizard.collide(invisibleGround)

spawnMountain()

if(wizard.isTouching(mountainsGroup)){
  gameState = 'end'
}
  }
  
if(gameState === 'end'){
  wizard.destroy()
  mountainsGroup.destroyEach()
  background("black")
  text("Gameover",width/2,height/2)
}
}

function spawnMountain() {
  if(frameCount % 120 === 0){
    var mountain = createSprite(width+20,height-260,40,10) 
    mountain.velocityX = -5
    mountain.addImage(mountainImage)
    mountain.scale = 0.2
    mountain.lifetime = 300

    mountain.x = Math.round(random(width,width-200));
    mountainsGroup.add(mountain)

    mountain.depth = wizard.depth
    wizard.depth = wizard.depth+1
      }
  }
  