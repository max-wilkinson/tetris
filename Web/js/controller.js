var most_rec_gest_id = -5;

document.body.onkeydown = function( e ) {
    var keys = {
        37: 'left',
        39: 'right',
        40: 'down',
        38: 'rotate'
    };
    if ( typeof keys[ e.keyCode ] != 'undefined' ) {
        keyPress( keys[ e.keyCode ] );
        render();
    }
};


function exec_swipe(gesture)
{
    var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
    //Classify as right-left or up-down
    if(isHorizontal)
    {
      if(gesture.direction[0] > 0)
      {
          // console.log("gesture.direction is:");
          // console.log(gesture.direction[0]);
          swipeDirection = "right";
          keyPress('right');
      } 
      else 
      {
          swipeDirection = "left";
          keyPress('left');
      }
   }
    else 
    { //vertical
        if(gesture.direction[1] > 0)
        {
          swipeDirection = "up";
        } else 
        {
          swipeDirection = "down";
          keyPress('down');
        }                  
    }
    console.log(swipeDirection);
};


var controller = Leap.loop({enableGestures: true}, function(frame){
  console.log("got a frame");
  var num_fingers = 0;
    if(frame.valid && frame.gestures.length > 0)
    {
      gesture = frame.gestures[0];

      for (var c = 0; c < frame.gestures.length; c++)
      {
        var temp_gest = frame.gestures[c];
        if(temp_gest.id == most_rec_gest_id)
        {
          // console.log("c equals");
          // console.log(c);
          gesture = temp_gest;
          break;
        }
      }

      // frame.gestures.forEach(function(gesture){
        // console.log("gesture id is:");
        // console.log(gesture.id)
        if(gesture.id == most_rec_gest_id)
        { 

          console.log("same gesture");
          // console.log(gesture.duration);
        }
        else if(gesture.type == "circle" && gesture.radius > 90)
        {
            // console.log("radius is: ");
            // console.log(gesture.radius);
            most_rec_gest_id = gesture.id;
            console.log("Circle Gesture");
            keyPress("rotate");
        }
        else if(gesture.type == "swipe")
        {
            // console.log("swipe duration");
            // console.log(gesture.duration);
            most_rec_gest_id = gesture.id;
            console.log("Swipe Gesture");
            exec_swipe(gesture);
        }

      // })

    }
   
});


var frameDisplay = document.getElementById('frameID');



// controller.connect();



//Touch gestures
$('canvas').on("swipeleft", swipeHandler);
$('canvas').on("swiperight", swipeHandler);
$('canvas').on("tap", swipeHandler);
$('canvas').on("swipedown", swipeHandler);

function swipeHandler( event ){
  switch(event.type) {
    case 'swipeleft':
      //console.log("swiped left");
      keyPress('left');
      break;
    case 'swiperight':
      //console.log("swiped right");
      keyPress('right');
      break;
    case 'tap':
      //console.log("tapped");
      keyPress("rotate");
      break;
    case 'swipedown':
      //console.log("swiped down");
      break;
  }
}


//Gamepad gestures
var repGP;
var hasGP = false;

//Check for a Gamepad
 $(window).on("gamepadconnected", function() {
        console.log("connection event");
        hasGP = true;
        repGP = window.setInterval(reportOnGamepad,100);
  });

//Check for Disconnection
$(window).on("gamepaddisconnected", function() {
        console.log("disconnection event");
        window.clearInterval(repGP);
});
 
//Special Connection Check for Chrome
 var checkGP = window.setInterval(function() {
  if(navigator.getGamepads()[0]) {
        if(!hasGP) $(window).trigger("gamepadconnected");
        window.clearInterval(checkGP);
  }
}, 500);


 function reportOnGamepad() {
        var gp = navigator.getGamepads()[0];

        //D-pad
        if(gp.buttons[14].pressed){
              keyPress('left');
        }
        else if(gp.buttons[15].pressed){
              keyPress('right');
        }
        else if(gp.buttons[12].pressed){
              keyPress('rotate');
        } 
        else if(gp.buttons[13].pressed){
              keyPress('down');
        }

        //Triggers
        if(gp.buttons[6].pressed){
              keyPress('rotate');
        }
        else if(gp.buttons[7].pressed){
              keyPress('rotate');
        }

        //Left Joystick
        if(gp.axes[0] > 0.75) {
              keyPress('right');
        }
        else if(gp.axes[0] < -0.75) {
              keyPress('left');
        }
        else if(gp.axes[1] > 0.75) {
              keyPress('down');
        }

        //Right Joystick
        if(gp.axes[2] > 0.75) {
              keyPress('right');
        }
        else if(gp.axes[2] < -0.75) {
              keyPress('left');
        }
        else if(gp.axes[3] > 0.75) {
              keyPress('down');
        }
 }