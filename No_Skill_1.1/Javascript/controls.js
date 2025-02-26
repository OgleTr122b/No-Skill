class Inputs {
  constructor() {
    this.space = new AssociatedKeys(32); // All keys that will register as space
    this.forward = new AssociatedKeys(87, 38); //All keys that will register as forward
    this.backward = new AssociatedKeys(83, 40); //All keys that will register as backward
    this.left = new AssociatedKeys(65,37); //All keys that will register as left
    this.right = new AssociatedKeys(68, 39); //All keys that will register as right
    this.p = new AssociatedKeys(80);
    this.e = new AssociatedKeys(69);
  }
  
  getAssociation(key) {
    if(this.forward.isApart(key)) {
      return this.forward;
    }
    
    if(this.backward.isApart(key)) {
      return this.backward;
    }
    
    if(this.left.isApart(key)) {
      return this.left;
    }
    
    if(this.right.isApart(key)) {
      return this.right;
    }
    
    if(this.p.isApart(key)) {
      return this.p;
    }
    
    if(this.e.isApart(key)) {
      return this.e;
    }
      
    return false;
  }
}

class AssociatedKeys {
  constructor(...args) {
    this.associatedKeys = args;
  }
  
  isDown() {
    for(var key of this.associatedKeys) {
      if(isKeyDown(key)) {
        return true;
      }
    }
    return false;
  }
  
  isClicked() {
    for(var key of this.associatedKeys) {
      if(isKeyClicked(key)) {
        return true;
      }
    }
    return false;
  }
  
  isApart(key) {
    for(var _key of this.associatedKeys) {
      if(key == _key) {
        return true;
      }
    }
    return false;
  }
}

function addKeyFunctionality() {
  document.addEventListener('keydown', function(event) {
    var key = event.keyCode;
    var foundClicked = false;
    var foundDown = false;
    
    for(var clickedKey of clickedKeys) {
      if(clickedKey == key) {
        found = true;
      }  
    }
    
    for(var downKey of downKeys) {
      if(downKey == key) {
        foundDown = true;
      }
    }
    
    if(foundDown == false) {
      downKeys.push(key);
    }
    
    if(foundDown == false && foundClicked == false ) {
      clickedKeys.push(key);
    }      
  });
  
  document.addEventListener('keyup', function(event) {
    var key = event.keyCode;
    
    for(var i = downKeys.length - 1; i > -1 ; i--) {
      if(downKeys[i] == key) {
        downKeys.splice(i, 1);
      }
    }
  });
}

function addMouseFunctionality() {
  document.addEventListener('mousemove', function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    mouseCanvasX = event.clientX - canvas.getClientRects()[0].left;
    mouseCanvasY = event.clientY - canvas.getClientRects()[0].top;
  });
  
  document.addEventListener('mousedown', function (event) {
    mouseDown = true;
    mouseClick = true;
    mouseButton = event.button;
  });
  
  document.addEventListener('mouseup', function (event) {
    mouseDown = false;
  });
}


function isKeyDown(key) {
  for(var downKey of downKeys) {
    if(downKey == key) {
       return true;
    }
  }
  return false;
}

function isKeyClicked(key) {
  for(var clickedKey of clickedKeys) {
    if(clickedKey == key) {
       return true;
    }
  }
  return false;
}

function emptyClickedKeys() {
  clickedKeys = [];
}

function resetMouseClick() {
  mouseClick = false;
}

function reupdateDownKeys() {
    
}
