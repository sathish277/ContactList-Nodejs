const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:/contactListdb');

const db = mongoose.connection;

db.on('error',console.error.bind(console,'error occured while db connection'));

db.once('open',function(){
    console.log('Successful connection to DB');
});