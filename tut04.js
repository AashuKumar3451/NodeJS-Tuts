const mongoose = require('mongoose');
require('dotenv').config();

// Define MongoDB connection URL
// const mongoURL = mongoDB_URL_LOCAL;
const mongoURL = process.env.mongoDB_URL;

// Set up mongoDB connection
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

// Get a default connection
// Mongoose maintain a default connection object representing mongoDB connection
const db = mongoose.connection;

// Define an event listener for mongoDB connection
db.on('connected',()=>{
    console.log("Connected to mongoDB server");
})
// Define an event listener for mongoDB error
db.on('error',(err)=>{
    console.log("Error connecting to mongoDB server: ", err);
})
// Define an event listener for mongoDB disconnection
db.on('disconnected',()=>{
    console.log("Disconnected to mongoDB server");
})

module.exports = db;