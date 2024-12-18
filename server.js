const mysql = require("mysql2");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const md5 = require('md5')

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

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.post('/registrer', (req, res) => {
  const { username, password } = req.body; // Hent brukernavn og passord fra forespørselen

  // Her kan du legge til logikk for å lagre brukeren i databasen
  const query = 'INSERT INTO users (username, password) VALUES (?, ?)';
  connection.query(query, [username, md5(password)], (error, results) => {
    if (error) {
      return res.status(500).send('Error registering user');
    }
    res.status(201).redirect("/login"); // Send suksessmelding
  });
});

app.post('/login', async (req, res) => {
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
      if (user.password === md5(password)) {
        return res.status(200).send(user);
      } else {
        return res.status(401).send('Invalid password');
      }
    });
  } catch (err) {
    res.status(500).send('Error during login');
  }
});
app.post('/setBudget', async (req, res) => {
  const { username, amount } = req.body;

  try {
    const query = 'UPDATE users SET budget = ? WHERE username = ?';
    connection.query(query, [amount, username], (error, results) => {
      if (error) {
        return res.status(500).send('Error retrieving user data');
      }
      if (results.length === 0) {
        return res.status(401).send('User not found');
      }


      // Sammenlign passordet direkte


      
    });
  } catch (err) {
    res.status(500).send('Error during login');
  }
});





app.use(express.static("public"))




