 //Player Class
class player{   
  constructor(a,b,c,c2,d,e,f,g,h,i,j,k,l,m){
    //Effected variables
    this.xacc = a;
    this.drag = b;
    //Constant drag instead of dividing
    this.constdrag = c
    this.gravity = c2;
    this.jumpSt = d;
    this.jumps = 0;
    this.maxJumps = e;
    //Position
    this.px = f;
    this.py = g;
    //Checkpoint x and y positions
    this.checkx = f;
    this.checky = g;
    
    //True Starting position
    this.startx = f;
    this.starty = g;
    //Previous, nessasary for platform collision/slide
    this.prex = f
    this.prey = g
    //size
    this.psx = h;
    this.psy = i;
    //Velocity
    this.xvel = j;
    this.yvel = k;
    this.qxvel = 0;
    this.qyvel = 0;
    //Key inputs
    this.keyIn = ischars(l);
    this.keyO = [];
    for(let i=0; i<this.keyIn.length; i++) this.keyO[this.keyO.length] = this.keyIn[i];
    this.jumpDown = false;
    //Optional for Player Skin Example
    this.coreTick = 0;
    this.outline = m;
    //Can Collide Or Not
    this.collide = true;
    this.rot = 0;
    this.corex = f;
    this.corey = g;``
    this.corexv = 0;
    this.coreyv = 0;
    this.coreOut = false;
    this.corext = f;
    this.coreyt = g;
    this.coreLock = false;
    this.direciton = 1;
    this.playerCol;
    this.showable = true;
  }
  makeSprite(){
    this.playerCol = new Sprite(this.px,this.py,this.psx,'k');
    this.playerCol.elasticity = 0;
    this.playerCol.visible = false;
  }
  actions(){
    this.qxvel = 0;
    this.qyvel = 0;
    if(playerEdit == false){
      if(levelEdit==true){
        this.keyIn[4] = 80;
        this.keyIn[5] = 80;
        this.keyIn[6] = 80;
        this.keyIn[7] = 80;
      }else{
        for(let i=0; i<this.keyIn.length; i++) this.keyIn[i] = this.keyO[i];
      }
    //Previous must be set at top to insure it is the previous when used in collision
    this.prex = this.px;
    this.prey = this.py;
      if(!keyIsDown(16)){
    //Movement Inputs
    if(keyIsDown(this.keyIn[3])||keyIsDown(this.keyIn[7])){
      this.xvel+=this.xacc;
    }
    if(keyIsDown(this.keyIn[1])||keyIsDown(this.keyIn[5])){
      this.xvel-=this.xacc;
    }
    if((keyIsDown(this.keyIn[0])||keyIsDown(this.keyIn[4])||keyIsDown(32))&&(this.jumpDown||this.jumps==this.maxJumps)&&this.jumps>0){
      this.yvel=-this.jumpSt;
      this.jumpDown = false;
      this.jumps--;
      for(var u = 0; u<3; u++){
            bulletsP[bulletsP.length] = new bulletP(this.px+random(-10,10),this.py-12,this.px+cos(random(-180,0)*PI/180)*10-this.xvel*2,this.py+12+sin(random(-180,0)*PI/180)*10,random(3,9));
           }
    }
    if(keyIsDown(this.keyIn[0])!=true&&keyIsDown(this.keyIn[4])!=true&&keyIsDown(32)!=true){
      this.jumpDown=true;
    }
        if(!levelEdit){
           
           }
      }
    if(keyIsDown(67)&&levelEdit){
      this.collide = false;
    }else{
      this.collide = true;
    }
      //restarter
    if(keyIsDown(82)&&!keyIsDown(16)){
      this.checkx = this.startx;
      this.checky = this.starty;
      this.respawn();
      let build = "";
       for(let i=0; i<blocks.length; i++){  
         build+=buildChange(blocks[i].bx)+buildChange(blocks[i].by)+buildChange(blocks[i].bsx)+buildChange(blocks[i].bsy)+buildChange(blocks[i].type)+buildChange(blocks[i].rotation)+buildChange(blocks[i].delay)+buildChange(blocks[i].range)+"C";
        
       }
      levelCode=build;
      buildLevel();
    }
    //Modify Cords
    this.xvel/=this.drag;
    let direction = this.xvel/abs(this.xvel)
    if(abs(this.xvel)-abs(this.constdrag)<0){
      this.xvel=0
    }else{
      this.xvel-=direction*this.constdrag   
    }
    this.yvel+=this.gravity;
    
    //Add Cords
    this.px+=this.xvel;
    this.py+=this.yvel;
    //This.collide checks if you can collide with objects, this prevents a few clips(unintentional phasing through blocks)
    if(this.collide){
      this.player_move_and_slide();
    }
      this.px+=this.qxvel;
    this.py+=this.qyvel;
      this.death_collide();
    //Technically only used for one frame so it is reset after
    this.collide = true;
    
    //Skin, Core
    this.coreTick+=((this.xvel))*1.5;
    this.coreTick=this.coreTick%360;
    }else if(!keyIsDown(16)){
      
      if(keyIsDown(this.keyIn[3])){
      this.xvel+=this.xacc;
      }
      if(keyIsDown(this.keyIn[1])){
        this.xvel-=this.xacc;
      }
      if(keyIsDown(this.keyIn[0])){
      this.yvel-=this.xacc;
      }
      if(keyIsDown(this.keyIn[2])){
        this.yvel+=this.xacc;
      }
      this.xvel/=this.drag;
      this.yvel/=this.drag;
      let direction = this.xvel/abs(this.xvel)
      if(abs(this.xvel)-abs(this.constdrag)<0){
        this.xvel=0
      }else{
        this.xvel-=direction*this.constdrag   
      }
      direction = this.yvel/abs(this.yvel)
      if(abs(this.yvel)-abs(this.constdrag)<0){
        this.yvel=0
      }else{
        this.yvel-=direction*this.constdrag   
      }
      //Add Cords
    this.px+=this.xvel;
    this.py+=this.yvel;
      
    }
    if(this.showable){
    push();
    //Skin, Main Player 
    strokeWeight(5);
    stroke(this.outline);
    noFill()
    rect(this.px,this.py,this.psx,this.psy,6);
    translate(this.px,this.py)
    rotate(this.coreTick*PI/180);
    rect(0,0,sqrt(2)/2*this.psx-5,sqrt(2)/2*this.psx-5,5);
    pop();
    
    push();
    stroke("#B8DED0");
    translate(this.px,this.py)
    let angleH = -atan2(mouser.x-this.px,mouser.y-this.py)+PI;
    if(angleH%PI/2==0){
       angleH+=0.001;
       }
    rotate(angleH)
    translate(0,20);
    rect(0,-50,20,10,5);
    rect(0,-60,10,8,5,5,0,0);
    rect(0,-70,25,12,5);
    pop();
    
    if((mouseIsPressed||keyIsDown(17))&&(!keyIsDown(32)||!levelEdit)){
      shake+=1;
      shake*=1.1;
      push();
      angleH-=PI/2;
      let trigH = createVector(cos(angleH),sin(angleH));
      stroke("#DEC6B8");
      strokeWeight(5);
      let end = createVector(this.px+trigH.x*1000,this.py+trigH.y*1000);
      let start = createVector(this.px+trigH.x,this.py+trigH.y);
      let raySprite = world.rayCast(start,end);
      // print(raySprite)
      //print(str(raySprite))
      if(raySprite!=undefined){
        //rect(raySprite.x,raySprite.y,200,200)
        let casts = [];
        let cast = rayCast(start.x,start.y,end.x,end.y,raySprite.x-raySprite.width/2,raySprite.y+raySprite.height/2,raySprite.x+raySprite.width/2,raySprite.y+raySprite.height/2);
      //  print(cast)
        if(cast.works){
          casts[casts.length] = createVector(cast.x,cast.y);
        }
        cast = rayCast(start.x,start.y,end.x,end.y,raySprite.x-raySprite.width/2,raySprite.y-raySprite.height/2,raySprite.x+raySprite.width/2,raySprite.y-raySprite.height/2);
       // print(cast)
        if(cast.works){
          casts[casts.length] = createVector(cast.x,cast.y);
        }
       
        cast = rayCast(start.x,start.y,end.x,end.y,raySprite.x-raySprite.width/2,raySprite.y-raySprite.height/2,raySprite.x-raySprite.width/2,raySprite.y+raySprite.height/2); 
       // print(cast)
        if(cast.works){
          casts[casts.length] = createVector(cast.x,cast.y);
        }
        cast = rayCast(start.x,start.y,end.x,end.y,raySprite.x+raySprite.width/2,raySprite.y-raySprite.height/2,raySprite.x+raySprite.width/2,raySprite.y+raySprite.height/2);
       // print(cast)
        if(cast.works){
          casts[casts.length] = createVector(cast.x,cast.y);
        }
        let ind = 0;
        for(let i=0; i<casts.length; i++){
          if(dis(casts[i].x,casts[i].y,this.px,this.py)<dis(casts[ind].x,casts[ind].y,this.px,this.py)){
            ind = i; 
          }
        }
        if(casts.length>0){
          end.x = casts[ind].x;
          end.y = casts[ind].y;
        }
  if(blocks[blocks.findIndex(hold => hold.bx === raySprite.x&&hold.by === raySprite.y&&hold.bsx === raySprite.width&&hold.bsy === raySprite.height) ?? 0]!=undefined){
        blocks[blocks.findIndex(hold => hold.bx === raySprite.x&&hold.by === raySprite.y&&hold.bsx === raySprite.width&&hold.bsy === raySprite.height) ?? 0].broken = true;
    }
        if(blocks.findIndex(hold => hold.type==11)){
          this.velocity+=0.2
        }
      }
      start = createVector(this.px+trigH.x*60,this.py+trigH.y*60);
      line(start.x,start.y,end.x,end.y);
      stroke("#DEC6B86D");
      strokeWeight(10);
      line(start.x,start.y,end.x,end.y);
      strokeWeight(15);
      line(start.x,start.y,end.x,end.y);
      noStroke();
      fill(255,50);
      ellipse(end.x,end.y,10,10)
      ellipse(end.x,end.y,20,20)
      ellipse(end.x,end.y,25,25)
      pop();
      
      if(frameCount%3==0){
        bulletsP[bulletsP.length] = new bulletP(this.px+trigH.x*60,this.py+trigH.y*60,this.px+cos(angleH+random(-7,7)*PI/180)*100,this.py+sin(angleH+random(-7,7)*PI/180)*100,random(2,12))
    }
      
    }
    }
    this.useChecks();
    this.playerCol.x = this.px+this.xvel;
    this.playerCol.y = this.py+this.yvel;
  }
  
  
  //COLLIDE
  player_move_and_slide(){
    //Interaction with blocks(array of class block)
    //A system taking the possible new x and y positions, but only choosing the closest one, or right one.
    //Left X
    for(var i=0; i<blocks.length; i++){
      if(blocks[i].fullCollide == true){
        if(blocks[i].collideWith == true){
      let newx = [];
      let newy = [];
      let newxv = [];
      let newyv = [];
      let newj = [];
      let bl = blocks[i];
      if(
        ((this.prex+this.psx/2)<=(bl.bx-bl.bsx/2)&&
        (this.px+this.psx/2)>=(bl.bx-bl.bsx/2)||
        (this.prex+this.psx/2)<=(bl.prebx-bl.bsx/2)&&
        (this.px+this.psx/2)>=(bl.bx-bl.bsx/2))&&
        (this.prey+this.psy/2)>(bl.by-bl.bsy/2)&&
        (this.prey-this.psy/2)<(bl.by+bl.bsy/2)
        ){
         newy[newy.length] = this.py
         newx[newx.length] = bl.bx-bl.bsx/2-this.psx/2
         newyv[newyv.length] = this.yvel
         newxv[newxv.length] = 0
         newj[newj.length] = false
      }
      if(newx.length>0){
      let short = 0
      for(var c=0; c<newx.length; c++){
        if(dis(newx[c],newy[c],this.prex,this.prey)<dis(newx[short],newy[short],this.prex,this.prey)){
           short = c
           }
      }
      this.px = newx[short]
      this.py = newy[short]
      this.xvel = newxv[short]
      this.yvel = newyv[short]
      if(newj[short]){
        this.jumps = this.maxJumps
      }
    }
        }
      }
    }
    //Right X
    for(var i=0; i<blocks.length; i++){
      if(blocks[i].fullCollide == true){
        if(blocks[i].collideWith == true){
      let newx = [];
      let newy = [];
      let newxv = [];
      let newyv = [];
      let newj = [];
      let bl = blocks[i];
      if(
        ((this.prex-this.psx/2)>=(bl.bx+bl.bsx/2)&&
        (this.px-this.psx/2)<=(bl.bx+bl.bsx/2)||
        (this.prex-this.psx/2)>=(bl.prebx+bl.bsx/2)&&
        (this.px-this.psx/2)<=(bl.bx+bl.bsx/2))&&
        (this.prey+this.psy/2)>(bl.by-bl.bsy/2)&&
        (this.prey-this.psy/2)<(bl.by+bl.bsy/2)
        ){
         newy[newy.length] = this.py
         newx[newx.length] = bl.bx+bl.bsx/2+this.psx/2
         newyv[newyv.length] = this.yvel
         newxv[newxv.length] = 0
         newj[newj.length] = false
      }
      if(newx.length>0){
      let short = 0
      for(var c=0; c<newx.length; c++){
        if(dis(newx[c],newy[c],this.prex,this.prey)<dis(newx[short],newy[short],this.prex,this.prey)){
           short = c
           }
      }
      this.px = newx[short]
      this.py = newy[short]
      this.xvel = newxv[short]
      this.yvel = newyv[short]
      if(newj[short]){
        this.jumps = this.maxJumps
      }
    }
      }
    }
    }
    //Upper Y
    for(var i=0; i<blocks.length; i++){
      if(blocks[i].collideWith == true&&!(blocks[i].type==2&&(keyIsDown(this.keyIn[2]||keyIsDown(this.keyIn[6]))))){
      let newx = [];
      let newy = [];
      let newxv = [];
      let newyv = [];
      let newj = [];
      let bl = blocks[i];
      if(
        ((this.prey+this.psy/2)<=(bl.by-bl.bsy/2)&&
        (this.py+this.psy/2)>=(bl.by-bl.bsy/2)||
        (this.py+this.psy/2)<=(bl.preby-bl.bsy/2)&&
        (this.py+this.psy/2)>=(bl.by-bl.bsy/2))&&
        (this.px+this.psx/2)>(bl.bx-bl.bsx/2)&&
        (this.px-this.psx/2)<(bl.bx+bl.bsx/2)
        ){
        
        newx[newx.length] = this.px;
        newy[newy.length] = bl.by-bl.bsy/2-this.psy/2;
        this.qxvel = blocks[i].velocity.x;
        this.qyvel = blocks[i].velocity.y;
        newxv[newxv.length] = this.xvel
        newyv[newyv.length] = 0
        newj[newj.length] = true
        blocks[i].broken = true;
        
        // if(blocks[i].type==11){
        //   this.x+=blocks[i].vector.x
        // }
      }
      if(newx.length>0){
      let short = 0
      for(var c=0; c<newx.length; c++){
        if(dis(newx[c],newy[c],this.prex,this.prey)<dis(newx[short],newy[short],this.prex,this.prey)){
           short = c
           }
      }
      if(newj[short]){
        this.jumps = this.maxJumps
      }
                      this.px = newx[short]
      this.py = newy[short]
        if(this.yvel>=5){
           for(var u = 0; u<3; u++){
            bulletsP[bulletsP.length] = new bulletP(this.px+random(-5,5),this.py+12,this.px+cos(random(-180,0)*PI/180)*10-this.xvel*2,this.py+12+sin(random(-180,0)*PI/180)*10,random(1,4));
           }
           }
        if(abs(this.xvel)>=2&&frameCount%floor(random(3,8))==0){
        for(var u = 0; u<1; u++){
          bulletsP[bulletsP.length] = new bulletP(this.px+random(-5,5),this.py+12,this.px-this.xvel,this.py-random(-2,3),random(1,5));
      }
      }
      this.xvel = newxv[short]
      this.yvel = newyv[short]
    }
    }
    }
    //Lower Y
    for(var i=0; i<blocks.length; i++){
      if(blocks[i].fullCollide == true){
        if(blocks[i].collideWith == true){
      let newx = [];
      let newy = [];
      let newxv = [];
      let newyv = [];
      let newj = [];
      let bl = blocks[i];
      if(
        ((this.prey-this.psy/2)>=(bl.by+bl.bsy/2)&&
        (this.py-this.psy/2)<=(bl.by+bl.bsy/2)||
        (this.prey-this.psy/2)>=(bl.preby+bl.bsy/2)&&
        (this.py-this.psy/2)<=(bl.by+bl.bsy/2))&&
        (this.px+this.psx/2)>(bl.bx-bl.bsx/2)&&
        (this.px-this.psx/2)<(bl.bx+bl.bsx/2)
        ){
         newx[newx.length] = this.px
         newy[newy.length] = bl.by+bl.bsy/2+this.psy/2
         newxv[newxv.length] = this.xvel
         if(this.yvel<0){
         newyv[newyv.length] = 0
        }else{
          newyv[newyv.length] = this.yvel;
        }
         newj[newj.length] = false
      }
      if(newx.length>0){
      let short = 0
      for(var c=0; c<newx.length; c++){
        if(dis(newx[c],newy[c],this.prex,this.prey)<dis(newx[short],newy[short],this.prex,this.prey)){
           short = c
           }
      }
      this.px = newx[short]
      this.py = newy[short]
      this.xvel = newxv[short]
      this.yvel = newyv[short]
      if(newj[short]){
        this.jumps = this.maxJumps
      }
    }
    }
    } 
    }
    //Set to shortest distance
  }  
  death_collide(){
    if(this.py-this.psy/2>height+1000){
     this.respawn();
    }
    for(var i=0; i<blocks.length; i++){
      if(this.collide){
        if(blocks[i].type == 3){
          for(let c = 0; c<blocks[i].bsx/30; c++){
            for(let u = 0; u<blocks[i].bsy/30; u++){
              //collision display
              /*
              push();
                rect(blocks[i].bx-blocks[i].bsx/2+15+c*30-7.5,blocks[i].by-blocks[i].bsy/2+15+u*30,15,20);
              pop();
              */
            //0 deg
            if(blocks[i].rotation%360==0){
              if(rectHit(this.px,this.py,blocks[i].bx-blocks[i].bsx/2+15+c*30,blocks[i].by-blocks[i].bsy/2+15+u*30+7.5,30,30,25,13)){
                this.respawn();
              }
            }
            //90 deg
              if(blocks[i].rotation%360==90){
              if(rectHit(this.px,this.py,blocks[i].bx-blocks[i].bsx/2+15+c*30-7.5,blocks[i].by-blocks[i].bsy/2+15+u*30,30,30,13,25)){
                this.respawn();
              }
            }
              //180 deg
              if(blocks[i].rotation%360==180){
              if(rectHit(this.px,this.py,blocks[i].bx-blocks[i].bsx/2+15+c*30,blocks[i].by-blocks[i].bsy/2+15+u*30-7.5,30,30,25,13)){
                this.respawn();
              }
            }
              //270 deg
              if(blocks[i].rotation%360==270){
              if(rectHit(this.px,this.py,blocks[i].bx-blocks[i].bsx/2+15+c*30+7.5,blocks[i].by-blocks[i].bsy/2+15+u*30,30,30,13,25)){
                this.respawn();
                }
              }
            }
          }
        }
      }
    }
    for(var i = 0; i<bullets.length; i++){
      if(dis(bullets[i].prox,bullets[i].proy,player1.px,player1.py)<=20){
        this.respawn();
      }
    }
  }
  respawn(){
    if(this.collide==true&&!playerEdit){
    this.xvel = 0
      this.yvel = 0
      this.px = this.checkx
      this.py = this.checky
      this.collide = false
      for(let i=0; i<blocks.length; i++){
      blocks[i].blockSprite.remove();
    }
    for(var c=0; c<20; c++){
          let angle = random(0,2*PI);
          let fast = random(5,15);
          
          bulletsP[bulletsP.length] = new bulletP(this.checkx,this.checky,this.checkx+cos(angle)*50,this.checky+sin(angle)*50,fast);
        }
      fps=2;
      this.corex = this.px;
      this.corey = this.py;
      this.corexv += (this.corext-this.corex)/1;
      this.coreyv += (this.coreyt-this.corey)/1;
      this.coreLock=true;
  }
  }
  useChecks(){
    for(var i=0; i<blocks.length; i++){
      if(blocks[i].type==4){
      if(rectHit(this.px,this.py,blocks[i].bx,blocks[i].by,30,30,40,40)){
        if(this.checkx != blocks[i].bx||this.checky != blocks[i].by){
        for(var w=0; w<20; w++){
          let angle = random(0,2*PI);
          let fast = random(5,20);
          
          bulletsP[bulletsP.length] = new bulletP(blocks[i].bx,blocks[i].by,blocks[i].bx+cos(angle)*50,blocks[i].by+sin(angle)*50,fast);
        }
          
        }
        this.checkx = blocks[i].bx;
        this.checky = blocks[i].by;
      }
    }
      if(blocks[i].type==7){
        if(dis(blocks[i].bx,blocks[i].by,this.px,this.py)<=40){
          this.changeLevel(blocks[i].delay);
        }
      }
    }
  }
  changeLevel(x){
    levelCode = levels[x];
    this.checkx = this.startx;
    this.checky = this.starty;
    for(let i=0; i<blocks.length; i++){
      blocks[i].blockSprite.remove();
    }
    print(allSprites.length)
    this.respawn();
    selEdit = -1;
    blocks = [];
    currentLevel = x;
   // console.log(levelCode,blocks[i].range);
    buildLevel();
  }
}