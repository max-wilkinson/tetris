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

var controller = Leap.loop({enableGestures: true}, function(frame){
  console.log("got a frame");
});

controller.on("gesture", function(gesture){
  //... handle gesture object
  console.log("got a gesture");
  switch (gesture.type){
          case "circle":
              console.log("Circle Gesture");
              keyPress("rotate");
              break;
          case "keyTap":
              console.log("Key Tap Gesture");
              break;
          case "screenTap":
              console.log("Screen Tap Gesture");
              break;
          case "swipe":
              console.log("Swipe Gesture");
              exec_swipe(gesture);
              break;
        }
});