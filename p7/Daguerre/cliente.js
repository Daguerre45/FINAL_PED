const net = require('net');
const readline = require('readline');

const client = new net.Socket();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

client.on('connect', () => {
  console.log('Conectado al servidor.');
});

client.on('data', (data) => {
  console.log(data.toString());
});

client.on('close', () => {
  console.log('Desconectado del servidor.');
});

client.on('error', (err) => {
  console.error(`Error del cliente: ${err}`);
  client.destroy();
});

rl.question('Introduce tu nombre: ', (name) => {
  client.connect(4000, 'localhost', () => {
    console.log('Conectando al servidor...');
    client.write(name);
  });
});

rl.on('line', (input) => {
  client.write(input);
});

rl.on('SIGINT', () => {
  console.log('\nDesconectando del servidor...');
  client.end();
  rl.close();
});
