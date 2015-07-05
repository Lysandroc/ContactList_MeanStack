var express = require('express');
var app = express();
var mongojs = require('mongojs');	
var db = mongojs('contacts', ['contacts']);
var bodyParser = require('body-parser');

//stack settings
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/contacts', function(req,res) {
	console.log('I received a get request!');
	db.contacts.find(function(err, docs) {
		console.log(docs);
		res.json(docs);		  
	}); 
});
	
app.post('/contact', function(req, res) {
	console.log(req.body);
	db.contacts.insert(req.body, function(err, doc) {
		console.log(doc);
		res.json(doc);
	});
});

app.delete('/contact/:id',function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.contacts.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.get('/contact/:id', function(req, res) {
	var id = req.params.id;
	console.log(id);
	db.contacts.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	});
});

app.put('/contact/:id', function(req, res) {
	var id = req.params.id
	  , body = req.body;
	console.log('id: '+id + '. '+ body);
	db.contacts.findAndModify({ query: {_id: mongojs.ObjectId(id)}, 
								update: { $set: { 	name: body.name, 
													email: body.email, 
													number: body.number } }, 
								new: true }, function(err, doc) {
		res.json(doc);		
	});
});

app.listen(3000, function() {
	console.log('server running on port 3000');
});

