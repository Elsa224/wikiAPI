//Require modules we use 
const express = require( "express" );
const bodyParser = require( "body-parser" );
const mongoose = require( "mongoose" );

//Creating an app constant and use EJS as its view engine
const app = express(  );
app.set( "view engine", "ejs" );
app.use( bodyParser.urlencoded( { extended: true } ) );

//app using modules ( express.static to load local files on the server, bodyParser )
app.use( express.static( `${ __dirname }/public` ) );