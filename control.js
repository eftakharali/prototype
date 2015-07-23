var message_client = new Messaging.Client("192.168.0.9", 8080, '_' + Math.random().toString(36).substr(2, 9));


message_client.onConnectionLost = function(rc){
     var stateEl = document.getElementById('state');
     stateEl.style.color="#ff6666" ;
     stateEl.innerHTML = 'lost connection';
    
};

message_client.onConnect = function(rc){
     var stateEl = document.getElementById('state');
     stateEl.style.color="#66ff66" ;
     stateEl.innerHTML = 'connect';
};

message_client.onMessageArrived = function(msg) {
    var str = msg.payloadString ;
    str = str.trim() ;
    lastUpdate = new Date().getTime();
    console.log( "message-arrive: " + str ) ;
}


function my_connect(){
    try{
    message_client.connect({onSuccess: message_client.onConnect}) ;
        
    } catch ( e ) {
         var stateEl = document.getElementById('state');
         stateEl.style.color="#ff6666" ;
         stateEl.innerHTML = e.message; // | 'connection error ' ;
	console.log('catch exception');
	console.log(e.message) ;
    }
    

function navigate(mes){
    
 console.log ("owner is "+ gapi.hangout.data.getValue('owner'));
    

    if ( message_client._client.connected ){
         var resEl = document.getElementById('result');
         resEl.style.color="#000000" ;
         resEl.innerHTML = mes;
	
        var message = new Messaging.Message(mes);
        message.destinationName = "topic"+mes ;
        console.log( mes + " to " + message.destinationName ) ;
        message_client.send(message);
    }
}

function my_subscribe(){
    if ( message_client._client.connected ){
        var topic = "grandpa";
        message_client.subscribe(topic);
    }
}

