// Initial vars/consts

const HTTP = require('http');
const HTTP_PORT = require('./config.js').HTTP_PORT ;
const REDIS_PORT = require('./config.js').REDIS_PORT ;
const REDIS = require('ioredis'); var redis = new REDIS( REDIS_PORT ); 
// End initial vars/consts

var server = HTTP.createServer( function ( request, response ) {
  response.end('OK!!');    
}).listen( HTTP_PORT );
console.log('listening on port ' + HTTP_PORT ) ;

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
    var err;
    if (err === undefined ) {
      var result = { status : 'Test status' , checks : '1' };
      fulfill( result );
    }
    else {
      reject({ error : -1});
    }
  });
};

var add = function ( ID ) {
  //
  // Will add a status to the Redis server.
  //
  return new Promise( function ( fulfill, reject ) {
    var err;
    if (err === undefined ) {
      fulfill();
    }
    else {
      reject({ error : -1});
    }
  });
};

var cancel = function ( ID ) {
  //
  // Will cancel the request with the given ID. 
  //
  return new Promise( function ( fulfill, reject ) {
    var err;
    if (err === undefined ) {
      fulfill();
    }
    else {
      reject({ error : -1});
    }
  });
}

var num_pending = function ( ID ) {
  //
  // Will return the number of 'in progress' requests.
  //
  return new Promise( function ( fulfill, reject ) {
    var err;
    if (err === undefined ) {
      var result = 0 ;
      fulfill( result );
    }
    else {
      reject({ error : -1});
    }
  });
};

var all_pending = function ( ID ) {
  //
  // Will return all pending requests as an array of objects.
  //
  return new Promise( function ( fulfill, reject ) {
    var err;
    if (err === undefined ) {
      var result = [] ;
      fulfill( result );
    }
    else {
      reject({ error : -1});
    }
  });
};

// 
// Export
//

module.exports = {
  add         : add,
  check       : check,
  cancel      : cancel,
  num_pending : num_pending,
  all_pending : all_pending
}
