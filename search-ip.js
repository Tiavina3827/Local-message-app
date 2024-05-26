var net = require('net');

function getNetworkIP(callback) {
  var socket = net.createConnection(80, 'www.google.com');
  socket.on('connect', function() {
    var localAddress = socket.localAddress;
    callback(localAddress);
    socket.end();
  });
}

getNetworkIP(function(ip) {
  console.log('L\'adresse IP de votre serveur est : ' + ip);
  console.log(`tapez http://${ip}:3000 pour accéder a la conversation`);
});
