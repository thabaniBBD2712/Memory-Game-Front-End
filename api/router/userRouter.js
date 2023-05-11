const userController = require('../controller/userController');

const router = {
  handle: (req, res) => {
    if (req.method === 'GET') {
      userController.getUsers(req, res);
    } else {
      res.writeHead(405, { 'Content-Type': 'text/plain' });
      res.end('Method Not Allowed');
    }
  },
};

module.exports = router;
