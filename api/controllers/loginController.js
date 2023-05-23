const { poolPromise, sql } = require('../db/db.js');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

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
      console.log('User exists. Allowing login...');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Login successful');
      
    } else {
      console.log('User does not exist. Redirecting to sign-up page...');
      res.writeHead(401, { 'Content-Type': 'text/plain' });
      res.end('Invalid email or password');
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('An error occurred while logging in.');
  }
};

module.exports = { loginUser };
