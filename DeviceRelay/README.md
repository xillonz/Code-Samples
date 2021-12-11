## Device Relay Sample

### Tech
Node.js, Redis, websockets

### Description
A piece of a larger scalable architecture to handle relaying of messages between IoT devices and an API server using HTTP.
Dependencies are largely externalised and initialised at app startup. An example of this is that the server stores connected devices
within an in-memory Library, however this is initialised in it's own class so other storage systems could be used instead if needed
without modifying the relay code. 