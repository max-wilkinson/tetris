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


// var controller = Leap.loop({enableGestures: true}, function(frame){
//   console.log("got a frame");
//   console.log(frame.currentFrameRate);
//   var num_fingers = 0;
//   if(frame.valid && frame.hands.length > 0)
//   {
//     var hand = frame.hands[0];

//     var pinch = hand.pinchStrength.toPrecision(2);
//     console.log("num_fingers is:");
//     console.log(num_fingers);
//     if(pinch > 0)
//     {
//       console.log("rotate");
//       keyPress("rotate");
//     }
//     else if(num_fingers == 2)
//     {
//       console.log("right shift");
//       keyPress("right");
//     }
//     else if(num_fingers == 3)
//     {
//       console.log("left shift");
//       keyPress("left");
//     }

//   }
// });



// controller.on("gesture", function(gesture){
//   //... handle gesture object
//   console.log("got a gesture");


var controller = new Leap.Controller();
var frameDisplay = document.getElementById('frameID');

this.controller.on('connect', function(){
      setInterval(function(){
      var frame = controller.frame();
      if(frame.valid && frame.gestures.length > 0)
      {
        frame.gestures.forEach(function(gesture){
        if(gesture.type == "circle")
        {
            console.log("Circle Gesture");
            keyPress("rotate");
        }
        
        else if(gesture.type == "swipe")
        {
            console.log("Swipe Gesture");
            exec_swipe(gesture);
        }

        })

      }
   }, 250);
});

controller.connect();



//   if(gesture.type == "circle")
//   {
//       console.log("Circle Gesture");
//       if(gesture.state == "stop")
//       {
//         keyPress("rotate");
//       }
//   }
  
//   else if(gesture.type == "swipe")
//   {
//       console.log("Swipe Gesture");
//       if(gesture.state == "stop")
//       {
//         exec_swipe(gesture);
//       }
//   }
// });


//Touch gestures
$('canvas').on("swipeleft", swipeHandler);
$('canvas').on("swiperight", swipeHandler);
$('canvas').on("tap", swipeHandler);
$('canvas').on("swipedown", swipeHandler);

function swipeHandler( event ){
  switch(event.type) {
    case 'swipeleft':
      console.log("swiped left");
      keyPress('left');
      break;
    case 'swiperight':
      console.log("swiped right");
      keyPress('right');
      break;
    case 'tap':
      console.log("tapped");
      keyPress("rotate");
      break;
    case 'swipedown':
      console.log("swiped down");
      break;
  }
}


