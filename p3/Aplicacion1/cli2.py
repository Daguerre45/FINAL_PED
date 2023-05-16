import os

fichero = input("Introduzca el fichero: ")
# Abre la tubería para escritura
pipe = open('tuberia', 'w')
# Envía la ruta del archivo al servidor a través de la tubería
pipe.write(fichero)
pipe.flush()

pipe_name_respuesta = 'tuberia_respuesta'
if not os.path.exists(pipe_name_respuesta):
    os.mkfifo(pipe_name_respuesta)

pipe2 = open('tuberia_respuesta', 'r')

# Lee la respuesta del servidor a través de la tubería
response = pipe2.read()

# Cierra la tubería
pipe.close()

# Muestra la respuesta recibida del servidor
print(response)
