function isPlayerInfront() {
  if(player.overworld.x == 20 && player.overworld.y == 2) {
    return true;
  }
  
  return false;
}

function tryOpenGymBroMenu() {
  if(isPlayerInfront() && inputManager.e.isDown()) {
    openGymBroMenu()
  }
}