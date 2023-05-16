const net = require('net');
const os = require('os');
const clients = {};

const server = net.createServer((socket) => {
  console.log(`Nuevo cliente conectado: ${socket.remoteAddress}:${socket.remotePort}`);
  let clientName = null;


  socket.on('data', (data) => {
    const message = data.toString().trim();

    if (message.startsWith('/')) {
      handleCommand(message, socket, clientName);
    } else if (!clientName) {
      if (message.toLowerCase() in clients) {
        socket.write('\x1b[31mEste nombre ya está en uso. Por favor, introduce otro nombre:\x1b[0m\n');
      } else {
        clientName = message;
        clients[clientName.toLowerCase()] = socket; // Convertir a minúsculas
        socket.write(`\x1b[32mBienvenido al chat, ${clientName}!\x1b[0m\n`);
        sendUserList();
      }
    } else {
      console.log(`${clientName}: ${message}`);

      if (message.startsWith('/')) {
        const privateMessageArgs = message.split(' ');
        const recipient = privateMessageArgs[0].substring(1).toLowerCase(); // Convertir a minúsculas
        const recipientSocket = clients[recipient];

        if (recipientSocket) {
          const senderName = clientName;
          const privateMessage = privateMessageArgs.slice(1).join(' ');
          const formattedMessage = `\x1b[33m[Mensaje privado de ${senderName}]: ${privateMessage}\x1b[0m\n`;
          recipientSocket.write(formattedMessage);
        } else {
          socket.write(`El usuario "\x1b[31m${recipient}\x1b[0m" no está conectado o no existe.\n`);
        }
      } else {
        const timestamp = new Date().toLocaleTimeString();
        Object.keys(clients).forEach((name) => {
          if (name !== clientName.toLowerCase()) { // Convertir a minúsculas
            const formattedMessage = `\x1b[36m[${timestamp}] \x1b[32m${clientName}:\x1b[0m ${message}\n`;
            clients[name].write(formattedMessage);
          }
        });
      }
    }
  });

  socket.on('end', () => {
    if (clientName) {
      delete clients[clientName];
      console.log(`Cliente desconectado: ${clientName}`);
      sendUserList();
      Object.keys(clients).forEach((name) => {
        clients[name].write(`${clientName} se ha desconectado.\n`);
      });
    }
  });

  socket.on('error', (err) => {
    console.error(`Error del cliente: ${err}`);
    socket.destroy();
  });
});

server.on('error', (err) => {
  console.error(`Error del servidor: ${err}`);
});

function getWifiIPAddress() {
  const interfaces = os.networkInterfaces();

  for (const interfaceName in interfaces) {
    const networkInterface = interfaces[interfaceName];
    for (const network of networkInterface) {
      if (network.family === 'IPv4' && !network.internal && network.address.startsWith('10.')) {
        return network.address;
      }
    }
  }

  return null;
}

server.listen(4000, () => {
  const address = getWifiIPAddress();
  if (address) {
    console.log(`Servidor iniciado en la dirección: ${address}`);
  } else {
    console.log('No se encontró la dirección IP de la red Wi-Fi.');
  }
});

function handleCommand(command, socket, clientName) {
  const commandArgs = command.split(' ');
  const commandName = commandArgs[0].toLowerCase();

  switch (commandName) {
    case '/usuarios':
      const userCount = Object.keys(clients).length;
      const usersMsg = `\x1b[36mNúmero de usuarios conectados: ${userCount}\x1b[0m\n`;
      socket.write(usersMsg);
      break;
    case '/ayuda':
      const helpMsg = '\x1b[36mComandos disponibles:\x1b[0m\n' +
        '\x1b[36m/usuarios - \x1b[0mMuestra el número de usuarios conectados\n' +
        '\x1b[36m/ayuda - \x1b[0mMuestra la lista de comandos disponibles\n';
      socket.write(helpMsg);
      break;
    default:
      if (command.startsWith('/')) {
        const recipient = commandName.substring(1); // Remove the leading '/'
        const recipientSocket = clients[recipient];

        if (recipientSocket) {
          const senderName = clientName;
          const privateMessage = commandArgs.slice(1).join(' ');
          const timestamp = new Date().toLocaleTimeString();
          const formattedMessage = `\x1b[36m[${timestamp}] \x1b[33m[Mensaje privado de \x1b[36m${senderName}\x1b[33m]: \x1b[0m${privateMessage}\n`;

          recipientSocket.write(formattedMessage);
        } else {
          socket.write(`El usuario "\x1b[31m${recipient}\x1b[0m" no está conectado o no existe.\n`);
        }
      } else {
        socket.write('\x1b[31mComando no reconocido. Escribe /ayuda para ver la lista de comandos disponibles.\x1b[0m\n');
      }
      break;
  }
}

function sendUserList() {
  const userCount = Object.keys(clients).length;
  const userList = `\x1b[36mUsuarios conectados (${userCount}):\n\x1b[0m`;
  const users = Object.keys(clients).join('\n');
  const userListMsg = userList + users + '\n\n';

  Object.keys(clients).forEach((name) => {
    clients[name].write(userListMsg);
  });
}
