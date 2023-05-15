const querystring = require("querystring");
const sql = require('mssql/msnodesqlv8');

var config = {
  database: 'memory_game',
  server: "BBD-KT\\SQLEXPRESS",
  driver: 'msnodesqlv8',
  options: {
    trustedConnection: true
  }
};

function handleSignUpRequest(req, res) {
  let requestBody = "";
  req.on("data", (chunk) => {
    requestBody += chunk.toString();
  });

  req.on("end", async () => {
    const formData = querystring.parse(requestBody);
    const { firstname, surname, email, password } = formData;

    sql.connect(config, (err) => {
      if (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("An error occurred while connecting to the database.");
        return;
      }

      const request = new sql.Request();
      request.query(
        `INSERT INTO Users (firstname, lastname, email, password) VALUES ('${firstname}', '${surname}', '${email}', '${password}')`,
        (err, result) => {
          if (err) {
            console.error(err);
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("An error occurred while inserting data into the database.");
          } else {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("Data inserted successfully.");
          }

          sql.close();
        }
      );
    });
  });
}

module.exports = {
  handleSignUpRequest
};
