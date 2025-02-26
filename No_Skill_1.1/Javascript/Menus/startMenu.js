function updateStartMenuButtons() {
  for(var button of startMenuButtons) {
    button.attemptProcess();
  }
}

function showStartMenuButtons() {
  for(var button of startMenuButtons) {
    button.show();
  }
}

function initializeStartMenu() {
  startMenuButtons.push(new BasicMenuButton(-800, -300, 1600, 200, "Start", function() {
    gameState = 1;
  }));
  startMenuButtons.push(new BasicMenuButton(-800, -100, 1600, 200, "Options", function() {
    onOptionMenuOpen();
    options = true;
  }));
  startMenuButtons.push(new BasicMenuButton(-800, 100, 1600, 200, "Exit", function() {
    exitClicked = true;
  }));
}