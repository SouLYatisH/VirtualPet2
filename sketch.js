//Create variables here
var dog, happyDog, database, foodS, foodStock;
var feedUp , addUp ;
var fedTime, lastFed;
var foodObj;
function preload()
{
  //load images here
  dog1 = loadImage("dogImg.png")
  happyDog = loadImage("dogImg1.png")
}

function setup() {
	createCanvas(1000,400);
dog = createSprite(800,200,150,150);
dog.addImage(dog1)

add = createButton("Add Food");
add.position(800,95);
add.mousePressed(addFoods)

feed = createButton("Feed Oreo");
feed.position(700,95);
feed.mousePressed(feedDog)

foodObj = new Food();

dog.scale = 0.2
database = firebase.database();
foodStock = database.ref('Food')
foodStock.on("value",readStock)  
}


function draw() {  
background(46, 139, 87);

if(keyWentDown(UP_ARROW)){
  console.log("food ", foodS)
  writeStock(foodS)
  dog.addImage(happyDog)
}
foodObj.display()

  drawSprites();
  //add styles here
  textSize(13);
  fill("white")
  stroke(0.5)
text("Note: Press Up Arrow key to feed Oreo",115,30)

  textSize(15);
  fill("white")
  stroke(0.5)
  text("Food Remaining:" + foodS,140,130);

}

function readStock(data){
foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0
  }else{
    x= x-1
  }
  database.ref('/').update({ Food:x })

  }

  function feedDog(){
    dog.addImage(happyDog);
    
    if(foodObj.getFoodStock()<= 0){
      foodObj.updateFoodStock(foodObj.getFoodStock()*0);
    }else{
      foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    }
    
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }
  
  //function to add food in stock
  function addFoods(){
    foodS++;
    database.ref('/').update({
      Food:foodS
    })
  }
  
