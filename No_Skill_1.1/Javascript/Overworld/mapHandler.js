function loadMap(mapFolderSrc) {
  mapJson = "empty";
  fetch(mapFolderSrc + "/map.json")
    .then(response => response.text())
    .then(responseText => mapJson = JSON.parse(responseText));
  
  specFuncsJson = "empty";
  fetch(mapFolderSrc + "/specFuncs.json")
    .then(response => response.text())
    .then(responseText => specFuncsJson = JSON.parse(responseText));
  
  load(function() {
    if(specFuncsJson == "empty" || mapJson == "empty"){
      return false;
    }
    return true;
  });
}

function convertMapJsonParseToMap(tileHandler) {
  if(mapJson == "empty") {
    console.log(mapJson);
    throw new Error("No map json to parse");  
  }
  
  for(var parse of mapJson) {
    switch(parse.tileType) {
      case "backgroundTile":
        tileHandler.createBackgroundTile(parse.tileImage, parse.x, parse.y);
        break;
      case "physicalTile":
        tileHandler.createPhysicalTile(parse.tileImage, parse.x, parse.y);
        break;
      case "specialTile":
        var foundSpecFunc = false;
        for(var specFunc of specFuncsJson) {
          if(parse.x == specFunc.x && parse.y == specFunc.y) {
            var func = new Function("return " + specFunc.funcString)();
            tileHandler.createSpecialTile(parse.tileImage, parse.x, parse.y, func);
            foundSpecFunc = true;
            break;
          }   
        }
        break;
      default:
        throw new Error("Tile type:'" + parse.tileType + "', is not an expected tile type.");
    }
  }
}