function showOverlay() {
  overlayDisplayInterface.gameDisplayPlane.update();
  overlayDisplayInterface.setCanvasFocus(0,0);
  showHealthBar();
}

function showHealthBar() {
  var hpHeight = overlayDisplayInterface.gameDisplayPlane.height / 54;
  var hpMaxWidth = overlayDisplayInterface.gameDisplayPlane.width / 6;
  var healthBarX = 0 - overlayDisplayInterface.gameDisplayPlane.width / 2 + overlayDisplayInterface.gameDisplayPlane.width / 45;
  var healthBarY = 0 - overlayDisplayInterface.gameDisplayPlane.height / 6;
  var healthBarBorderSize = hpHeight / 5;
  var angle = -(Math.PI / 2);
  var hpHeartSize = hpHeight * 2;
  
  //health bar back inner color
  canvasContext.fillStyle = 'rgba(70, 70, 70, 1)';
  overlayDisplayInterface.displayRotateGameRect(true, healthBarX, healthBarY, hpMaxWidth, hpHeight, 0, 0, angle);
  
  //health bar health indicator
  canvasContext.fillStyle = 'rgba(255, 40, 0, 1)';
  overlayDisplayInterface.displayRotateGameRect(
    true, 
    healthBarX, 
    healthBarY, 
    hpMaxWidth * (player.football.hp / player.football.maxHp), 
    hpHeight, 
    0, 
    0, 
    angle
  );
  
  //health bar border
  canvasContext.fillStyle = 'rgba(0, 0, 0, 1)'
  overlayDisplayInterface.displayRotateGameRect(
    true,
    healthBarX, 
    healthBarY,  
    hpMaxWidth + 1, 
    healthBarBorderSize, 
    0, 
    0 + healthBarBorderSize - 1, 
    angle
  );//top border
  
  overlayDisplayInterface.displayRotateGameRect(
    true, 
    healthBarX, 
    healthBarY,  
    hpMaxWidth + 1, 
    healthBarBorderSize, 
    0, 
    0 - hpHeight + 2, 
    angle
  );//bottom border 
  
  overlayDisplayInterface.displayRotateGameRect(
    true, 
    healthBarX, 
    healthBarY, 
    healthBarBorderSize, 
    hpHeight + healthBarBorderSize * 2 - 3, 
    healthBarBorderSize - 1, 
    healthBarBorderSize - 1, 
    angle
  );//left border
  
  overlayDisplayInterface.displayRotateGameRect(
    true, 
    healthBarX, 
    healthBarY, 
    healthBarBorderSize, 
    hpHeight + healthBarBorderSize * 2 - 3, 
    0 - (hpMaxWidth - 1), 
    healthBarBorderSize - 1, 
    angle
  );//right border
  
  overlayDisplayInterface.displayGameImageFull(
    imageStorage.getImage("heart"),
    healthBarX + (hpHeight / 2) - (hpHeartSize / 2),
    healthBarY - hpMaxWidth - (hpHeartSize / 2),
    hpHeartSize,
    hpHeartSize
  );
  
  for(var i = 0; i < player.football.tempHp; i++) {
    var crossSection = 3;
    var radius = hpHeight / 2;
    var x = healthBarX + hpHeight + (2 * radius + crossSection);
    var y = healthBarY - hpMaxWidth + hpHeight * 2 + (radius + crossSection) * 2 * i;
    showTempHpIndicator(x, y, radius, 3);
  }
}

function showTempHpIndicator(x, y, radius, crossSection) {
  canvasContext.fillStyle = "rgba(255, 0, 0, 1)";
  overlayDisplayInterface.displayGameArc(
    true,
    x,
    y,
    radius,
    0,
    Math.PI * 2,
    false
  );
  
  canvasContext.strokeStyle = "rgba(175,0,0,1)"
  canvasContext.lineWidth = overlayDisplayInterface.gameToCanvasWidth(crossSection * 3);
  overlayDisplayInterface.displayGameArc(
    false,
    x,
    y,
    radius,
    0,
    Math.PI * 2,
    false
  );
  
  canvasContext.strokeStyle = "rgba(0,0,0,1)"
  canvasContext.lineWidth = overlayDisplayInterface.gameToCanvasWidth(crossSection);
  overlayDisplayInterface.displayGameArc(
    false,
    x,
    y,
    radius,
    0,
    Math.PI * 2,
    false
  );
}