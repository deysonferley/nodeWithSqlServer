var express = require('express');
var bodyParser = require('body-parser');
var sql = require('mssql');

var app = express();

//Body Parser Middleware
app.use(bodyParser.json());


//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

 //Initiallising connection string
var dbConfig = {
    user:  "nodeweb",
    password: "Jp74gt6oN_~F",
    server: "den1.mssql7.gear.host",
    database: "nodeweb"
};

//Function to connect to database and execute query
var executeQuery = function(res , query){
    sql.connect( dbConfig , function (err){

        if(err){
            console.log("Error while connecting database:-" + err);
        }
        else{
            //create Request object
            var request = new sql.Request();
            //query to the database
            request.query( query , function(err, rs){
                if(err){
                    console.log("Error while querying database: - "+err);
                    sql.close();
                    res.send(err);
                }
                else{
                    sql.close();
                    res.send(rs.recordset);
                }
            });
        }

    });
}

//GET ALL PRODUCTS API
app.get( '/', function(req,res){
    var query = "select * from Produto";
    executeQuery(res, query);
});

//GET PRODUCT BY ID API
app.get( '/api/product/:id', function(req,res){
    var query = "select * from Produto where ID = "+ req.params.id;
    executeQuery(res, query);
});

//POST API
app.post( '/api/porduct' ,function( req, res){
    var query = "Insert into Produto values(req.body.NomeProduto,req.body.Preco )";
    executeQuery(res, query);
});

//PUT API
app.put("/api/product/:id", function(req , res){
    var query = "UPDATE Produto SET ProdutoNome= " + req.body.NomeProduto  +  " , Preco=  " + req.body.Preco + "  WHERE Id= " + req.params.id;
    executeQuery (res, query);
});

// DELETE API
app.delete("/api/product/:id", function(req , res){
    var query = "DELETE FROM Produto WHERE Id=" + req.params.id;
    executeQuery (res, query);
});








