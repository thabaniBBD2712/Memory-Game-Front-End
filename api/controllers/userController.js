const { poolPromise, sql } = require('../db/db.js');

class UserController {
  static async getUsers(req, res) {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Score');
    res.write(JSON.stringify(result.recordset));
    res.end();
  }
}

module.exports = UserController;
