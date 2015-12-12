var trackreq = require('./index.js') ;
console.log(trackreq) ;

//
// TESTS
// 

var test_connection = function(){
  //
  // Test to make sure that the connection is up.
  //
  return new Promise ( function( fulfill, reject ) {
    trackreq.test_redis_connection()
      .then( function ( num_checks ) {
        console.log ('success: redis');
        process.stdout.write('\t');
        console.log( num_checks ) ;
        console.log () ;
        fulfill();
      })
      .catch ( function ( error_obj ) {
        console.log ('FAIL: redis'  ) ;
        process.stdout.write('\t');
        console.log( error_obj ) ;
        console.log () ;
        fulfill();
      })
    ;
  }); // End promise
};

var test_add = function( ID ) {
  //
  // Test to make sure that we can add requests. 
  //
  return new Promise ( function( fulfill, reject ) {
    trackreq.add( ID )
      .then( function () {
        console.log ('success: add') ;
        process.stdout.write('\t');
        console.log();
        fulfill();
      })
      .catch ( function ( error_obj ) {
        console.log ('FAIL: add') ;
        process.stdout.write('\t');
        console.log( error_obj ) ;
        console.log () ;
        fulfill();
      })
    ;
  }); // End promise
};

var test_all_pending = function() {
  //
  // Get all pending requests.
  //
  return new Promise ( function( fulfill, reject ) {
    trackreq.all_pending()
      .then( function ( pending_array ) {
        console.log ('success: all_pending');
        process.stdout.write('\t');
        console.log( pending_array ) ;
        console.log () ;
        fulfill();
      })
      .catch ( function ( error_obj ) {
        console.log ('FAIL: all_pending ');
        process.stdout.write('\t');
        console.log( error_obj ) ;
        console.log () ;
        fulfill();
      })
    ;
  }); // End promise
};

var test_num_pending = function() {
  //
  // Get the number of pending requests.
  //
  return new Promise ( function( fulfill, reject ) {
    trackreq.num_pending()
      .then( function ( result ) {
        console.log ('success: num_pending') ;
        process.stdout.write('\t');
        console.log( result ) ;
        console.log () ;
        fulfill();
      })
      .catch ( function ( error_obj ) {
        console.log ('FAIL: num_pending') ;
        process.stdout.write('\t');
        console.log( error_obj ) ;
        console.log () ;
        fulfill();
      })
   ; 
  }); // End promise
};

var test_complete = function( ID ){
  //
  // Try completing a pending request.
  //
  return new Promise ( function( fulfill, reject ) {
    trackreq.complete(ID)
      .then( function () {
        console.log ('success: complete') ;
        process.stdout.write('\t');
        console.log();
        console.log () ;
        fulfill();
      })
      .catch ( function ( error_obj ) {
        console.log ('FAIL: complete') ;
        process.stdout.write('\t');
        console.log( error_obj ) ;
        console.log () ;
        fulfill();
      })
    ;
  }); // End promise
};
  
var test_check = function( ID ) {
  // 
  // Try checking on a specific request.
  //
  return new Promise ( function( fulfill, reject ) {
    trackreq.check( ID )
      .then( function ( result_obj ) {
        console.log ('success: check') ;
        process.stdout.write('\t');
        console.log( result_obj ) ;
        console.log () ;
        fulfill();
      })
      .catch ( function ( error_obj ) {
        console.log ('FAIL: check ') ;
        process.stdout.write('\t');
        console.log( error_obj ) ;
        console.log () ;
        fulfill();
      })
    ;
  }); // End promise
};

var test_cancel = function ( ID ) {
  // 
  // Try canceling a request.
  //
  return new Promise ( function( fulfill, reject ) {
    trackreq.cancel( ID )
      .then( function () {
        console.log ('success: cancel') ;
        process.stdout.write('\t');
        console.log();
        fulfill();
      })
      .catch ( function ( error_obj ) {
        console.log ('FAIL: cancel') ;
        process.stdout.write('\t');
        console.log( error_obj ) ;
        console.log () ;
        fulfill();
      })
    ;
  }); // End promise
};

//
// RUN TESTS
//


const ID = Math.floor( Math.random() * 100 );
var DELAY = 0 ;
const INCR_DELAY = 50 ;
//
// First try creating the request. 
// Then test completing a request.
// Then cancel a request.
//
 
DELAY += INCR_DELAY ;
test_connection()
  .then( test_add(ID) )       
;

DELAY += INCR_DELAY ;
setTimeout( function(){ 
  test_check(ID)
}, DELAY );

DELAY += INCR_DELAY ;
setTimeout( function() { 
  test_num_pending()
    .then( test_all_pending()  )
}, DELAY );

DELAY += INCR_DELAY ;
setTimeout( function() { 
  test_complete(ID)
} , DELAY ) ;

DELAY += INCR_DELAY ;
setTimeout( function(){   
  test_check(ID)      
    .then( test_num_pending()  )
    .then( test_all_pending()  )
}, DELAY ) ;

DELAY += INCR_DELAY ;
setTimeout( function() { 
  test_cancel(ID)     
    .then( test_check(ID)      )
    .then( )
}, DELAY ) ;

DELAY += INCR_DELAY ;
setTimeout( function() {
  process.exit();
}, DELAY ) ;
;
