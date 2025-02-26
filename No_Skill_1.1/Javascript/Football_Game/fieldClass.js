class Field {
  constructor() {
    this.x = -1600;
    this.y = 900;
    this.prevY = this.y;
    this.stripeHeight = 900;
    this.distInterval = 0;
    this.lightStripe = false;
    this.fieldStripes = [];
    this.distanceMarkers = [];
  }
  
  initializeStripes() {
    var initialStripeNum = fBGDisplayInterface.gameDisplayPlane.height / this.stripeHeight;
    for(var i = 0; i < initialStripeNum; i++) {
      this.createStripe();
    }
  }
  
  createStripe() {
    this.distInterval++;
    this.lightStripe = !this.lightStripe;
    
    if(this.lightStripe) {
      this.fieldStripes.push(new LightFieldStripe(this.x, this.stripeHeight * (this.distInterval), 3200, this.stripeHeight));
      return 0;
    }  
    this.distanceMarkers.push(new DistanceMarker(this.x, this.stripeHeight * (this.distInterval), this.distInterval * 5));
    this.fieldStripes.push(new DarkFieldStripe(this.x, this.stripeHeight * (this.distInterval), 3200, this.stripeHeight));
    return 0;
  }
  
  continuousFieldStripes() {
    if((this.y - (this.stripeHeight / 2)) % this.stripeHeight <= (this.prevY - (this.stripeHeight / 2)) % this.stripeHeight) {
      this.createStripe();
      while(this.fieldStripes.length > Math.round(fBGDisplayInterface.gameDisplayPlane.height / this.stripeHeight) + 2) {
        this.fieldStripes.splice(0, 1);
      }
      //console.log(this.fieldStripes.length);
    }
  }
  
  show() {
    for(var stripe of this.fieldStripes) {
      stripe.show(this.y);
    }
    
    for(var distanceMark of this.distanceMarkers) {
      distanceMark.show(this.y, this.stripeHeight);
    }
  }
  
  movement() {
    this.prevY = this.y;
    this.y += 10 * player.football.getTotalSpeed();
  }
}

class FieldStripe {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = 'rgba(0, 0, 0, 1)';
  }
  
  show(fieldY) {
    
    canvasContext.fillStyle = this.color;
    fBGDisplayInterface.displayGameRect(true, this.x, fieldY - this.y, this.width, this.height);
    canvasContext.fillStyle = 'rgba(200, 200, 200, 1)';
    //5 yard marker halves
    fBGDisplayInterface.displayGameRect(true, this.x, fieldY - this.y, this.width, this.height / 80);
    fBGDisplayInterface.displayGameRect(true, this.x, fieldY - this.y + (this.height - (this.height / 80) + 2), this.width, this.height / 80);
    
    //Yard marker variables
    var distanceBetweenYardMarkers = this.height / 5;
    var heightOfYardMarker = this.height / 40;
    var widthOfYardMarker = this.width / 20;
    
    //left side yard markers
    fBGDisplayInterface.displayGameRect(true,this.x, fieldY - this.y + (distanceBetweenYardMarkers - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    fBGDisplayInterface.displayGameRect(true,this.x, fieldY - this.y + (distanceBetweenYardMarkers * 2 - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    fBGDisplayInterface.displayGameRect(true,this.x, fieldY - this.y + (distanceBetweenYardMarkers * 3 - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    fBGDisplayInterface.displayGameRect(true,this.x, fieldY - this.y + (distanceBetweenYardMarkers * 4 - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    
    fBGDisplayInterface.displayGameRect(true,this.x + fBGDisplayInterface.gameDisplayPlane.width / 3, fieldY - this.y + (distanceBetweenYardMarkers - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    fBGDisplayInterface.displayGameRect(true,this.x + fBGDisplayInterface.gameDisplayPlane.width / 3, fieldY - this.y + (distanceBetweenYardMarkers * 2 - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    fBGDisplayInterface.displayGameRect(true,this.x + fBGDisplayInterface.gameDisplayPlane.width / 3, fieldY - this.y + (distanceBetweenYardMarkers * 3 - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    fBGDisplayInterface.displayGameRect(true,this.x + fBGDisplayInterface.gameDisplayPlane.width / 3, fieldY - this.y + (distanceBetweenYardMarkers * 4 - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    
    fBGDisplayInterface.displayGameRect(true,this.x + fBGDisplayInterface.gameDisplayPlane.width * (2 / 3), fieldY - this.y + (distanceBetweenYardMarkers - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    fBGDisplayInterface.displayGameRect(true,this.x + fBGDisplayInterface.gameDisplayPlane.width * (2 / 3), fieldY - this.y + (distanceBetweenYardMarkers * 2 - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    fBGDisplayInterface.displayGameRect(true,this.x + fBGDisplayInterface.gameDisplayPlane.width * (2 / 3), fieldY - this.y + (distanceBetweenYardMarkers * 3 - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    fBGDisplayInterface.displayGameRect(true,this.x + fBGDisplayInterface.gameDisplayPlane.width * (2 / 3), fieldY - this.y + (distanceBetweenYardMarkers * 4 - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    //right side yard markers
    fBGDisplayInterface.displayGameRect(true,this.x + (this.width - widthOfYardMarker), fieldY - this.y + (distanceBetweenYardMarkers - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    fBGDisplayInterface.displayGameRect(true,this.x + (this.width - widthOfYardMarker), fieldY - this.y + (distanceBetweenYardMarkers * 2 - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    fBGDisplayInterface.displayGameRect(true,this.x + (this.width - widthOfYardMarker), fieldY - this.y + (distanceBetweenYardMarkers * 3 - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
    fBGDisplayInterface.displayGameRect(true,this.x + (this.width - widthOfYardMarker), fieldY - this.y + (distanceBetweenYardMarkers * 4 - heightOfYardMarker / 2), widthOfYardMarker, heightOfYardMarker);
  }
}

class LightFieldStripe extends FieldStripe {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.color = 'rgba(90, 170, 18, 1)';
  }
}

class DarkFieldStripe extends FieldStripe {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.color = 'rgba(60, 125, 15, 1)';
  }
}

class DistanceMarker {
  constructor(x, y, distance) {
    this.x = x;
    this.y = y;
    this.distance = distance;
  }
  
  show(fieldY, stripeHeight) {
    var textFull = "" + this.distance;
    var splitText = function(textFull) {
      var length = textFull.length;
      var splitIndex = Math.round(length / 2 - 0.1);
      return [textFull.substr(0, splitIndex), textFull.substr(splitIndex, length - 1)];
    }(textFull);
    
    var firstHalf = splitText[0];
    var secondHalf = splitText[1];
    var shrinkTextToFit = 0.67;
    var arialFontToHeightRatio = 0.73 * shrinkTextToFit;
    var startRectCanvasHeight = menuDisplayInterface.gameToCanvasHeight(200 * shrinkTextToFit);
    var inverseAFHR = 1 - arialFontToHeightRatio;
    canvasContext.font = startRectCanvasHeight + "px Arial";
    var firstMetrics = canvasContext.measureText(firstHalf);
    var secondMetrics = canvasContext.measureText(secondHalf);
    var firstWidth = fBGDisplayInterface.canvasToGameWidth(firstMetrics.width);
    var secondWidth = fBGDisplayInterface.canvasToGameWidth(secondMetrics.width);
    
    canvasContext.fillStyle = 'rgba(200, 200, 200, 1)';
    //fBGDisplayInterface.displayGameRect(true, this.x, fieldY-this.y, 250, 250);
    fBGDisplayInterface.displayRotateGameText(true, firstHalf, this.x, fieldY - this.y, (stripeHeight / 80) + firstWidth, 400, Math.PI / 2);
    fBGDisplayInterface.displayRotateGameText(true, secondHalf, this.x, fieldY - this.y, -(stripeHeight / 80), 400, Math.PI / 2);
    
    fBGDisplayInterface.displayRotateGameText(true, firstHalf, this.x + fBGDisplayInterface.gameDisplayPlane.width, fieldY - this.y, (stripeHeight / 80) + firstWidth, 400, Math.PI * 3 / 2);
    fBGDisplayInterface.displayRotateGameText(true, secondHalf, this.x + fBGDisplayInterface.gameDisplayPlane.width, fieldY - this.y, -(stripeHeight / 80), 400, Math.PI *  3 / 2);
  }
}