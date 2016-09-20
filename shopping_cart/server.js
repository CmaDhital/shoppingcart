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


app.get( "/service/customer/:customer_id",function(req, res, next){
    //arrays to store dynamic parameters
    var ids =[];
    var customer_id=req.params.customer_id;
    ids.push(customer_id);

    var query = "SELECT * FROM customer WHERE customer_id = ?";
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

var url="/service/customer/insert";
//var sqlquer="INSERT INTO CUSTOMER SET ?";
//postService(url, sqlquer,data);
//function postService(url, sqlquer, data){
    app.post(url, function(req, res,next)
    {
        try{
            var reqObj = req.body;
            console.log(reqObj);
            req.getConnection(function(err, conn){
                if(err)
                {
                    console.error('SQL Connection error: ', err);
                    return next(err);
                }
                else{
                  var insertSql="INSERT INTO CUSTOMER SET ?";
                    var insertValues= {
                        "customer_id":reqObj.customer_id,
                        "first_name":reqObj.first_name,
                        "last_name":reqObj.last_name,
                         "address":reqObj.address,
                        "city":reqObj.city,
                        "zipcode":reqObj.zipcode,
                        "email":reqObj.email,
                        "phone":reqObj.phone

                    };

                    var query = conn.query(insertSql, insertValues, function (err, result){
                        if(err){
                            console.error('SQL error: ', err);
                            return next(err);
                        }
                        console.log(result);
                        var name_Id = result.insertId;
                       // var name_Id = result.affectedRows;
                       // res.json({"name":name_Id});
                      // res.json({"name":name_Id});
                       res.json(result);

                    });
                }
            });
        }

        catch(ex){
            console.error("Internal error:"+ex);
            return next(ex);
        }

    });
//}

var url="/service/customer/:customer_id";

app.put(url, function(req,res,next){
    try{
        var reqObj = req.body;
        console.log(reqObj);
        var customer_id=req.params.customer_id;
        req.getConnection(function(err, conn){
            if(err)
            {
                console.error('SQL Connection error: ', err);
                return next(err);
            }
            else
            {
                var insertSql = "UPDATE customer SET ? where customer_id=?";
                var insertValues = {

                    "first_name":reqObj.first_name,
                    "last_name":reqObj.last_name,
                    "address":reqObj.address,
                    "city":reqObj.city,
                    "zipcode":reqObj.zipcode,
                    "email":reqObj.email,
                    "phone":reqObj.phone

                };


                var query = conn.query(insertSql, [insertValues, customer_id], function (err, result){
                    if(err){
                        console.error('SQL error: ', err);
                        return next(err);
                    }
                    console.log(result);
                    // var name_Id = result.insertId;
                    res.json(result);

                });
            }
        });
    }
    catch(ex){
        console.error("Internal error:"+ex);
        return next(ex);
    }
})



app.delete('/service/customer/delete/:customer_id', function(req,res, next){

    var ids=[];
    var customer_id=req.params.customer_id;
    ids.push(customer_id);
    var query = "DELETE FROM customer  WHERE customer_id = ?";
    req.getConnection(function (err, connection) {
        if(err) return next(err);

        connection.query(query, ids, function(err, results)
        {

            if(err)
                console.log("Error deleting : %s ",err );

            res.json(results);

        });

    });
});




















app.get('/index', function(req, res){
    res.redirect('/views/index.html');
});
app.get('/landing', function(req, res){
    res.send('In landing page');

});
app.get('/home', function(req, res){
    res.redirect('/views/home.html');

});
app.get('/electronics', function(req, res){
    res.redirect('/views/electronics.html');

});
app.get('/game', function(req, res){
    res.redirect('/views/game.html');

});

//End of routing

//launching application on localhost.
app.listen(8180, function(){
    console.log('server loaded on port 8180');

});