function updateEngine() {
  
  isMenuOpen = updateMenus();
  
  if(isMenuOpen) {
    return 0;
  }
  
  tickManagement();
  
  if(gameState == 1) {
    updateOverworld();
    return 0;
  }
  
  if(gameState == 2) {
    updateFootball();
    return 0;
  }
  
  return 0;
}

function tickManagement() {
  tick++;
  
  if(tick == maxTick) {
    tick = 0;
  }
}

function ticksSince(trackTick) {
  if(trackTick > tick) {
    return (maxTick - trackTick) + tick;
  }
  
  return tick - trackTick;
}