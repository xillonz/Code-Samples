module.exports = function(route, socket){
	var self = this;
	this.route = route;
	this.status = 'success';
	this.data = {};
	this.subscriptions = [];
    this.msg = '';
	this.statusCode = 200;
	this.socket = socket;

	this.promise = new Promise(function(resolve, reject) {
		self.reject = reject;
		self.resolve = resolve;
	}).then(rsp => {
		console.log('success ', rsp);
        self.socket.emit(route + '/' + rsp.status, rsp);
    }).catch(function(e){
        console.log('error: ', e)
        self.socket.emit(route + '/' + e.status, e);
	})
	
	// dataType - String - Name of model that can be subscribed to
	this.addSubscription = function(dataType) {
		if(this.subscriptions.indexOf(dataType) === -1){
			this.subscriptions.push(dataType)
		}
	}

	this.success = function() {		
		this.resolve({
			route: this.route,
			status: 'success',
			data: this.data,
			msg: this.msg,
			subscriptions: this.subscriptions,
			statusCode: 200
		});
	};	
    
	this.error = function(statusCode, msg) {
		let err = {
			route: this.route,
			status: 'failure',
			msg: msg,
			statusCode: statusCode
		}
		this.reject(err);

		return err;
	}
}
