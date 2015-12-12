var trackreq = require('./index.js') ;
console.log(trackreq) ;

trackreq.add('123')
  .then( function () {
    console.log ('ADD: success') ;
    process.stdout.write('\t');
    console.log();
  })
  .catch ( function ( error_obj ) {
    console.log ('ADD: FAIL') ;
    process.stdout.write('\t');
    console.log( error_obj ) ;
  })
;
console.log () ;

trackreq.check('123')
  .then( function ( result_obj ) {
    console.log ('CHECK: success') ;
    process.stdout.write('\t');
    console.log( result_obj ) ;
  })
  .catch ( function ( error_obj ) {
    console.log ('CHECK: FAIL ') ;
    process.stdout.write('\t');
    console.log( error_obj ) ;
  })
;
console.log () ;

trackreq.cancel('123')
  .then( function () {
    console.log ('CANCEL: success') ;
    process.stdout.write('\t');
    console.log();
  })
  .catch ( function ( error_obj ) {
    console.log ('CANCEL: FAIL') ;
    process.stdout.write('\t');
    console.log( error_obj ) ;
  })
;
console.log () ;

trackreq.num_pending()
  .then( function ( result ) {
    console.log ('NUM_PENDING: success') ;
    process.stdout.write('\t');
    console.log( result ) ;
  })
  .catch ( function ( error_obj ) {
    console.log ('NUM_PENDING: FAIL') ;
    process.stdout.write('\t');
    console.log( error_obj ) ;
  })
;
console.log () ;

trackreq.all_pending()
  .then( function ( pending_array ) {
    console.log ('ALL PENDING: success');
    process.stdout.write('\t');
    console.log( pending_array ) ;
  })
  .catch ( function ( error_obj ) {
    console.log ('ALL PENDING: FAIL');
    process.stdout.write('\t');
    console.log( error_obj ) ;
  })
;
console.log () ;

trackreq.test_redis_connection()
  .then( function ( commands_array ) {
    console.log ('REDIS: success');
    process.stdout.write('\t');
    console.log( commands_array) ;
  })
  .catch ( function ( error_obj ) {
    console.log ('REDIS: FAIL');
    process.stdout.write('\t');
    console.log( error_obj ) ;
  })
;
console.log () ;



