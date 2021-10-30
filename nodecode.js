var mysql = require('mysql');
var faker = require('faker');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',     // your root username
  database : 'web_app_db'   // the name of your db
});

// var q = 'SELECT * FROM users';

//selecting data
// connection.query(q, function (error, results, fields) {
//   if (error) throw error;
// 	console.log(results[1].email);
// });

// var q = 'INSERT INTO users (email) VALUES ("wyatt_the_dog@gmail.com")';
// connection.query(q, function (error, results, fields) {
//   if (error) throw error;
//   console.log(results);
// });

//INSERT DATA pt 2
// var person = {email: faker.internet.email(),
// 			  created_at: faker.date.past()
// };

// connection.query('INSERT INTO users SET ?', person, function(err, result) {
//   if (err) throw err;
//   console.log(result);
// });

//Inserting data in bulk
var data = [];

for(var i =0; i < 500; i++){
	data.push([
		faker.internet.email(),
		faker.date.past()
	]);
}

var q = 'INSERT INTO users (email, created_at) VALUES ?';

connection.query(q, [data], function(err, result) {
  console.log(err);
  console.log(result);
});

connection.end();