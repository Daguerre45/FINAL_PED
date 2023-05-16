#include <sys/types.h>
#include <sys/socket.h>
#include <sys/un.h>
#include <unistd.h>
#include <signal.h>
#include <iostream>

#define SOCKET_PATH "/tmp/serv4"

int sock_fd;

// Manejador de señales para SIGINT
void sigint_handler(int sig) {
    std::cout << "Recibida señal SIGINT. Cerrando socket..." << std::endl;
    close(sock_fd);
    unlink(SOCKET_PATH);
    exit(0);
}

int main() {
    // Configurar el manejador de señales para SIGINT
    struct sigaction sa;
    sa.sa_handler = sigint_handler;
    sigemptyset(&sa.sa_mask);
    sa.sa_flags = 0;
    if (sigaction(SIGINT, &sa, NULL) == -1) {
        std::cerr << "Error al configurar el manejador de señales." << std::endl;
        return 1;
    }

    // Crear el socket UDS
    sock_fd = socket(AF_UNIX, SOCK_STREAM, 0);
    if (sock_fd == -1) {
        std::cerr << "Error al crear el socket." << std::endl;
        return 1;
    }

    // Configurar la dirección del socket
    sockaddr_un addr;
    memset(&addr, 0, sizeof(sockaddr_un));
    addr.sun_family = AF_UNIX;
    strncpy(addr.sun_path, SOCKET_PATH, sizeof(addr.sun_path) - 1);

    // Enlazar el socket a la dirección
    if (bind(sock_fd, (sockaddr*)&addr, sizeof(sockaddr_un)) == -1) {
        std::cerr << "Error al enlazar el socket." << std::endl;
        close(sock_fd);
        return 1;
    }

    // Escuchar conexiones entrantes
    if (listen(sock_fd, 5) == -1) {
        std::cerr << "Error al escuchar conexiones entrantes." << std::endl;
        close(sock_fd);
        return 1;
    }

    std::cout << "Servidor escuchando en " << SOCKET_PATH << "..." << std::endl;

    // Aceptar conexiones entrantes y procesarlas
    while (true) {
        int client_fd = accept(sock_fd, NULL, NULL);
        if (client_fd == -1) {
            std::cerr << "Error al aceptar conexión entrante." << std::endl;
            continue;
        }

        std::cout << "Peticion recibida." << std::endl;

        // Obtener la hora actual
        time_t now = time(NULL);
        std::string time_str = ctime(&now);

        // Enviar la hora actual al cliente
        if (send(client_fd, time_str.c_str(), time_str.size(), 0) == -1) {
            std::cerr << "Error al enviar datos al cliente." << std::endl;
        }

        // Cerrar la conexión con el cliente
        close(client_fd);
        std::cout << "Peticion enviada." << std::endl;
    }

    return 0;
}
