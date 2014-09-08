var gulp = require( 'gulp' );
var less = require( 'gulp-less' );
var path = require( 'path' );
var concat = require( 'gulp-concat' );

var paths = {
    scripts: [ './js/*.js' ],
    less: './less/*.less'
};

gulp.task( 'default', [ 'less', 'scripts' ] );

gulp.task( 'less', function () {
    gulp.src( paths.less )
        .pipe( less( {
            paths: [ path.join( __dirname, 'less', 'includes' ) ]
        } ) )
        .pipe( gulp.dest( './build/css' ) );
} );

gulp.task( 'scripts', function () {
    return gulp.src( paths.scripts )
        .pipe( concat( 'all.main.js' ) )
        .pipe( gulp.dest( './build/js' ) );
} );

gulp.task( 'watch', function () {
    gulp.watch( paths.less, [ 'less' ] );
    gulp.watch( paths.scripts, [ 'scripts' ] );
} );