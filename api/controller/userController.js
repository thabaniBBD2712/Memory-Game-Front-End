const userService = require('../service/userService');

exports.getUsers = (req, res) => {
  const users = userService.getUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};
