const dgram = require('dgram');
const server = dgram.createSocket('udp4');
const fs = require('fs');

server.bind(4000);

server.on('error', (error) => {
  console.error(`Error del servidor: ${error}`);
  server.close();
});

server.on('message', (message, remoteInfo) => {
  console.log(`Mensaje recibido de ${remoteInfo.address}:${remoteInfo.port}: ${message}`);
  
  fs.readFile(message.toString(), 'utf8', (err, fileData) => {
    if (err) {
      console.error(err);
      server.send('Error al leer el archivo', remoteInfo.port, remoteInfo.address);
    } else {
      console.log('Contenido del archivo leído');
      const buffer = Buffer.from(fileData);
      server.send(buffer, 0, buffer.length, remoteInfo.port, remoteInfo.address);
    }
  });
});

server.on('listening', () => {
  const address = server.address();
  console.log(`Servidor iniciado en el puerto UDP ${address.port}`);
});
