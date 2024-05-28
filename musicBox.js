/*
  Author: Wong Zheng Jie
  Email: wzhengjie99@gmail.com
*/


var musicBoxColour = '#ffffff';
var musicBoxStrokeColour = '#3d44ff';
var musicNotesColour = '#eeff00';
var musicNotesStrokeColour = '#00ffe1';
var musicBoxBGColour = '#212121';

var musicBoxSize = 0.2;
var musicNotesSize = 2;
var musicBoxStrokeWeight = 4;
var musicNotesStrokeWeight = 3;
var musicNotesSpeed = 2;
var musicNotesAge = 200;

var musicNotesFill = true;
var musicNotesStroke = false;

var randomMusicNotesCol = true;
var randomMusicNotesStrokeCol = false;

var musicNotesShape = ['note', 'circles', 'square', 'triangle', 'star'];

function musicBox()
{
    this.name = "Music Box";

    var musicBox;
    var mainBox;
    var noteEmitter;
    var gui;
    var gui2;

    this.setup = function()
    {
        angleMode(RADIANS);
        rectMode(CENTER)
        mainBox = new MainBox()
        noteEmitter = new NoteEmitter()

        gui = createGui('Audio Visualizer');
        gui.setPosition(width-200, 0);

        sliderRange(0, 255, 1);
        gui.addGlobals('musicBoxColour');
        gui.addGlobals('musicBoxStrokeColour');
        gui.addGlobals('musicNotesColour');
        gui.addGlobals('musicNotesStrokeColour');
        gui.addGlobals('musicBoxBGColour');

        gui.addGlobals('musicNotesShape');

        sliderRange(0, 1, 0.1);
        gui.addGlobals('musicBoxSize');

        sliderRange(0, 10, 1);
        gui.addGlobals('musicNotesSize');
        gui.addGlobals('musicBoxStrokeWeight');
        gui.addGlobals('musicNotesStrokeWeight');
        gui.addGlobals('musicNotesSpeed');

        sliderRange(0, 255, 1);
        gui.addGlobals('musicNotesAge');

        gui.hide();

        gui2 = createGui('Audio Visualizer 2');
        gui2.setPosition(width-400, 0);

        gui2.addGlobals('musicNotesFill');
        gui2.addGlobals('musicNotesStroke');
        gui2.addGlobals('randomMusicNotesCol');
        gui2.addGlobals('randomMusicNotesStrokeCol');

        gui2.hide();
    }
    this.setup();

    this.draw = function()
    {
        background(musicBoxBGColour);
        fourier.analyze();
        var b = fourier.getEnergy("bass");
        var t = fourier.getEnergy("treble");

        if(t)
        {
            noteEmitter.addParticles();
        }
        noteEmitter.updateParticles();
        mainBox.draw(b);
    }

    this.isMouseInGUI = function()
    {
        var inGUI = false;
        var gui_x = gui.prototype._panel.style.left;
        var gui_y = gui.prototype._panel.style.top;
        var gui_height = gui.prototype._panel.clientHeight;
        var gui_width = gui.prototype._panel.clientWidth;

        gui_x = parseInt(gui_x, 10);
        gui_y = parseInt(gui_y, 10);
        gui_height = parseInt(gui_height, 10);
        gui_width = parseInt(gui_width, 10);

        if(mouseX > gui_x && mouseX < gui_x + gui_width)
        {
            if(mouseY > gui_y && mouseY < gui_y + gui_height)
            {
                inGUI = true;
            }
        }
        return inGUI;
    }

    this.isMouseInGUI2 = function()
    {

        var inGUI2 = false;
        var gui2_x = gui2.prototype._panel.style.left;
        var gui2_y = gui2.prototype._panel.style.top;
        var gui2_height = gui2.prototype._panel.clientHeight;
        var gui2_width = gui2.prototype._panel.clientWidth;

        gui2_x = parseInt(gui2_x, 10);
        gui2_y = parseInt(gui2_y, 10);
        gui2_height = parseInt(gui2_height, 10);
        gui2_width = parseInt(gui2_width, 10);

        if(mouseX > gui2_x && mouseX < gui2_x + gui2_width)
        {
            if(mouseY > gui2_y && mouseY < gui2_y + gui2_height)
            {
                inGUI2 = true;
            }
        }
        return inGUI2;
    }

    this.unSelectVisual = function()
    {
        console.log("de select");
        gui.hide();
        gui2.hide();
    }

    this.selectVisual = function()
    {
        console.log("select");
        gui.show();
        gui2.show();
    }

    this.onResize = function()
    {
        gui.setPosition(width-200, 0);
        gui2.setPosition(width-400, 0);
    }
    this.onResize();

}

function MainBox()
{
    this.draw = function(energy)
    {
        //if else statement to make the box shake according to the bass
        if(energy -100 < 70)
        {
            var xpos = -50;
            var ypos = 70;
            drawingContext.shadowBlur = 0;
            drawingContext.shadowColor = 'off';
        }
        else
        {
            var r = random(-5,5);
            var xpos = -50 + r;
            var ypos = 70 + r;
            drawingContext.shadowBlur = 32;
            drawingContext.shadowColor = musicBoxStrokeColour;

        }

        var onoff;
        if(musicBoxSize<=0)
        {
            onoff = 0;
        }
        else if(musicBoxSize > 0)
        {
            onoff = 1;
        }
        var size = onoff + musicBoxSize;

        push();
        fill(musicBoxColour);
        stroke(musicBoxStrokeColour);
        strokeWeight(musicBoxStrokeWeight);

        translate(width / 2, height / 2);

        //shape of the music box
        // left face
        beginShape();
        vertex(xpos *size, ypos *size);
        vertex((xpos + 100) *size, ypos *size);
        vertex((xpos + 100) *size, (ypos + 100) *size);
        vertex((xpos + 20) *size, (ypos + 120) *size);
        vertex(xpos *size, (ypos + 100) *size);
        endShape(CLOSE);

        // front face
        beginShape();
        vertex((xpos + 20) *size, (ypos + 20) *size);
        vertex((xpos + 120) *size, (ypos + 20) *size);
        vertex((xpos + 120) *size, (ypos + 120) *size);
        vertex((xpos + 20) *size, (ypos + 120) *size);
        endShape(CLOSE);


        // top face
        beginShape();
        vertex(xpos *size, ypos *size);
        vertex((xpos + 20) *size, (ypos + 20) *size);
        vertex((xpos + 120) *size, (ypos + 20) *size);
        vertex((xpos + 100) *size, ypos *size);
        endShape(CLOSE);

        fill(musicBoxStrokeColour);
        switch(musicNotesShape)
        {
            case 'note':
                triangles(3, (xpos+76)*size, (ypos+44)*size, size*7.4);
                rect((xpos+73)*size, (ypos+60)*size, size*4, size*40);
                ellipse((xpos+65)*size, (ypos+80)*size, size*20);
                break;

            case 'circles':
                ellipse((xpos+70)*size, (ypos+70)*size, size * 43);
                break;

            case 'square':
                rect((xpos+70)*size, (ypos+70)*size, size*40, size*40);
                break;

            case 'triangle':
                triangles(3, (xpos+70)*size, (ypos+75)*size, size*53);
                break;

            case 'star':
                drawStar(5, (xpos+70)*size, (ypos+70)*size, size*17*3, size*7*3);
                break;
        }

        pop();    
    }

}


//note particles
function NoteParticles(x, y, color, strokeColor)
{
    this.x = x;
    this.y = y;
    this.color = color;
    this.strokeColor = strokeColor
    this.size = musicNotesSize;
    this.age = musicNotesAge;

    //particles angle
    const angleRange = Math.PI * 0.5;
    this.angle = angleRange * Math.random() + Math.PI / 0.8;

    this.draw = function()
    {
        drawingContext.shadowBlur = 0;
        drawingContext.shadowColor = 'off';
        if(musicNotesFill == true)
        {
            fill(this.color);
        }
        else
        {
            noFill();
        }
        if(musicNotesStroke == true)
        {
            stroke(this.strokeColor);
            strokeWeight(musicNotesStrokeWeight);
        }
        else
        {
            noStroke();
        }

        rectMode(CENTER)
        switch(musicNotesShape)
        {
            case 'note':
                triangles(3, this.x+(this.size*4.1), this.y-(this.size*18.1), this.size*3.7);
                rect(this.x+(this.size*3), this.y-(this.size*10), this.size*2, this.size*20);
                ellipse(this.x, this.y, this.size * 10);
                break;

            case 'circles':
                ellipse(this.x, this.y, this.size * 10);
                break;

            case 'square':
                rect(this.x, this.y, this.size*10, this.size*10);
                break;

            case 'triangle':
                triangles(3, this.x, this.y, this.size*15);
                break;

            case 'star':
                drawStar(5, this.x, this.y, this.size*17, this.size*7);
                break;
        }
    }

    this.update = function()
    {
        const speed = musicNotesSpeed;

        this.x += Math.cos(this.angle) * speed;
        this.y += Math.sin(this.angle) * speed;

        this.age--;
    }
}

function NoteEmitter()
{
    this.particles = [];
    this.addParticles = function()
    {
        var n_colour = null;
        var nStroke_colour = null;
        var r = random(0,255);
        var g = random(0,255);
        var b = random(0,255);
        var c = color(r, g, b);

        if(randomMusicNotesCol == true)
        {
            n_colour = c;
        }
        else
        {
            n_colour = musicNotesColour;
        }

        if(randomMusicNotesStrokeCol == true)
        {
            nStroke_colour = c;
        }
        else
        {
            nStroke_colour = musicNotesStrokeColour;
        }

        var n_x = random(width * 0.45, width * 0.55);
        var n_y = random(height * 0.5, height * 0.55);
        var noteParticle = new NoteParticles(n_x, n_y, n_colour, nStroke_colour);
        this.particles.push(noteParticle);
    }

    this.updateParticles = function()
    {
        for(var i = 0; i < this.particles.length; i++)
        {
            this.particles[i].draw();
            this.particles[i].update();
            if(this.particles[i].age <=0)
            {
                this.particles.splice(i, 1);
            }
        }
    }
}

function triangles(n, x, y, d) {
    beginShape();
    for(var i = 0; i < n; i++) {
        var angle = TWO_PI / n * i;
        var px = x + sin(angle) * d / 2;
        var py = y - cos(angle) * d / 2;
        vertex(px, py);
    }
    endShape(CLOSE);
}

function drawStar(n, x, y, d1, d2) {
    beginShape();
    for(var i = 0; i < 2 * n; i++) {
        var d = (i % 2 === 1) ? d1 : d2;
        var angle = PI / n * i;
        var px = x + sin(angle) * d / 2;
        var py = y - cos(angle) * d / 2;
        vertex(px, py);
    }
    endShape(CLOSE);
}