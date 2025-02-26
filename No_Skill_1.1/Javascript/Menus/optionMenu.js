function onOptionMenuOpen() {
  var menuLength = optionMenuButtons.length;
  var totalHeight = function(){var totalHeight = 0; for(var button of optionMenuButtons){totalHeight += button.height} return totalHeight;}();
  var currentButtonYIncrement = 0;
  
  for(var button of optionMenuButtons) {
    button.setButtonPosition(0 - (button.width / 2), 0 - (totalHeight / 2) + currentButtonYIncrement);
    currentButtonYIncrement += button.height;
  }
}

function updateOptionMenuButtons() {
  for(var button of optionMenuButtons) {
    button.attemptProcess();
  }
}

function showOptionMenuButtons() {
  canvasContext.fillStyle = 'rgba(0, 0, 0, 0.4)';
  menuDisplayInterface.displayGameRect(true, menuDisplayInterface.canvasToGamePositionX(0), menuDisplayInterface.canvasToGamePositionY(0), menuDisplayInterface.canvasToGameWidth(canvas.width), menuDisplayInterface.canvasToGameHeight(canvas.height));
  for(var button of optionMenuButtons) {
    button.show();
  }
}

function initializeOptionMenu() {
  /*
  optionMenuButtons.push(new BasicMenuButton(-800, 0, 1600, 200, "Brightness", function(){
    
  }));
  */
  optionMenuButtons.push(new BasicMenuButton(-800, 0, 1600, 200, "Credits", function(){
    onCreditMenuOpen();
    credits = true;
  }));
  optionMenuButtons.push(new BasicMenuButton(-800, 0, 1600, 200, "Back", function(){
    options = false;
  }));
}