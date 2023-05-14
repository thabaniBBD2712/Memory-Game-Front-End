const http = require("http");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const sql =require('mssql/msnodesqlv8')

var config={
  database: 'memory_game',
  server: "BBD-KT\\SQLEXPRESS",
  driver: 'msnodesqlv8',
  options:{
    trustedConnection:true
  }
};


const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/signUp.html") {
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

        // const existingData = sql.query`SELECT * FROM Users WHERE Email = ${email}`;
        // if (existingData.recordset.size > 0) {
        //       res.writeHead(409, { "Content-Type": "text/plain" });
        //       res.end("User already exists.");
        //       sql.close();
        //       return;
        //     }

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
  } else if (req.method === "GET" && req.url === "/signUp.html") {
    const filePath = path.join(__dirname, "pages", "signUp.html");

    fs.readFile(filePath, (error, content) => {
      if (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("An error occurred while reading the file.");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    });
  } else if (req.method === "GET" && req.url === "/css/signUp.css") {
    const cssFilePath = path.join(__dirname, "css", "signUp.css");

    fs.readFile(cssFilePath, (error, content) => {
      if (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("An error occurred while reading the CSS file.");
      } else {
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(content);
      }
    });
  } else if (req.method === "GET" && req.url === "/js/signUpLogic.js") {
    const jsFilePath = path.join(__dirname, "js", "signUpLogic.js");

    fs.readFile(jsFilePath, (error, content) => {
      if (error) {
        console.error(error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("An error occurred while reading the JavaScript file.");
      } else {
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(content);
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
