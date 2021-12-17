
var trex ,trex_running;
var edges;
var solo, soloimg;
var solo2
var nuvemimg;
var c1,c2,c3,c4,c5,c6
var estado = "JOGAR"
var gcactos;
var gnuvens;
var trexcollided
var goImg
var go
var restart
var restartImg
var pontuacao=0
var die
var jump
var checkPoint
var velocidade=0
var teste

function preload(){ // funç~;ao que carregar todas as imagens e animações
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
nuvemimg = loadImage("cloud.png")
  soloimg= loadImage("ground2.png")
  c1= loadImage("obstacle1.png")
  c2= loadImage("obstacle2.png")
  c3= loadImage("obstacle3.png")
  c4= loadImage("obstacle4.png")
  c5= loadImage("obstacle5.png")
  c6= loadImage("obstacle6.png")
  trexcollided= loadAnimation("trex_collided.png")
  goImg=loadImage("gameOver.png")
  restartImg=loadImage("restart.png")
die=loadSound("die.mp3")
jump=loadSound("jump.mp3")
checkPoint=loadSound("checkPoint.mp3")


}

function setup(){ // todas as configuraçoes dos objetos
  createCanvas(600,200)
  
  //crie um sprite de trex
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running",trex_running);
  trex.addAnimation("collided",trexcollided);
  trex.scale = 0.5;

  edges = createEdgeSprites();
 
  solo = createSprite(300,190,600,20);
  solo.addImage(soloimg)

solo2= createSprite(300,200,600,10);
solo2.visible=false

gcactos=new Group()
gnuvens= new Group()

go= createSprite(250,90,10,10)
go.addImage(goImg)
go.visible=false
restart= createSprite(245,135,10,10)
restart.addImage(restartImg)
restart.visible=false

trex.setCollider("circle",0,0,30)
//trex.debug=true
}

function draw(){
  background("white ");

  text("pontuação: "+ pontuacao,410,25)

//text(mouseX+","+mouseY,mouseX,mouseY)

  if (estado === "JOGAR"){
    pontuacao++
    if (solo.x<0){
      solo.x= solo.width/2
    }
    if(keyDown("space")&&trex.y>160){
      trex.velocityY = -10;
    jump.play()
    }
    if(trex.isTouching(gcactos)){
      estado = "ENCERRAR"
    die.play()
    }

    if (pontuacao%100===0){
      checkPoint.play()
      velocidade=velocidade+1
    }
    gerarnuvem()
gerarcactos()
    trex.velocityY = trex.velocityY + 0.5; // gravidade
  solo.velocityX = -(3+velocidade)
 } else if (estado === "ENCERRAR"){
   solo.velocityX = 0
  gnuvens.setVelocityXEach(0)
  gcactos.setVelocityXEach(0)
  gnuvens.setLifetimeEach(-1)
  gcactos.setLifetimeEach(-1)
  trex.changeAnimation("collided",trexcollided)
  restart.visible=true
  go.visible=true
  trex.velocityX=0
  trex.velocityY=0

if (mousePressedOver(restart)){
  estado="JOGAR"
gcactos.destroyEach()
gnuvens.destroyEach()
go.visible=false
restart.visible=false
trex.changeAnimation("running",trex_running)
pontuacao=0
}

} 


 
  trex.collide(solo2)


  drawSprites(); 
}

function gerarnuvem(){
 if (frameCount%60===0){
  var nuvem = createSprite(600,100,20,30)
  nuvem.velocityX = -3
  nuvem.y = Math.round(random(10,125))
nuvem.addImage(nuvemimg)
nuvem.depth=trex.depth-1
nuvem.lifetime=220
gnuvens.add(nuvem)
}
 }

 function gerarcactos(){
 
 if (frameCount%60=="0"){
  var cactos = createSprite(600,180,10,40)
 cactos.velocityX= -(4+velocidade)
 cactos.scale=0.5
 gcactos.add(cactos)
 cactos.lifetime=220 
 var cactosaleatorios = Math.round(random(1,6))
 switch(cactosaleatorios){
   case 1: cactos.addImage(c1)
   break

   case 2: cactos.addImage(c2)
   break

   case 3: cactos.addImage(c3)
   break

   case 4: cactos.addImage(c4)
   break

   case 5: cactos.addImage(c5)
   break

   case 6: cactos.addImage(c6)
   break
 }
}
}
  