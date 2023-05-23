const { poolPromise, sql } = require('../db/db.js');
const path = require('path');

const LoginController = {
  getLoginPage: (req, res) => {
    const filePath = path.join(__dirname, '..', 'website', 'pages', 'Login.html');
    res.sendFile(filePath);
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const pool = await poolPromise;
      const query = `
        SELECT COUNT(*) AS userCount
        FROM Users
        WHERE email = @email
          AND password = @password
      `;
      const result = await pool.request()
        .input('email', sql.VarChar(100), email)
        .input('password', sql.VarChar(100), password)
        .query(query);

      if (result.recordset[0].userCount > 0) {
        console.log('User exists. Allowing login...');
        res.status(200).send('Login successful');
      } else {
        console.log('User does not exist. Redirecting to sign-up page...');
        res.status(401).send('Invalid email or password');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('An error occurred while logging in.');
    }
  }
};

module.exports = LoginController;
