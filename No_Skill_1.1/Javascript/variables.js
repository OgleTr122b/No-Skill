//Document element variables
var body;

//Canvas variables
var canvas;
var canvasContext;
var canvasResizing = false;

//Underlying game display that is then fit to the canvas
var displayInterface;

// Update rate variables
var TargetUpdatesPerSecond = 50; //NOT an fps variable
var tick = 0;
var maxTick = 1000000;

//Keystroke trackers
var downKeys;
var clickedKeys;

//Key settings variables
var inputManager;
var capsClicked = false;

//Mouse event variables
var mouseX = 0;
var mouseY = 0;
var mouseCanvasX = 0;
var mouseCanvasY = 0;
var mouseDown = false;
var mouseClick = false;
var mouseButton;

//Tile variables
var tileHandler;
var tileInterval = 100;

//Player variables
var player;
var walkCycleTimeout = 9;
var playerFocus = true;
var spriteVisible = true;

// Player images
var playerFootballBodyImage;
var playerRunLFRBImage;
var playerRunRFLBImage;

//Game state tracking variable
var gameState = 1;

//Menu variables
var menuDisplayInterface;
var startMenuButtons = [];
var pauseMenuButtons = [];
var optionMenuButtons = [];
var creditMenuButtons = [];
var upgradeMenuButtons = [];
var gymMenuButtons = [];
var gymBroMenuButtons = [];
var isMenuOpen = false;
var options = false;
var pause = false;
var credits = false;
var upgrade = false;
var gym = false;
var gymBro = false;
var exitClicked = false;

//Upgrade baseline variables
var baseMSMax = 15;
var baseSMax = 1.1;
var baseHpMax = 10;
var tempMSMax = 5;
var tempSMax = 0.3;
var tempHpMax = 4;

//Display interface for black transition overlay
var overlayDisplayInterface;

//Football game variables
var fBGDisplayInterface;
var linemen = [];
var field;
var peopleCrossed = 0;
var linemanID = 0;
var fieldIndicators = [];

//Overworld
var loadedMap = [];
var mapJson = "empty";
var specFuncsJson = "empty";
var map;

//loading images
var imageArray = [];
var imagesLoaded = false;
var imageStorage;
var image;

//loading
var wait = false;
var loadingFunctions = [];

//Transition
var transitionOpacity = 1;

