//Require modules we use 
const express = require( "express" );
const bodyParser = require( "body-parser" );
const ejs = require( "ejs" );
const mongoose = require( "mongoose" );
const req = require("express/lib/request");
const res = require("express/lib/response");

//Creating an app constant and use EJS as its view engine
const app = express(  );
app.set( "view engine", "ejs" );
app.use( bodyParser.urlencoded( { extended: true } ) );

//app using modules ( express.static to load local files on the server, bodyParser )
app.use( express.static( `${ __dirname }/public` ) );

//Database
mongoose.connect( "mongodb://localhost:27017/wikiDB" );

//Schema
const articleSchema = mongoose.Schema( {
    title: {
        type: String,
        required: [ "No title specified !" ]
    },

    content: {
        type: String,
        required: [ "Please write at least one letter :(" ]
    }
} );

//Model
const Article = mongoose.model( "Article", articleSchema );

/// ----------------------------------- ROUTE /articles ----------------------------------- ///
app.route( "/articles" )
    .get( ( req, res ) => {
        Article.find( ( error, foundArticles ) => {
            if ( !error )
                res.send( { error: false, message: "Articles found", data : foundArticles } );
            else    
                res.send( { error: true, message: error } );
        } );
    } )

    .post(  ( req, res ) => {
        const newArticle = new Article( {
            title: req.body.title,
            content: req.body.content
        } );

        newArticle.save( ( error ) => {
            if ( !error )
                res.send( { error: false, message: "Article successfully created !" } );
            else
                res.send({ error: true, message: error } );
        } );
    } )

    .delete( ( req, res ) => {
        Article.deleteMany( ( error ) => {
            if ( !error )
                res.send( { error: false, message: "All the articles successfully deleted !" } );
            else
                res.send({ error: true, message: error } );
        } );
    } );

/// ----------------------------------- ROUTE /articles/{something} ----------------------------------- ///
app.route( "/articles/:articleTitle" )
    .get( ( req, res ) => {
        Article.findOne( { title: req.params.articleTitle }, ( error, foundArticle ) => {
            if ( foundArticle )
                res.send( { error: false, message: "Article found", data : foundArticle } );
            else 
                res.send( { error: false, message: "Oups... No article matching :(" } );
        } );
    
    } );


let APP_PORT = process.env.PORT;
if ( APP_PORT == null || APP_PORT == "" ) 
    { APP_PORT = 3000 };

    //Spin up the server
app.listen( APP_PORT, (  ) => {
    console.log( `Server has started successfully on port ${ APP_PORT }...\n` );
} );