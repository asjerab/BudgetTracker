const mysql = require("mysql2");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require("dotenv").config();


const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log("Server is running on port: " + port);
});

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB
});

connection.connect()

app.get('/', (req,res) => {
    res.sendFile(__dirname + "/public/index.html")
})





app.use(express.static("public"))




