class FootballPlayer {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.radius = 50;
    this.shoulderWidth = this.radius * 3;
    this.shoulderHeight = this.radius * 1.3;
    this.runWidth = this.shoulderWidth;
    this.runHeight = this.shoulderHeight * 1.7;
    this.angle = (3/2) * Math.PI;
    this.lastKnownAngle = this.angle;
    this.runTick = 0;
    this.runCycleLength = Math.round(TargetUpdatesPerSecond / 5);
    this.runCycleLeft = true;
    this.maxHp = 3;
    this.hp = 3;
    this.tempHp = 0;
    this.movementSpeed = 8;
    this.tempMovementSpeed = 0;
    this.speed = 0.5;
    this.tempSpeed = 0;
    
    this.purchasedDash = false;
    this.preventControls = false;
    this.preventRotation = false;
    this.preventCollision = false;
    this.dash = new Dash(this);
  }
  
  
  getTotalSpeed() {
    return this.speed + this.tempSpeed;  
  }
  
  getTotalMovementSpeed() {
    return this.movementSpeed + this.tempMovementSpeed;
  }
  
  resetTemporaries() {
    this.tempHp = 0;
    this.tempMovementSpeed = 0;
    this.tempSpeed = 0;
  }
  
  isPlayerDead() {
    if(this.hp <= 0) {
      return true;
    }  
    
    return false;
  }
  
  update() {
    this.preventControls = false;
    this.preventRotation = false;
    this.preventCollision = false;
    this.updateCycleAndTick();
    this.abilityUpdate();
    this.movement();
    this.keepInBounds();
  }
  
  updateCycleAndTick() {
    if(this.runTick % this.runCycleLength == 0) {
      this.runCycleLeft = !this.runCycleLeft;
      this.runTick = 0;
    }
    
    this.runTick++;
  }
  
  movement() {
    if(this.preventControls) {
      return;
    }
    
    var moveResult = this.attemptMove();
    
    if(moveResult == 1) { //Resets last known angle to face forward when player isn't pressing a direction
      this.lastKnownAngle = 3/2 * Math.PI;
    }
  }
  
  abilityUpdate() {
    this.dash.update();
  }
  
  attemptMove() {
    if(this.preventRotation == false) {
      this.angle = this.directionOfMovement();


      if(this.angle == "NAN") {
        return 1;
      } else {
        this.lastKnownAngle = this.angle;
      }
    }
    
    if(this.preventControls == false) {
      this.x += this.getTotalMovementSpeed() * Math.cos(this.angle);
      this.y += this.getTotalMovementSpeed() * Math.sin(this.angle);
    }
    
    return 0;
  }
  
  directionOfMovement() {
    var directionX = 0;
    var directionY = 0;
    
    if(inputManager.forward.isDown()) {
      directionY -= 1;
    }
    
    if(inputManager.left.isDown()) {
      directionX -= 1;
    }
    
    if(inputManager.backward.isDown()) {
      directionY += 1;
    }
    if(inputManager.right.isDown()) {
      directionX += 1;
    }
    
    if(directionX == 0 && directionY == 0) {
      return "NAN";
    }
    
    return correctDirectionAngle(0, 0, directionX, directionY)[0];
  }
  
  keepInBounds() {
    if(this.x - this.radius < -1600) {
      this.x = -1600 + this.radius;
    }
    
    if(this.y - this.radius < -900) {
      this.y = -900 + this.radius;
    }
    
    if(this.x + this.radius > 1600) {
      this.x = 1600 - this.radius;
    }
    
    if(this.y + this.radius > 900) {
      this.y = 900 - this.radius;
    }
  }
  
  attemptLowerHealth(amount) {
    if(this.tempHp > 0) {
      this.tempHp -= amount;
      return;
    }
    
    this.hp -= amount;
    
    if(this.hp < 0) {
      this.hp = 0;
      return false;
    }
    
    return true;
  }
  
  show() {
    if(this.runCycleLeft) {
      fBGDisplayInterface.displayRotateGameImageFull(imageStorage.getImage("playerRunLeft"), this.x, this.y, this.runWidth, this.runHeight, this.runWidth / 2, this.runHeight / 2, this.lastKnownAngle + Math.PI / 2);
    } else {
      fBGDisplayInterface.displayRotateGameImageFull(imageStorage.getImage("playerRunRight"), this.x, this.y, this.runWidth, this.runHeight, this.runWidth / 2, this.runHeight / 2, this.lastKnownAngle + Math.PI / 2);
    }
    fBGDisplayInterface.displayRotateGameImageFull(imageStorage.getImage("playerbody"), this.x, this.y, this.shoulderWidth, this.shoulderHeight, this.shoulderWidth / 2, this.shoulderHeight / 2, this.lastKnownAngle + Math.PI / 2);
    canvasContext.fillStyle = 'rgba(0, 0, 0, 1)';
    fBGDisplayInterface.displayGameArc(true, this.x, this.y, this.radius, 0, Math.PI * 2, true);
    canvasContext.strokeStyle = 'rgba(255, 255, 255, 1)';
    canvasContext.lineWidth = fBGDisplayInterface.gameToCanvasWidth(20);
    fBGDisplayInterface.displayGameLine(this.x, this.y, this.x + (this.radius * Math.cos(this.lastKnownAngle)), this.y + (this.radius * Math.sin(this.lastKnownAngle)));
  }
}

class Ability {
  constructor(footballplayer, cooldown) {
    this.active = false;
    this.player = footballplayer;
    this.baseCooldown = cooldown;
  }
}

class Dash extends Ability {
  constructor(footballplayer) {
    super(footballplayer, 5);
    this.startTick = -1;
    this.dashDuration = Math.round(TargetUpdatesPerSecond * 0.5);
    this.dashSpeed = this.player.getTotalMovementSpeed() * 2;
    this.ticksSinceLastDash = 0;
    this.sinceLastDash = 0;
    this.canDash = false;
  }
  
  update() {
    this.updateSinceLastDash();
    this.tryActivate();
    this.tryDashEnd();
    if(this.active) {
      this.playerDash();
    }
  }
  
  updateSinceLastDash() {
    var cardioFactor = (baseSMax - this.player.speed) - 0.6;
    this.ticksSinceLastDash++;
    
    if(this.ticksSinceLastDash % TargetUpdatesPerSecond == 0) {
      this.ticksSinceLastDash = 0;
      this.sinceLastDash++;
    }
    
    if(this.sinceLastDash > this.baseCooldown - (3 * cardioFactor)) {
      this.canDash = true;
    }
    //console.log(this.canDash);
  }
  
  tryActivate() {
    if(inputManager.space.isDown() && this.canDash && this.player.purchasedDash) {
      this.active = true;
      this.startTick = tick;
      this.ticksSinceLastDash = 0;
      this.sinceLastDash = 0;
      this.canDash = false;
    }
  }
  
  tryDashEnd() {
    if(this.active == false) {
      return;
    }
       
    if(ticksSince(this.startTick) >= this.dashDuration) {
      this.active = false;
    }
  }
  
  playerDash() {
    this.player.preventControls = true;
    this.player.preventRotation = true;
    this.player.preventCollision = true;
    this.playerDashMovement();
  }
  
  playerDashMovement() {
    this.player.x += this.dashSpeed * Math.cos(this.player.lastKnownAngle);
    this.player.y += this.dashSpeed * Math.sin(this.player.lastKnownAngle);
  }
}