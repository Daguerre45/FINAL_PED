const net = require('net');
const SOCKET_FILE = '/tmp/mysocket';

const client = net.createConnection({ path: SOCKET_FILE }, () => {
  //console.log('Te has conectado al servidor');
});

client.on('data', (data) => { //manejas lo que recibes del servidor
  console.log('' + data);
  client.end()
});

client.write(process.argv[2])
