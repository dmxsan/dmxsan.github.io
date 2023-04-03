var http = require('http');
var httpProxy = require('http-proxy');
var requiresPort = require('requires-port');

httpProxy.createServer(function (req, res, proxy) {
  var hostname = req.headers.host.split(':')[0];
  var port = requiresPort(req.protocol, 443) ? 443 : 80;

  proxy.proxyRequest(req, res, {
    host: hostname,
    port: port,
    changeOrigin: true,
    headers: {
      referer: req.headers.host
    }
  });
}).listen(8000);

console.log('Proxy server listening on port 8000');
