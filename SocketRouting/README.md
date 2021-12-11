## Socket Routing Sample

### Tech
Node.js, Socket.io

### Description
My initial foray into Node.js some years ago, this sample contains a portion of a system to bind socket events to controller methods
so long as established naming conventions are followed. 
This allows the easy creation of additional functionality with routing under appropriate domains being automatic. 
Also adds the optional ability to follow an http-like request/response structure as needed that is not typically available within websockets.
Additionally, provides a pub-sub structure so that clients can automatically recieves updates to any model that they are interested in, regardless of
who made the modifying request.

The structure was completed quickly in order to prove the concept. Were I to return to the project, I would probably take advantage of 
JS classes, restrict responsibilities (such as session management), and externalise dependencies (such as socket.io) so that they can be hotswapped out if in the future I wanted to use a different socket library.