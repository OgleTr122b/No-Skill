function onPauseMenuOpen() {
  var pauseMenuLength = pauseMenuButtons.length;
  var totalHeight = function(){var totalHeight = 0; for(var button of pauseMenuButtons){totalHeight += button.height} return totalHeight;}();
  var currentButtonYIncrement = 0;
  
  for(var button of pauseMenuButtons) {
    button.setButtonPosition(0 - (button.width / 2), 0 - (totalHeight / 2) + currentButtonYIncrement);
    currentButtonYIncrement += button.height;
  }
}

function updatePauseMenuButtons() {
  for(var button of pauseMenuButtons) {
    button.attemptProcess();
  }
}

function showPauseMenuButtons() {
  canvasContext.fillStyle = 'rgba(0, 0, 0, 0.4)';
  menuDisplayInterface.displayGameRect(true, menuDisplayInterface.canvasToGamePositionX(0), menuDisplayInterface.canvasToGamePositionY(0), menuDisplayInterface.canvasToGameWidth(canvas.width), menuDisplayInterface.canvasToGameHeight(canvas.height));
  for(var button of pauseMenuButtons) {
    button.show();
  }
}

function initializePauseMenu() {
  pauseMenuButtons.push(new BasicMenuButton(-800, -0, 1600, 200, "Resume", function(){
    pause = false;
  }));
  pauseMenuButtons.push(new BasicMenuButton(-800, -100, 1600, 200, "Options", function(){
    onOptionMenuOpen();
    options = true;
  }));
  pauseMenuButtons.push(new BasicMenuButton(-800, 100, 1600, 200, "Feedback", function(){
    exitClicked = true;
  }));
}