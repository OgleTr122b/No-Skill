class BasicMenuButton {
  constructor(x, y, width, height, text, func) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.func = func;
    this.mouseOver = false;
  }
  
  show() {
    if(this.isMouseOver()) {
      canvasContext.fillStyle = 'rgba(255, 255, 255, 0.1)';
    } else {
      canvasContext.fillStyle = 'rgba(0, 0, 0, 0)';
    }
    menuDisplayInterface.displayGameRect(true, menuDisplayInterface.canvasToGamePositionX(0), this.y, menuDisplayInterface.gameDisplayPlane.width, this.height);
    this.showText();
  }
  
  showText() {
    var shrinkTextToFit = 0.67;
    var startRectCanvasHeight = menuDisplayInterface.gameToCanvasHeight(this.height * shrinkTextToFit);
    var arialFontToHeightRatio = 0.73 * shrinkTextToFit;
    var inverseAFHR = 1 - arialFontToHeightRatio;
    
    canvasContext.font = startRectCanvasHeight + "px Lexington";
    var textMetrics = canvasContext.measureText(this.text);
    var textWidth = menuDisplayInterface.canvasToGameWidth(textMetrics.width);
    var gameTextHorizontalOffset = (this.width - textWidth) / 2;
    canvasContext.fillStyle = 'rgba(255, 255, 255, 1)';
    menuDisplayInterface.displayGameText(true, this.text, this.x + gameTextHorizontalOffset, this.y + this.height - (this.height * (inverseAFHR / 2))); 
  }
  
  attemptProcess() {
    if(this.isButtonClicked()) {
      this.func();
    }
  }
  
  setButtonPosition(x, y){
    this.x = x;
    this.y = y;
  }
  
  isMouseOver() {
    var MPTX = menuDisplayInterface.canvasToGamePositionX(mouseCanvasX);
    var MPTY = menuDisplayInterface.canvasToGamePositionY(mouseCanvasY);
    
    if(MPTX < this.x || MPTX > this.x + this.width || MPTY < this.y || MPTY > this.y + this.height) {
      return false;
    }
    
    return true;
  }
  
  isButtonClicked() {
    if(this.isMouseOver() == false) {
      return false;
    }
    
    if(mouseClick && mouseButton == 0) {
      return true;
    }
  }
}

class AdjustableMenuButton extends BasicMenuButton {
  constructor(x, y, width, height, highlightScalar, text, func) {
    super(x, y, width, height, text, func);
    this.highlightScalar = highlightScalar;
  }
  
  show() {
    if(this.isMouseOver()) {
      canvasContext.fillStyle = 'rgba(255, 255, 255, 0.1)';
    } else {
      canvasContext.fillStyle = 'rgba(0, 0, 0, 0)';
    }
    
    var additionLength = ( ( (this.width * this.highlightScalar) - this.width) / 2);
    var x = this.x - additionLength;
    var width = this.width + additionLength * 2;
    menuDisplayInterface.displayGameRect(true, x, this.y, width, this.height);
    this.showText();
  }
}