function load(...funcs) {
  var func;
  
  for(func of funcs) {
    loadingFunctions.push(func);
  }
  
  for(var i = loadingFunctions.length - 1; i > -1; i--) {
    func = loadingFunctions[i];
    if(func()) {
      loadingFunctions.splice(i, 1);
    }
  }
  
  if(loadingFunctions.length > 0) {
    wait = true;
    setTimeout(load, 3);
  } else {
    wait = false;
    clearTimeout();
  }
}