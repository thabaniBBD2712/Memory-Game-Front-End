const http = require('http');
const url = require('url');
const UserController = require('../controllers/userController.js');

class UserRouter {
  static async handleRequest(req, res) {
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname === '/ola' && req.method === 'GET') {
      await UserController.getUsers(req, res);
    } else if (reqUrl.pathname === '/users' && req.method === 'POST') {
      console.log('Received POST request to /users');
      try {
        await UserController.createUser(req, res);
      } catch (error) {
        console.error('Error creating user:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    } else if (reqUrl.pathname === '/login' && req.method === 'POST') {
      console.log('Received POST request to /login');
      try {
        await UserController.loginUser(req, res);
      } catch (error) {
        console.error('Error logging in:', error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Resource not found' }));
    }
  }
  
  static async routeRequest(req, res) {
    try {
      await UserRouter.handleRequest(req, res);
    } catch (error) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: 'Internal server error' }));
    }
  }
}

module.exports = UserRouter;

