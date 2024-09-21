//// couleur du text
//var cPlay = 210, cExit = 210;
//
//
//function menu(){
//    // 1- prendre le controle du canvas
//    // effacer ce qu'il y'a a l'ecran
//    clear();
//    background(1);
//
//    // 2- installer du texte
//    textSize(50);        
//        fill(110);
//        text('King pong', 100,100);
//        fill(cPlay);
//        play = text('Play', 350,300);
//        fill(cExit);
//        exit = text('Exit', 350,400);
//    
//    // lorsque je survole un des deux menus la couleur change
//}
//
//function changeColor(){
//   if( cPlay == 255){
//    cPlay = 255;}
//    else cPlay = 210;
//}
//
//
//// init the menu
//function setup(){
//    createCanvas(800, 600);
//    background(1);
//    menu();
//}
//
//function draw(){
//    
//    
//}

var cnv;
var color = 10;

function setup() {
    color = 10;
    background(1);  
  cnv = createCanvas(100, 100);  
cnv.mouseOver(changeGrayOv);
  cnv.mouseOut(changeGrayOut);   

}



function draw() {  
  fill(color);
  textSize(20);
  text('King',0,0,50,50);
    
}

function changeGrayOv() {

    if(mouseX >= 0 && mouseY >=0)
        color = 210;

}

function changeGrayOut() {

    if(mouseX > 70 && mouseY > 70)color=10;

}