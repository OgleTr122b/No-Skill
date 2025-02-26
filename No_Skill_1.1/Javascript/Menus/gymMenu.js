function openGymMenu() {
  gym = true;
}

function closeGymMenu() {
  player.overworld.y++;
  player.overworld.prevY = player.overworld.y;
  spriteVisible = true;
  gym = false;
}

function updateGymMenuButtons() {
  for(var button of  gymMenuButtons) {
    button.attemptProcess();
  }
}

function showGymMenuButtons() {
  canvasContext.fillStyle = 'rgba(0, 0, 0, 0.8)';
  menuDisplayInterface.displayGameRect(true, menuDisplayInterface.canvasToGamePositionX(0), menuDisplayInterface.canvasToGamePositionY(0), menuDisplayInterface.canvasToGameWidth(canvas.width), menuDisplayInterface.canvasToGameHeight(canvas.height));
  canvasContext.strokeStyle = 'rgba(255, 255, 255, 1)'
  var lineX = 0 - (menuDisplayInterface.gameDisplayPlane.width / 2) + (menuDisplayInterface.gameDisplayPlane.width / 3);
  menuDisplayInterface.displayGameLine(lineX, -1000, lineX, 1000);
  showGymInformation();
  for(var button of gymMenuButtons) {
    button.show();
  }
}

function showGymInformation() {
  var startX = -menuDisplayInterface.gameDisplayPlane.width / 2;// The template x used to which the graphics for menu are drawn in reference to
  var startY = - menuDisplayInterface.gameDisplayPlane.height / 2;// The template y used to which the graphics for menu are drawn in reference to
  var max = "[max]  "; // The max text displayed when the attribute can nolonger be upgraded
  var rate; // The current cost of the option
  menuDisplayInterface.canvasContext.fillStyle = "rgba(0, 125, 0, 1)";
  menuDisplayInterface.displayGameText(true, "xp  " + player.overworld.gains, startX + 100, startY + 300);
  
  menuDisplayInterface.canvasContext.fillStyle = "rgba(50, 125, 125, 1)"
  rate = Math.round(Math.pow(8 - (baseMSMax - player.football.movementSpeed), 2.2));
  var displayMovementSpeed = player.football.movementSpeed; // Just the player's football movement speed attribute
  if(player.football.movementSpeed < baseMSMax) {
    menuDisplayInterface.displayGameText(true, "[" + rate + "xp]  " + displayMovementSpeed + " spd", startX + 100, startY + 630); 
  } else {
    menuDisplayInterface.displayGameText(true, max + displayMovementSpeed + " spd", startX + 100, startY + 630); 
  }
  
  rate = Math.round(Math.pow( 7 - (Math.round(10 * baseSMax) - Math.round(10 * player.football.speed)), 2.3))
  var displaySpeed = (Math.round(10 * player.football.speed) / 10) * 2; //The player's football speed attribute rounded to the nearest tenth multiplied by 2
  if(player.football.speed < baseSMax) {
    menuDisplayInterface.displayGameText(true, "[" + rate + "xp]  " + displaySpeed + " *yds", startX + 100, startY + 830); 
  } else {
    menuDisplayInterface.displayGameText(true, max + displaySpeed + " *yds", startX + 100, startY + 830); 
  }
  
  rate = Math.round(Math.pow(8 - (baseHpMax - player.football.maxHp), 2.1));
  var displayMaxHp = player.football.maxHp; //Just the player's football max hp attribute
  if(player.football.maxHp < baseHpMax) {
    menuDisplayInterface.displayGameText(true, "[" + rate + "xp]  " + displayMaxHp + " hp", startX + 100, startY + 1030); 
  } else {
    menuDisplayInterface.displayGameText(true, max + displayMaxHp + " hp", startX + 100, startY + 1030); 
  }
}

function initializeGymMenu() {
  var interfaceFocusX = menuDisplayInterface.getGameFocusX();
  var interfaceWidth = menuDisplayInterface.gameDisplayPlane.width;
  var upgradeWidth = 800;
  var upgradeHeight = 200;
  var xAlignment =  interfaceFocusX + (interfaceWidth / 6) - (upgradeWidth / 2);
  var yAlignment = -400;
  var highlightScalar = 2;
  var num = -1;
  var increment = function(){num++; return num;};
  
  gymMenuButtons.push(new AdjustableMenuButton(xAlignment, yAlignment + (upgradeHeight * increment(num)), upgradeWidth, upgradeHeight, highlightScalar, "Sprints", function(){
    var rate = Math.round(Math.pow(8 - (baseMSMax - player.football.movementSpeed), 2.2));
    if(player.overworld.gains >= rate && player.football.movementSpeed < baseMSMax) {
      player.football.movementSpeed += 1;
      player.overworld.gains -= rate;
    }
  }));
  
  gymMenuButtons.push(new AdjustableMenuButton(xAlignment, yAlignment + (upgradeHeight * increment(num)), upgradeWidth, upgradeHeight, highlightScalar, "Cardio", function(){
    var rate = Math.round(Math.pow( 7 - (Math.round(10 * baseSMax) - Math.round(10 * player.football.speed)), 2.3));
    if(player.overworld.gains >= rate && player.football.speed < baseSMax) {
      player.football.speed += 0.1;
      player.overworld.gains -= rate;
    }
  }));
  
  gymMenuButtons.push(new AdjustableMenuButton(xAlignment, yAlignment + (upgradeHeight * increment(num)), upgradeWidth, upgradeHeight, highlightScalar, "Resistance", function(){
    var rate = Math.round(Math.pow(8 - (baseHpMax - player.football.maxHp), 2.1));
    if(player.overworld.gains >= rate && player.football.maxHp < baseHpMax) {
      player.football.maxHp += 1;
      player.overworld.gains -= rate;
    }
  }));
  
  gymMenuButtons.push(new AdjustableMenuButton(xAlignment, yAlignment + (upgradeHeight * increment(num)), upgradeWidth, upgradeHeight, highlightScalar, "Exit", function(){
    closeGymMenu();
  }));
}