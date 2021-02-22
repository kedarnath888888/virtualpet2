var dog,sadDog,happyDog;
var addButton,feedButton;
var foodObj;
var lastFed,fedTime;



function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  
  foodObj = new Food();

  addButton=createButton("add food");
  addButton.position(500,100);

  feedButton=createButton("feed food");
  feedButton.position(600,100);





}

function draw() {
  background(46,139,87);
  drawSprites();
  dog.display();
  foodObj.display();
}

//function to read food Stock
function readStock(){
  foodStock=dataBase.ref('food');
  foodStock.on("value",function(beta){
    food=data.val();
  })
}



//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      Food:foodObj.getFoodStock(),
      FeedTime:hour()
    })
  }
 }



// function to add food in stock
function addFood(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
