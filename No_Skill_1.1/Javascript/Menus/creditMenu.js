function onCreditMenuOpen() {
  var menuLength = creditMenuButtons.length;
  var totalHeight = function(){var totalHeight = 0; for(var button of creditMenuButtons){totalHeight += button.height} return totalHeight;}();
  var currentButtonYIncrement = 0;
  
  for(var button of creditMenuButtons) {
    button.setButtonPosition(0 - (button.width / 2), 0 - (totalHeight / 2) + currentButtonYIncrement);
    currentButtonYIncrement += button.height;
  }
}

function updateCreditMenuButtons() {
  for(var button of creditMenuButtons) {
    button.attemptProcess();
  }
}

function showCreditMenuButtons() {
  canvasContext.fillStyle = 'rgba(0, 0, 0, 0.4)';
  menuDisplayInterface.displayGameRect(true, menuDisplayInterface.canvasToGamePositionX(0), menuDisplayInterface.canvasToGamePositionY(0), menuDisplayInterface.canvasToGameWidth(canvas.width), menuDisplayInterface.canvasToGameHeight(canvas.height));
  for(var button of creditMenuButtons) {
    button.show();
  }
}

function initializeCreditMenu() {
  creditMenuButtons.push(new BasicMenuButton(-800, 0, 1600, 200, "Literally Everything --- S. Clarke", function() {
    
  }));
  
  creditMenuButtons.push(new BasicMenuButton(-800, 0, 1600, 200, "Back", function(){
    credits = false;
  }));
}
