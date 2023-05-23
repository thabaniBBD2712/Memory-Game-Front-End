const { poolPromise, sql } = require('../db/db.js');

const loginUser = async (email, password) => {
  try {
    const pool = await poolPromise;
    const query = `
      SELECT COUNT(*) AS userCount
      FROM Player
      WHERE email = @email
        AND password = @password
    `;
    const result = await pool.request()
      .input('email', sql.VarChar(100), email)
      .input('password', sql.VarChar(100), password)
      .query(query);

    if (result.recordset[0].userCount > 0) {
      return 'Login successful';
    } else {
      return 'Invalid email or password';
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return 'An error occurred while logging in.';
  }
};

module.exports = { loginUser };
