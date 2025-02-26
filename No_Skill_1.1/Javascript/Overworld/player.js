class OverworldPlayer {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.slideX = x;
    this.slideY = y;
    this.width = width;
    this.height = height;
    this.lastWalkCycleFinished = true;
    this.walkTick = 0;
    this.walkCycleProportion = 1;
    this.startedWalking = false;
    this.isWalking = false;
    this.walkReleased = true;
    this.lastKey = "";
    this.facingLeft = false;
    this.money = 0;
    this.gains = 0;
    this.walkAnimation = ["playerSpriteWalkRight","playerSprite","playerSpriteWalkLeft","playerSprite"];
    this.experience = 0;
  }
  
  isInPhysTile(x, y) {
    var inTile = false;
    for(var physTile of map.physicalTiles) {
      if(x == physTile.x && y == physTile.y) {
        inTile = true;
        break;
      }
    }
    return inTile;
  }
  
  isInSpecTile(x, y) {
    var inTile = false;
    for(var specTile of map.specialTiles) {
      if(x == specTile.x && y == specTile.y) {
        specTile.activate();
        inTile = true;
        break;
      }
    }
    return inTile;
  }
  
  movement() {
    var startX = this.x;
    var startY = this.y;
    
    this.updateMovementVariables();
    
    if(this.isWalking == false) {
      return;
    }
    
    if(this.waitForWalkCycle()) {
      return;
    }
    
    if(this.startedWalking) {
      this.walkTick = tick;
    }
    
    
    
    if(inputManager.forward.isDown() && inputManager.backward.isDown() == false && ((inputManager.left.isDown() == false && inputManager.right.isDown() == false) || this.lastKey == 87)){
      this.y -= 1;
    }
    
    if(inputManager.backward.isDown() && inputManager.forward.isDown() == false && ((inputManager.left.isDown() == false && inputManager.right.isDown() == false) || this.lastKey == 83)) {
      this.y += 1;
    }
    
    if(inputManager.left.isDown() && inputManager.right.isDown() == false && ((inputManager.backward.isDown() == false && inputManager.forward.isDown() == false) || this.lastKey == 65)) {
      this.x -= 1;
      this.facingLeft = true;
    }
    
    if(inputManager.right.isDown() && inputManager.left.isDown() == false && ((inputManager.backward.isDown() == false && inputManager.forward.isDown() == false) || this.lastKey == 68)) {
      this.x += 1;
      this.facingLeft = false;
    }
    
    if(this.isInPhysTile(this.x, this.y)) {
      this.x = startX;
      this.y = startY;
    }
    //console.log(this.x, this.y)
    return 0;
  }
  
  waitForWalkCycle() {
    var walkTickDistFromTick = tick - this.walkTick;
    if(walkTickDistFromTick == 0) {
      return true;  
    }
    
    if(walkTickDistFromTick % walkCycleTimeout != 0) {
      return true;
    }
    
    return false;
  }
  
  updateMovementVariables() {
    this.updateLastClickedKey();
    this.updateWalking();
    this.updateWalkReleased();
  }
  
  updateWalkReleased() {
    this.walkReleased = true;
    
    if(inputManager.forward.isDown() || inputManager.left.isDown() || inputManager.backward.isDown() || inputManager.right.isDown()) {
      this.walkReleased = false;
    }
  }
  
  updateWalking() {
    if(
        ( 
          this.isDownAndLast(87) || 
          this.isDownAndLast(65) || 
          this.isDownAndLast(83) || 
          this.isDownAndLast(68) 
        ) == false 
      ) {
      this.startedWalking = false;
      this.isWalking = false;
      return;
    }
    
    // if( (tick - this.walkTick) <= walkCycleTimeout )  {
    //   this.startedWalking = false;
    //   this.isWalking = false;
    //   return;         
    // } 
    
    this.startedWalking = false;
    
    if(this.isWalking == false ) {
      this.startedWalking = true;
    }
    
    this.isWalking = true;
  }
  
  updateLastClickedKey() {
    if(inputManager.forward.isDown()) {
      this.lastKey = 87;
    } else if(inputManager.left.isDown()) {
      this.lastKey = 65;
    } else if(inputManager.backward.isDown()) {
      this.lastKey = 83;
    } else if(inputManager.right.isDown()) {
      this.lastKey = 68;
    }
  }
  
  isDownAndLast(key) {
    if(inputManager.getAssociation(key) != false && this.lastKey == key) {
      return true;
    }
    
    return false;
  }
  
  updateSlide() {
    this.walkCycleProportion = ((tick - this.walkTick) % walkCycleTimeout) / walkCycleTimeout;
    
    //console.log(this.walkCycleProportion == ((walkCycleTimeout - 1) / walkCycleTimeout));
    if(this.walkCycleProportion == ((walkCycleTimeout - 1) / walkCycleTimeout)) {
      this.walkCycleProportion = 1;
      this.prevX = this.x;
      this.prevY = this.y;
    }
    
    this.slideX = this.prevX + (this.x - this.prevX) * this.walkCycleProportion;
    this.slideY = this.prevY + (this.y - this.prevY) * this.walkCycleProportion;
  }
  
  show() {
    if(spriteVisible == false) {
      return;
    }
    
    var walkCycleIndex = Math.round((tick / walkCycleTimeout)) % this.walkAnimation.length;
    var showWalkAnimation = ((this.slideX != this.x || this.slideY != this.y) || (this.walkReleased == false && this.startedWalking == false && this.slideX == this.x && this.slideY == this.y && (this.isDownAndLast(87) || this.isDownAndLast(65) || this.isDownAndLast(83) || this.isDownAndLast(68))));
    
    if(this.facingLeft) {
      canvasContext.translate(displayInterface.gameToCanvasPositionX(this.slideX * tileInterval) + displayInterface.gameToCanvasWidth(this.width),displayInterface.gameToCanvasPositionY(this.slideY * tileInterval - this.height/4));
      canvasContext.scale(-1,1);
      
      if(showWalkAnimation == false) {
        displayInterface.displayGameImageFull(imageStorage.getImage("playerSprite"), displayInterface.canvasToGamePositionX(0), displayInterface.canvasToGamePositionY(0), this.width, this.height);
      } else if (showWalkAnimation == true) {
        displayInterface.displayGameImageFull(imageStorage.getImage(this.walkAnimation[walkCycleIndex]), displayInterface.canvasToGamePositionX(0), displayInterface.canvasToGamePositionY(0), this.width, this.height);
      }
      
      canvasContext.setTransform(1,0,0,1,0,0);
      return;
    }
    
    if(showWalkAnimation == false) {
      displayInterface.displayGameImageFull(imageStorage.getImage("playerSprite"), this.slideX * tileInterval, this.slideY * tileInterval - this.height/4, this.width, this.height);
    } else if (showWalkAnimation == true) {
      displayInterface.displayGameImageFull(imageStorage.getImage(this.walkAnimation[walkCycleIndex]), this.slideX * tileInterval, this.slideY * tileInterval - this.height/4, this.width, this.height);
    }
    
    return;
  }
}

function updateOverworldPlayer() {
  player.overworld.movement();
  for(var specTile of map.specialTiles) {
    var visualX = player.overworld.slideX;
    var visualY = player.overworld.slideY;
    
    if(visualX == specTile.x && visualY == specTile.y) {
      specTile.activate();
      player.overworld.prevX = player.overworld.x;
      player.overworld.prevY = player.overworld.y;
    }
  }
}