const fs = require("fs");
const path = require("path");

function serveFile(filePath, contentType, res) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      console.error(error);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("An error occurred while reading the file.");
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content);
    }
  });
}

module.exports = {
  serveFile
};
