## TrackReq-Redis

###About
A module for implementing a lightweight request-tracking system in Redis. 

The intent behind this project is to create an easy-to-use API for tracking client requests on a server, especailly in the context of websockets that sometimes drop. You *could* just store requests in a JavaScript array in Node, but in a clustered node configuration that array would not be shared between processes. By tracking requests in a Redis instance, all Node processes can check the status of a request. In addition, other services can easily use the API for other purposes, e.g., the included web-based GUI for human monitoring of incomplete requests.

###Lifecycle
* A client sends a request with an ID,  and expects the server to issue a confirmation when the request has been processed.
* If the server doesn't respond in a timely fashion, the client can ask the server the status of the previous request.
* The server determines whether or not the request was completed, or whether or not it was even recieved.
* The client continues waiting if the request is still processing, or resubmits the request if the server never recieved it.

### API/ Examples 
```javascript
// 
//In the future this should be changed to 
// reflect the npm name (e.g., require('trackreq-redis') )
// 
var tr = require( './index,js' ) ;

// 
// To test the connection with Redis.
// 
tr.test_redis_connection() ;

// 
// Add a request with the given ID. 
// 
tr.add( 'ab-123' ) ;

// 
// Check on the request with the given ID.
// 
tr.check( 'ab-123' ) ;

// 
// Get the number of incomplete requests.
// 
tr.num_pending() ;

// 
// Get an array of incomplete requests represented by objects.
// 
tr.all_pending() ;

// 
// Mark a request with a given ID as complete.
// 
tr.complete( 'ab-123' ) ;

// 
// Delete a request, e.g., if the client wants to 
// cancel a request before it has finished processing.
// 
tr.cancel( 'ab-123' ) ;
```


