class Display_Interface {
  constructor(canvas, canvasContext) {
    this.canvas = canvas;
    this.canvasContext = canvasContext;
    this.gameDisplayPlane = "null";
    this.canvasFocusX = "null";
    this.canvasFocusY = "null";  
  }
  
  initializeGameDisplayPlane(gameWidth, gameHeight) {
    if(gameWidth < 0 || gameHeight < 0) {
      throw new Error('gameWidth and gameHeight cannot be negative for initializeGameDisplayPlane(gameWidth, gameHeight).')
    }
    
    this.gameDisplayPlane = new GameDisplayPlane(this.canvas, gameWidth, gameHeight);
  }
  
  updateGameDisplayPlane() {
    if(this.gameDisplayPlane == 0) {
      throw new Error("Game display plane not intialized.");
    }
    this.gameDisplayPlane.update();
  }
  
  createGameRect(x, y, width, height, doFill) {
    return new Rect(x, y, width, height, doFill, this.canvasContext);
  }
  
  /*
    Description
    Returns the canvasFocusX. The canvasFocusX IS NOT the gameDisplayPlane x coordinate
    game object being focused on.
  */
  getCanvasFocusX() {
    if(this.canvasFocusX == "null") {
      throw new Error("Canvas focus x not initialized.")
    } 
    return this.canvasFocusX;
  }
  
  /*
    Description
    Returns the canvasFocusX. The canvasFocusY IS NOT the gameDisplayPlane y coordinate
    game object being focused on.
  */
  getCanvasFocusY() {
    if(this.canvasFocusY == "null") {
      throw new Error("Canvas focus y not initialized.")
    } 
    return this.canvasFocusY;
  }
  
  /*
    Description
    Returns the gameDisplayPlane x coordinate equivalent of the canvasFocusX
  */
  getGameFocusX() {
    return this.canvasToGamePositionX(this.getCanvasFocusX());
  }
  /*
    Description
    Returns the gameDisplayPlane y coordinate equivalent of the canvasFocusY
  */
  getGameFocusY() {
    return this.canvasToGamePositionY(this.getCanvasFocusY());
  }
  
  /*
    Definition
    Converts a given x position assumed to be on the game display plane and converts 
    it to a corresponding x canvas position. (Canvas focus is assumed to correspond to
    the center of the canvas)
  */
  gameToCanvasPositionX(pointX) {
    if(this.gameDisplayPlane == "null") {
      throw new Error("Game display plane not initialized.");
    }
    if(this.canvasFocusX == "null") {
      throw new Error("Canvas focus x not initialized.")
    } 
	return pointX * this.gameDisplayPlane.widthPixels + this.canvasFocusX;
  }
  
  /*
    Definition
    Converts a given y position assumed to be on the game display plane and converts 
    it to a corresponding canvas y position. (Canvas focus is assumed to correspond to
    the center of the canvas)
  */
  gameToCanvasPositionY(pointY) {
    if(this.gameDisplayPlane == "null") {
      throw new Error("Game display plane not initialized.");
    }
    if(this.canvasFocusY == "null") {
      throw new Error("Canvas focus x not initialized.")
    } 
    return pointY * this.gameDisplayPlane.heightPixels + this.canvasFocusY;
  }
  
  /*
    Definition
    Converts a given x position assumend to correspond to an x position on the canvas
    (top left = 0, top right = canvas width), and converts it into the corresponding
    game plane position being displayed
  */
  canvasToGamePositionX(canvasPositionX) {
    if(this.gameDisplayPlane == "null") {
      throw new Error("Game display plane not initialized.");
    }
    if(this.canvasFocusY == "null") {
      throw new Error("Canvas focus x not initialized.")
    }
    return (canvasPositionX - this.canvasFocusX) / this.gameDisplayPlane.widthPixels;
  }
  
  /*
    Definition
    Converts a given y position assumend to correspond to an y position on the canvas
    (top left = 0, bottom left = canvas height), and converts it into the corresponding
    game plane position being displayed
  */
  canvasToGamePositionY(canvasPositionY) {
    if(this.gameDisplayPlane == "null") {
      throw new Error("Game display plane not initialized.");
    }
    if(this.canvasFocusY == "null") {
      throw new Error("Canvas focus x not initialized.")
    }
    
    return (canvasPositionY - this.canvasFocusY) / this.gameDisplayPlane.heightPixels;
  }
  
  gameToCanvasWidth(width) {
    if(this.gameDisplayPlane == "null") {
      throw new Error("Game display plane not initialized.");
    }
    return width * this.gameDisplayPlane.widthPixels;
  }

  gameToCanvasHeight(height) {
    if(this.gameDisplayPlane == "null") {
      throw new Error("Game display plane not initialized.");
    }
      return height * this.gameDisplayPlane.heightPixels;
  }
  
  canvasToGameWidth(width) {
    if(this.gameDisplayPlane == "null") {
      throw new Error("Game display plane not initialized.");
    }
      return width / this.gameDisplayPlane.heightPixels;
  }
  
  canvasToGameHeight(height) {
    if(this.gameDisplayPlane == "null") {
      throw new Error("Game display plane not initialized.");
    }
      return height / this.gameDisplayPlane.heightPixels;
  }
  
  /*
    Description
    The reference point to which other canvas objects are drawn with respect to. 
    
    Arguments
    x: A gameDisplayPlane x coordinate.
    y: A gameDisplayPlane y coordinate.
  */ 
  setCanvasFocus(x, y) {
    if(this.gameDisplayPlane == "null") {
      throw new Error("Game display plane not initialized.");
    }
    var centerX = this.canvas.width / 2;
    var centerY = this.canvas.height / 2;

    this.canvasFocusX = centerX - (x * this.gameDisplayPlane.widthPixels);
    this.canvasFocusY = centerY - (y * this.gameDisplayPlane.heightPixels);
  }
  
  isAngleBetweenTwoOtherAngles(angle1, angle2, angle3, debug) {
    var diff = this.differenceBetween2Angles(angle2, angle3, true, false);
    var boundedAngle1 = angle1 % (2 * Math.PI);
    var boundedAngle2 = angle2 % (2 * Math.PI);
    var boundedAngle3 = angle3 % (2 * Math.PI);
    var useNegative = false;

    if(boundedAngle1 < 0) { 
      boundedAngle1 = 2 * Math.PI + boundedAngle1;
    }

    if(boundedAngle2 < 0) { 
      boundedAngle2 = 2 * Math.PI + boundedAngle2;
    }

    if(boundedAngle3 < 0) { 
      boundedAngle3 = 2 * Math.PI + boundedAngle3;
    }

    if(boundedAngle2 <= boundedAngle3) {
      if(boundedAngle3 - boundedAngle2 > Math.PI) {
        useNegative = true;
      }

      if(useNegative == false && boundedAngle1 > boundedAngle2 && boundedAngle1 < boundedAngle2 + diff) {
        if(debug) {
          console.log("Difference: " + diff, "a1: " + boundedAngle1, "a2: " + boundedAngle2, "a3: " + boundedAngle3, 1)
        }
        return true;
      }
      //Since the two bounded angles are greater than half the circle (aka positive and greater than PI) 
      if(useNegative == true && (boundedAngle1 < boundedAngle2 || boundedAngle1 > boundedAngle3)) {
        if(debug) {
          console.log("Difference: " + diff, "a1: " + boundedAngle1, "a2: " + boundedAngle2, "a3: " + boundedAngle3, 1)
        }
        return true;
      }
    }

    if(boundedAngle3 < boundedAngle2) {
      if(boundedAngle2 - boundedAngle3 > Math.PI) {
        useNegative = true;
      }

      if(useNegative == false && boundedAngle1 > boundedAngle3 && boundedAngle1 < boundedAngle3 + diff) {
        if(debug) {
          console.log("Difference: " + diff, "a1: " + boundedAngle1, "a2: " + boundedAngle2, "a3: " + boundedAngle3, 1)
        }
        return true;
      }

      if(useNegative == true && (boundedAngle1 < boundedAngle3 || boundedAngle1 > boundedAngle2)) {
        if(debug) {
          console.log("Difference: " + diff, "a1: " + boundedAngle1, "a2: " + boundedAngle2, "a3: " + boundedAngle3, 1)
        }
        return true;
      }
    }

    return false;
  }
  
  
  /*
    Finds the smaller or larger difference between two angles, given in radians, after the two
    angles are constrained to the interval between 0 and 2 pi

    Variables
    - angle1 : The first angle in radians.
    - angle2 : The second angle in radians.
    - smallerAngleInterval : Boolean controlling whether the angle difference is the smaller
    interval(true) or the larger interval(false).
    - debug : Boolean controlling whether debug information is output to console.
  */
  differenceBetween2Angles(angle1, angle2, smallerAngleInterval, debug) {
    var boundedAngle1;
    var boundedAngle2;
    var difference;

    boundedAngle1 = angle1 % (2 * Math.PI);
    boundedAngle2 = angle2 % (2 * Math.PI);

    if(boundedAngle1 < 0) { 
      boundedAngle1 = 2 * Math.PI + boundedAngle1;
    }

    if(boundedAngle2 < 0) { 
      boundedAngle2 = 2 * Math.PI + boundedAngle2;
    }

    if(boundedAngle1 > boundedAngle2) {
      if(2 * Math.PI - boundedAngle1 + boundedAngle2 < boundedAngle1 - boundedAngle2) {
        difference = 2 * Math.PI - boundedAngle1 + boundedAngle2;   
      } else {
        difference = boundedAngle1 - boundedAngle2;
      }
    } else if (boundedAngle2 > boundedAngle1) {
      if(2 * Math.PI - boundedAngle2 + boundedAngle1 < boundedAngle2 - boundedAngle1) {
        difference = 2 * Math.PI - boundedAngle2 + boundedAngle1;   
      } else {
        difference = boundedAngle2 - boundedAngle1;
      }
    } else if (boundedAngle1 == boundedAngle2) {
      difference = 0;
    }

    if(debug) {
      console.log("Original Angle1: " + angle1);
      console.log("Original Angle2: " + angle2);
      console.log("Bounded(0 - 2pi) Angle1: " + boundedAngle1);
      console.log("Bounded(0 - 2pi) Angle2: " + boundedAngle2);
      console.log("Difference Between Angle1 and Angle2: " + difference);
    }

    if(smallerAngleInterval) {
      return difference;
    } else if (smallerAngleInterval == false) {
      return 2 * Math.PI - difference;
    }
  }
  
  /*
    Description
    Takes two given coordinates in x y format, and outputs the angle from the first coordinate to
    the second.

    Arguments
    x: The x component of the first coordinate
    y: The y component of the first coordinate
    x2: The x component of the second coordinate
    y2: The y component of the second coordinate
  */
  angleFromOneToTwo(x, y, x2, y2, debug) {
    var angle1To2;

    if(x <= x2) {
      angle1To2 = Math.atan((y2 - y) / (x2 - x));
    } else {
      angle1To2 = Math.atan((y2 - y) / (x2 - x)) + Math.PI;
    }

    return angle1To2;
  }
  
  pointIsVisible(x, y) {
    if(x < this.canvasToGamePositionX(0) || x > this.canvasToGamePositionX(this.canvas.width) || y < this.canvasToGamePositionY(0) || y > this.canvasToGamePositionY(this.canvas.height)) {
      return false;
    }
    return true;
  }
  
  lineIsVisible(x, y, x2, y2) {
    var helper;
    
    if(this.pointIsVisible(x, y) || this.pointIsVisible(x2, y2)) {
      //console.log("lineIsVisible:true - a point is in view.");
      return true;
    }
    
    if(x == x2 && y == y2) {
      //console.log("lineIsVisible:false - points are the same.");
      return false;
    }
       
    helper = function (display, x, y, x2, y2) {
      var dx = display.getGameFocusX();
      var dy = display.getGameFocusY();
      var dw = display.gameDisplayPlane.width;
      var dh = display.gameDisplayPlane.height;
      var dLeft = dx - (dw / 2);
      var dRight = dx + (dw / 2);
      var dTop = dy - (dh / 2);
      var dBottom = dy + (dh / 2);
      
      if(x2 < dLeft) {
        //console.log("lineIsVisible:false - x2 < dLeft.");
        return false;
      }
      
      if(x > dRight) {
        //console.log("lineIsVisible:false - x > dRight.")
        return false;
      }
      
      if(y < dTop && y2 < dTop) {
        //console.log("lineIsVisible:false - y & y2 < dTop.")
        return false;
      }
      
      if(y > dBottom && y2 > dBottom) {
        //console.log("lineIsVisible:false - y & y2 > dBottom.")
        return false;
      }
      
      var angleOneToTwo = display.angleFromOneToTwo(x, y, x2, y2, false);
      var angleOneToTopLeft = display.angleFromOneToTwo(x, y, dLeft, dTop, false);
      var angleOneToTopRight = display.angleFromOneToTwo(x,y, dRight, dTop, false);
      var angleOneToBottomLeft = display.angleFromOneToTwo(x, y, dRight, dBottom, false);
      var angleOneToBottomRight = display.angleFromOneToTwo(x, y, dLeft, dBottom, false);
      
      //console.log(x, y, x2, y2, dx, dy, dw, dh, dLeft, dRight, dTop, dBottom, angleOneToTwo, angleOneToTopLeft, angleOneToTopRight, angleOneToBottomLeft, angleOneToBottomRight);
      
      if(x > dLeft && y < dTop /*No need to test for right bounds as it would place line outside canvas*/) {
        //console.log("lineIsVisible:n/a - iABTOA1.")
        return display.isAngleBetweenTwoOtherAngles(angleOneToTwo, angleOneToTopLeft, angleOneToTopRight);
      }
      
      if(x <= dLeft && y < dTop) {
        //console.log("lineIsVisible:n/a - iABTOA2.")
        return display.isAngleBetweenTwoOtherAngles(angleOneToTwo, angleOneToTopRight, angleOneToBottomLeft);
      }
      
      if(x < dLeft && y >= dTop && y <= dBottom) {
        //console.log("lineIsVisible:n/a - iABTOA3.")
        return display.isAngleBetweenTwoOtherAngles(angleOneToTwo, angleOneToTopLeft, angleOneToBottomLeft);
      }
      
      if(x <= dLeft && y > dBottom) {
        //console.log("lineIsVisible:n/a - iABTOA4.")
        return display.isAngleBetweenTwoOtherAngles(angleOneToTwo, angleOneToTopLeft, angleOneToBottomRight);
      }
      
      if(x > dLeft && y > dBottom) {
        //console.log("lineIsVisible:n/a - iABTOA5.")
        return display.isAngleBetweenTwoOtherAngles(angleOneToTwo, angleOneToBottomLeft, angleOneToBottomRight);
      }
      
      //console.log("lineIsVisible:false - No catch.");
      return false;
    }
    
    if (x < x2) {
      return helper(this, x, y, x2, y2);
    } else if (x >= x2) {
      return helper(this, x2, y2, x, y);
    }
  }
  
  rectIsVisible(_x, _y, _width, _height) {
    var x = _x;
    var y = _y;
    var width = _width;
    var height = _height;
    
    if(width < 0) {
      x += width;
      width *= -1;
    }
    
    if(height < 0) {
      y += height;
      height *= -1;
    }
    
    if(x + width < this.canvasToGamePositionX(0) || x > this.canvasToGamePositionX(this.canvas.width) || y + height < this.canvasToGamePositionY(0) || y > this.canvasToGamePositionY(this.canvas.height)){
      return false;
    }
    return true;
  }
  
  arcIsVisible(x, y, radius) {
    if(x + radius < this.canvasToGamePositionX(0) || x - radius > this.canvasToGamePositionX(this.canvas.width) || y + radius < this.canvasToGamePositionY(0) || y - radius > this.canvasToGamePositionY(this.canvas.height)){
      return false;
    }
    return true;
  }
  
  /*
   * Overlays the canvas with a rectangle of the input rgb color 
   */
  background(r, g, b) {
      this.canvasContext.fillStyle = "rgba(" + r + "," + g + "," + b + ", 1)"; 
      this.canvasContext.fillRect(-1, -1, this.canvas.width + 2, this.canvas.height + 2);
      this.canvasContext.fill();
      this.canvasContext.closePath();
  }
  
  displayGameRect(doFill, x, y, width, height) {
    if(this.rectIsVisible(x, y , width, height) == false) {
      return 0;
    }
    
	if(doFill) {
		this.canvasContext.beginPath();
		this.canvasContext.fillRect(this.gameToCanvasPositionX(x), this.gameToCanvasPositionY(y), this.gameToCanvasWidth(width), this.gameToCanvasHeight(height));
		this.canvasContext.closePath();
		return 0;
	}

	this.canvasContext.beginPath();
	this.canvasContext.strokeRect(this.gameToCanvasPositionX(x), this.gameToCanvasPositionY(y), this.gameToCanvasWidth(width), this.gameToCanvasHeight(height));
	this.canvasContext.closePath();
	return 0;
  }

  displayGameLine(x1, y1, x2, y2) {
    if(this.lineIsVisible(x1, y1, x2, y2) == false) {
      return 0;
    }
    this.canvasContext.beginPath();
    this.canvasContext.moveTo(this.gameToCanvasPositionX(x1), this.gameToCanvasPositionY(y1));
    this.canvasContext.lineTo(this.gameToCanvasPositionX(x2), this.gameToCanvasPositionY(y2));
    this.canvasContext.stroke();
    this.canvasContext.closePath();
    return 0;
  }

  displayGameTriangle(x1, y1, x2, y2, x3, y3) {
    displayGameLine(x1, y1, x2, y2);
    displayGameLine(x2, y2, x3, y3);
    displayGameLine(x3, y3, x1, y1);
  }

  displayGameText(doFill, text, x, y) {
    var textWidth = this.canvasContext.measureText(text).width;
    var textHeight = this.canvasToGameHeight(parseFloat(this.canvasContext.font));
    if(this.rectIsVisible(x, y , textWidth, textHeight) == false) {
      return 0;
    }
    
    if(doFill) {
        this.canvasContext.beginPath();
        this.canvasContext.fillText(text, this.gameToCanvasPositionX(x), this.gameToCanvasPositionY(y));
        this.canvasContext.closePath();
        return 0;
    }

    this.canvasContext.beginPath();
    this.canvasContext.strokeText(text, this.gameToCanvasPositionX(x), this.gameToCanvasPositionY(y));
    this.canvasContext.closePath();
    return 0;
  }
  
  doSmoothing(booleanInput) {
    this.canvasContext.imageSmoothingEnabled = booleanInput;
  }
  
  displayGameImageFull(image, x, y, width, height) {
    if(this.rectIsVisible(x, y, width, height) == false) {
      return 0;
    }
    
    this.canvasContext.drawImage(image, this.gameToCanvasPositionX(x), this.gameToCanvasPositionY(y), this.gameToCanvasWidth(width), this.gameToCanvasHeight(height));
    return 0;
  }

  displayGameImagePartial(image, sX, sY, sWidth, sHeight, x, y, width, height) {
    if(this.rectIsVisible(x, y, width, height) == false) {
      return 0;
    }
    this.canvasContext.drawImage(image, sX, sY, sWidth, sHeight, this.gameToCanvasPositionX(x), this.gameToCanvasPositionY(y), this.gameToCanvasWidth(width), this.gameToCanvasHeight(height));
    return 0;
  }
  
  displayGameArc(doFill, x, y, radius, startRadian, endRadian, counterClockwise) {
    if(this.arcIsVisible(x, y, radius) == false) {
      return 0;
    }
    
    if(doFill) {
        this.canvasContext.beginPath();
        this.canvasContext.arc(this.gameToCanvasPositionX(x), this.gameToCanvasPositionY(y), this.gameToCanvasWidth(radius), startRadian, endRadian, counterClockwise);
        this.canvasContext.fill();
        this.canvasContext.closePath();
        return 0;
    }

    this.canvasContext.beginPath();
    this.canvasContext.arc(this.gameToCanvasPositionX(x), this.gameToCanvasPositionY(y), this.gameToCanvasWidth(radius), startRadian, endRadian, counterClockwise);
    this.canvasContext.stroke();
    this.canvasContext.closePath();
    return 0;
  }
  
  
  rotationBegin(x, y, angle) {
    this.canvasContext.save();
    this.canvasContext.translate(this.gameToCanvasPositionX(x), this.gameToCanvasPositionY(y));
    this.canvasContext.rotate(angle);
  }
  
  rotationClose() {
    this.canvasContext.restore();
  }
  
  /*
    Description
    
    Variables
    pointAboutRotationX  The x coordinate of the point about which the rectangle 
    should be rotated. It's position is in reference to the upper left corner of 
    the rectangle
    
    pointAboutRotationY  The y coordinate of the point about which the rectangle 
    should be rotated. It's position is in reference to the upper left corner of 
    the rectangle
  */
  displayRotateGameRect(doFill, x, y, width, height, pointAboutRotationX, pointAboutRotationY, angle) {
    var gamePointAboutRotationX = this.gameToCanvasWidth(pointAboutRotationX);
    var gamePointAboutRotationY = this.gameToCanvasHeight(pointAboutRotationY);
    this.rotationBegin(x, y, angle);
    var displayGameRect = function(display, doFill, x, y, width, height) {
      if(doFill) {
          display.canvasContext.beginPath();
          display.canvasContext.fillRect(display.gameToCanvasPositionX(x), display.gameToCanvasPositionY(y), display.gameToCanvasWidth(width), display.gameToCanvasHeight(height));
          display.canvasContext.closePath();
          return 0;
      }

      display.canvasContext.beginPath();
      display.canvasContext.strokeRect(display.gameToCanvasPositionX(x), display.gameToCanvasPositionY(y), display.gameToCanvasWidth(width), display.gameToCanvasHeight(height));
      display.canvasContext.closePath();
      return 0;
    }(this, doFill, this.canvasToGamePositionX(0 - gamePointAboutRotationX), this.canvasToGamePositionY(0 - gamePointAboutRotationY), width, height);
    this.rotationClose();
  }
  
  displayRotateGameImageFull(image, x, y, width, height, pointAboutRotationX, pointAboutRotationY, angle) {
    var gamePointAboutRotationX = this.gameToCanvasWidth(pointAboutRotationX);
    var gamePointAboutRotationY = this.gameToCanvasHeight(pointAboutRotationY);
    this.rotationBegin(x, y, angle);
    var displayGameImageFull = function(display, image, x, y, width, height) {
      display.canvasContext.drawImage(image, display.gameToCanvasPositionX(x), display.gameToCanvasPositionY(y), display.gameToCanvasWidth(width), display.gameToCanvasHeight(height));
      return 0;
    }(this, image, this.canvasToGamePositionX(0-gamePointAboutRotationX), this.canvasToGamePositionY(0 - gamePointAboutRotationY), width, height);
    this.rotationClose();
  }
  
  displayRotateGameText(doFill, text, x, y, pointAboutRotationX, pointAboutRotationY, angle) {
    var gamePointAboutRotationX = this.gameToCanvasWidth(pointAboutRotationX);
    var gamePointAboutRotationY = this.gameToCanvasHeight(pointAboutRotationY);
    this.rotationBegin(x, y, angle);
    
    var displayGameText = function(display, doFill, text, x, y) {
      if(doFill) {
        display.canvasContext.beginPath();
        display.canvasContext.fillText(text, display.gameToCanvasPositionX(x), display.gameToCanvasPositionY(y));
        display.canvasContext.closePath();
        return 0;
      }

      display.canvasContext.beginPath();
      display.canvasContext.strokeText(text, display.gameToCanvasPositionX(x), display.gameToCanvasPositionY(y));
      display.canvasContext.closePath();
      return 0;
    }(this, doFill, text, this.canvasToGamePositionX(0-gamePointAboutRotationX), this.canvasToGamePositionY(0 - gamePointAboutRotationY));
    
    this.rotationClose();
  }
}

class GameDisplayPlane {
    constructor(canvas, gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.canvas = canvas;
        this.width  = this.gameWidth;
        this.height = this.gameHeight;
        /*
        Aspect ratio division used to define number of game 'pixels'
        for the canvas to display, essentially subdividing the canvas
        to provide a grid for displaying gaphics separate from the
        actual pixels and pixel size of the canvas
        */
        this.widthPixels = this.canvas.width / this.gameWidth;
        this.heightPixels = this.canvas.height / this.gameHeight; 
    }

    update() {
        this.widthPixels = this.canvas.width / this.gameWidth;
        this.heightPixels = this.canvas.height / this.gameHeight;
        this.width = this.gameWidth;
        this.height = this.gameHeight;
    }
  
    zoom(factor) {
      this.gameWidth *= factor;
      this.gameHeight *= factor;
    }
}

class Rect {
  constructor(x, y, width, height, doFill, canvasContext) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.doFill = doFill;
    this.canvasContext = canvasContext;
  }
  
  show(x, y, width, height) {
    displayGameRect(this.canvasContext, doFill, x, y, width, height);
  }
}