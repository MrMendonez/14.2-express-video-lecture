var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var expressHandlebars = require('express-handlebars');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
var PORT = process.env.NODE_ENV || 3001;
app.engine('handlebars', expressHandlebars({defaultLayout: 'notes'}));
app.set('view engine', 'handlebars');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'quick_notes_db'
});

app.get('/', function(req, res) {
  connection.query("SELECT * FROM quick_notes", function(err, results) {
    if(err) {
      throw err;
    }
    var data = {
      notes: results
    }
    console.log(results);
    res.render('note', data);
  });
});

app.post('/', function(req, res) {
  var mySQLQuery = "INSERT INTO quick_notes (note) VALUES ('" + req.body.note + "')";

  connection.query(mySQLQuery, function(err) {
    if(err) {
      throw err
    }
    res.redirect('/');
  })
});

app.listen(PORT, function() {
  console.log("Listening on port %s", PORT);
})