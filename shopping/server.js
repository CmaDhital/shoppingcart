/**
 * Created by Seema on 9/12/2016.
 */

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mysql = require('mysql');
var connection = require('express-myconnection');




app.use(bodyParser.json()); //to support JSON-encoded bodies
app.use(bodyParser.urlencoded({    //to support URL-encoded bodies
    extended: true
}));

//setting up the static files for hosting
app.use(express.static(__dirname + '/'));

console.log("file initialized");

app.use(connection(mysql,{
    host        : 'localhost',
    user        : 'root',
    password    : 'root',
    database    : 'shopping_cart'
},'request'));

//Routing
//this is routing but to connect the rest API with our database
app.get( "/service/customer",function(req, res, next){
    //arrays to store dynamic parameters
    var ids =[];

    var query = "SELECT * FROM customer";
    req.getConnection(function(err, connection){
        if(err) return next(err);

        connection.query(query, ids, function(err, results){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            res.json(results);

        });


    });


});


app.get( "/service/customer/:cust_id",function(req, res, next){
    //arrays to store dynamic parameters
    var ids =[];
    var cust_id=req.params.cust_id;
    ids.push(cust_id);

    var query = "SELECT * FROM customer WHERE cust_id = ?";
    req.getConnection(function(err, connection){
        if(err) return next(err);

        connection.query(query, ids, function(err, results){
            if(err){
                console.log(err);
                return next("Mysql error, check your query");
            }
            res.json(results);

        });


    });


});



app.get('/index', function(req, res){
    res.redirect('shopping_cart/views/index.html');
});
app.get('/landing', function(req, res){
    res.send('In landing page');

});
app.get('/home', function(req, res){
    res.redirect('shopping_cart/views/home.html');

});
app.get('/electronics', function(req, res){
    res.redirect('shopping_cart/views/electronics.html');

});
app.get('/game', function(req, res){
    res.redirect('shopping_cart/views/game.html');

});

//End of routing

//launching application on localhost.
app.listen(8180, function(){
    console.log('server loaded on port 8180');

});