const { poolPromise, sql } = require('../db/db.js');

const logScore = async (email, score) => {
  try {
    const currentDate = new Date(); 
    const pool = await poolPromise;
    const query = `
      Update Score
      SET score = @score,achievedOn=@date
      WHERE player_email = @email
    `;
    const result = await pool.request()
      .input('email', sql.VarChar(100), email)
      .input('score', sql.Int, score)
      .input('date', sql.Date, currentDate)
      .query(query);

    return 'Score updated successfully';
  } catch (error) {
    console.error('Error updating score:', error);
    return 'An error occurred while updating score.';
  }
};

module.exports = { logScore };
