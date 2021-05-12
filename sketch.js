var database
var position

function preload() {
  bg = loadImage("Hot Air Ballon-01.png")
  balloonAnimation = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png")
}

function setup() {
  database = firebase.database();
  createCanvas(800,600);

  balloon = createSprite(100, 450, 50, 50);
  balloon.addAnimation("flying",balloonAnimation)
  balloon.scale = 0.5;

  var balloonHeight = database.ref('balloon/position')
  balloonHeight.on('value',readPosition)


}

function readPosition(data) {
  position = data.val()
  balloon.y = position.y
  balloon.x = position.x
}

function update(x,y) {
  database.ref('balloon/position').update({
    'x': position.x + x ,
    'y': position.y + y
  })
}


function draw() {
  background(bg);  
  drawSprites();


  if(keyDown(LEFT_ARROW)) {
    update(-10,0)
  }

  else if(keyDown(RIGHT_ARROW)) {
    update(10,0)
  }

  else if(keyDown(DOWN_ARROW)) {
    update(0,10)
  }

  else if(keyDown(UP_ARROW)) {
    update(0,-10)
  }

  textSize(15)
  fill("black")
  stroke("black")
  text("Use arrow keys to move the Hot Air Balloon!", 20,30)


}