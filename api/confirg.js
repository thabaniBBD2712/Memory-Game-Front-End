const sql = require('mssql');

const config = {
  user: 'db_username',
  password: 'db_password',
  server: 'db_server', 
  database: 'db_database',
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