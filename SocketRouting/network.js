var io
var HubRepository = require('../hubs/hubRepository')
var Response = require('../response')
var userHelper = require('../helpers/user')
var userService = require('./userService')
var controllerRepository = require('./controllerRepository')
var config = require('../../config/config');

function setupConnectionHandler() {
    io.on('connection', function (socket) {
        userHelper.initSession(socket.handshake.session, socket.id);
        controllerRepository.setupRequestHandlersForConnection(socket, requestHandler);

        socket.on('disconnect', function () {
            let UserService = new userService();
            UserService.hubRepository = new HubRepository(socket, io);
            UserService.socket = socket
            UserService.session = socket.handshake.session
            UserService.disconnect()
        });
    });
}

async function requestHandler(msg, controller, action, route, socket) {
    try {
        controller.rsp = new Response(route, socket);
        controller.hubRepository = new HubRepository(socket, io);
        controller.socket = socket;
        controller.io = io;
        controller.msg = msg;
        controller.session = socket.handshake.session
        checkAuth(action, controller, socket);
        await controller[action](msg);
    } catch (e) {
        controller.rsp = e;
        console.log(e);
    }

}

function checkAuth(action, controller, socket) {
    // Authenticate the user

    // TODO: perhaps update how we are defining logged in
    let isLoggedIn = socket.handshake.session && socket.handshake.session.user && socket.handshake.session.user.id

    if (!controller.anonymous && !controller[action].anonymous && !isLoggedIn) {
        throw controller.rsp.error(401, 'Authentication required');
    }
}

module.exports = function (server, session) {
    var sharedsession = require("express-socket.io-session");
    io = require("socket.io")(server, { origins: config.socket_client });
    io.use(sharedsession(session));
    setupConnectionHandler();
}
