class bullet{
  constructor(a,b,c,d,e){
    //x and y projectile
    this.prox = a;
    this.proy = b;
    //x and y target
    this.proxt = c;
    this.proyt = d;
    //speed to move at
    this.speed = e;
    this.rotation = random(0,180);
    this.direction = random(0,100);
    if(this.direction>=50){
      this.direction = 1;
    }else{
      this.direction = -1;
    }
    this.life = 300;
  }
  move(){
    this.life--;
    let hyp = dis(this.prox,this.proy,this.proxt,this.proyt);
    let xv = (this.proxt-this.prox)/hyp*this.speed;
    let yv = (this.proyt-this.proy)/hyp*this.speed;
    this.prox+=xv;
    this.proy+=yv;
    this.proxt+=xv;
    this.proyt+=yv;
    this.rotation+=this.direction*10;
    this.show();
    for(let i=0; i<blocks.length; i++){
      if(rectHit(this.prox,this.proy,blocks[i].bx,blocks[i].by,20,20,blocks[i].bsx,blocks[i].bsy)&&blocks[i].life>0){
         this.life=0;
        for(var c=0; c<20; c++){
          let angle = random(0,2*PI);
          let fast = random(2,9);
          bulletsP[bulletsP.length] = new bulletP(this.prox,this.proy,this.prox+cos(angle)*50,this.proy+sin(angle)*50,fast);
          
          blocks[i].showcv+=6/(blocks[i].bsx*blocks[i].bsy);
          
        }
        blocks[i].broken = true;
        
      }
    }
  }
  show(){
    
    push();
    translate(this.prox,this.proy)
    rotate(this.rotation*PI/180);
    noFill();
    stroke("#DEC6B8");
    ellipse(0,0,20,15);
    pop();
  }
}
class bulletP{
  constructor(a,b,c,d,e){
    //x and y projectile
    this.prox = a;
    this.proy = b;
    //x and y target
    this.proxt = c;
    this.proyt = d;
    //speed to move at
    this.speed = e;
    this.size = floor(random(8,12));
  }
  move(){
    let hyp = dis(this.prox,this.proy,this.proxt,this.proyt);
    let xv = (this.proxt-this.prox)/hyp*this.speed;
    let yv = (this.proyt-this.proy)/hyp*this.speed;
    this.prox+=xv;
    this.proy+=yv;
    this.proxt+=xv;
    this.proyt+=yv;
    this.show();
    this.speed/=1.1;
    this.size-=0.2;
    if(this.size<=0){
      this.size=0;
    }
  }
  show(){
    push();
    translate(this.prox,this.proy)
    fill("#DEC6B8");
    noStroke();
    ellipse(0,0,this.size,this.size);
    pop();
  }
}
//also used for blockP
function bulletShow(){
  for(var i = 0; i<bullets.length; i++){
    bullets[i].move();
  }
  for(var i = 0; i<bulletsP.length; i++){
    bulletsP[i].move();
  }
  for(var i = 0; i<blockP.length; i++){
    blockP[i].work();
  }
}