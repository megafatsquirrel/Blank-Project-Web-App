var express = require( 'express' );
var app = express();

var hbs = require( 'express-handlebars' );
app.engine( 'handlebars', hbs( {
    defaultLayout: 'main'
} ) );
app.set( 'view engine', 'handlebars' );
app.use( '/public', express.static( __dirname + '/build' ) );

// Homepage
app.get( '/', function ( req, res ) {
    res.render( 'home' );
} );

app.get( '/returnJSON', function ( req, res ) {
    res.json( { item1 : 'one', item2 : 'item2' } );
} );

var port = Number( process.env.PORT || 3000 );
var server = app.listen( port, function () {
    console.log( 'Started Server: Port %d', server.address().port );
} );