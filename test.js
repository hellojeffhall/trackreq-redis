var trackreq = require('./index.js') ;
console.log(trackreq) ;

var ID = Math.floor( Math.random() * 100 );

trackreq.test_redis_connection()
  .then( function ( commands_array ) {
    console.log ('success: redis');
    process.stdout.write('\t');
    console.log( commands_array) ;
  })
  .catch ( function ( error_obj ) {
    console.log ('FAIL: redis'  ) ;
    process.stdout.write('\t');
    console.log( error_obj ) ;
  })
;
console.log () ;

trackreq.add(ID)
  .then( function () {
    console.log ('success: add') ;
    process.stdout.write('\t');
    console.log();
  })
  .catch ( function ( error_obj ) {
    console.log ('FAIL: add') ;
    process.stdout.write('\t');
    console.log( error_obj ) ;
  })
;
console.log () ;

trackreq.all_pending()
  .then( function ( pending_array ) {
    console.log ('success: all_pending');
    process.stdout.write('\t');
    console.log( pending_array ) ;
  })
  .catch ( function ( error_obj ) {
    console.log ('FAIL: all_pending ');
    process.stdout.write('\t');
    console.log( error_obj ) ;
  })
;
console.log () ;

trackreq.num_pending()
  .then( function ( result ) {
    console.log ('success: num_pending') ;
    process.stdout.write('\t');
    console.log( result ) ;
  })
  .catch ( function ( error_obj ) {
    console.log ('FAIL: num_pending') ;
    process.stdout.write('\t');
    console.log( error_obj ) ;
  })
;

console.log () ;

trackreq.complete(ID)
  .then( function () {
    console.log ('success: complete') ;
    process.stdout.write('\t');
    console.log();
  })
  .catch ( function ( error_obj ) {
    console.log ('FAIL: complete') ;
    process.stdout.write('\t');
    console.log( error_obj ) ;
  })
;
console.log () ;

trackreq.check(ID)
  .then( function ( result_obj ) {
    console.log ('success: check') ;
    process.stdout.write('\t');
    console.log( result_obj ) ;
  })
  .catch ( function ( error_obj ) {
    console.log ('FAIL: check ') ;
    process.stdout.write('\t');
    console.log( error_obj ) ;
  })
;
console.log () ;

trackreq.cancel(ID)
  .then( function () {
    console.log ('success: cancel') ;
    process.stdout.write('\t');
    console.log();
  })
  .catch ( function ( error_obj ) {
    console.log ('FAIL: cancel') ;
    process.stdout.write('\t');
    console.log( error_obj ) ;
  })
;
console.log () ;


