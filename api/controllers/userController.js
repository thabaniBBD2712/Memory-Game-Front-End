const { poolPromise, sql } = require('../db/db.js');

class UserController {
  static async getUsers(req, res) {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Score');
    res.write(JSON.stringify(result.recordset));
    res.end();
  }

  static async createUser(req, res) {
    const pool = await poolPromise;
    try {
      const { firstname, lastname, email, password } = JSON.parse(req.body);
      const result = await pool
        .request()
        .input('firstname', sql.VarChar, firstname)
        .input('lastname', sql.VarChar, lastname)
        .input('email', sql.VarChar, email)
        .input('password', sql.VarChar, password)
        .query('INSERT INTO Player (firstname, lastname, email, password) VALUES (@firstname, @lastname, @email, @password)');
      
      res.write(JSON.stringify({ status: 'success', message: 'User created successfully' }));
      res.end();
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send('An error occurred while creating the user.');
    }
  }

  static async loginUser(req, res) {
    const pool = await poolPromise;
    try {
      const { email, password } = JSON.parse(req.body);
      const result = await pool
        .request()
        .input('email', sql.VarChar, email)
        .input('password', sql.VarChar, password)
        .query('SELECT * FROM Player WHERE email = @email AND password = @password');
      
      if (result.recordset.length > 0) {
        res.write(JSON.stringify({ status: 'success', message: 'User logged in successfully' }));
      } else {
        res.write(JSON.stringify({ status: 'failure', message: 'Invalid credentials' }));
      }
      res.end();
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).send('An error occurred while logging in.');
    }
  }
}

module.exports = UserController;
