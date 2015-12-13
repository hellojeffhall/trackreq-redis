// Initial vars/consts

const join = require('path').join ;
const fs = require('fs');

const IS_DEV = require('./config.js').IS_DEV;
const PREFIX = require('./config.js').REDIS_KEY_PREFIX ;

const HTTP = require('http');
const HTTP_PORT = require('./config.js').HTTP_PORT ;

const REDIS_PORT = require('./config.js').REDIS_PORT ;
const REDIS = require('ioredis'); 

var redis ;
if( IS_DEV ) {
  redis = new REDIS( { 
    port                   : REDIS_PORT  ,
    showFriendlyErrorStack : true 
  }); 
}
else{
  redis = new REDIS( { 
    port                   : REDIS_PORT  ,
  }); 
}

// End initial vars/consts

var server = HTTP.createServer( function ( request, response ) {
  console.log( 'Requested: ' + request.url ) ;

  if ( request.url === '/script.js' ) {
    response.statusCode = 200 ;
    response.setHeader( 'Content-Type' , 'text/javascript' ) ;

    var to_serve = join( './', 'simple-client' , 'dist' , 'script.js' ) ;
    fs.createReadStream( to_serve ).pipe(response);
  }
  else if ( request.url === '/index.html' || request.url === '/' ) {
    response.statusCode = 200 ;
    response.setHeader( 'Content-Type' , 'text/html' ) ;

    var to_serve = join( './', 'simple-client' , 'dist', 'index.html' ) ;
    fs.createReadStream( to_serve ).pipe(response);
  }
  else {
    response.statusCode = 404 ;
    response.setHeader('Content-Type' , 'text/html' ) ;
    response.end('<h2>Sorry!</h2><br> Nothing found for that URL.');
  } 

}).listen( HTTP_PORT );
console.log('listening on port ' + HTTP_PORT ) ;

//
// Helper functions.
//

var key_result_obj = function (keys_array , results_array) {
  //
  // Takes an array of strings (keys) and maps them
  // onto an object with the corresponding result value
  //
  var returnable_obj = {} ;
  results_array.forEach( function (temp, idx) {
    returnable_obj[ keys_array[idx] ] = results_array[idx] ; 
  });
  return returnable_obj ;
};

//
// Functions for export.
//

var check = function( ID ) {
  //
  // Checks on the status of the request with the given ID.
  // Will return the status as an object with the status and
  // the number of times that this ID has been checked on.
  //
  return new Promise( function ( fulfill, reject ) {
    var keys = ['checks' , 'complete']; 
    redis.hmget( PREFIX + ':request:' + ID, keys )
      .then( function (result) {
        fulfill( key_result_obj(keys,result) ) ; 
      })
      .catch (function (err) {
        reject(err) ;
      });
  });
};

var complete = function ( ID ) {
  //
  // This function completes a request with the given ID.
  //

  return new Promise ( function ( fulfill, reject ) {
    redis.hset( 
      PREFIX + ':request:' + ID , 
      'complete'        , 1 
    )
    .then( function( result ){
      // 
      // Add to our index of pending requests.
      //
      redis.zrem( PREFIX + ':' + 'pending' , ID ) ;
      fulfill( result );
    })
    .catch ( function( err ) {
      reject( err ) ;
    });
  });

};

var add = function ( ID ) {
  //
  // This function adds a request ID to the server if it doesn't exist.
  //

  return new Promise ( function ( fulfill, reject ) {

    redis.hmset( 
      PREFIX + ':request:' + ID , 
      'checks'          , 0 , 
      'complete'        , 0 
    )
    .then( function( result ){ 
      //
      // Add to our index of pending requests. 
      //
      redis.zadd( PREFIX + ':' + 'pending' , Date.now() , ID ) ;
      fulfill( result );
    })
    .catch ( function( err ) {
      reject( err ) ;
    });

  });
};

var cancel = function ( ID ) {
  //
  // Will cancel the request with the given ID. 
  //
  return new Promise(  function( fulfill, reject ) {
    redis.del( PREFIX + ':request:' + ID )
      .then( function( result ) {
        // Don't forget to remove from pending requests.
        redis.zrem( PREFIX + ':' + 'pending' , ID ) ;
        fulfill();       
      })
      .catch( function( err ) {
        reject(err);
      })
    ;
  });
}

var num_pending = function () {
  //
  // Will return the number of 'in progress' requests.
  //
  return new Promise( function( fulfill, reject ){
    redis.zcount( PREFIX + ':' + 'pending' , '-inf' , '+inf')
      .then( function ( result ) {
        fulfill( result );
      })
      .catch( function ( err ) {
        reject( err ) ;
      }) 
    ;
  });
};

var all_pending = function ( ) {
  //
  // Will return all pending requests as an array of objects.
  //
  return new Promise( function( fulfill, reject ){
    redis.zrange( PREFIX + ':' + 'pending' , 0 , -1, 'WITHSCORES' )
      .then( function (result_all_pending ) {
        fulfill( result_all_pending );
      })
      .catch( function (err ) {
        reject( err ) ;
      })
    ;
  });
};

var test_redis_connection = function() {
  redis.setnx('test_ID' , 0);     
  redis.incr('test_ID'); 
  var result = redis.get('test_ID');

  return new Promise( function ( fulfill, reject ) {
    var err = result === null;
    if ( !err ) {
      fulfill( result );
    }
    else {
      reject({ error : -1});
    }
  });
}
// 
// Export
//

module.exports = {
  add                   : add         ,
  check                 : check       ,
  cancel                : cancel      ,
  num_pending           : num_pending ,
  all_pending           : all_pending ,
  complete              : complete    ,
  test_redis_connection : test_redis_connection 
}
