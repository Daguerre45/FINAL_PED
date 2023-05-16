const dgram = require('dgram');
const client = dgram.createSocket('udp4');
const SERVER_PORT = 4000; 
const SERVER_ADDRESS = 'localhost';
const message = Buffer.from(process.argv[2]);

client.on('error', (error) => {
  console.error(`Error del cliente: ${error}`);
  client.close();
});

client.on('message', (message) => {
  console.log(`Respuesta del servidor: ${message}`);
  client.close();
});



client.send(message, 0, message.length, SERVER_PORT, SERVER_ADDRESS, (error) => {
  if (error) {
    console.error(`Error al enviar mensaje: ${error}`);
    client.close();
  } else {
    console.log(`Mensaje enviado al servidor ${SERVER_ADDRESS}:${SERVER_PORT}`);
  }
});
