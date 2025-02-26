function openGymBroMenu() {
  gymBro = true;
}

function closeGymBroMenu() {
  spriteVisible = true;
  gymBro = false;
}

function updateGymBroMenuButtons() {
  for(var button of  gymBroMenuButtons) {
    button.attemptProcess();
  }
}

function showGymBroMenuButtons() {
  canvasContext.fillStyle = 'rgba(0, 0, 0, 0.8)';
  menuDisplayInterface.displayGameRect(true, menuDisplayInterface.canvasToGamePositionX(0), menuDisplayInterface.canvasToGamePositionY(0), menuDisplayInterface.canvasToGameWidth(canvas.width), menuDisplayInterface.canvasToGameHeight(canvas.height));
  canvasContext.strokeStyle = 'rgba(255, 255, 255, 1)'
  var lineX = 0 - (menuDisplayInterface.gameDisplayPlane.width / 2) + (menuDisplayInterface.gameDisplayPlane.width / 3);
  menuDisplayInterface.displayGameLine(lineX, -1000, lineX, 1000);
  showGymBroInformation();
  for(var button of gymBroMenuButtons) {
    button.show();
  }
}

function showGymBroInformation() {
  var startX = -menuDisplayInterface.gameDisplayPlane.width / 2;
  var startY = - menuDisplayInterface.gameDisplayPlane.height / 2;
  var owned = "[OWNED]  ";// text displayed after the player has purchased the option
  var xpRate; // The current xp cost of the option
  var moneyRate; // The current money cost of the option
  menuDisplayInterface.canvasContext.fillStyle = "rgba(0, 125, 0, 1)";
  menuDisplayInterface.displayGameText(true, "xp", startX + 100, startY + 300);//experience text display
  menuDisplayInterface.displayGameText(true, player.overworld.gains, startX + 300, startY + 300);//experience amount display
  menuDisplayInterface.displayGameText(true, "$", startX + 100, startY + 425);// money text display
  menuDisplayInterface.displayGameText(true, player.overworld.money, startX + 300, startY + 425);//money amount display
  
  menuDisplayInterface.canvasContext.fillStyle = "rgba(50, 125, 125, 1)"
  xpRate = 80;
  moneyRate = 50;
  if(player.football.purchasedDash == false) {
    menuDisplayInterface.displayGameText(true, "[" + xpRate + "xp] & [$" + moneyRate + "]", startX + 100, startY + 630); 
  } else {
    menuDisplayInterface.displayGameText(true, owned, startX + 100, startY + 630); 
  }
  /*
  rate = Math.round(Math.pow( 7 - (Math.round(10 * baseSMax) - Math.round(10 * player.football.speed)), 2.3))
  if(player.football.speed < baseSMax) {
    menuDisplayInterface.displayGameText(true, "" + (Math.round(10 * player.football.speed) / 10)  + " (" + rate + " xp)", startX + 100, startY + 830); 
  } else {
    menuDisplayInterface.displayGameText(true, max, startX + 100, startY + 830); 
  }
  
   rate = Math.round(Math.pow(8 - (baseHpMax - player.football.maxHp), 2.1));
  if(player.football.maxHp < baseHpMax) {
    menuDisplayInterface.displayGameText(true, "" + player.football.maxHp + " (" + rate + " xp)", startX + 100, startY + 1030); 
  } else {
    menuDisplayInterface.displayGameText(true, max, startX + 100, startY + 1030); 
  }
  */
}

function initializeGymBroMenu() {
  var interfaceFocusX = menuDisplayInterface.getGameFocusX();
  var interfaceWidth = menuDisplayInterface.gameDisplayPlane.width;
  var upgradeWidth = 800;
  var upgradeHeight = 200;
  var xAlignment =  interfaceFocusX + (interfaceWidth / 6) - (upgradeWidth / 2);
  var yAlignment = -400;
  var highlightScalar = 2;
  var num = -1;
  var increment = function(){num++; return num;};
  
  gymBroMenuButtons.push(new AdjustableMenuButton(xAlignment, yAlignment + (upgradeHeight * increment(num)), upgradeWidth, upgradeHeight, highlightScalar, "Dash", function(){
    var xpRate = 80
    var moneyRate = 50;
    if(player.overworld.gains >= xpRate && player.overworld.money >= moneyRate && player.football.purchasedDash == false) {
      player.football.purchasedDash = true;
      player.overworld.gains -= xpRate;
      player.overworld.money -= moneyRate;
    }
  }));
  
  gymBroMenuButtons.push(new AdjustableMenuButton(xAlignment, yAlignment + (upgradeHeight * increment(num)), upgradeWidth, upgradeHeight, highlightScalar, "Exit", function(){
    closeGymBroMenu();
  }));
}