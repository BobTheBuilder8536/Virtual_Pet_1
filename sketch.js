var dog, dogI, dogHI;
var database,food;
var foodLeft;
var isClicked = false;
var timer = 200;

function preload(){
  dogI = loadImage("images/dogImg.png");
  dogHI = loadImage("images/dogImg1.png");
}

function setup() {  
	createCanvas(500,500);
  
  database = firebase.database();

  dog = createSprite(250,320);
  dog.addImage("dog",dogI);
  dog.scale = 0.4;
  
  dog.addImage("dogH",dogHI);

  food = database.ref('food');
  food.on("value",(data)=>{
    foodLeft = data.val();
  });
}


function draw() {  
  background("lightblue");
  drawSprites();

  if(keyWentDown("space") && timer == 200){
    foodLeft -= 1;
    useFood(foodLeft);

    isClicked = true;

    dog.changeImage("dogH",dogHI);
  }
  
  
  if(isClicked == true){
    timer -= 1;
    if(timer == 0){
      timer = 200;
      isClicked = false;
    }
  }
  
  if(isClicked == false){
    dog.changeImage("dog",dogI);
  }
  
  textSize(25);
  stroke("black");
  strokeWeight(3);
  fill("white");
  text("Press 'Space' to feed Doggo",100,50);
  text("Food Items Left : " + foodLeft,135,100);


  if(keyDown("space") && isClicked == true){
    text("Doggo is not hungry right now!!",90,150);
  }
}

function useFood(int){
  database.ref('/').update({
    food: int
  });
}



