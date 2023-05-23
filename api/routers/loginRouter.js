const { parse } = require('querystring');
const { loginUser } = require('../controllers/loginController');
const { getLoginPage } = require('../service/loginService');

const handleLoginRoute = (req, res) => {
  const method = req.method.toLowerCase();

  if (method === 'get') {
    const loginPage = getLoginPage();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(loginPage);
  } else if (method === 'post') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const formData = parse(body);
      req.body = formData;
      await loginUser(req, res);
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
};

module.exports = handleLoginRoute;

