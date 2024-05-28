/*
  Author: Wong Zheng Jie
  Email: wzhengjie99@gmail.com
*/


//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

function preload(){
    sound = loadSound('assets/stomper_reggae_bit.mp3');
}

function setup(){
    createCanvas(windowWidth-5, windowHeight-5);
    background(0);
    controls = new ControlsAndInput();

    //instantiate the fft object
    fourier = new p5.FFT();

    //create a new visualisation container and add visualisations
    vis = new Visualisations();
    
    vis.add(new musicBox());

}

function draw(){
    background(0);
    drawingContext.shadowBlur = 0;
    drawingContext.shadowColor = 'off';
    //draw the selected visualisation
    vis.selectedVisual.draw();
    //draw the controls on top.
    controls.draw();
}

function mouseClicked(){
    controls.mousePressed();
}

function keyPressed(){
    controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized(){
    resizeCanvas(windowWidth-5, windowHeight-5);
    if(vis.selectedVisual.hasOwnProperty('onResize')){
        vis.selectedVisual.onResize();
    }
}
