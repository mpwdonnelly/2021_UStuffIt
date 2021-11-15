//required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//cross origin enabled
var corsOptions = {origin: "http://localhost:8081"};

//initialize app w/ middleware & any options
app.use(cors(corsOptions));

//parse JSON
app.use(bodyParser.json());

//parse urlencoded
app.use(bodyParser.urlencoded({extended:true}));

//sync the DB
const db = require("./app/models");
/** ENABLE THE FOLLOWING 3 LINES TO DUMP DB EVERY TIME THE PROGRAM RUNS - DISABLE LINE 26 IF YOU DO**/
//db.sequelize.sync({ force: true }).then(() => {
//    console.log("DB dropped and re-synced.");
//});
db.sequelize.sync();

//test root route
app.get("/", (req,res) => {
    res.json({message: "You made it, dumbass"});
});


//require routes
require('./app/routes/catalog.routes.js')(app);

//port & listen
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`yeah it worked AW HELL YEAH also it's running on port# ${PORT}.`);
});