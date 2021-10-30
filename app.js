var express = require('express');
var mysql = require('mysql');
var app = express();
var bodyparser = require("body-parser");

app.set("view engine", "ejs");
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',     // your root username
  database : 'web_app_db'   // the name of your db
});

app.get("/", function(req, res){
 var q = 'SELECT COUNT(*) as count FROM users';
 connection.query(q, function (error, results) {
 if (error) throw error;
 var count = results[0].count;
 res.render("home", {data: count});
 });
});
 
app.listen(3000, function () {
 console.log('App listening on port 3000!');
});

app.get("/joke", function(req, res){
 var joke = "What do you call a dog that does magic tricks? A labracadabrador.";
 res.send(joke);
});

app.get("/random_num", function(req, res){
 var num = Math.floor((Math.random() * 10) + 1);
 res.send("Your lucky number is " + num);
});

app.post("/register", function(req, res){
	console.log(req.body.email);
	var person = {
		email: req.body.email
	};
	connection.query('INSERT INTO users SET ?', person, function(err, result) {
		if (err) throw err;
		res.redirect("/");
	});
});


