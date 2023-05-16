import os

rdCS,wdCS = os.pipe() #Servidor --> Cliente
rcs, wcs = os.fdopen(rdCS,'rb',0), os.fdopen(wdCS,'wb',0) # file objects

rdSC,wdSC = os.pipe() #Cliente --> Servidor
rsc, wsc = os.fdopen(rdSC,'rb',0), os.fdopen(wdSC,'wb',0) # file objects


pid = os.fork()

if pid: # Servidor
    wcs.close()
    rsc.close()

    path = rcs.readline()
    print("El servidor lee: " + path.decode('utf8').strip())
    
    try:
        with open(path, 'r') as fichero:
            contenido = fichero.read()
        wsc.write(contenido.encode('utf8'))
        wsc.flush()
        wsc.close()
        rcs.close()
    except FileNotFoundError:
        wsc.write("ERROR: no existe el archivo")
        wsc.flush()
        wsc.close()
        rcs.close()

else: # Cliente
    rcs.close()
    wsc.close()

    path = input("ESCRIBE EL PATH DEL FICHERO: ")
    wcs.write(path.encode('utf8'))
    wcs.flush()
    wcs.close()

    fichero = rsc.readline()
    print(fichero.decode('utf8').strip())
    rsc.close()