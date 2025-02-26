class Lineman {
  constructor( x, y, speed) {
    this.id = linemanID;
    linemanID++;
    this.x = x;
    this.y = y;
    this.radius = 50;
    this.shoulderWidth = this.radius * 3;
    this.shoulderHeight = this.radius * 1.3;
    this.runWidth = this.shoulderWidth;
    this.runHeight = this.shoulderHeight * 1.7;
    this.angle = correctDirectionAngle(this.x, this.y, player.football.x, player.football.y)[0];
    this.lastKnownAngle = this.angle;
    this.speed = speed * function() {
      var distRatio = field.y / 15900;
      if(distRatio < 1) {
        var curved = Math.pow( 2, ( (distRatio) - 1) );
        return curved;
      }
      return 1;
    }();
    this.speedMultiplier = 1;
    this.tackleEngaged = false;
    this.tackleTimeLimit = TargetUpdatesPerSecond / (this.speed / 3);
    this.tackleCooldown = TargetUpdatesPerSecond * 3;
    this.tackleTimer = 0;
    this.tackleCooldownTimer = 0;
    this.numberOfTackles = 3;
    this.runCycleLength = Math.round(TargetUpdatesPerSecond / 5);
    this.runTick = Math.round(Math.random() * this.runCycleLength);
    this.runCycleLeft = true;
    this.nearMiss = false;
    this.tackle = false;
    this.destroyed = false;
    this.destroyedYCoord = "NAN";
    this.yFieldDrag = 0;
    this.crossed = false;
  }
  
  show() {
    if((this.destroyedYCoord == "NAN") == false && this.tackleEngaged == false) {
      this.yFieldDrag = field.y - this.destroyedYCoord; 
    }
    
    if(this.runCycleLeft) {
      fBGDisplayInterface.displayRotateGameImageFull(imageStorage.getImage("playerRunLeft"), this.x, this.y + this.yFieldDrag, this.runWidth, this.runHeight, this.runWidth / 2, this.runHeight / 2, this.angle + Math.PI / 2);
    } else {
      fBGDisplayInterface.displayRotateGameImageFull(imageStorage.getImage("playerRunRight"), this.x, this.y + this.yFieldDrag, this.runWidth, this.runHeight, this.runWidth / 2, this.runHeight / 2, this.angle + Math.PI / 2);
    }
    
    fBGDisplayInterface.displayRotateGameImageFull(imageStorage.getImage("footballplayerbody"), this.x, this.y + this.yFieldDrag, this.shoulderWidth, this.shoulderHeight, this.shoulderWidth / 2, this.shoulderHeight / 2, this.angle + Math.PI / 2);
    
    if(this.tackleCooldownTimer >= this.tackleCooldown) {
      canvasContext.fillStyle = 'rgba(185, 30, 15, 1)';
    } else {
      canvasContext.fillStyle = 'rgba(30, 50, 125, 1)';
    }
    
    if(this.destroyed) {
      canvasContext.fillStyle = 'rgba(70, 70, 70, 1)';
    }
    
    fBGDisplayInterface.displayGameArc(true, this.x, this.y + this.yFieldDrag, this.radius, 0, Math.PI * 2, true);
    canvasContext.strokeStyle = 'rgba(0, 0, 0, 1)';
    canvasContext.lineWidth = fBGDisplayInterface.gameToCanvasWidth(20);
    fBGDisplayInterface.displayGameLine(this.x, this.y + this.yFieldDrag, this.x + (this.radius * Math.cos(this.angle)), this.y + (this.radius * Math.sin(this.angle)) + this.yFieldDrag);
    if(this.destroyed && this.tackleEngaged == false) {
      var graveWidth = this.shoulderWidth * (3/2);
      var graveHeight = this.shoulderWidth * (9/4);
      //canvasContext.fillStyle = 'rgba(90, 90, 90, 1)';
      //fBGDisplayInterface.displayGameRect(true, this.x - (graveWidth / 2), this.y - (graveHeight / 2) + this.yFieldDrag - headstoneHeight, graveWidth, graveHeight);
      //canvasContext.fillStyle = 'rgba(90, 50, 0, 1)';
      if(this.crossed == true) {
        fBGDisplayInterface.displayGameImageFull(imageStorage.getImage('coffin'), this.x - (graveWidth / 2), this.y - (graveHeight / 2) + this.yFieldDrag, graveWidth, graveHeight);
      } else if (this.crossed == false) {
        fBGDisplayInterface.displayGameImageFull(imageStorage.getImage('coffinNoBone'), this.x - (graveWidth / 2), this.y - (graveHeight / 2) + this.yFieldDrag, graveWidth, graveHeight);
      }
    }
  }
  
  updateAngleToPlayer() {
    this.angle = correctDirectionAngle(this.x, this.y, player.football.x, player.football.y)[0];
  }
  
  movement() {
    this.x += this.speed * Math.cos(this.angle) * this.speedMultiplier;
    this.y += this.speed * Math.sin(this.angle) * this.speedMultiplier;
  }
  
  shouldAttemptTackle() {
    var distToPlayer = Math.sqrt((player.football.x - this.x) ** 2 + (player.football.y - this.y) ** 2);
    
    if(distToPlayer > this.radius * 6 || this.tackleCooldownTimer < this.tackleCooldown) {
      return false;
    }
    
    return true;
  }
  
  updateLineman() {
    if(this.tackleEngaged == false) {
      this.tackleCooldownTimer++;
      this.speedMultiplier = 1;
      this.updateAngleToPlayer();
      this.movement();
      if(this.shouldAttemptTackle()) {
        this.tackle = false;
        this.nearMiss = false;
        this.tackleEngaged = true;
        this.tackleTimer = 0;
      }
    } else if(this.tackleEngaged == true) {
      this.speedMultiplier = 3;
      this.movement();
      this.tackleTimer++
      if(this.tackleTimer >= this.tackleTimeLimit) {
        if(this.tackle) {
          player.football.attemptLowerHealth(1);
        }
        this.tackleEngaged = false;
        this.tackleCooldownTimer = 0;
        this.numberOfTackles--;
      }
    }
    
    this.updateRunCycle();
    
    this.isDestroyed();
  }
  
  updateRunCycle() {
    if(this.runTick % this.runCycleLength == 0) {
      this.runCycleLeft = !this.runCycleLeft;
      this.runTick = 0;
    }

    this.runTick++;
  }
  
  isValidTackle() {
    var angleToPlayer = correctDirectionAngle(this.x, this.y, player.football.x, player.football.y)[0]; // The angle from the lineman to the player
    var difTackleToPlayer = differenceBetween2Angles(this.angle, angleToPlayer, true, false);// Difference between lineman direction of motion and direction from lineman to player
    var halfTackleWidth = (1/5 * Math.PI);//Half the width of the angle in front of the lineman that will register as a good tackle
    //The multiplier applied to the tackle width the makes tackles harder to get based on player speed relative to lineman
    var playerDifficultyToHit = 1 - function(linemanSpeed) {
      var playerSpeedContribution = ((player.football.movementSpeed - 8) / (baseMSMax - 8));
      var linemanSpeedContribution = ((linemanSpeed / 10) - 0.5) * 2;
      var difficulty = playerSpeedContribution - linemanSpeedContribution;
      if(difficulty < 0) { 
        return 0;
      }
      
      if(difficulty > 1) {
        return 1;
      }
      
      return difficulty;
    }(this.speed);
    
    if(this.tackleEngaged == false) {
      return false;
    }

    if(difTackleToPlayer > halfTackleWidth * playerDifficultyToHit) {
      
      this.nearMiss = true;
      //console.log("Near miss.");
      return false;
    }
    
    this.tackle = true;
    //console.log("Good Tackle.");
    return true;
  }
  
  isDestroyed() {
    if((this.nearMiss == false || this.tackle == true) && this.numberOfTackles > 0) {
      return false;
    }
    
    if(this.nearMiss == true && this.destroyed == false && this.tackle == false) {
      fieldIndicators.push(new Ankle_Broken(this.x, this.y));
      this.crossed = true;
      peopleCrossed++;
      //console.log(peopleCrossed);
    }
    
    this.destroyedYCoord = field.y;
    this.destroyed = true
    return true;
  }
}