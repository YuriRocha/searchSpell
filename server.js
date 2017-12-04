var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');   
var methodOverride = require('method-override'); 
var cors = require('cors');
var path = require('path');


//config app
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));            
app.use(bodyParser.json());                                     
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(methodOverride());
app.use(cors());


//api route
app.get('/', function(req, res){
	res.sendfile('./public/index.html');
});

app.get('/about', function(req, res){
	res.sendfile(path.resolve('./public/about.html'));
	//res.send('about');
});


//server
app.listen(3000, function(){
	console.log("app listening at port 3000");
})

