var clientWebSocket = null;

function init(){
    clientWebSocket = new WebSocket("ws://localhost:8080/event");

    window.setInterval(function() {
      var elem = document.getElementById('a.conversation');
      elem.scrollTop = elem.scrollHeight;
    }, 1000);

    document.getElementById("msg.in.b").onkeypress = function(e){
        if (!e) e = window.event;
        var keyCode = e.keyCode || e.which;
        if (keyCode == '13'){
          render(document.getElementById("msg.in.b").value, true);
          sendMessage(document.getElementById("msg.in.b").value);
          document.getElementById("msg.in.b").value = "";
        }
      }

      clientWebSocket.onopen = function() {
          console.log("clientWebSocket.onopen", clientWebSocket);
          console.log("clientWebSocket.readyState", "websocketstatus");
          clientWebSocket.send("event-me-from-browser");
      }

      clientWebSocket.onclose = function(error) {
          console.log("clientWebSocket.onclose", clientWebSocket, error);
          events("Closing connection");
      }

      clientWebSocket.onerror = function(error) {
          console.log("clientWebSocket.onerror", clientWebSocket, error);
          events("An error occured");
      }

      clientWebSocket.onmessage = function(error) {
          console.log("clientWebSocket.onmessage", clientWebSocket, error);
          render(error.data, false);
      }
}

function sendMessage(message){
    clientWebSocket.send(message);
}

function render(responseEvent, a){
    if(a){
        document.getElementById("a.conversation").innerHTML = document.getElementById("a.conversation").innerHTML + '<div id="a.question" class="alert alert-primary" role="alert">'+responseEvent+'</div>';
    } else{
        document.getElementById("a.conversation").innerHTML = document.getElementById("a.conversation").innerHTML + '<div id="a.question" class="alert alert-success" role="alert">'+responseEvent+'</div>';
    }
}
