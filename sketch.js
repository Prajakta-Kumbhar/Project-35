var balloon,balloonImage1,balloonImage2;
// create database and position variable here
var database, position;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  createCanvas(1500,700);

  database=firebase.database();
  var balloonPosition = database.ref("Balloon/Position");
  balloonPosition.on ("value",readPosition, showError);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW))
  {
    updatepos(-1,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW))
  {
    updatepos(1,0)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW))
  {
    updatepos(0,-1)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale + 0.01
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW))
  {
    updatepos(0,1)
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale = balloon.scale - 0.01

    //write code to move air balloon in down direction
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function readPosition(data)
{
  balloonpos = data.val()
  balloon.x =  balloonpos.x
  balloon.y = balloonpos.y
}

function showError()
{
  console.log("Error");
}

function updatepos(x,y)
{
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
  database.ref("Balloon/Position").update({x : balloon.x, y : balloon.y})
}
