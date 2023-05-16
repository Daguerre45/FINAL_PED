const net = require('net');
const fs = require('fs');

const SERVER_PORT = 4000;

const server = net.createServer((socket) => { //se conecta al servidor mediante net
  console.log(`Cliente conectado desde ${socket.remoteAddress}:${socket.remotePort}`);

  socket.on('error', (error) => {
    console.error(`Error del cliente: ${error}`);
    socket.destroy();
  });

  socket.on('data', (data) => {
    const filename = data.toString();
    console.log(`Mensaje recibido: ${filename}`);

    fs.readFile(filename, 'utf8', (err, fileData) => {
      if (err) {
        console.error(err);
        socket.write('Error al leer el archivo');
      } else {
        console.log('Contenido del archivo leído');
        socket.write(fileData);
      }
    });
  });
});

server.on('error', (error) => {
  console.error(`Error del servidor: ${error}`);
});

server.listen(SERVER_PORT, () => {
  console.log(`Servidor iniciado en el puerto TCP ${SERVER_PORT}`);
});