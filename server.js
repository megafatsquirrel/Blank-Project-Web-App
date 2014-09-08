var express = require( 'express' );
var app = express();

var hbs = require( 'express-handlebars' );
app.engine( 'handlebars', hbs( {
    defaultLayout: 'main'
} ) );
app.set( 'view engine', 'handlebars' );

app.use( express.urlencoded() );
app.use( express.static( __dirname ) );

// Homepage
app.get( '/', function ( req, res ) {
    res.render( 'home' );
} );

// 404 response
app.use( function ( req, res, next ) {
    res.send( 404, '404' );
} );

// 500 Error response
app.use( function ( err, req, res, next ) {
    console.error( err.stack );
    res.send( 500, '500' );
} );

// Server setup Port 3000 right now
var port = Number( process.env.PORT || 3000 );
var server = app.listen( port, function () {
    console.log( 'Started Server: Port %d', server.address().port );
} );