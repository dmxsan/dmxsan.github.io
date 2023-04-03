const http = require('http');
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer({});
const port = 8000;

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  proxy.web(req, res, {
    target: req.url,
    changeOrigin: true,
    headers: {
      referer: 'https://dimasmaulana99.github.io/'
    }
  });
}).listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});