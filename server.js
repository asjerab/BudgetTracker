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

app.post('/registrer', (req, res) => {
  const { username, password } = req.body; // Hent brukernavn og passord fra forespørselen

  // Her kan du legge til logikk for å lagre brukeren i databasen
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(query, [username, password], (error, results) => {
    if (error) {
      return res.status(500).send('Error registering user');
    }
    res.status(201).send('User registered successfully'); // Send suksessmelding
  });
});

app.post('/login', async (req, res) => {
  console.log(req.body); // Logger forespørselen
  const { username, password } = req.body;

  try {
    const query = 'SELECT * FROM users WHERE username = ?';
    connection.query(query, [username], (error, results) => {
      if (error) {
        return res.status(500).send('Error retrieving user data');
      }
      if (results.length === 0) {
        return res.status(401).send('User not found');
      }

      const user = results[0];
      // Sammenlign passordet direkte
      if (user.password === password) {
        return res.redirect('/overview.html'); // Sender brukeren til overview.html
      } else {
        return res.status(401).send('Invalid password');
      }
    });
  } catch (err) {
    res.status(500).send('Error during login');
  }
});





app.use(express.static("public"))




