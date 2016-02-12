// Given the following Js object 'lineage' create Node Express Handlebars App, that will render to HTML the family tree of these three house on one HTML page. * Create the Node Express App * Do not using MySQL * Do not change the Js object 'lineage' in anyway * Create the HTML for handlebars to properly render each character by their lineage.

// Make sure the name of each house is displayed with an underline and make each house have a different colored text and indented according to generations.

var express = require('express');
var app = express();

var expressHandlebars = require('express-handlebars');

var PORT = process.env.NODE_ENV || 3001;
app.engine('handlebars', expressHandlebars({defaultLayout: 'gamethrones'}));
app.set('view engine', 'handlebars');

var lineage = {
    lannister: {
        house: 'House Lannister',
        parents: {
            first_parents: 'Joanna & Tywin',
            second_parents: 'Devan & Dorna'
        },
        child: {
            first_child: 'Cersei',
            second_child: 'Jaime',
            third_child: 'Tyrion',
            fourth_child: 'Lancel'
        }
    },
    targaryen: {
        house: 'House Targaryen',
        parents: 'Aerys II & Rhaella',
        child: {
            first_child: 'Rhaegar',
            second_child: 'Viserys',
            third_child: 'Daenerys'
        }
    },
    stark: {
        house: 'House Stark',
        parents: 'Eddard & Catelyn',
        child: {
            first_child: 'Robb',
            second_child: 'Sansa',
            third_child: 'Arya',
            fourth_child: 'Bran',
            fifth_child: 'Rickon'       
        }
    },
};

app.get('/game/of/thrones', function(req, res) {
  console.log("app.get fired properly");
  res.render('thrones', lineage);
});

app.listen(PORT, function() {
  console.log('Listening on %s ', PORT);
});