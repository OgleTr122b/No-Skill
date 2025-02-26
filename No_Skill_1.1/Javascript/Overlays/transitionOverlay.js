class Transition {
  constructor(displayFunction) {
    this.displayFunction = displayFunction;
    this.opacity = 1;
    this.opacityRoC = 0;
  } 
  
  update() {
      this.updateOpacity();
  }
  
  show(displayInterface) {
    displayFunction(displayInterface, this.opacity);
  }
  
  
  setOpacityRoC(rate) {
    this.opacityRoC = rate;
  }
  
  setOpacity(opacity) {
    if(opacity > 1) {
      this.opacity = 1;
      return;
    }

    if(opacity < 0) {
      this.opacity = 0;
      return;
    }

    this.opacity = opacity;
  }
  
  updateOpacity() {
    this.opacity += this.opacityRoC;
  }
}

function appearTransition(amount) {
  if(transitionOpacity + amount > 1 ) {
    transitionOpacity = 1;
    return  
  } 
  
  if(transitionOpacity + amount < 0) {
    transitionOpacity = 0
    return;
  }
    
  transitionOpacity += amount;
}

function fadeTransition(amount) {
  if(transitionOpacity - amount > 1 ) {
    transitionOpacity = 1;
    return  
  } 
  
  if(transitionOpacity - amount < 0) {
    transitionOpacity = 0
    return;
  }
  
  transitionOpacity -= amount;
}

function setTransition(opacity) {
  if(opacity > 1) {
    transitionOpacity = 1;
    return;
  }
  
  if(opacity < 0) {
    transitionOpacity = 0;
    return;
  }
  
  transitionOpacity = opacity;
}
  
function showTransitionOverlay() {
  var wid = overlayDisplayInterface.gameDisplayPlane.width;
  var hei = overlayDisplayInterface.gameDisplayPlane.height;
  var x = overlayDisplayInterface.getGameFocusX() - (wid / 2);
  var y = overlayDisplayInterface.getGameFocusY() - (hei / 2);
  canvasContext.fillStyle = "rgba(0,0,0," + transitionOpacity + ")";
  overlayDisplayInterface.displayGameRect(true, x, y, wid, hei);
}