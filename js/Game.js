class Game {
  constructor(){
    this.greeting = createElement('h2');

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
//    car1.addImage(car1Image);
    car2 = createSprite(300,200);
  //  car2.addImage(car2Image);

   
    cars = [car1, car2];
  }
  end(){
    console.log("GAME ENDED");
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
   background("yellow");
      image(trackImage,0,-displayHeight*4,displayWidth,displayHeight*5);
      var index = 0;

      var x = 175;
      var y;

      for(var plr in allPlayers){
        index = index + 1 ;

        x = x + 200;
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
    
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
if(player.distance>3860){
  gameState=2
  this.greeting.html("winner is " + player.name)
  this.greeting.position(displayWidth/2 - 70, displayHeight/4);

}

    drawSprites();
  }
}
