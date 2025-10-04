const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup - update with your credentials
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Abhi@123',
  database: 'alumni_db'
});

connection.connect(error => {
  if (error) {
    console.error('Error connecting to MySQL database:', error);
    return;
  }
  console.log('Connected to MySQL database');
});

// API endpoint to save registration data
app.post('/api/register', (req, res) => {
  const data = req.body;

  const sql = `INSERT INTO alumni_registration
    (fullName, gender, dob, bloodGroup, foodPreference, contactNumber, emailId, currentAddress, 
     yearOfAdmission, yearOfPassing, batch, occupation, organization, areaOfExpertise, 
     mentorJuniors, donate, availableForReunion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    data.fullName, data.gender, data.dob, data.bloodGroup, data.foodPreference, data.contactNumber,
    data.emailId, data.currentAddress, data.yearOfAdmission, data.yearOfPassing, data.batch, data.occupation,
    data.organization, data.areaOfExpertise, data.mentorJuniors, data.donate, data.availableForReunion
  ];

  connection.query(sql, values, (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send({ message: 'Failed to save registration data' });
    } else {
      res.status(200).send({ message: 'Registration saved successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
