#include <iostream>
#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <cstring>
using namespace std;

int main(){
    // Definir el nombre de la tubería
    char * myfifo = (char*) "/tmp/mypipe";
    // Buffer para almacenar el mensaje recibido del cliente 80 tamaño max del archivo
    char buffer[80];
    // Descriptor de archivo para la tubería
    int fd;

    // Crear la tubería con permisos de lectura y escritura
    mkfifo(myfifo, 0666);

    // Abrir la tubería para lectura 
    fd = open(myfifo, O_RDONLY);

    // Variable booleana para indicar si ya se ha enviado una respuesta al cliente
    bool responded = false;

    // Bucle infinito del servidor
    while(true){
        // Leer el mensaje del cliente
        read(fd, buffer, sizeof(buffer));
        // Comprobar si el archivo existe 0 si existe, -1 si no existe
        if(access(buffer, F_OK) != -1){
            // Si el archivo existe, abrirlo y leer su contenido
            int file = open(buffer, O_RDONLY);
            char file_contents[512];
            read(file, file_contents, sizeof(file_contents));
            // Enviar el contenido del archivo al cliente
            if(!responded){ // solo responde la primera vez
                cout << file_contents << endl;
                responded = true;
            }
            // Cerrar el archivo y salir del bucle
            close(file);
            break;
        }
        else{
            // Si el archivo no existe, enviar un mensaje de error al cliente
            if(!responded){ // solo responde la primera vez
                cout << "El archivo no existe" << endl;
                responded = true;
            }
            // Salir del bucle
            break;
        }
    }

    // Cerrar la tubería y eliminarla
    close(fd);
    unlink(myfifo);

    return 0;
}
