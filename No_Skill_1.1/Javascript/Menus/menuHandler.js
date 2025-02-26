/*
  Description
  Updates the menus by calling their respective update methods when necessary criteria are met, and 
  with respect to the hierarchy of importance between menus
*/
function updateMenus() {
  if(credits) {
    updateCreditMenuButtons();
    if(inputManager.p.isClicked()) {
      credits = false;
      options = false;
      pause = false;
    }
    return true;
  }
  
  if(options) {
    updateOptionMenuButtons();
    if(inputManager.p.isClicked()) {
      credits = false;
      options = false;
      pause = false;
    }
    return true;
  }
  
  if(gameState == 0) {
    updateStartMenuButtons();
    return true;
  }
  
  if(inputManager.p.isClicked() && pause == false && gym == false && upgrade == false) {
    pause = true;
    onPauseMenuOpen();
  } else if(inputManager.p.isClicked() && pause == true) {
    pause = false;
  }
  
  if(upgrade) {
    updateUpgradeMenuButtons();
    return true;
  }
  
  if(gym) {
    updateGymMenuButtons();
    return true;
  }
  
  if(gymBro) {
    updateGymBroMenuButtons();
    return true;
  }
  
  if(pause) {
    updatePauseMenuButtons();
    return true;
  }
  
  return false;
}

/*
  Description
  Concentrates menu draw calls, drawing the menus when necessary criteria are met
*/
function drawMenus() {
  menuDisplayInterface.gameDisplayPlane.update();
  menuDisplayInterface.setCanvasFocus(0, 0);
  
  if(gameState == 0 && options == false) {
    showStartMenuButtons();
  }
    
  if(pause && options == false) {
    showPauseMenuButtons();
  }
  
  if(options && credits == false) {
    showOptionMenuButtons();
  }
  
  if(credits) {
    showCreditMenuButtons();
  }
  
  if(upgrade) {
    showUpgradeMenuButtons();
  }
  
  if(gym) {
    showGymMenuButtons();
  }
  
  if(gymBro) {
    showGymBroMenuButtons();
  }
}

function initializeMenus() {
  initializeStartMenu();
  initializePauseMenu();
  initializeOptionMenu();
  initializeCreditMenu();
  initializeUpgradeMenu();
  initializeGymMenu();
  initializeGymBroMenu();
}