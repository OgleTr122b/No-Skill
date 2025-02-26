class Field_Indicator {
  constructor(image, x, y, width, height) {
    this.image = image;
    this.visualX = x;
    this.visualY = y;
    this.initialY = y;
    this.initialFieldY = field.y;
    this.yFieldDrag = field.y - this.initialFieldY;
    this.width = width;
    this.height = height;
  }
  
  show(){
    this.yFieldDrag = field.y - this.initialFieldY;
    this.visualY = this.initialY + this.yFieldDrag;
    
    fBGDisplayInterface.displayGameImageFull(this.image, this.visualX, this.visualY, this.width, this.height);
    
  }
  
  update(){}
  
  isVisible() {
    if(fBGDisplayInterface.rectIsVisible(this.visualX, this.visualY, this.width, this.height)) {
      return true;
    }
    
    return false;
  }
}

class Ankle_Broken extends Field_Indicator {
  constructor(x, y) {
    var size = 160;
    super(imageStorage.getImage("broken_bone"), x - (size / 2), y - (size / 2), size, size);
    this.opacity = 1;
  }
  
  show() {
    fBGDisplayInterface.canvasContext.globalAlpha = this.opacity;
    fBGDisplayInterface.doSmoothing(false);
    super.show();
    var shrinkTextToFit = 0.67;
    var startRectCanvasHeight = fBGDisplayInterface.gameToCanvasHeight((this.height / 1.5) * shrinkTextToFit);
    
    fBGDisplayInterface.canvasContext.fillStyle = "rgba(0, 50, 0, 1)";
    fBGDisplayInterface.canvasContext.font = startRectCanvasHeight + "px Arial";
    fBGDisplayInterface.displayGameText(true, "$", this.visualX + this.height / 4 , this.visualY)
    
    fBGDisplayInterface.doSmoothing(true);
    fBGDisplayInterface.canvasContext.globalAlpha = 1;
  }
  
  update() {
    if(this.opacity > 0) {
      this.opacity -= 1 / (TargetUpdatesPerSecond * 1);
    }
    
    if(this.opacity < 0) {
      this.opacity = 0;
    }
  }
}