const { poolPromise, sql } = require('../db/db.js');

const logScore = async (email, score) => {
  try {
    const currentDate = new Date(); 
    const pool = await poolPromise;
    const query = `
      INSERT INTO Score (player_email, score, achievedOn)
      VALUES (@email, @score, @date)
    `;
    const result = await pool.request()
      .input('email', sql.VarChar(100), email)
      .input('score', sql.Int, score)
      .input('date', sql.Date, currentDate)
      .query(query);

    return 'Score logged successfully';
  } catch (error) {
    console.error('Error logging score:', error);
    return 'An error occurred while logging score.';
  }
};

module.exports = { logScore };
