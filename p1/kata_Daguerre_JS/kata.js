module.exports = {
    "numeroDeRondas": numeroDeRondas,
    "bolosTirados" : bolosTirados,
    "comprobarNBolos" : comprobarNBolos,
    "comprobarNBolosNegativos": comprobarNBolosNegativos,
}

function numeroDeRondas(partida){
    let resultado = 0;
    resultado = partida.length;
    if(resultado != 10){
        return "ERROR Solo puede haber 10 rondas";
    }else return resultado;
}


function bucle(variable,contenido1, contenido2, contenido3 ,resultado, partida){
    eval(variable);
    let suma = 0;
    var tiradas = [];
    var tirada1 = [];
    var tirada2 = [];
    for (let i = 0; i < partida.length; i++){
        eval(contenido1)
        var tirada = 0;
        for(let j = 0; j < partida[i].length; j++){
            eval(contenido2);
        }contenido3;
        tiradas.push(tirada);
        for(let t = 0; t < tiradas.length; t++){
            if(tiradas[t] > 10) return("ERROR solo se pueden tirar como máximo 10 bolos por jugada");
            if(partida[t] < 0) return("ERROR no puede haber puntos negativos");
        }
        for(let a = 0; a < tirada1.length; a++){
            if(tirada1[a] < 0) return("ERROR no puede haber puntos negativos");
        }
        for(let b = 0; b < tirada2.length; b++){
            if(tirada2[b] < 0) return("ERROR no puede haber puntos negativos");
        }
    }
    return((eval(resultado)));
}

function comprobarNBolos(partida){
    resultado = bucle("var tiradas = []", "var tirada = 0", "tirada += partida[i][j]", "tiradas.push(tirada)","", partida);
    if (resultado) return resultado
}

function comprobarNBolosNegativos(partida){
    resultado = bucle("var tirada1 = []\n var tirada2 = []","","tirada1.push(partida[i][0]); \n tirada2.push(partida[0][j]);","","", partida);
    if (resultado) return resultado
}

function strike(partida){
    var tirada1 = [];
    var tirada2 = [];
    let resultadonormal = 0
    let bonus = 0
    for (let i = 0; i < partida.length; i++){
        for(let j = 0; j < partida[i].length; j++){
            tirada2.push(partida[i][j]);
            resultadonormal += partida[i][j];
            if(resultadonormal == 10){
                bonus += partida[i+1][j+1];
            }
        }
    }
    console.log(resultadonormal);
    console.log(bonus);
    console.log(tirada2);
    for(let a = 0; a < tirada2.length; a++){
    }
}

strike([[10,0],[2,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]])
function sumaPuntosEspecial(){

}

function sumaStrike(partida){
    if(strike(partida) == "STRIKE"){
       console.log(bucle("let suma = 0", "","suma += partida[i][i]","","suma", partida));
    }
}
//variable,contenido1, contenido2, contenido3 ,resultado, partida
//sumaStrike([[10,0],[2,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]);

function bolosTirados(partida){
    resultadoNBolos = comprobarNBolos(partida);
    if(resultadoNBolos) return resultadoNBolos;
    
    resultadoNBolosNegativos = comprobarNBolosNegativos(partida);
    if(resultadoNBolosNegativos) return resultadoNBolosNegativos;

    resultadoStrike = strike(partida)
    if(resultadoStrike) return resultadoStrike;

    resultado = bucle("let suma = 0;", "", "suma += partida[i][j]", "", "suma",partida);
    if (resultado) return resultado
}
