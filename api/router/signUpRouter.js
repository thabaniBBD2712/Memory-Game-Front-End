const http = require("http");
const path = require("path");
const signUpController = require("../controller/signUpController");
const signUpService = require("../service/signUpService");

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/signUp.html") {
    signUpController.handleSignUpRequest(req, res);
  } else if (req.method === "GET" && req.url === "/signUp.html") {
    const filePath = path.join(__dirname, "../../pages/signUp.html");
    signUpService.serveFile(filePath, "text/html", res);
  } else if (req.method === "GET" && req.url === "/css/signUp.css") {
    const cssFilePath = path.join(__dirname, "../../css/signUp.css");
    signUpService.serveFile(cssFilePath, "text/css", res);
  } else if (req.method === "GET" && req.url === "/js/signUpLogic.js") {
    const jsFilePath = path.join(__dirname,"js", "../../js/signUpLogic.js");
    signUpService.serveFile(jsFilePath, "application/javascript", res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
