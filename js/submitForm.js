const http = require('http');
const querystring = require('querystring');
const sql = require('mssql');

const config = {
  server: "BBD-KTSQLEXPRESS",
  database: "memory_game",
};

async function insertFormData(firstname, surname, email, password) {
  try {
    await sql.connect(config);

    const checkQuery = `SELECT COUNT(*) AS count FROM Users WHERE email = @email`;
    const checkRequest = new sql.Request();
    checkRequest.input("email", sql.VarChar, email);
    const checkResult = await checkRequest.query(checkQuery);
    const count = checkResult.recordset[0].count;

    if (count > 0) {
      console.log("User already exists!");
      return;
    }

    const insertQuery = `INSERT INTO Users (firstname, lastname, email, password) VALUES (@firstname, @lastname, @email, @password)`;

    const insertRequest = new sql.Request();
    insertRequest.input("firstname", sql.VarChar, firstname);
    insertRequest.input("lastname", sql.VarChar, surname);
    insertRequest.input("email", sql.VarChar, email);
    insertRequest.input("password", sql.VarChar, password);

    await insertRequest.query(insertQuery);

    console.log("Data inserted successfully!");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    sql.close();
  }
}


const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/signUp') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const formData = querystring.parse(body);

      const firstname = formData.firstname;
      const surname = formData.surname;
      const email = formData.email;
      const password = formData.password;

      insertFormData(firstname, surname, email, password);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Data received and processed successfully!');
    });
  } else {
    res.statusCode = 404;
    res.end();
  }
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

