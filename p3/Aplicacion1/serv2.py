import os

# Crea la tubería
pipe_name = 'tuberia'
if not os.path.exists(pipe_name):
    os.mkfifo(pipe_name)

# Abre la tubería para lectura
pipe = open(pipe_name, 'r')
pipe2 = open('tuberia_respuesta','w')

##while True:
    # Lee la ruta del archivo enviada por el cliente a través de la tubería
file_path = pipe.readline().rstrip()

    ##try:
        # Abre el archivo y lee su contenido
with open(file_path, 'r') as file:
    file_contents = file.read()
            # Envía el contenido del archivo al cliente a través de la tubería
pipe2.write(file_contents)
pipe2.flush()
pipe.close()
#pipe2.close()
            
    ##except Exception as e:
        # Si el archivo no se encuentra o no se puede leer, envía un mensaje de error al cliente a través de la tubería
        #pipe.write(str(e))
        #pipe.flush()