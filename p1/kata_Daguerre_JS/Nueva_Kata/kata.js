module.exports = {
    "numeroDeRondas": numeroDeRondas,
    "puntuacion": puntuacion
}

function numeroDeRondas(partida){
    if(partida.length != 10) return "ERROR el numero de rondas es distinto de 10";
    return partida.length;
}

function puntuacion(partida){
    let suma = 0;
    for (let i = 0; i < partida.length; i++) {
        ronda = partida[i][0] + partida[i][1];
        if(partida[i][0] < 0 || partida[i][1] < 0) return "ERROR no puedes tirar bolos negativos"
        if(partida[i][0] > 10 || partida[i][1] > 10) return "ERROR no puedes tirar mas de 10 bolos en una ronda"
        if(ronda > 10) return "ERROR no puedes tirar mas de 10 bolos en una ronda"
        if(partida[i][0] == 10) suma += partida[i+1][0] + partida[i+1][1]
        if(partida[i][1] == 10) suma += partida[i+1][0]
        suma += ronda
    }
    return suma;
}