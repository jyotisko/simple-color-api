const generateRandomColor = amount => {
  const colors = [];
  const availableColor = ['a', 'b', 'c', 'd', 'e', 'f', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
  for (let i = 1; i <= amount; i++) {
    const color = `#${availableColor[Math.floor(Math.random() * availableColor.length)]}${availableColor[Math.floor(Math.random() * availableColor.length)]}${availableColor[Math.floor(Math.random() * availableColor.length)]}${availableColor[Math.floor(Math.random() * availableColor.length)]}${availableColor[Math.floor(Math.random() * availableColor.length)]}${availableColor[Math.floor(Math.random() * availableColor.length)]}`;
    colors.push({ 'color': color })
  }
  return colors;
};

const getColorsForAPI = count => {
  const colors = generateRandomColor(count);
  const json = {
    'count': count,
    'colors': colors,
    'cod': '201',
    'message': 'success',
  };
  return JSON.stringify(json);
};

const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {

  const urlDetails = url.parse(req.url);

  let count;
  if (!urlDetails.query) count = 100;
  else count = parseInt(urlDetails.query.slice(6));

  if (urlDetails.pathname === '/api/random') {
    res.writeHead(200, { 'Content-type': 'application/json', });
    const jsonData = getColorsForAPI(count);
    res.end(jsonData);

  } else {
    res.writeHead(404, { 'Content-type': 'application/json' })
    res.end(JSON.stringify({
      'cod': 404,
      'message': 'Page not found!'
    }))
  }
});

server.listen(3000, '127.0.0.1', () => console.log('Server opened on port 3000. Go to 127.0.0.1:3000 to access the server!'));

