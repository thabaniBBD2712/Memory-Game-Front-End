const http = require('http');
const path = require('path');
const LoginRoute = require('./routers/loginRouter');
const UserRouter = require('./routers/userRouter');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/login') {
    LoginRoute(req, res);
  } else {
    UserRouter.routeRequest(req, res);
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
