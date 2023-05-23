const fs = require('fs');
const path = require('path');

const getLoginPage = () => {
  const filePath = path.join(__dirname, '..', '..', 'website', 'pages', 'Login.html');
  const htmlContent = fs.readFileSync(filePath, 'utf8');
  return htmlContent;
};

module.exports = { getLoginPage };
