class Execution {
  constructor(...funcs) {
    this.step = 0;
    this.list = [];
    for(var func of funcs) {
      this.list.push(func);
    }
    this.complete = false;
  }
  
  execute() {
    if(this.step < this.list.length) {
      if(this.list[this.step]()) {
        this.step++;
      }
      return 0;
    }
    
    this.complete = true;
    return 0;
  }
}

var initiate = new Execution(function(){
    wait = true;
    initializeImageStorage();
    loadMap("Overworld/Maps/Full_Map_Test");
    return true;
  },
  function() {
    if(wait == false) {
      return true;
    }
    return false;
  },
  new Function("setup(); return true;")
);

function execute() {
  initiate.execute();
  
  if(initiate.complete == false) {
    setTimeout(execute, 10);
  }
}

function setup() {
  setupPage();
  setupControls();
  setupDisplayInterfaces();
  initializeFootball();
  player = new Player(0, 0, 100, 100);
  initializeMenus();
  initiailizeTileHandler();
  
  updateLoop();// Should remain as last in setup
}

function updateLoop() {
  //Time object used to track time
  var time;
  //Time of start in milliseconds
  var startTime
  //Time of end in milliseconds
  var endTime;
  //Difference between start and end time
  var duration;
  //How long to delay the next update to maintain updateRate
  var delayToNextUpdate;
  
  if(wait) {
    console.log("loading");
    clearTimeout();
    setTimeout(updateLoop, 3);
  }
  
  time = new Date();
  startTime = time.getTime();
  update();
  endTime = time.getTime();
  duration = endTime - startTime;
  delayToNextUpdate = (1000 / TargetUpdatesPerSecond) - duration;
  if(delayToNextUpdate > 0) {
    setTimeout(updateLoop, delayToNextUpdate);
  } else {
    setTimeout(updateLoop, 0);
  }
}

function update() {
  updateEngine();
  updateDraw();
  emptyClickedKeys();
  resetMouseClick();
  canvasResizing = false;
}

function setupPage() {
  body = document.getElementsByTagName('body')[0];
  canvas = document.createElement('canvas');
  canvasContext = canvas.getContext('2d');
  body.appendChild(canvas);
  
  var canvasDimensions = function() {
    var windowAreaRatio = (window.innerWidth) / (window.innerHeight);
	if(windowAreaRatio > (16 / 9)) {
      canvas.width = Math.round((window.innerHeight / 9) * 16) - 20;
	  canvas.height = window.innerHeight - 20;
	} else if(windowAreaRatio < (16 / 9)) {
	  canvas.width = window.innerWidth - 20;
	  canvas.height = Math.round((window.innerWidth / 16) * 9) - 20;
	} else if(windowAreaRatio == (16 / 9)) {
	  canvas.width = window.innerWidth - 20;
	  canvas.height = window.innerHeight - 20;
	}
  };
  
  canvasDimensions();
  body.onresize = function() {
    canvasDimensions();
    canvasResizing = true;
  };
  body.style = "text-align:center";
  canvas.style = "display:inline; background-color:black; border-color:white; border-width:1px;border-style:solid; border-radius:20px;";
  canvas.onclick = function() {
    if(exitClicked == false) {
       return 0;
    }
    
    exitClicked = false;
    
    if(confirm("Open feedback form?")) {
      open("https://docs.google.com/forms/d/17gAAuGLoE8ANAmgvINclbpSs6rqhKp3YXekE4Hayo8g/edit?pli=1");
    }
    
    return 0;
  };
}

function setupDisplayInterfaces() {
  displayInterface = new Display_Interface(canvas, canvasContext);
  displayInterface.initializeGameDisplayPlane(3200, 1800);
  displayInterface.setCanvasFocus(0,0);
  
  menuDisplayInterface = new Display_Interface(canvas, canvasContext);
  menuDisplayInterface.initializeGameDisplayPlane(3200, 1800);
  menuDisplayInterface.setCanvasFocus(0,0);
  
  
  fBGDisplayInterface = new Display_Interface(canvas, canvasContext);
  fBGDisplayInterface.initializeGameDisplayPlane(3200, 1800);
  fBGDisplayInterface.setCanvasFocus(0,0);
  
  overlayDisplayInterface = new Display_Interface(canvas, canvasContext);
  overlayDisplayInterface.initializeGameDisplayPlane(3200, 1800);
  overlayDisplayInterface.setCanvasFocus(0,0);
}
/*
  Description
  
*/
function setupControls() {
  downKeys = [];
  clickedKeys = [];
  addKeyFunctionality();
  addMouseFunctionality();
  inputManager = new Inputs();
}

function initiailizeTileHandler() {
  map = new TileHandler(tileInterval);
  convertMapJsonParseToMap(map);
}