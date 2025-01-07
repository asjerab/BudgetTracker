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
    const query = 'SELECT * FROM BudgetTracker.users WHERE username = ?';
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
    console.log(err);

  }
});
app.post('/setBudget', async (req, res) => {
  const { username, amount } = req.body;
  console.log(req.body);
  

  try {
    const query = 'UPDATE BudgetTracker.users SET budget = ? WHERE username = ?';
    connection.query(query, [amount, username], (error, results) => {
      if (error) {
        console.log(error)
        return res.status(500).send('Error updating budget');
      }
      // Send suksess-respons
      res.status(200).json({ message: 'Budget updated successfully' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error updating budget');
  }
});
app.post('/saveExpense', async (req, res) => {
  const { two, one, username } = req.body;
  console.log(req.body);
  let date = new Date()
  let dateString = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`
  console.log(dateString);
  
  try {
    const query = 'INSERT INTO BudgetTracker.expenses (username, expense, amount, date) VALUES (?, ?, ?, ?)';
    connection.query(query, [username, one, two, dateString], (error, results) => {
      if (error) {
        console.log(error);
        return res.status(500).send('Error retrieving user data');

      }
      if (results.length === 0) {
        return res.status(401).send('User not found');
      }
      res.sendStatus(200)

    });
  } catch (err) {
    res.status(500).send('Error during login');
    console.log(err);

  }
});
app.post('/get/expenses', async (req, res) => {
  const { username } = req.body;
  let date = new Date()
  let monthString = `${date.getMonth() + 1}.${date.getFullYear()}`
  connection.query(`SELECT * FROM BudgetTracker.expenses WHERE username = '${username}' AND date LIKE '%${monthString}%'`, function (err, result, fields) {
    if (err) {
      console.error("Error creating user:", err);
      res.status(500).send(err);
      return;
    }
    res.send(result)
  });

});
app.post('/get/months', async (req, res) => {
  const { username } = req.body;
  connection.query(`SELECT DISTINCT DATE_FORMAT(STR_TO_DATE(date, '%d.%m.%Y'), '%m.%Y') AS month_year FROM BudgetTracker.expenses WHERE username = '${username}' AND date IS NOT NULL;`, function (err, result, fields) {
    if (err) {
      console.error("Error creating user:", err);
      res.status(500).send(err);
      return;
    }
    res.send(result)
  });

});






app.use(express.static("public"))




