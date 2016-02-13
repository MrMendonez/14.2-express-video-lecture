var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var expressHandlebars = require('express-handlebars');
var app = express();

app.use(bodyParser.urlencoded({extended: false}));
var PORT = process.env.NODE_ENV || 3001;
app.engine('handlebars', expressHandlebars({defaultLayout: 'wish-layout'}));
app.set('view engine', 'handlebars');

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  database: 'wishlist2_db'
});

app.get('/', function(req, res) {
  connection.query("SELECT * FROM wishlist", function(err, results) {
    if(err) {
      throw err;
    }
    var data = {
      wishes: results
    }
    console.log(results);
    res.render('wish-view', data);
  });
});

app.post('/', function(req, res) {
  var mySQLQuery = "INSERT INTO wishlist (wish) VALUES ('" + req.body.wishdata + "')";

  connection.query(mySQLQuery, function(err) {
    if(err) {
      throw err
    }
    res.redirect('/');
  })
});

app.get('/delete/:id', function(req, res) {
  var mySQLQuery = "DELETE FROM wishlist WHERE id=" + req.params.id;

  connection.query(mySQLQuery, function(err) {
    if(err) {
      throw err
    }
    res.redirect('/');
  })
});

app.post('/update/:id', function(req, res) {
  var mySQLQuery = "UPDATE wishlist SET wish=" + connection.escape(req.body.wish) + " WHERE id=" + connection.escape(req.params.id);
  console.log(mySQLQuery);
  connection.query(mySQLQuery, function(err) {
    if(err) {
      throw err
    }
    res.redirect('/');
  })
});

app.get('/*', function(req, res) {
  res.redirect('/');
})

app.listen(PORT, function() {
  console.log("Listening on port %s", PORT);
})