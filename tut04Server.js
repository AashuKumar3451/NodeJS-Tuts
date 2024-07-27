const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
require('dotenv').config();

const passport = require('./tut05Auth');

const db = require("./tut04");
const personRoutes = require("./routes/person");
const menuRoutes = require("./routes/menu");

// MiddleWare Function
let logRequest = (req,res,next)=>{
  console.log(`[${new Date().toLocaleString()}] requeest is made to [${req.originalUrl}]`);
  next();
}
// We can defalut add middleware for each endpoint
app.use(logRequest);


// Local Strategy
// Passport MiddleWare for Authetication
app.use(passport.initialize());
const localAuthMW = passport.authenticate('local',{session:false});

// Default Endpoint through Local Strategy of Passport module
app.get("/", localAuthMW, (req, res) => {
  res.send("Hello sir, how can I help you?");
});


// Person Endpoints
app.use("/person", personRoutes);

// MenuItem Endpoints
app.use("/menuItem", menuRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is live on port:3000");
});

// Comment added
// Comment added for third version
// Comment added from online
