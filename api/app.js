const http = require('http');
const UserRouter = require('./routers/userRouter.js');


const server = http.createServer((req, res) => {
  UserRouter.routeRequest(req, res);
});

server.listen(3001, () => {
  console.log('Server is running on port 3000');
});
