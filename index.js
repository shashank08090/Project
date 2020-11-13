//-------------------
//Importing express and path, char and rasta are just variables
//char is NOT a keyword here
var char = require('express');
var rasta = require('path');


var schar=char();


//----------------
//setting up the view engine

schar.set('view engine', 'ejs');
schar.set('views', rasta.join(__dirname, 'views'));
schar.use(char.urlencoded());

//-------------

//-Building our server
schar.listen(4000);
console.log("4000 pe sun ra hu");

//---------------

//-----------
//setting up the database

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/MyOwnApp'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
	console.log("connection succeeded"); 
}) 
//----------------------

//--sending a file to the server
var bs = [] ;
//bs will hold the data inputted by the user

schar.get('/',function(req,res){
    res.render('home', {
        Myvariable:bs
    });
})

//---------
//Handling  Post method of form <form action="/detail" method="POST"> 

schar.post('/detail', (req,res)=>{
    bs.push(req.body);

    //----------------------
    //databse entry code
    //textOne is from the name attribute in EJS file
    //req.body contains key value pairs of the data submitted from the EJS form by the end user
    var naame = req.body.textOne;
    var data={
        "textOne" : naame , 
        }

        db.collection('Table1').insertOne(data,function(err, collection){ 
            if (err) throw err; 
            console.log("Record inserted Successfully"); 
                
        }); 

    return res.redirect('/');
});
//------------------
//------------------------
//




