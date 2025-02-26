class TileHandler {
  constructor(tileInterval) {
    this.tiles = []
    this.backgroundTiles = [];
    this.physicalTiles = [];
    this.specialTiles = [];
    this.tileInterval = tileInterval;
  }
  
  showTiles() {
    for(var tile of this.tiles) {
      tile.show(this.tileInterval);
    }
    
    for(var backTile of this.backgroundTiles) {
      backTile.show(this.tileInterval);
    }

    for(var physTile of this.physicalTiles) {
      physTile.show(this.tileInterval);
    }

    for(var specTile of this.specialTiles) {
      specTile.show(this.tileInterval);
    }
  }
  
  createTile(image, x, y) {
    this.tiles.push(new Tile(image, x, y));
  }
  
  createBackgroundTile(image, x, y) {
    this.backgroundTiles.push(new BackgroundTile(image, x, y));
  }
  
  createPhysicalTile(image, x, y) {
    this.physicalTiles.push(new PhysicalTile(image, x, y));
  }
  
  createSpecialTile(image, x, y, func){
    this.specialTiles.push(new SpecialTile(image, x, y, func));
  }
  
  isEmpty() {
    var tile;
    
    for(tile of this.tiles) {
      return false;
    }
    
    for(tile of this.backgroundTiles) {
      return false;
    }
    
    for(tile of this.physicalTiles) {
      return false;
    }
    
    for(tile of this.specialTiles) {
      return false;
    }
    return true;
  }
}

class Tile {
  constructor(image, x, y) {
    this.tileType = "tile";
    this.tileImage = image;
    this.x = x;
    this.y = y;  
  }
  
  show(interval) {
    if(this.tileImage == "default") {
      if(this.tileType == "tile") {
        canvasContext.fillStyle = "rgba(255, 255, 255, 1)";
      } else if(this.tileType == "backgroundTile") {
        canvasContext.fillStyle = "rgba(0, 255, 255, 1)";
      } else if(this.tileType == "physicalTile") {
        canvasContext.fillStyle = "rgba(255, 100, 0, 1)";
      } else if(this.tileType == "specialTile") {
        canvasContext.fillStyle = "rgba(255, 255, 0, 1)"
      } else {
        throw new Error("Invalid tileType: '" + this.tileType + "'");
      }
      
      displayInterface.displayGameRect(true, this.x * interval, this.y * interval, interval, interval);
      return 0;
    }
    
    displayInterface.displayGameImageFull(this.tileImage, this.x * interval, this.y * interval, interval, interval);
    return 0;
  }
}

class BackgroundTile extends Tile {
  constructor(image, x, y) {
    super(image, x, y);
    this.tileType = "backgroundTile";
  }
}

class PhysicalTile extends BackgroundTile {
  constructor(image, x, y) {
    super(image, x, y);
    this.tileType = "physicalTile";
  }
}

class SpecialTile extends BackgroundTile {
  constructor(image, x, y, func) {
    super(image, x, y);
    this.func = func;
    this.tileType = "specialTile";
  }
  
  activate() {
    this.func();
  }
}