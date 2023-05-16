const net = require('net');
const fs = require('fs');
const SOCKET_FILE = '/tmp/mysocket';

if (fs.existsSync(SOCKET_FILE)) {
  fs.unlinkSync(SOCKET_FILE);
}

const server = net.createServer((socket) => {
    socket.on('data',(data) =>{ //manejas lo que recibes del cliente
        console.log('Se ha recibido: ' + data)
        fs.readFile(data.toString(), 'utf8', (err, fileData) => {
          if (err) {
            console.error(err);
            socket.write('Error al leer el archivo');
            //socket.end();
          } else {
            console.log('Contenido del archivo leído');
            socket.write(fileData);
            //socket.end();
          }
        });
    });
});

server.listen(SOCKET_FILE, () => {
  console.log('Servidor iniciado en el socket UNIX ' + SOCKET_FILE);
});
