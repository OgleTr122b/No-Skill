function openUpgradeMenu() {
  upgrade = true;
}

function closeUpgradeMenu() {
  player.overworld.y++;
  player.overworld.prevY = player.overworld.y;
  spriteVisible = true;
  upgrade = false;
}

function updateUpgradeMenuButtons() {
  for(var button of upgradeMenuButtons) {
    button.attemptProcess();
  }
}

function showUpgradeMenuButtons() {
  canvasContext.fillStyle = 'rgba(0, 0, 0, 0.8)';
  menuDisplayInterface.displayGameRect(true, menuDisplayInterface.canvasToGamePositionX(0), menuDisplayInterface.canvasToGamePositionY(0), menuDisplayInterface.canvasToGameWidth(canvas.width), menuDisplayInterface.canvasToGameHeight(canvas.height));
  canvasContext.strokeStyle = 'rgba(255, 255, 255, 1)'
  var lineX = 0 - (menuDisplayInterface.gameDisplayPlane.width / 2) + (menuDisplayInterface.gameDisplayPlane.width / 3);
  menuDisplayInterface.displayGameLine(lineX, -1000, lineX, 1000);
  showUpgradeInformation();
  for(var button of upgradeMenuButtons) {
    button.show();
  }
}

function showUpgradeInformation() {
  var startX = -menuDisplayInterface.gameDisplayPlane.width / 2;
  var startY = - menuDisplayInterface.gameDisplayPlane.height / 2;
  var max = "[max]  +"
  var displayTempMovementSpeed = player.football.tempMovementSpeed;
  var displayTempSpeed = (Math.round(10 * player.football.tempSpeed) / 10) * 2;
  var displayTempHp = player.football.tempHp;
  menuDisplayInterface.canvasContext.fillStyle = "rgba(0, 125, 0, 1)";
  menuDisplayInterface.displayGameText(true, "$" + player.overworld.money, startX + 100, startY + 300);
  
  menuDisplayInterface.canvasContext.fillStyle = "rgba(125, 50, 50, 1)"
  if(player.football.tempMovementSpeed < tempMSMax) {
    menuDisplayInterface.displayGameText(true, "[$15]  +" + displayTempMovementSpeed + " spd", startX + 100, startY + 630); 
  } else {
    menuDisplayInterface.displayGameText(true, max + displayTempMovementSpeed + " spd", startX + 100, startY + 630); 
  }
  
  if(player.football.tempSpeed < tempSMax) {
    menuDisplayInterface.displayGameText(true, "[$5]  +" + displayTempSpeed + " *yds", startX + 100, startY + 830); 
  } else {
    menuDisplayInterface.displayGameText(true, max + displayTempSpeed + " *yds", startX + 100, startY + 830); 
  }
  
  if(player.football.tempHp < tempHpMax) {
    menuDisplayInterface.displayGameText(true, "[$10]  +" + displayTempHp + " hp", startX + 100, startY + 1030); 
  } else {
    menuDisplayInterface.displayGameText(true, max + displayTempHp + " hp", startX + 100, startY + 1030); 
  }
}

function initializeUpgradeMenu() {
  var interfaceFocusX = menuDisplayInterface.getGameFocusX();
  var interfaceWidth = menuDisplayInterface.gameDisplayPlane.width;
  var upgradeWidth = 800;
  var upgradeHeight = 200;
  var xAlignment = interfaceFocusX + (interfaceWidth / 6) - (upgradeWidth / 2);
  var yAlignment = -400;
  var highlightScalar = 2;
  var num = -1;
  var increment = function(){num++; return num;};
  
  upgradeMenuButtons.push(new AdjustableMenuButton(xAlignment, yAlignment + (upgradeHeight * increment(num)), upgradeWidth, upgradeHeight, highlightScalar, "Jump Start", function(){
    if(player.overworld.money >= 15 && player.football.tempMovementSpeed < tempMSMax) {
      player.football.tempMovementSpeed += 1;
      player.overworld.money -= 15;
    }
  }));
  
  upgradeMenuButtons.push(new AdjustableMenuButton(xAlignment, yAlignment + (upgradeHeight * increment(num)), upgradeWidth, upgradeHeight, highlightScalar, "Bolt", function(){
    if(player.overworld.money >= 5 && player.football.tempSpeed < tempSMax) {
      player.football.tempSpeed += 0.1;
      player.overworld.money -= 5;
    }
  }));
  
  upgradeMenuButtons.push(new AdjustableMenuButton(xAlignment, yAlignment + (upgradeHeight * increment(num)), upgradeWidth, upgradeHeight, highlightScalar, "Pump Up", function(){
    if(player.overworld.money >= 10 && player.football.tempHp < tempHpMax) {
      player.football.tempHp++;
      player.overworld.money -= 10;
    }
  }));
  
  upgradeMenuButtons.push(new AdjustableMenuButton(xAlignment, yAlignment + (upgradeHeight * increment(num)), upgradeWidth, upgradeHeight, highlightScalar, "Exit", function(){
    closeUpgradeMenu();
  }));
}