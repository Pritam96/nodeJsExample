const http = require('http');
const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  const url = req.url;
  if (url === '/home') {
    res.write('<h1>Welcome Home</h1>');
  } else if (url === '/about') {
    res.write('<h1>Welcome to About us page</h1>');
  } else if (url === '/node') {
    res.write('<h1>Welcome to my Node Js project</h1>');
  } else {
    res.write('Wrong url');
  }
});
const PORT = 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
