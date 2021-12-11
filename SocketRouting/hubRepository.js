var hubs = {};
var fs = require('fs');

fs.readdir('./app/hubs', (err, files) => {
	files.forEach(file => {
		if (file.endsWith("Hub.js")) {
			createHub(file);
		}
	});
});

function HubRepository (socket, io) {
	this.socket = socket
	this.io = io
}

createHub = function(filename){
	var name = filename.substring(0, filename.length - 6);
	hubs[name] = require('./' + filename);
}

HubRepository.prototype.getHubContext = function(hubName){
	var hub = new hubs[hubName]();
	hub.socket = this.socket;
	hub.io = this.io;


	hub.subscriptions = []
	hub.addSubscription = function(dataType){
		if(this.subscriptions.indexOf(dataType) === -1){
			this.subscriptions.push(dataType)
		}
	}
	
	return hub;
}

module.exports = HubRepository
