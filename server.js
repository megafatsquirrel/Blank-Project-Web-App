'use strict';

const express = require( 'express' );
const helmet = require('helmet');
const hbs = require( 'express-handlebars' );
const cookieSession = require('cookie-session');
const https = require('https');
const fs = require('fs');

const PORT = 8080;
const HOST = '0.0.0.0';

// const options = {
//     cert: fs.readFileSync('location of cert'),
//     key: fs.readFileSync('location of private key')
// };

const app = express();
// Set HTTP headers
app.use(helmet());


// set cookie session
app.set('trust proxy', 1) // trust first proxy
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
 
  // Cookie Options 
  maxAge: 24 * 60 * 60 * 1000 // 24 hours 
}))

// Set the /views/layouts/main.handlebars as the base template
app.engine( 'handlebars', hbs( {
    defaultLayout: 'main'
} ) );

// Set the framework to be used for the front-end
app.set( 'view engine', 'handlebars' );
app.use( '/public', express.static( __dirname + '/build' ) );


app.get('/health-check', (req, res) => res.sendStatus(200));

// Fetch the homepage
app.get( '/', function ( req, res ) {
    // Update views 
    req.session.views = (req.session.views || 0) + 1
    // Write response 
    // TODO - move this to a data point 
    // res.end(req.session.views + ' views')

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

//https.createServer(options, app).listen(8443);