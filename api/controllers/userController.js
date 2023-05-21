const { poolPromise, sql } = require('../db/db.js');

class UserController {
  static async getUsers(req, res) {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT * FROM Score');
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
}

module.exports = UserController;