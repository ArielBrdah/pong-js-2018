// main objects
var p1, p2, ball, time, timeleft=60, score, sound, point, win, isPlaying, winner='', choose,c=true, gong, skipMenu=false, skipInst= false, go, goleft, starting = false,ready,hurryup,t1,t2;

// instruction
var inst = 'Welcome to the pong, \nThe first player need to use up-arrow to move up and down-arrow to move down.\nThe second player use 1 to move up and 2 to move down. \nThe main goals, first of two which have the biggest score, in the timelapse, win. \nEnjoy ! click here to play';

// menu presentation, font color
var home ='KING PONG 30\' \n by Arielou ', colorH = 'blue',colorM='red', colorInst='red',colorTime=180;


function startTimer() {
    timeleft--;
    if(timeleft<10){
        colorTime = 'red';
        hurryup.play();
    }
}

function goTimer(){
    if(goleft>1){
    hurryup.play();}
    goleft--;
}

function instruction(){
    clear();
    background(10);
    fill(colorInst);
    textSize(20);
    text(inst,10,100);
    //10 a 725 80 a 210
    if(mouseX<=725 && mouseX >= 10 && mouseY <= 210 && mouseY>=80){
        colorInst='gray';
        if(c){
        choose.play();
        c=false;
        }
    }else {colorInst='red';
          c = true;}
    
    
    if(mouseIsPressed && colorInst=='gray')
    {
        skipInst = true;
        isPlaying = true;
        colorInst='red';
        reinit();
    } 
}

function menu(){

    // 1- prendre le controle du canvas
    // effacer ce qu'il y'a a l'ecran
    clear();
    
    // 2- installer du texte
    background(10);
    textSize(40);        
    fill(colorH);
    text(home, 100,40);
    fill(colorM);
    text('Play', 100,200,100,100);
    fill('gray');
    text(winner,400,500);
    
    
    if( mouseY >= 210 && mouseY <=250 && mouseX >= 100 && mouseX <=180 ){
        
        colorM='gray';
        if(c){
        choose.play();
        c=false;
        }
          // si la souris a cliquer et que isPlaying est true
    // alors relance la partie
    if(mouseIsPressed)
    {   
        c = true;
        skipMenu=true;
        skipInst=false;
        instruction();
    }   
    }else{ colorM='red';
         c =true;
         }
    
    
  

}

function endTimer(){
    if(timeleft == 0){ 
        
      if(score.player1  > score.player2){
            winner ='player 1 win !';
        }
      else if(score.player2 > score.player1){
          winner = 'player 2 win! ';}
      else if( score.player1 == score.player2 ){
          winner = 'DRAW !';
      }
        goleft=3;
        colorTime = 180;
        starting = false;
        isPlaying = false;
        skipMenu = false;
        skipInst = true;
        win.play();
        clearInterval(time);
        menu();
    }
}

function pong(){
    // Back ( Color )
    background(1);
    back();
    
    
    // Time, Score ( Top corner )
    score.show();
    
    // Players ( Bottom corner )
    p1.update();
    p1.show();
    p2.update();
    p2.show();
    
    if(goleft>0){
        textSize(200);
        text(goleft,350,300);
    }
    if(goleft==0){    
    clearInterval(go);
    // Ball ( Bottom corner )
    ball.update();
    ball.show();
    if(!starting){
        gong.play();
    time = setInterval(startTimer,1000); /* start */
    starting=true;
    }
    endTimer();

    }
}


// init the game ( executed one time )
function setup(){

    createCanvas(800, 600);
    p1 = new Player1(); /* instanciation for the player */
    p2 = new Player2(); /* instanciation for the player */
    ball = new Ball(); /* init ball */
    score = new Score(); /* init score */
    sound = new Audio('hit.wav');
    point = new Audio('point.wav');
    win = new Audio('win.wav');
    choose = new Audio('choose.mp3');
    gong = new Audio('gong.mp3');
    ready = new Audio('ready.wav');
    hurryup = new Audio('hurryup.wav');
    t1 = new Audio('raqt1.wav');
    t2 = new Audio('raqt2.wav');
    isPlaying = false;
    skipMenu = false;
    skipInst= true;
}

function draw(){

    if(isPlaying){
    
        pong();
    
    }
    
    if(!skipMenu) menu();
    if(!skipInst) instruction();
    //document.getElementsByTagName("P")[0].innerHTML = "mouseX: "+mouseX+' mouseY: '+mouseY;
    
}

// Background
function back(){
    fill(100);
    rect(0,0,800,100);
}

/* Reset, Restart the game */
function reset(){
    // position
    ball.x = width/2;
    ball.y = height/2;
    
    // trajectoire
    ball.angle = getRandomInt();
    
    // speed
    ball.xSpeed = -5 * Math.cos(ball.angle);
    ball.ySpeed = -5 * Math.sin(ball.angle);
}

function reinit(){
    
    // restart the game
    goleft=3;
    timeleft=30; /* time */
    score.player1=0; /* player */
    score.player2=0; /* player */ 
    reset(); /* reset the ball */
    ball = new Ball();
    go = setInterval(goTimer,1000);
    starting=false;
    hurryup.play();
    //ready.play();

}
/* End of reset restart the game */

function Score(){
    this.player1 = 0;
    this.player2 = 0;
    
    this.show = function(){
        textSize(50);        
        fill(150);
        text(this.player1, 100,40);        
        fill(150);
        text(this.player2, width-100,40);
        fill(colorTime);
        textSize(100);
        text(timeleft, width-460,80);
    }
}

function Player1(){
    
    // handle
    this.y = 300; /* a quelle position sur l'ordonne apparait la raquette */
    this.ySpeed = 10; /* a quelle vitesse se deplace la raquette */
    
    // static
    this.x = 20; /* a quelle position sur l'abscisse la raquette restera */
    
    
    this.update = function(){ /* Cette fonction actualise instantanement le controlle que le joueur aura choisi */
        
        /* lorsque l'on appuie sur la fleche du haut */
        if(!this.constrainUP() 
               && keyIsDown(UP_ARROW) )
            {
                this.y -= this.ySpeed; /* la raquette decremente sa valeur sur l'axe des ordonnes ce qui conduit le deplacement de la raquette vers le haut */
            }
        
        /* lorsque l'on appuie sur la fleche du bas */
            if(!this.constrainDOWN() 
               && keyIsDown(DOWN_ARROW) )
            {
                this.y += this.ySpeed; /* la raquette incremente cremente sa valeur sur l'axe des ordonnes ce qui conduit le deplacement de la raquette vers le bas */
            }
    }
    
    /* si la raquette arrive a cette coordonnee elle touche le mur du haut et donc ne peut aller plus haut */
    this.constrainUP = function(){
        if(this.y - 10 < 100)return true;}
    
    /* si la raquette arrive a cette coordonne elle touche le mur du bas et ne peut pas aller plus bas */
    this.constrainDOWN = function(){
        if(this.y + 10 > 520)return true;}
    
    this.show = function(){ /* l'image de l'objet que j'ai choisi, elle represente notre raquette */ 
        
        rect(this.x,this.y,15,80);                  
    }
}

function Player2(){ /* voir le premier joueur */
    
    // coordonne de l'ordonnee
    this.y = 300;
    this.ySpeed = 10;
    
    // coordonne de l'abscisse
    this.x = width - 40;
    
    this.update = function(){ /* donne moi la position du deuxieme joueur */
        
        /* appuie de la fleche du haut : deplace la raquette vers le haut de l'axe des ordonnes */
        if(!this.constrainUP() 
               && keyIsDown(49) )
            {
                this.y -= this.ySpeed;
            }
        
        /* appuie de la fleche du bas : deplace la raquette vers le bas de l'axe des ordonnes */
        if(!this.constrainDOWN() 
               && keyIsDown(50) )
            {
                this.y += this.ySpeed;
            }
    }
    
    this.constrainUP = function(){/* le mur du haut */
        
        if(this.y - 10 < 100)return true;
    }
    
    this.constrainDOWN = function(){/* le mur du bas */
        
        if(this.y + 10 > 520)return true;
    }
    
    this.show = function(){ /* representation graphique de la raquette sur la toile, avec l'abscisse et l'ordonne */ 
        
        rect(this.x,this.y,15,80);
                }
}

function getRandomInt(){ /* genere moi une valeur pour les fonctions sinus et cosinus de sorte a avoir des trajectoires aleatoires differentes */

    var ale = 0; /* variable aleatoire */
    
  while( ale <= 2 && ale >=-2 ){
  
      /* si la valeur aleatoire est comprise entre 1 et -1, genere moi une autre valeur */
      ale = Math.random() * ( (2*Math.PI) - ( (1/4)*Math.PI ) + ((1/4)*Math.PI));
  }
    return ale;
}

function Ball(){ /* representation oriente objet de la balle, et de ses collisions  */
    
    /* parametre initiale de la balle */
    
    // position initial de la balle au milieu du jeu
    this.x = (width/2) ;
    this.y = (height/2);
    
    // trajectoire initial de la balle
    this.angle = getRandomInt();
    
    // speed : les coordonnes ne sont pas lineaire,
    this.xSpeed = -5 * Math.cos(this.angle);
    this.ySpeed = -5 * Math.sin(this.angle);
    
    this.show = function(){ /* representation graphique de la balle dans le jeu */
        fill(255,0,255);
        rect(this.x,this.y,20,20);}
    
    this.update = function(){ /* incremente ou decremente les coordonnes de facons lineaire selon l'angle attribuer jusqu'a prochaine collision */
        
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.collision();
    
    }
    
    this.collision = function(){/* la fonction collision determine le rebond de la balle ou le point attribuer si celle ci n'est pas recepter */
        
    /* des que la balle arrive sur ce point de l'abscisse alors: */
    if( (this.x+20) >= (p2.x) )
    {
    
    /* si la balle arrive sur la raquette */
    if( (this.y+20) >= p2.y && this.y <= (p2.y+80)){
                //sound.play();
        t1.play();
        t2.play();
        if( (this.y+20) > p2.y ){
            
            var tmp = ((((this.y+20) - p2.y)/10)+'').substr(0,1);
            tmp = parseInt(tmp);
            
                switch(tmp){
                        
                   case 0:
                   this.xSpeed += Math.cos(1/2);this.ySpeed += Math.sin(Math.sqrt(3)/2);
                   break;
                            
                   case 1:
                   this.xSpeed += Math.cos(Math.sqrt(2)/2);this.ySpeed += Math.sin(Math.sqrt(2)/2);
                   break;
                        
                   case 2:
                   this.xSpeed += Math.cos(Math.sqrt(3)/2);this.ySpeed += Math.sin(1/2);
                   break;
                        
                   case 3:
                   this.xSpeed += Math.cos(0);this.ySpeed += Math.sin(0);
                   break;
                        
                   case 4:
                   this.xSpeed += Math.cos(0);this.ySpeed += Math.sin(0);
                   break;
                        
                   case 5:
                   this.xSpeed += -Math.cos(Math.sqrt(3)/2);this.ySpeed += -Math.sin(1/2);
                   break;
                        
                   case 6:
                   this.xSpeed += -Math.cos(Math.sqrt(2)/2);this.ySpeed += -Math.sin(Math.sqrt(2)/2);
                   break;
                        
                    case 7:case 8:
                   this.xSpeed += -Math.cos(1/2);this.ySpeed += Math.sin(Math.sqrt(3)/2);
                   break;
                        
                   }
        }
        
        if(this.xSpeed < 10 ){
        /* retourne la balle vers l'adversaire */
         this.xSpeed *= -1.1;}
        else this.xSpeed *= -1;
        
        if(keyIsDown(UP_ARROW))
        this.ySpeed *= 1.1;
        if(keyIsDown(DOWN_ARROW))
        this.ySpeed *= -1.1;

    }
    else{ /* si la balle n'arrive pas sur la raquette donne le point a l'autre joueur */
    point.play();
    score.player1++;
    reset();
    }
        
    }
    
    /* des que la balle arrive sur ce point de l'abscisse alors: */    
    if( this.x <= (p1.x+15) )
    {    
    
    /* si la balle arrive sur la raquette */
    if( (this.y+20) >= p1.y && this.y <= (p1.y + 80)){
                //sound.play();
t1.play();
        t2.play();
        if((this.y+20) > p1.y){
                
            // ici on divise la raquette en huit points
            // chaque point va modifier la trajectoire de la balle
            var tmp = ((((this.y+20) - p1.y)/10)+'').substr(0,1);
            tmp = parseInt(tmp);
            
                switch(tmp){
                        
                   case 0:
                   this.xSpeed += Math.cos(1/2);this.ySpeed += Math.sin(Math.sqrt(3)/2);
                   break;
                            
                   case 1:
                   this.xSpeed += Math.cos(Math.sqrt(2)/2);this.ySpeed += Math.sin(Math.sqrt(2)/2);
                   break;
                        
                   case 2:
                   this.xSpeed += Math.cos(Math.sqrt(3)/2);this.ySpeed += Math.sin(1/2);
                   break;
                        
                   case 3:
                   this.xSpeed += Math.cos(0);this.ySpeed += Math.sin(0);
                   break;
                        
                   case 4:
                   this.xSpeed += Math.cos(0);this.ySpeed += Math.sin(0);
                   break;
                        
                   case 5:
                   this.xSpeed += -Math.cos(Math.sqrt(3)/2);this.ySpeed += -Math.sin(1/2);
                   break;
                        
                   case 6:
                   this.xSpeed += -Math.cos(Math.sqrt(2)/2);this.ySpeed += -Math.sin(Math.sqrt(2)/2);
                   break;
                        
                    case 7:case 8:
                   this.xSpeed += -Math.cos(1/2);this.ySpeed += Math.sin(Math.sqrt(3)/2);
                   break;
                        
                   }
        }
        
        /* retourne la balle vers l'adversaire */
        this.xSpeed *= -1.1;
        if(keyIsDown(UP_ARROW))
        this.ySpeed *= 1.1;
        if(keyIsDown(DOWN_ARROW))
        this.ySpeed *= -1.1;

        
    }
        
    else{ /* la balle n'arrive pas sur la raquette donne le point a l'autre joueur */
       point.play();
    score.player2++;
    reset();
    }
        
    }
      
        
    /* si la balle touche le mur du bas/ du haut */
    if( (this.y+10 >= 600) || (this.y <= 100)){
        sound.play();
     this.ySpeed = -1 * this.ySpeed;}
    
    }
    
}