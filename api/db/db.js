const sql = require('mssql');

const config = {
    user: 'root',
    password: 'Antelope24',
    server: 'mssqldb.cgj0ywhm1m7p.af-south-1.rds.amazonaws.com',
    database: 'memory_game',
    options: {
      encrypt: false
    }
  };

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}