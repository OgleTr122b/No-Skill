function initializeFootball() {
  field = new Field();
  field.initializeStripes();
}

function resetFootball() {
  player.football.hp = player.football.maxHp;
  player.football.x = 0;
  player.football.y = 0;
  player.overworld.x = 0;
  player.overworld.y = 0;
  field = new Field();
  field.initializeStripes();
  linemen = [];
  peopleCrossed = 0;
}

function attemptToEndFootball() {
  if(player.football.isPlayerDead() == false) {
    return;
  }
  player.football.resetTemporaries();
  player.overworld.experience += field.y;
  player.overworld.money += peopleCrossed;
  player.overworld.gains += Math.round(((field.y) / 1800) * getBaseLog(4, 4 + peopleCrossed))
  setTransition(1);
  gameState = 1;
}

function drawFieldIndicators() {
  for(var indicator of fieldIndicators) {
    indicator.show();
  }
}

function updateFieldIndicators() {
  for(var i = fieldIndicators.length - 1; i > -1; i--) {
    var indicator = fieldIndicators[i];
    indicator.update();
    if(indicator.isVisible() == false) {
      fieldIndicators.splice(i, 1);
    }
  }
}

function removeDestroyedLinemen() {
  for(var i = linemen.length - 1; i > -1; i--) {
    var lineman = linemen[i];
    if(lineman.destroyed && lineman.y + lineman.yFieldDrag > fBGDisplayInterface.gameDisplayPlane.height) {
      linemen.splice(i, 1);
    }
  }
}

function drawLinemen() {
  var liveLinemen = [];
  var lineman;
  
  for(lineman of linemen) {
    if(lineman.destroyed) {
      lineman.show();
    } else {
      liveLinemen.push(lineman);
    }
  }
  
  for(lineman of liveLinemen) {
    lineman.show();
  }
}

function updateLinemen() {
  for(var lineman of linemen) {
    if(lineman.destroyed == false || lineman.tackleEngaged == true) {
      lineman.updateLineman();
      preventLinemanOverlap(lineman);
    }
  }
  removeDestroyedLinemen();
}

function preventLinemanOverlap(lineman1) {
  var unintersectPositions;
  var distToPlayer = Math.sqrt((player.football.x - lineman1.x) ** 2 + (player.football.y - lineman1.y) ** 2);
  if(distToPlayer < lineman1.radius + player.football.radius) {
    if(player.football.preventCollision == false) {
      lineman1.isValidTackle();
    } else {
      if(player.football.dash.active) {
        if(lineman1.destroyed == false) {
          fieldIndicators.push(new Ankle_Broken(lineman1.x, lineman1.y));
        }
        lineman1.destroyedYCoord = field.y;
        lineman1.destroyed = true;
        lineman1.crossed = true;
        peopleCrossed++;
      }
    }
    
    unintersectPositions = removeFromIntersectionStatic(lineman1.x, lineman1.y, lineman1.radius, player.football.x, player.football.y, player.football.radius, false);
    lineman1.x = unintersectPositions[0];
    lineman1.y = unintersectPositions[1];
    
    if(player.football.preventCollision == false) {
      player.football.x = unintersectPositions[2];
      player.football.y = unintersectPositions[3];
    }
  }
  
  for(var lineman2 of linemen) {
    var distToOtherLineman = Math.sqrt((lineman2.x - lineman1.x) ** 2 + (lineman2.y - lineman1.y) ** 2);
    if(lineman1.id != lineman2.id && lineman1.destroyed == false && lineman2.destroyed == false) {
      if(distToOtherLineman < lineman1.radius + lineman2.radius) {
        unintersectPositions = removeFromIntersectionStatic(lineman1.x, lineman1.y, lineman1.radius, lineman2.x, lineman2.y, lineman2.radius, false);
        lineman1.x = unintersectPositions[0];
        lineman1.y = unintersectPositions[1];
        lineman2.x = unintersectPositions[2];
        lineman2.y = unintersectPositions[3];
      }
    }
  }
}

function attemptEnemySpawn() {
  if(tick % (TargetUpdatesPerSecond * 3) == 0) {
    linemen.push(new Lineman((-fBGDisplayInterface.gameDisplayPlane.width / 2) + Math.random() * fBGDisplayInterface.gameDisplayPlane.width, -fBGDisplayInterface.gameDisplayPlane.height / 1.5 , 10));
  }
}

function showDistance() {
  var shrinkTextToFit = 0.67;
  var startRectCanvasHeight = fBGDisplayInterface.gameToCanvasHeight((160) * shrinkTextToFit);

  fBGDisplayInterface.canvasContext.fillStyle = "rgba(255, 255, 255, 1)";
  fBGDisplayInterface.canvasContext.font = startRectCanvasHeight + "px Arial";
  fBGDisplayInterface.displayGameText(true, Math.round((field.y) / 180) + " yds", -fBGDisplayInterface.gameDisplayPlane.width / 2 + 20, fBGDisplayInterface.gameDisplayPlane.height / 2 - 20);  
}

function updateFootball() {
  updateFootballPlayer();
  updateLinemen();
  attemptEnemySpawn();
  field.continuousFieldStripes();
  updateFieldIndicators();
  field.movement();
  fadeTransition(0.03);
  attemptToEndFootball();
}

function drawFootball() {
  fBGDisplayInterface.gameDisplayPlane.update();
  fBGDisplayInterface.setCanvasFocus(0, 0);
  field.show();
  drawLinemen();
  player.football.show();
  drawFieldIndicators();
  showDistance();
  showOverlay();
}