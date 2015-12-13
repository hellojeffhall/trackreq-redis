const gulp       = require('gulp')           ;
const babel      = require('gulp-babel')     ;
const dir_source = './simple-client/source/' ;
const dir_dest   = './simple-client/dist/'   ;

gulp.task( 'build' , function(){

  gulp.src([
    dir_source + '*.html' , 
    dir_source + '*.css' 
  ])
  .pipe( 
    gulp.dest ( dir_dest ) 
  ); 

  return gulp.src( dir_source + '*.js' )
//    .pipe( jsx({
//      factory : 'React.createElement'
//    })) 
    .pipe( babel() )
    .pipe( gulp.dest( dir_dest ) );
});
