function partida(tabla) {
    const tiros = puntuaje(tabla);
    
    let partida = 0;
    for(let i = 0; i < tiros.length; i += 2){
        const spare = tiros[i] + tiros[i + 1] == 10;
        if(spare){
            partida += 10;
            partida += tiros[i +2];
        }else{
        partida += tiros[i];
        partida += tiros[i + 1];
        }
    }
    return partida;
}

function puntuaje(tabla) {
    const tiros = [];
    for(let i = 0; i < tabla.length; i++){
        const currentElement = tabla[i];
        if (currentElement === " "){
            continue;
        }
        else if (currentElement === '/'){
            tiros.push(10 - tiros[tiros.length - 1]);
        } else {
            tiros.push(parseInt(currentElement));
        }
    }
    return tiros;
}


  module.exports = partida;