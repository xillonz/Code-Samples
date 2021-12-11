class Relay{   

    constructor(apiMessenger, deviceMessenger) {
        this.apiMessenger = apiMessenger;
        this.deviceMessenger = deviceMessenger;

        this.apiMessenger.setup((...args) => this.handleAPIMessage(...args)); // Use arrow functions to maintain 'this' reference
        this.deviceMessenger.setup((...args) => this.handledeviceMessage(...args))        
    } 

    // Forwards incoming devices messages to the API
    handledeviceMessage(id, payload){    
        console.log("device MESSAGE: ", id, payload)
        this.apiMessenger.send(id, payload, (...args) => this.handleAPIMessage(...args));
    }

    // Forwards incoming API messages to the relevant device
    handleAPIMessage(id, payload){ 
        console.log("API MESSAGE: ", id, payload)
        this.deviceMessenger.send(id, payload);               
    }
}

module.exports = Relay;