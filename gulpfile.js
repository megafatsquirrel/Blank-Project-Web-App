var gulp = require( 'gulp' );
var less = require( 'gulp-less' );
var path = require( 'path' );
var concat = require( 'gulp-concat' );

var paths = {
    scripts: [ './js/*.js' ],
    less: './less/*.less',
    bootstrap: './node_modules/bootstrap/dist/css/bootstrap.min.css',
    css: './build/css',
    js: './build/js'
};

gulp.task( 'default', [ 'less', 'scripts' ] );

gulp.task( 'less', function () {
    gulp.src( paths.less )
        .pipe( less( {
            paths: [ path.join( __dirname, 'less', 'includes' ) ]
        } ) )
        .pipe( gulp.dest( paths.css ) );
} );

gulp.task( 'copy', function () {
    gulp.src( paths.bootstrap )
        .pipe( gulp.dest( paths.css ) );
} );

gulp.task( 'scripts', function () {
    return gulp.src( paths.scripts )
        .pipe( concat( 'all.main.js' ) )
        .pipe( gulp.dest( paths.js ) );
} );

gulp.task( 'watch', function () {
    gulp.watch( paths.less, [ 'less' ] );
    gulp.watch( paths.scripts, [ 'scripts' ] );
} );