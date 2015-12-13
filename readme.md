## TrackReq-Redis

A module for implementing a lightweight request-tracking system in Redis. 

The intent behind this project is to create an easy-to-use API for tracking client requests on a server, especailly in the context of websockets that sometimes drop. 

### API/ Examples 
    // 
    // In the future this should be changed to 
    // reflect the npm name (e.g., require('trackreq-redis') )
    // 
    var tr = require('./index,js') ;
    
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
    tr.check('ab-123') ;

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
    tr.complete('ab-123') ;

    // 
    // Delete a request.
    // 
    tr.cancel('ab-123') ;



