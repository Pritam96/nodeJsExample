const http = require('http');
const server = http.createServer((req, res) => {
  console.log('Pritam');
});
const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
