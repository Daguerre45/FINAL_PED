# Cliente-Servidor de Ficheros
Este proyecto es una implementación sencilla de una aplicación cliente-servidor de ficheros en C++. El cliente se conecta al servidor a través de una tubería y envía la ruta completa de un archivo. El servidor responde con el contenido del archivo o un mensaje de error si no puede proporcionar el contenido.

## Requisitos del Sistema
Para ejecutar este proyecto, necesitarás tener lo siguiente en tu sistema:

Un sistema operativo compatible con C++ y Unix, como Linux o macOS.
Un compilador de C++, como GCC o Clang.
Un sistema de construcción, como Make.
## Compilación
Sigue estos pasos para compilar los archivos del proyecto:

Abre una terminal y accede al directorio del proyecto.

```
cd ruta/al/proyecto
```
Compila el archivo servidor.cpp con el comando g++.
```
g++ servidor.cpp -o servidor
```
Compila el archivo cliente.cpp con el comando g++.
```
g++ cliente.cpp -o cliente
```
## Ejecución
Sigue estos pasos para ejecutar la aplicación:

Abre una terminal y accede al directorio del proyecto.
```
cd ruta/al/proyecto
```
Inicia el servidor ejecutando el archivo servidor.
```

./servidor
```
En otra terminal, inicia el cliente ejecutando el archivo cliente.
```
./cliente
```
Proporciona la ruta completa del archivo que deseas obtener del servidor. Por ejemplo:
```
Introduce la ruta del archivo a leer: /ruta/al/archivo.txt
```
* El servidor responderá con el contenido del archivo o un mensaje de error si no puede proporcionar el contenido. El cliente mostrará la respuesta recibida en la salida estándar.
Notas Adicionales
* El servidor y el cliente deben ser iniciados en terminales separadas para que puedan comunicarse a través de la tubería.
* Asegúrate de proporcionar la ruta completa del archivo al cliente, incluyendo el nombre del archivo y la extensión.
* Si deseas cambiar el nombre del archivo ejecutable para el servidor o el cliente, asegúrate de cambiar el nombre en los comandos de compilación y en los comandos de ejecución.
* Si deseas cambiar el nombre de la tubería, asegúrate de cambiar el nombre en los archivos servidor.cpp y cliente.cpp.