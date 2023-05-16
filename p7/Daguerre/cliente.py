import socket
import threading
import sys

def receive_messages(client_socket):
    try:
        while True:
            data = client_socket.recv(1024)
            if not data:
                break
            message = data.decode('utf-8')
            print(message)
    except Exception as e:
        print(f"Error del cliente: {e}")
    finally:
        client_socket.close()
        sys.exit()

def start_client():
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    try:
        client_socket.connect(('localhost', 4000))
        print("Conectando al servidor...")

        threading.Thread(target=receive_messages, args=(client_socket,)).start()

        name = input("Introduce tu nombre: ")
        client_socket.sendall(name.encode('utf-8'))

        while True:
            input_msg = input()
            client_socket.sendall(input_msg.encode('utf-8'))
    except KeyboardInterrupt:
        print("\nDesconectando del servidor...")
    finally:
        client_socket.close()

if __name__ == '__main__':
    start_client()