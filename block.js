//Block Class
class block{
  constructor(a,b,c,d,e,f,g,h){
    
    //HANSON TYPE 11 is OG MOVING BLOCK AND TYPE 12 IS NEXT MOVING BLOCKS
  
    
    //position
    this.bx = a;
    this.by = b;
    this.prebx = a;
    this.preby = b;
    //size, width, heights7
    //generally in this project's scale, use 30x30 to corollate with player, but also an integer scale of 30x30, just keep the grid consistant
    this.bsx = c;
    this.bsy = d;
    //for jiggle and shake;
    this.showc = 0;
    this.showcv = 0;
    //new 
    this.nx = 1;
    this.ny = 1;
    this.velocity = createVector(0,0);
    this.sides = [0,0,0,0];
    //Pass through types
    this.type = e
    //
    this.collideWith = false;
    if(this.type == 1||this.type == 2||this.type == 6||this.type == 9||this.type == 10 || this.type==11){
      this.collideWith = true;
    }
    this.fullCollide = false;
    //to prevent 2 but to keep 6, "phaseable", "turret"
    //It also keeps more avalibility in block class not player class
    if(this.type == 1||this.type == 6||this.type==9||this.type == 10 || this.type==11){
      this.fullCollide = true;
    }
    //If there is a check, "type 4"
    //for an animation
    this.checkSize = 25;
    this.checkVel = 0;
    this.rotation = int(f);
    if(this.rotation>=360){
      this.rotation = this.rotation%90;
    }
    //for the turret
    this.reload = g;
    this.delay = g;
    this.range = h;
    if(this.range == 0&&this.type == 6){
      this.range = 1;
    }
    
    //for moving block
    this.current=1;
    this.way=1
    this.vector=createVector(0,0)
    // this.moving=false
    
    this.life = 60;
    this.broken = false;
    this.tx = this.bx;
    this.ty = this.by;
    this.moveBlocks = false;
    this.moveLock = 0;
    this.blockSprite = new Sprite(this.bx,this.by,this.bsx,this.bsy,'k');
   this.blockSprite.visible = false;
  }
   updateSprite(){
     if(this.blockSprite == undefined){
       print(2)
     }
     if((this.moveBlocks||!this.fullCollide)&&this.blockSprite!=undefined){
        this.blockSprite.remove();
     }else if(this.fullCollide&&(this.blockSprite.removed||this.blockSprite.x!=this.bx||this.blockSprite.y!=this.by)){
       if(this.blockSprite.x!=this.bx||this.blockSprite.y!=this.by){
         this.blockSprite.remove(); 
       }
         this.blockSprite = new Sprite(this.bx,this.by,this.bsx,this.bsy,'k');
      this.blockSprite.visible = false;
     }
  }
  actions(){
    this.velocity = createVector(0,0);
     this.updateSprite();
    this.prebx = this.bx;
    this.preby = this.by;
    angleMode(RADIANS);
    //Main display
    strokeWeight(5);
    stroke("#66796B");
    noFill()
    //All instances of "can be on a grid" will be as a block class type, we are at, "4"
    //TYPE ONE BLOCK, NORMALLLL
    this.showc+=this.showcv;
    this.showcv+=(1-this.showc)/5;
    this.showcv/=1.4;
    push();
      translate(this.bx,this.by);
      scale(this.showc,this.showc);
      translate(-this.bx,-this.by);
    if(this.type == 1&&this.moveBlocks==false){
      this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3]);
    }
    //type 2 block PASSAGE, PHASEABLE
    if(this.type == 2){
      this.form2(this.bx,this.by-this.bsy/2+15,this.bsx,30,this.sides[0],this.sides[1],this.sides[2],this.sides[3]);
      if(this.bsy>30){
        this.by = this.by-this.bsy/2+15;
        this.bsy = 30;
      }
    }
    //Type 3 block, SPIKE
    if(this.type == 3){
      for(let i=0; i<this.bsx/30; i++){
        for(let c=0; c<this.bsy/30; c++){
          
          this.spike(this.bx-this.bsx/2+15+i*30,this.by-this.bsy/2+15+c*30,this.rotation);
        }
      }
    }
    //Type 4 block, Checkpoint
    if(this.type == 4){
      this.check(this.bx,this.by,this.checkSize);
      this.bsx = 30;
      this.bsy = 30;
      this.checkSize-=this.checkVel;
      if(this.bx==player1.checkx&&this.by==player1.checky){
        this.checkVel = (this.checkSize-50)/4;
      }else{
        this.checkVel = (this.checkSize-25)/4;
      }
    }
    if(this.type == 6){
      if(this.range == 0){
      this.range = 1;
    }
      this.reload+=0.1;
      if(this.reload>=this.range){
        this.reload=0;
        this.showcv+=0.05;
      }
      for(let i=0; i<this.bsx/30; i++){
        for(let c=0; c<this.bsy/30; c++){
          this.turret(this.bx-this.bsx/2+15+i*30,this.by-this.bsy/2+15+c*30,this.reload/this.range*3);
        }
      }
    }
    if(this.type == 7){
      this.portal(this.bx,this.by);
      this.bsx = 30;
      this.bsy = 30;
    }
    if(this.type == 8){
      this.sign(this.bx,this.by);
      this.bsx = 30;
      this.bsy = 30;
    }
    if(this.type == 9){
      if(this.broken){
        this.life--;
      }
      if(this.life<=0){
        this.collideWith = false;
        this.fullCollide = false;
      }
      if(this.life==-1){
        blockP[blockP.length] = new bpart(this.bx,this.by,random(-5,5),random(-1,-5),this.bsx,this.bsy);
      }
      if(this.broken){
        translate(random(-2,2),random(-2,2));
    }
      if(this.life<=-300&&!rectHit(player1.px,player1.py,this.bx,this.by,29,29,this.bsx,this.bsy)){
        this.life=60;
        this.broken = false;
          this.blockSprite = new Sprite(this.bx,this.by,this.bsx,this.bsy,'k');
      this.blockSprite.visible = false;
        this.showc=0;
        this.showcv = 0;
        this.collideWith = true;
        this.fullCollide = true;
      }
      if(this.life>0){
      this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3]);
      }
    }
    //LASER
    if(this.type == 10){
      this.reload+=0.1;
      if(this.reload>=this.range+10){
        this.reload=0;
        this.showcv+=0.035;
      }
      for(let i=0; i<this.bsx/30; i++){
        for(let c=0; c<this.bsy/30; c++){
          
          this.laser(this.bx-this.bsx/2+15+i*30,this.by-this.bsy/2+15+c*30,this.reload/this.range*3);
        
        }
      }
    }
    //OG MOVING PLATFORM
    if(this.type==11){
      
      if(playerEdit == false){
        // this.speed = 1;
      // this.code = this.range;
    var num2;
    var num=blocks.findIndex(hold => hold.type==12 && hold.range==this.range && hold.delay==this.current)
    if(num != -1){
      
      
      this.velocity=createVector(blocks[num].bx-this.bx,blocks[num].by-this.by)
      this.velocity.normalize()
     this.velocity.x*=this.delay
      this.velocity.y*=this.delay
      
      
      
       
      //reaching the point
      if(dist(this.bx,this.by,blocks[num].bx,blocks[num].by)<this.delay){
        // this.bx=blocks[num].bx
        // this.by=blocks[num].by
        this.velocity=createVector(this.bx-blocks[num].bx,this.by-blocks[num].by)
        this.bx+=this.velocity.x
        this.by+=this.velocity.y
        //checking to find the next point
        num2=blocks.findIndex(hold => hold.type==12 && hold.range==this.range && hold.delay==this.current+1)
        // if(num2 == -1){
        //   this.current=1;
        // }else{
        //   this.current=this.current+1
        // }
        if(this.way==1){
          if(num2 == -1){
          this.way=-1
            this.current-=1
        }else{
          this.current=this.current+1
        }
        }else if(this.way==-1){
          num2=blocks.findIndex(hold => hold.type==12 && hold.range==this.range && hold.delay==this.current-1)
          if(num2==-1){
            this.way=true
            this.current+=1
          }else{
            this.current-=1
          }
        }else{
          
        }
      }else{
        //normal movement
      if(this.way != 0){
        this.bx+=this.velocity.x
      this.by+=this.velocity.y
      }
      }
      }
      
    }
      this.form1(this.bx,this.by,this.bsx,this.bsy,this.sides[0],this.sides[1],this.sides[2],this.sides[3]);
      fill("red")
      ellipse(this.bx,this.by,10)
    }
    //MOVING PLATFORM POINT
    if(this.type==12){
      /*
      JK!
      Nothing needs to happen because this block has no use!
      */
      fill("blue")
      ellipse(this.bx,this.by,10)
    }
    
    
    pop();
    if(this.moveBlocks){
      this.bx = boxes[this.moveLock].x;
      this.by = boxes[this.moveLock].y;
      this.bsx = boxes[this.moveLock].width-1;
      this.bsy = boxes[this.moveLock].height-1;
      if(boxes[this.moveLock].rotation>=PI/4&&boxes[this.moveLock].rotation<=3*PI/4||boxes[this.moveLock].rotation<=-PI/4&&boxes[this.moveLock].rotation>=-3*PI/4){
      this.bsx = boxes[this.moveLock].height-1;
      this.bsy = boxes[this.moveLock].width-1;  
      }
    }
  }
  textDisplay(ind){
    noStroke();
    fill(0)
    textSize(20)
    text(ind,this.bx,this.by+7.5);
  }
  compareTo(other){
    if((other.bx>this.bx&&other.by>=this.by)||other.by>this.by){
       return -1
    }
    if((other.bx<this.bx&&other.by<=this.by)||other.by<this.by){
       return 1
    }
    
    return 0
  }
  form1(x,y,sx,sy,a,b,c,d){
    imageMode(CORNER)
    for(let i=0; i<sx/30; i++){
      for(let c=0; c<sy/30; c++){
        let plot = createVector(x-sx/2+i*30,y-sy/2+c*30);
      if(i!=0&&i!=(sx/30-1)&&c!=0&&c!=(sy/30-1)){
          let seter = [
          [1,1,1],
          [1,1,1],
          [1,1,1]
        ];
        this.form3(plot.x,plot.y,seter);
      }else{
        let seter = [
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ];
        for(let i=0; i<3; i++){
          for(let c= 0; c<3; c++){
            seter[i][c]=(blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x-15+c*30,plot.y-15+i*30,hold.bsx,hold.bsy,20,20)&&(hold.type==this.type&&hold.life>0))>=0)+0;
          }
        }
        
        this.form3(plot.x,plot.y,seter);
      }
      }
  }
    imageMode(CENTER)
  }
  form3(x,y,seter){
    //map set
    //arrays2DEqual,arrays2DGet2
    let setes = [
      [createVector(12,6),createVector(12,6)],
      [createVector(12,6),createVector(12,6)]
    ];
    //Blanks
    if(0==0){
    //top_left
    if("top_left"=="top_left"){
      let plot2 = arrays2DGet2(seter,0,0);
      let plot1 = [
        [1,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][0] = createVector(3,3);

      plot1 = [
        [0,0],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][0] = createVector(4,0);
      
      plot1 = [
        [0,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][0] = createVector(0,0);

      plot1 = [
        [1,0],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][0] = createVector(4,0);

      plot1 = [
        [0,1],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][0] = createVector(2,0);

      plot1 = [
        [1,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][0] = createVector(0,0);

      plot1 = [
        [1,1],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][0] = createVector(2,0);

      plot1 = [
        [0,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][0] = createVector(1,3);
    }
    ///////////////////\/\/\//\/\/\/\/\/\/\/
    //top right
    if("top_right"=="top_right"){
      let plot2 = arrays2DGet2(seter,0,1);
      let plot1 = [
        [1,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][0] = createVector(3,2);
      
      plot1 = [
        [0,0],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][0] = createVector(5,0);

      plot1 = [
        [0,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][0] = createVector(1,0);

      plot1 = [
        [0,1],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][0] = createVector(5,0);

      plot1 = [
        [1,0],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][0] = createVector(3,0);

      plot1 = [
        [0,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][0] = createVector(0,0);

      plot1 = [
        [1,1],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][0] = createVector(3,0);

      plot1 = [
        [1,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][0] = createVector(0,3);
    }
    //bottom right
    if("bottom_right"=="bottom_right"){
      let plot2 = arrays2DGet2(seter,1,1);
      let plot1 = [
        [1,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][1] = createVector(3,3);

      plot1 = [
        [1,0],
        [0,0]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][1] = createVector(5,1);
      
      plot1 = [
        [1,1],
        [0,0]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][1] = createVector(1,1);

      plot1 = [
        [1,0],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][1] = createVector(5,1);

      plot1 = [
        [1,0],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][1] = createVector(3,1);

      plot1 = [
        [1,1],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][1] = createVector(1,1);

      plot1 = [
        [1,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][1] = createVector(3,0);

      plot1 = [
        [1,1],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][1] = createVector(0,2);
    }
    //bottom left
    if("bottom_left"=="bottom_left"){
      let plot2 = arrays2DGet2(seter,1,0);
      let plot1 = [
        [1,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][1] = createVector(2,3);

      plot1 = [
        [0,1],
        [0,0]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][1] = createVector(4,1);
      
      plot1 = [
        [1,1],
        [0,0]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][1] = createVector(0,1);

      plot1 = [
        [0,1],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][1] = createVector(4,1);

      plot1 = [
        [0,1],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][1] = createVector(2,1);

      plot1 = [
        [1,1],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][1] = createVector(1,1);

      plot1 = [
        [0,1],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][1] = createVector(2,0);

      plot1 = [
        [1,1],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][1] = createVector(1,2);
    }
    }
    
    
    image(tileSprite[setes[0][0].x][setes[0][0].y],x,y,15.1,15.1);
    image(tileSprite[setes[0][1].x][setes[0][1].y],x,y+15,15.1,15.1);
    image(tileSprite[setes[1][0].x][setes[1][0].y],x+15,y,15.1,15.1);
    image(tileSprite[setes[1][1].x][setes[1][1].y],x+15,y+15,15.1,15.1);
  }
  form2(x,y,sx,sy,a,b,c,d){
    imageMode(CORNER)
     for(let i=0; i<sx/30; i++){
      for(let c=0; c<sy/30; c++){
        let plot = createVector(x-sx/2+i*30,y-sy/2+c*30);
    let seter = [
          [0,0,0],
          [0,0,0],
          [0,0,0]
        ];
        for(let i=0; i<3; i++){
          for(let c= 0; c<3; c++){
            seter[i][c]=(blocks.findIndex(hold => rectHit(hold.bx,hold.by,plot.x-15+c*30,plot.y-15+i*30,hold.bsx,hold.bsy,20,20)&&hold.type==2&&hold.by==this.by)>=0)+0;
          }
        }
        
        this.form4(plot.x,plot.y,seter);
      }
    imageMode(CENTER)
  }
  }
  form4(x,y,seter){
      imageMode(CORNER)
    //map set
    //arrays2DEqual,arrays2DGet2
    let setes = [
      [createVector(5,5),createVector(5,5)],
      [createVector(5,5),createVector(5,5)]
    ];
    //Blanks
    if(0==0){
    //left
    if("top_left"=="top_left"){
      let plot2 = arrays2DGet2(seter,0,0);
      let plot1 = [
        [0,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][0] = createVector(5,2);
      
      plot1 = [
        [0,0],
        [0,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[0][0] = createVector(4,2);
    }
      
    if("top_right"=="top_right"){
      let plot2 = arrays2DGet2(seter,0,1);
      let plot1 = [
        [0,0],
        [1,1]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][0] = createVector(5,2);
      
      plot1 = [
        [0,0],
        [1,0]
      ];
      if(arrays2DEqual(plot2,plot1)) setes[1][0] = createVector(4,3);
    }
    }
    /*
    if(seter[0].reduce(getSum)+seter[1].reduce(getSum)+seter[2].reduce(getSum)==9){
       setes = [
      [createVector(2,2),createVector(2,2)],
      [createVector(2,2),createVector(2,2)]
    ];
    }
    */
    for(let i = 0; i<2; i++){
      for(let c = 0; c<2; c++){
        setes[i][c].x+=floor(noise(x,y)*2-0.1)*6;
      }
    }
    image(tileSprite[setes[0][0].x][setes[0][0].y],x,y,15.1,15.1);
    image(tileSprite[setes[0][1].x][setes[0][1].y],x,y+15,15.1,15.1);
    image(tileSprite[setes[1][0].x][setes[1][0].y],x+15,y,15.1,15.1);
    image(tileSprite[setes[1][1].x][setes[1][1].y],x+15,y+15,15.1,15.1);
  }
  spike(x,y,r){
   if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx,this.bsy)){
  push();
  translate(x,y);
  rotate(r*PI/180);
  strokeWeight(5);
  stroke("#EFDFCC");
  noFill();
  beginShape();
  vertex(-7.5,0);
  vertex(-15,15);
  vertex(0,15);
  endShape(CLOSE);
  beginShape();
  vertex(7.5,0);
  vertex(15,15);
  vertex(0,15);
  endShape(CLOSE);
  pop();
   }
}
  check(x,y,z){
    if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx,this.bsy)){
  push();
      stroke("#B8DED0")
  translate(x,y);
    rotate(this.rotation*PI/180);
  strokeWeight(5);
  rect(0,-5,10,40,5,5,1,1);
  ellipse(0,-20,z,z);
  line(5,-5,15,15);
  line(-5,-5,-15,15);
  translate(0,-20);
  if(this.bx==player1.checkx&&this.by==player1.checky){
    rotate(frameCount*PI/180*5);
    rect(0,0,z-20,z-20,5);
  }
  pop();
    }
  }
  turret(x,y,z){
    if(this.reload==0){
      bullets[bullets.length] = new bullet(x+cos(this.rotation*PI/180+PI/2)*15,y+sin(this.rotation*PI/180+PI/2)*15,x+cos(this.rotation*PI/180+PI/2)*50,y+sin(this.rotation*PI/180+PI/2)*50,10);
    }
    if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx,this.bsy)){
    push();
    translate(x,y);
    rotate(this.rotation*PI/180);
    strokeWeight(5);
    stroke("#BA8E7A");
    noFill();
    rect(0,0,30,30,3);
    rect(0,20-z/2,15+z,10-z,3);
    
    if(!playerEdit){
      rotate(frameCount*PI/180*3);
      rect(0,0,15,15,3);
    }else{
      rect(0,0,10,25,5);
      rect(0,0,0,25*(this.delay/this.range),5);
    }
    pop();
    }
  }
  portal(x,y){
    if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx,this.bsy)){
    push();
    translate(x,y);
    rotate(frameCount*PI/180*5);
    strokeWeight(5);
    stroke("#DEB8B8");
    noFill();
    rect(0,0,40,40,5);
    rect(0,0,19,19,5);
    rotate(-frameCount*PI/180*10);
    rect(0,0,30,30,5);
    pop();
    }
  }
  sign(x,y){
    if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx,this.bsy)){
    push();
    translate(x,y);
    stroke(0,-100+80/dis(player1.px,player1.py,this.bx,this.by)*355);
    fill(255,-100+80/dis(player1.px,player1.py,this.bx,this.by)*355);
    textSize(20)
    let holder = str(this.delay);
    holder = holder.replace(/\\n/g, '\n');
    text(holder,0,60-this.range*20);
    rotate(this.rotation*PI/180)
    noFill();
    stroke("#B8DED0");
    strokeWeight(5)
    rect(0,-10,30,20,3);
    rect(0,7.5,1,15,0.5);
    strokeWeight(2)
    line(-10,-13,-5,-13);
    line(-5,-13,-2,-14);
    line(-2,-14,5,-13);
    line(5,-13,10,-13);
    line(10,-7,5,-8);
    line(5,-8,0,-7);
    line(0,-7,-5,-7);
    line(-5,-7,-10,-8);
    pop();
    }
}
  laser(x,y,z){
      if(rectHit(-trucam.x+500,-trucam.y+300,this.bx,this.by,1000*100/zoom,600*100/zoom,this.bsx,this.bsy)){
    push();
    translate(x,y);
      rotate(-this.rotation*PI/180);
    strokeWeight(5);
    stroke("#BA8E7A");
    noFill();
    rect(0,0,30,30,3);
    line(12,15,7,25);
    line(-12,15,-7,25);
    line(0,15,0,20)
    rotate(frameCount*PI/180*3);
    rect(0,0,15,15,3);
    pop();
      }
    let sight = [];
    for(var i=0; i<blocks.length; i++){
        if(rectHit(blocks[i].bx,blocks[i].by,x+cos(-this.rotation*PI/180)*300,y+sin(-this.rotation*PI/180))*300,blocks[i].bsx,blocks[i].bsy,30+cos(-this.rotation*PI/180)*600,30+sin(-this.rotation*PI/180)*600){
           sight[sight.length] = blocks[i];
        }
    }
    let lax = x;
    let lay = y;
      for(var c =0; c<50; c++){
        lax+=sin(this.rotation*PI/180)*30;
        lay+=cos(this.rotation*PI/180)*30;
    for(var i=0; i<sight.length; i++){
      if(sight[i].fullCollide){
        if(rectHit(sight[i].bx,sight[i].by,lax,lay,sight[i].bsx,sight[i].bsy,20,20)){
          i=sight.length;
          c=50;
          lax-=sin(this.rotation*PI/180)*15;
          lay-=cos(this.rotation*PI/180)*15;
        }
      }
    }
      }
      this.tx+=(lax-this.tx)/1;
      this.ty+=(lay-this.ty)/1;
      if(this.reload>=0&&this.reload<=10){
      push();    
      x+=sin(this.rotation*PI/180)*30;
      y+=cos(this.rotation*PI/180)*30;
      strokeWeight(5)
      stroke("#DEC6B8");
      line(x,y,this.tx,this.ty);
      stroke("#DEC6B86D");
      strokeWeight(10)
      line(x,y,this.tx,this.ty);
      strokeWeight(15)
      line(x,y,this.tx,this.ty);
      pop();
      push();
      noStroke();
      fill(255,50);
      ellipse(x,y,10,10)
      ellipse(x,y,20,20)
      ellipse(x,y,25,25)
      ellipse(this.tx,this.ty,15,15)
      ellipse(this.tx,this.ty,25,25)

      pop();
        
      if(frameCount%10==0){
      bulletsP[bulletsP.length] = new bulletP(x,y,x+sin(this.rotation*PI/180+random(-0.2,0.2))*30,y+cos(this.rotation*PI/180+random(-0.2,0.2))*30,random(5,10));
        bulletsP[bulletsP.length] = new bulletP(lax,lay,lax-sin(this.rotation*PI/180+random(-0.2,0.2))*30,lay-cos(this.rotation*PI/180+random(-0.2,0.2))*30,random(5,10));
      }
      if(frameCount%4==0){
      bulletsP[bulletsP.length] = new bulletP(lax,lay,lax-sin(this.rotation*PI/180+random(-1.5,1.5))*30,lay-cos(this.rotation*PI/180+random(-1.5,1.5))*30,random(2,5));
      }
      if(this.rotation%180==90){
      if(rectHit((x+lax)/2,(y+lay)/2,player1.px,player1.py,abs(x-lax),10,30,30)&&player1.collide == true){
        player1.respawn();
      }
        fill(255,0,0)
        //rect((x+lax)/2,(x+lay)/2);
      }else{
        if(rectHit((x+lax)/2,(y+lay)/2,player1.px,player1.py,10,abs(y-lay),30,30)&&player1.collide == true){
        player1.respawn();
      }
      }
      }
      if(this.reload==0){
        for(var i=0; i<20; i++){
        bulletsP[bulletsP.length] = new bulletP(x,y,x+sin(this.rotation*PI/180+random(-0.1,0.1))*30,y+cos(this.rotation*PI/180+random(-0.1,0.1))*30,random(5,15));
        }
        this.tx = x;
        this.ty = y;
      }
}
}
class bpart{
   constructor(a,b,c,d,e,f){
    this.sx = a;
    this.sy = b;
    this.sxv = c;
    this.syv = d;
    this.bsx = e;
     this.bsy = f;
    this.life = 60;
     this.ang = 0;
  }
  work(){
    push();
    noFill();
    this.life-=0.3;
    stroke("#66796B");
    translate(this.sx,this.sy);
    this.sx+=this.sxv;
    this.sy+=this.syv;
    this.syv+=1;
    this.sxv/=1.01
    this.ang+=this.sxv;
    rotate(this.ang*PI/180);
    rect(0,0,this.bsx,this.bsy,5);
    pop();
  }
}
