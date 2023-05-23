const http = require('http');

const options = {
  hostname: 'api.postcodes.io',
  path: '/postcodes/OX49%205NU',
  method: 'GET',
};

const req = http.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log('Response:', responseData);
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
});

req.end();