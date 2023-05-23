const { logScore } = require('../controllers/addScoreController');
const { parse } = require('querystring');

const handleScoreRoute = async (req, res) => {
  const method = req.method.toLowerCase();

  if (method === 'post') {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const formData = parse(body);
      const email = formData.email;
      const score = formData.score;

      const statusMessage = await logScore(email, score);

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(statusMessage);
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
};

module.exports = handleScoreRoute;

