const { poolPromise, sql } = require('../db/db.js');

const signUpUser = async (email, password, firstname, lastname) => {
  try {
    const pool = await poolPromise;

    const checkQuery = `
      SELECT COUNT(*) AS userCount
      FROM Player
      WHERE email = @email
    `;
    const checkResult = await pool.request()
      .input('email', sql.VarChar(100), email)
      .query(checkQuery);

    if (checkResult.recordset[0].userCount > 0) {
      return 'Email already exists';
    }

    // Insert new user
    const insertQuery = `
      INSERT INTO Player (email, firstname, lastname, password)
      VALUES (@email, @firstname, @lastname, @password)
    `;
    await pool.request()
      .input('email', sql.VarChar(100), email)
      .input('firstname', sql.VarChar(100), firstname)
      .input('lastname', sql.VarChar(100), lastname)
      .input('password', sql.VarChar(100), password)
      .query(insertQuery);

    return 'User created successfully';
  } catch (error) {
    console.error('Error signing up:', error);
    return 'An error occurred while signing up.';
  }
};

module.exports = { signUpUser };

