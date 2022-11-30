const express=require('express');
const path=require('path');
const bodyParser = require('body-parser');
const { Console } = require('console');

const port=8000;
const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('assets'));

var contactsList=[
    {
        name:"Sathish",
        phone:"1234567890"
    },
    {
        name:"Nodejs",
        phone:"7320938764"
    }
]
app.get('/',function(req,res){

    Contact.find({},function(err,contactsDB){
        if (err) {
            console.log('error in fetching contacts from DB');
            return;
        }
        return res.render('home',{
            title:"Contacts List",
            contacts:contactsDB
        });
    });
});
app.get('/showContacts',function(req,res){

    Contact.find({},function(err,contactsDB){
        if (err) {
            console.log('error in fetching contacts from DB');
            return;
        }
        return res.render('showContacts',{
            title:"Contacts List",
            contacts:contactsDB
        });
    });
});
app.post('/create-contact',function(req,res){
    // contactsList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    //contactsList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newContact){
        if(err)
        {
            console.log('error occured in creating contact!');
            return;
        }
        console.log('newContact:',newContact);
        return res.redirect('back');
    })
    //return res.redirect('back');
});

app.get('/delete-contact/',function(req,res){

    let id=req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err)
        {
            console.log('error while deleting contact!');
            return;
        }
        return res.redirect('back');
    })
    // let phone=req.query.phone;
    // const contactIndex=contactsList.findIndex(contact=>contact.phone==phone);
    // if(contactIndex!=-1)
    // {
    //     contactsList.splice(contactIndex,1);
    // }
    // return res.redirect('back');
    



});

app.listen(port,function(err){
    if(err)
    {
        console.log('OOPS! Something Went Wrong:', err);
        return;
    }
    console.log('Hey! My express Server is running on port:',port);
})