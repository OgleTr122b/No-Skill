function drawOverworld() {
  var focusX;
  var focusY;

  displayInterface.background(0,215,235)
  player.overworld.updateSlide();

  focusX = player.overworld.slideX;
  focusY = player.overworld.slideY;

  if(focusY > -1  && focusY < 4 && focusX > -12 && focusX < 30) {
    if(focusX < 4) {
      focusX = 4;
    } else if (focusX > 13) {
      focusX = 13;
    }

    if(focusY > 1) {
      focusY = 1;
    }
  }

  displayInterface.setCanvasFocus(focusX * tileInterval + tileInterval / 2, focusY * tileInterval + tileInterval / 2);

  map.showTiles();

  canvasContext.imageSmoothingEnabled = false;
  mapOverlay();
  
  drawPeople();
  
  player.overworld.show();
  canvasContext.imageSmoothingEnabled = true;
}

function mapOverlay() {
  var guideX = (-(14/16) - 11) * tileInterval;
  var guideY = (-(6/16) - 12) * tileInterval;
  var guideWidth = (670 / 16) * tileInterval;
  var guideHeight = (374 / 16) * tileInterval;
  
  var guide2X = -11 * tileInterval;
  var guide2Y = 100 * tileInterval;
  var guide2Width = (864 / 16) * tileInterval * 2;
  var guide2Height = (576 / 16) * tileInterval * 2;
  
  displayInterface.displayGameImageFull(imageStorage.getImage("homeBlock"), guideX, guideY, guideWidth, guideHeight);
  displayInterface.displayGameImageFull(imageStorage.getImage("stadium"), guide2X, guide2Y, guide2Width, guide2Height);
}

function drawPeople() {
  var width = 1.4
  var height = 1.8
  var worldWidth = width * tileInterval;
  var worldHeight = height * tileInterval;
  var tileX = 20 * tileInterval
  var tileY = 1 * tileInterval
  var x = tileX - worldWidth / 2 + tileInterval / 2;
  var y = tileY - worldHeight + tileInterval * (3/4);
  displayInterface.displayGameImageFull(imageStorage.getImage("strongMan"), x, y, worldWidth, worldHeight)
}