#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <unistd.h>
#include <iostream>

#define SOCKET_PATH "/tmp/serv4"

int main() {
    // Crear el socket UDS
    int sock_fd = socket(AF_UNIX, SOCK_STREAM, 0);
    if (sock_fd == -1) {
        std::cerr << "Error al crear el socket." << std::endl;
        return 1;
    }

    // Configurar la dirección del socket
    sockaddr_un addr;
    memset(&addr, 0, sizeof(sockaddr_un));
    addr.sun_family = AF_UNIX;
    strncpy(addr.sun_path, SOCKET_PATH, sizeof(addr.sun_path) - 1);

    // Conectar al servidor
    if (connect(sock_fd, (sockaddr*)&addr, sizeof(sockaddr_un)) == -1) {
        std::cerr << "Error al conectarse al servidor." << std::endl;
        close(sock_fd);
        return 1;
    }

    // Enviar solicitud al servidor
    const char* solicitud = "hora";
    if (send(sock_fd, solicitud, strlen(solicitud), 0) == -1) {
        std::cerr << "Error al enviar solicitud al servidor." << std::endl;
        close(sock_fd);
        return 1;
    }

    // Recibir respuesta del servidor
    char respuesta[256];
    int bytes_recibidos = recv(sock_fd, respuesta, sizeof(respuesta) - 1, 0);
    if (bytes_recibidos == -1) {
        std::cerr << "Error al recibir respuesta del servidor." << std::endl;
        close(sock_fd);
        return 1;
    }
    respuesta[bytes_recibidos] = '\0';

    // Imprimir respuesta del servidor
    std::cout << "Respuesta del servidor: " << respuesta << std::endl;

    // Cerrar el socket
    close(sock_fd);

    return 0;
}
