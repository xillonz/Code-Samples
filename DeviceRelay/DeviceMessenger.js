// This class has the responsibility of handling communication with devices
// It connects to and recieves messages from devices, and passes them back to the relay
// It can also take in Device IDs and pass messages to them if they exist in their library

class DeviceMessenger{

    constructor(server, library){
        this.server = server; // Websocket server to communicate with devices
        this.library = library; // Library holds the available devices
    }

    setup(messageCallback, connectedCallback = null, disconnectedCallback = null){ 
        let self = this

        this.server.on('connection', function (socket, id) {
            // Close connection if a protocol hasn't been set
            if(!socket.protocol){
                socket.terminate();
                return;
            }

            self.library.save(id, socket);
            
            socket.on('message', function (payload) { 
                messageCallback(id, JSON.parse(payload.toString()));
            });

            socket.on('close', function (code, reason) { 
                self.library.remove(id);     
                if(disconnectedCallback) disconnectedCallback(code, reason.toString());
            });

            if(connectedCallback) connectedCallback(socket);
        });
    }

    send(id, payload){
        let device = this.library.retrieve(id);
        if(device) device.socket.send(JSON.stringify(payload));
    }
}

module.exports = DeviceMessenger;


