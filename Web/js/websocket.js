window.onload = function () {

    if (!window.WebSocket) {
        console.log("You don't have support for WebSockets");
        return;
    }

    console.log("Connecting to server...");

    // Initialize a new web socket.
    var socket = new WebSocket("ws://localhost:8181/KinectHtml5");

    // Connection established.
    socket.onopen = function () {
        console.log("Connection successful.");
        socket.send("Hi I'm the browser");
    };

    // Connection closed.
    socket.onclose = function () {
        console.log("Connection closed.");
    }

    // Receive data FROM the server!
    socket.onmessage = function (evt) {
        //status.innerHTML = evt.data;
        switch(evt.data) {
            case 'left':
              console.log("swiped left");
              keyPress('left');
              break;
            case 'right':
              console.log("swiped right");
              keyPress('right');
              break;
            case 'rotate':
              console.log("tapped");
              keyPress("rotate");
              break;
          }

        // Inform the server about the update.
        socket.send("message received");
    };
};