function updateDisplayInterface() {
  displayInterface.gameDisplayPlane.update();
  displayInterface.background(0, 0, 0);
}

function updateDraw() {
  updateDisplayInterface();
  
  
  
  if(gameState == 1) {
    drawOverworld();
  }
  
  if(gameState == 2) {
    drawFootball();
  }
  
  showTransitionOverlay();
  
  drawMenus();
}

function updateCanvas() {
  canvas.width = window.innerWidth-20;
  canvas.height = window.innerHeight-20;
}