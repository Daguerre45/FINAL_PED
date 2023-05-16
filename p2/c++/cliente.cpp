#include <iostream>
#include <unistd.h>
#include <fcntl.h>
#include <sys/stat.h>
#include <cstring>
using namespace std;

int main(){
    // Definir el nombre de la tubería
    char * myfifo = (char*) "/tmp/mypipe";
    // Buffer para almacenar el path del archivo
    char buffer[80];
    // Descriptor de archivo para la tubería
    int fd;

    // Abrir la tubería para escritura
    fd = open(myfifo, O_WRONLY);

    // Pedir al usuario que introduzca el path del archivo
    cout << "Introduzca el path completo del archivo: ";
    cin >> buffer;

    // Enviar el path del archivo al servidor
    write(fd, buffer, sizeof(buffer));

    // Cerrar la tubería
    close(fd);

    return 0;
}
