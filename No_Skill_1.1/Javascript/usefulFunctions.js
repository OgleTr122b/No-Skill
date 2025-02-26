/*
  Description
  Returns the exponent necessary to raise x to, in order to get y
  
  Arguments
  
  Gotten from: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/log
*/
function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}

/*
  Descritption
  Returns the whether the first angle is bewtween the next 2 given angles
  
  Arguments
  (number) angle1 : The angle of interest
  (number) angle2 : The first angle in the interval of interest
  (number) angle3 : The second angle in the interval of interest
  (boolean) debug : Whether the method will log useful information to the console
*/
function isAngleBetweenTwoOtherAngles(angle1, angle2, angle3, debug) {
  var diff = differenceBetween2Angles(angle2, angle3, true, false);
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
function differenceBetween2Angles(angle1, angle2, smallerAngleInterval, debug) {
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
Uses the posisitions of the two objects to produce a line from the given positions of each object, the length of the given their respective scalers, in the  direction of the other object

Variables
x = The x position of the first shape
y = The y position of the second shape
scaler1 = The scaler of the first object's line
x2 = The x position of the second shape 
y2 = The y position of the second shape
scaler2 = The scaler of the second object's line
*/
function correctDirectionLine(x, y, x2, y2, scaler1, scaler2, debug) {
  var angle1To2;
  var angle2To1;
  var _x;
  var _y;
  var _x2;
  var _y2;
  
  if(x <= x2) {
    angle1To2 = Math.atan((y2 - y) / (x2 - x));
  } else {
    angle1To2 = Math.atan((y2 - y) / (x2 - x)) + Math.PI;
  }
  
  angle2To1 = angle1To2 + Math.PI;
  
  _x = x + Math.cos(angle1To2) * scaler1;
  _y = y + Math.sin(angle1To2) * scaler1;
  _x2 = x2 + Math.cos(angle2To1) * scaler2;
  _y2 = y2 + Math.sin(angle2To1) * scaler2;
  
  var lines = [[x, y, _x, _y], [x2, y2, _x2, _y2]];
  
  if(debug) {
    console.log("a1-2: " + angle1To2);
    console.log("a2-1: " + angle2To1);
    console.log("cos(a2-1): " + Math.cos(angle2To1));
    console.log("sin(a2-1): " + Math.sin(angle2To1));
    console.log("cos(a1-2): " + Math.cos(angle1To2));
    console.log("sin(a1-2): " + Math.sin(angle1To2));
    console.log("lines: " + lines);
  }
  
  return lines;
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
function angleFromOneToTwo(x, y, x2, y2, debug) {
  var angle1To2;
  
  if(x <= x2) {
    angle1To2 = Math.atan((y2 - y) / (x2 - x));
  } else {
    angle1To2 = Math.atan((y2 - y) / (x2 - x)) + Math.PI;
  }
  
  return angle1To2;
}

/*
Description
Uses the posisitions and radii of two objects to remove them from intersection if they are overlapping

Variables
x = The x position of the first shape
y = The y position of the second shape
r = The radius of the first object
x2 = The x position of the second shape 
y2 = The y position of the second shape
r2 = The radius of the second   sa object
*/
function removeFromIntersectionStatic(x, y, r, x2, y2, r2, debug) {
  var angle1To2 = Math.atan((y2 - y) / (x2 - x));
  var d = Math.sqrt((x2 - x) ** 2 + (y2 - y) ** 2);
  var oL = (r + r2) - d;//Overlap length
  var lines = oppositeDirectionLine(x, y, x2, y2, oL / 2, oL / 2, debug);
  if(debug) {
    console.log("removeFromIntersectionStatic")
    console.log((x - (oL / 2) * Math.cos(angle1To2)));
    console.log((y - (oL / 2) * Math.sin(angle1To2)));
    console.log((x2 + (oL / 2) * Math.cos(angle1To2)));
    console.log((y2 + (oL / 2) * Math.sin(angle1To2)));
    console.log("angle: " + angle1To2);
    console.log("Distance before split: " + d)
  }
  //var _x = (x - (oL / 2) * cos(angle1To2));
  //var _y = (y - (oL / 2) * sin(angle1To2));
  //var _x2 = (x2 + (oL / 2) * cos(angle1To2));
  //var _y2 = (y2 + (oL / 2) * sin(angle1To2));
  
  var _x = lines[0][2];
  var _y = lines[0][3];
  var _x2 = lines[1][2];
  var _y2 = lines[1][3];
  
  var newPositions = [_x, _y, _x2, _y2];
  
  return newPositions;
}

/*
Description
Uses the posisitions of the two objects to produce a line from the given positions of each object, the length of the given their respective scalers, in the opposite direction of the other object

Variables
x = The x position of the first shape
y = The y position of the second shape
scaler1 = The scaler of the first object's line
x2 = The x position of the second shape 
y2 = The y position of the second shape
scaler2 = The scaler of the second object's line
*/
function oppositeDirectionLine(x, y, x2, y2,scaler1, scaler2, debug) {
  var angle1To2 = Math.atan((y2 - y) / (x2 - x));
  var angle2To1 = angle1To2 + Math.PI;
  var _x;
  var _y;
  var _x2;
  var _y2;
  
  if(x <= x2) {
    _x = x + Math.cos(angle2To1) * scaler1;
    _y = y + Math.sin(angle2To1) * scaler1;
    _x2 = x2 + Math.cos(angle1To2) * scaler2;
    _y2 = y2 + Math.sin(angle1To2) * scaler2;
  } else {
    _x = x - Math.cos(angle2To1) * scaler1;
    _y = y - Math.sin(angle2To1) * scaler1;
    _x2 = x2 - Math.cos(angle1To2) * scaler2;
    _y2 = y2 - Math.sin(angle1To2) * scaler2;
  }
  
  var lines = [[x, y, _x, _y], [x2, y2, _x2, _y2]];
  
  if(debug) {
    console.log("oppositeDirectionLine")
    console.log("a1-2: " + angle1To2);
    console.log("a2-1: " + angle2To1);
    console.log("cos(a2-1): " + cos(angle2To1));
    console.log("sin(a2-1): " + sin(angle2To1));
    console.log("cos(a1-2): " + cos(angle1To2));
    console.log("sin(a1-2): " + sin(angle1To2));
    console.log("lines: " + lines);
  }
  
  return lines;
}

function correctDirectionAngle(x, y, x2, y2) {
  var angle1To2;
  var angle2To1;
  
  if(x <= x2) {
    angle1To2 = Math.atan((y2 - y) / (x2 - x));
  } else {
    angle1To2 = Math.atan((y2 - y) / (x2 - x)) + Math.PI;
  }
  
  angle2To1 = angle1To2 + Math.PI;
  
  return [angle1To2, angle2To1];
}