'use strict';

const express = require( 'express' );
const helmet = require('helmet');
const hbs = require( 'express-handlebars' );

const PORT = 8080;
const HOST = '0.0.0.0';

const app = express();
// Set HTTP headers
app.use(helmet());

// Set the /views/layouts/main.handlebars as the base template
app.engine( 'handlebars', hbs( {
    defaultLayout: 'main'
} ) );

// Set the framework to be used for the front-end
app.set( 'view engine', 'handlebars' );
app.use( '/public', express.static( __dirname + '/build' ) );

// Fetch the homepage
app.get( '/', function ( req, res ) {
    res.render( 'home' );
} );

// Example endpoint for getting raw data
app.get( '/returnJSON', function ( req, res ) {
    res.json( { item1 : 'one', item2 : 'item2' } );
} );

const port = Number( process.env.PORT || PORT );
const server = app.listen( port, function () {
    console.log( 'Started Server: Port %d', server.address().port );
    console.log(`Running on http://${HOST}:${PORT}`);
} );