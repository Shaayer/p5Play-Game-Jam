//To-Do Finsih level code editing system
//To-Do
//Beyond Classes
var tester;
function preload(){
  sounds[0] = loadSound('Sound_FX/jump.wav');
  sheet = loadImage('game_assets/tiles1.png');
 // let url = 'https://drive.google.com/uc?id=17sSGoMwskMvRzk9sj1FiRv6qAx_4-7Uj&export=download';
 //tester = loadSound(url);
  //Musical+testtt2.wav
  //Game_Music2.wav
  tester = loadSound('game_assets/Musical+testtt2.wav');
}

//Void Setup
function setup() {
  createCanvas(1000,600)
   world.debug = true;
  rectMode(CENTER);
  imageMode(CENTER);
  textAlign(CENTER);
  noSmooth();
  textFont('itim');
  
  anchor = createVector(null,null);
  ansize = createVector(0,0);
  cam = createVector(500,300);
  trucam = createVector(500,300);
  camv = createVector(0,0);
  mouser = createVector(0,0);
  mouserH = createVector(0,0);
  buildLevel();
  let sizer = createVector(36,36);
  for(let i=0; i<sizer.x; i++){
    tileSprite[i]=[];
    for(let c=0; c<sizer.y; c++){
      tileSprite[i][c] = sheet.get(i*sheet.width/sizer.x,c*sheet.height/sizer.y,sheet.width/sizer.x,sheet.height/sizer.y);
    }
  }
  world.gravity.y = 30;
  /*
  for(let i=0; i<75; i++){
    boxes[i] = new Sprite(1200+i*5,700-i*2, random(20,60),random(20,60));
    boxes[i].visible = false;
    boxes[i].bounciness = 0.2;
   // blocks[blocks.length] = new block(boxes[i].x,boxes[i].y,boxes[i].width, boxes[i].height, 1, 0, 0);
   // blocks[blocks.length-1].moveBlocks = true;
   // blocks[blocks.length-1].moveLock = i;
  }
  for(let i=0; i<20; i++){
    boxes[boxes.length] = new Sprite(1630-i,-500-i*30, random(10,30),random(10,30));
    boxes[boxes.length-1].visible = false;
    boxes[boxes.length-1].bounciness = 0.2;
    //blocks[blocks.length] = new block(boxes[i].x,boxes[i].y,boxes[i].width, boxes[i].height, 1, 0, 0);
   // blocks[blocks.length-1].moveBlocks = true;
   // blocks[blocks.length-1].moveLock = i;
  }
  */
  player1.makeSprite();
 // tester.loop();
}
//Global Variables
if("variables"=="variables"){
var cameray = 0;
var camerax = 0;
var width = 1000;
var height = 600;
//xaccel, drag, constantDrag, gravity, jumpStrength, MaxJumps, Xpos, Ypos, sizex, sizey, xvel(0), yvel(0), KeyMap, outline color
  //              xaccel -v codrag-v jump-v
var player1 = new player(2.7,1.11,1.6,1.3,17,2,500,300,25,25,0,0,["up","left","down","right","w","a","s","d"],"rgb(149,255,241)"); //    drag-^ grav -^.maxj-^
1
/*
//without presets
var player1 = new player(2.2,1.06,1.4,0.8,18,2,200,- 50,25,25,0,0,["w","a","s","d"],"rgb(149,255,241)");
var player2 = new player(2.2,1.06,1.4,0.8,18,2,width-200,-50,25,25,0,0,["up","left","down","right"],"rgb(251,253,169)");
  var player3 = new player(2.2,1.06,1.4,0.8,18,2,width/2,-50,25,25,0,0,["i","j","k","l"],"rgb(129,253,129)");
*/
//Xpos,Ypos,width,height
var blocks = [];
  //block particle
var blockP = [];
//turrent shoots
var bullets = [];
//bullet trail/particle
var bulletsP = [];
//If you are allowed to edit the level
var levelEdit =true;

//LevelEdit Modes
var editMode = "place";
var placeT = 1;
var particles = [];
var anchor;
var ansize;
var placing = false;
var cam;
var trucam;
var camv;
var mouser;
var playerEdit = false;
var selEdit = -1;
var nextRot = 0;
var nextRange = 5;
var nextDelay = 0;
var gate = false;
var lock = -1;
var zoom = 100;
var shake = 0;
var levelCode = levels[0];
var currentLevel = 0;
var fade = 0;
var screen = 1;
var titleFont;
var skipS = 1;
var skipSV = 0;
var bar = false;
var barS = 1;
var barSV = 0;
var bS = [1,1];
var bSV = [0,0];
var copyBlock;
var copied = false;
//sounds
var sounds = [];
var tileSprite = [];
var sheet;
var fps = 60;
var boxes = [];
var mouserH;
var preFrame = [false];
}

//Void Draw
function draw() {
  shake/=1.5;
  if(keyIsDown(220)){
    levelEdit = !levelEdit;
  }
  if(keyIsDown(187)){
    player1.px=500;
    player1.py=300;
    player1.prex=500;
    player1.prey=300;
  }
  background(20);
  noCursor();
  push();
  pop()
  if(keyIsDown(80)){
    print(floor(frameRate()*10)/10)
  }
  resetMatrix();
 if(screen == 1){
   offUpV-=15;
  cam.add(-(cam.x-(player1.px))/10,-(cam.y-(player1.py-20-90))/10);
  trucam = createVector(500-cam.x,300-cam.y);
  mouser=createVector((mouseX-500)/(zoom/100)-trucam.x+500,(mouseY-300)/(zoom/100)-trucam.y+300);
   translate(random(-shake,shake),random(-shake,shake))
  translate(500,300);
  scale(zoom/100,zoom/100);
  translate(-500,-300);
  translate(trucam);
  strokeWeight(5);
  stroke(255);
  noFill();
  trueStart(255);
  bulletShow();
  for(let i=0; i<boxes.length; i++){
    push();
      translate(boxes[i].x,boxes[i].y);
    noFill();
    stroke("#EFDFCC");
    rotate(boxes[i].rotation);
    rect(0,0,boxes[i].width,boxes[i].height,5);
    pop();
  }
  particlesDisplay();
  tiles2();
  unload();
   tiles();
   players();
   levelEditor();
  if(levelEdit){
  if(keyIsDown(65)){
    zoom/=1.03;
  }
  if(keyIsDown(68)){
    zoom*=1.03;
  }
  if(keyIsDown(83)){
    zoom=100;
  }
  }
   
  }
  resetMatrix();
  translate(500,300);
  scale(zoom/100,zoom/100);
  translate(-500,-300);
  translate(trucam);
  mouser=createVector((mouseX-500)/(zoom/100)-trucam.x+500,(mouseY-300)/(zoom/100)-trucam.y+300);
  mouseSkin();
  resetMatrix();
  stroke(255);
  noFill();
  if(levelEdit){
    translate(60,60);
    rotate(sin(frameCount/20)/10);
    fill(255,40);
    rect(0,0,70,70,20+sin(frameCount/100)*10);
    noFill();
    rotate(-sin(frameCount/20)/5);
    if(placeT==1){
      rect(0,0,30,30,5);
    }
    if(placeT==2){
      rect(0,0,30,15,5);
    }
    if(placeT==3){
      thinSpike(0,0,255);
    }
    if(placeT==4){
      thinCheck(0,10,30,255);
    }
    if(placeT==6){
      thinTurret(0,0,0,255);
    }
    if(placeT==7){
      thinPortal(0,0,255);
    }
    if(placeT==8){
      thinSign(0,0,255);
    }
    if(placeT==9){
      rect(random(-2,2),random(-2,2),30,30,5);
    }
    if(placeT==10){
      thinLaser(0,0,5,255);
    }
  }

//  tester.setVolume(sin(frameCount/100));
}
//P1 and P2 Players
function players(){
  player1.actions();
}
