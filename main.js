const path = require('path');
const url = require('url');

const express = require("express");
const app = express();

const publicPath = path.resolve(__dirname, "public");

app.use(express.static(publicPath));
app.set('view engine', 'hbs');


<<<<<<< HEAD
=======
/*
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : null, // or the original password : 'apaswword'
    database : 'dam'
});

// connect to mysql
connection.connect(function(err) {
    // in case of error
    if(err){
        console.log(err.code);
        console.log(err.fatal);
    }
});

// Perform a query
$query = "SELECT * FROM `user` WHERE Username='AA'";

connection.query($query, function(err, rows, fields) {
    if(err){
        console.log("An error ocurred performing the query.");
        console.log(err);
        return;
    }

    console.log("Query succesfully executed", rows);
});

// Close the connection
connection.end(function(){
    // The connection has been closed
});
*/
>>>>>>> e624dd212e20de49d7490c37256748b37cc330f0

app.get('/', function(req, res) {
  res.render('index');
})

app.listen(3000, function() {
  console.log("listening on port ", 3000);
});