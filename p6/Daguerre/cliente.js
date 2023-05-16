const net = require('net');

const SERVER_PORT = 4000;
const SERVER_ADDRESS = 'localhost';
const message = process.argv[2];

const client = new net.Socket(); //Crea el socket tcp

client.on('error', (error) => {
  console.error(`Error del cliente: ${error}`);
  client.destroy();
});

client.connect(SERVER_PORT, SERVER_ADDRESS, () => {
  console.log(`Conectado al servidor ${SERVER_ADDRESS}:${SERVER_PORT}`);
  client.write(message);
});

client.on('data', (data) => {
  console.log(`Respuesta del servidor: ${data}`);
  client.destroy();
});

client.on('close', () => {
  console.log('Conexión cerrada');
});
