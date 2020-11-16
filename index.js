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
//Experimental code here

const contactSchema = new mongoose.Schema({

    ismeMeraData: {
        type: String,
    
        required: true
    },

    taarekhPeTaarekh:{
        type:Date,
        required:true,
    }


  

})


const Contact = mongoose.model('Ae_Bidu_Mera_Buxa_Hai_tu', contactSchema);

//module.exports = Contact;

//----------------------
//--sending a file to the server


schar.get('/',function(req,res){
    
    
Contact.find({}, function(err, contacts){
    if(err){
        console.log("error in fetching contacts from db");
        return;
    }
    return res.render('home',{
    
        contact_list: contacts
    });

})
})

//---------
//Handling  Post method of form <form action="/detail" method="POST"> 

schar.post('/detail', (req,res)=>{
   

    Contact.create({
        ismeMeraData: req.body.textOne,
        taarekhPeTaarekh:req.body.Dat,
        
    }, function(err, newContact){
        if(err){console.log('Error in creating a contact!')
            return;}
            console.log('******', newContact);
            return res.redirect('/');
    })
  
});
//------------------
//------------------------
//Delete contact

schar.get('/delete-contact/', function(req, res){
    console.log(req.query);
    let id = req.query.id

    Contact.findOneAndDelete(id, function(err){
        if(err){
            console.log('error in deleting the object');
            return;
        }
        return res.redirect('back');
    })


   
});
//-------------




