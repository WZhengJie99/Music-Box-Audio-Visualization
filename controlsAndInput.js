//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput(){

    this.menuDisplayed = false;

    //playback button displayed in the top left of the screen
    this.playbackButton = new PlaybackButton();

    //make the window fullscreen or revert to windowed
    this.mousePressed = function(){
        var isButtonClicked = this.playbackButton.hitCheck();
        //check if mouse is on the GUI panel

        var inGUI=false;
        var inGUI2=false;
        for(var i=0;i<vis.visuals.length;i++)
        {

            if(vis.visuals[i].hasOwnProperty("isMouseInGUI"))
            {
                if(vis.visuals[i].isMouseInGUI() || vis.visuals[i].isMouseInGUI2())
                {
                    inGUI = true;
                    inGUI2 = true;
                    break;
                }
            }
        }
        
        
        if((!inGUI || !inGUI2) && !isButtonClicked)
        {
            //print("in GUI");
            let fs = fullscreen();
            fullscreen(!fs);
        }

        /* var isMouseInBlockGUI = blockMidHighLowApp.isMouseInGUI();
        var isMouseInFireworkGUI = FireworkEffect.isMouseInGUI();
        var isMouseInMusicBoxGUI = musicBox.isMouseInGUI();
        //if not make the visualisation full screen
        if(isButtonClicked == false && isMouseInBlockGUI == false && isMouseInFireworkGUI == false && isMouseInMusicBoxGUI == false)
            {
                let fs = fullscreen();
                fullscreen(!fs);
            }*/
    }

    //responds to keyboard presses
    //@param keycode the ascii code of the keypressed
    this.keyPressed = function(keycode){
        console.log(keycode);
        if(keycode == 32){
            this.menuDisplayed = !this.menuDisplayed;
        }

        if(keycode > 48 && keycode < 58){
            var visNumber = keycode - 49;
            vis.selectVisual(vis.visuals[visNumber].name); 
        }
    };

    //draws the playback button and potentially the menu
    this.draw = function(){
        push();
        fill("white");
        stroke("black");
        strokeWeight(2);
        textSize(34);
        drawingContext.shadowBlur = 0;
        drawingContext.shadowColor = 'off';

        //playback button 
        this.playbackButton.draw();
        //only draw the menu if menu displayed is set to true.
        if(this.menuDisplayed){

            text("Select a visualisation:", 100, 40);
            this.menu();
        }
        else{
            text("Press 'spacebar' for menu", 100, 40);
        }
        pop();

    };

    this.menu = function(){
        for(var i = 0; i<vis.visuals.length; i++)
        {
            text((i+1) + ": " + vis.visuals[i].name, 100, 40+(i+1)*35);
        }
    };
}


