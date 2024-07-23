const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const db = require("./tut04");
const person = require("./models/person");
const menuItem = require("./models/menu");
const personRoutes = require("./routes/person");
const menuRoutes = require("./routes/menu");

// Default Endpoint
app.get("/", (req, res) => {
  res.send("Hello sir, how can I help you?");
});

// Person Endpoints
app.use("/person", personRoutes);

// MenuItem Endpoints
app.use("/menuItem", menuRoutes);



app.listen(3000, () => {
  console.log("Server is live on port:3000");
});

// Comment added
// Comment added for third version