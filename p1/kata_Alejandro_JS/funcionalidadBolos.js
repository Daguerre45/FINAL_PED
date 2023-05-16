
function partida(rondas){
  console.log("Rondas: " + rondas)
  return rondas.length;
}

function rondasCorrectas(rondas){
  console.log("Rondas: " + rondas)
  var correcto=true;
  for (var i = 0; i < rondas.length; i++) {
    if (rondas[i][0]>10 || rondas[i][1]>10) {
      console.log("Error 1")
      correcto=false;
    }
    if (rondas[i][0]+rondas[i][1]>10) {
      console.log("Error 2")
      correcto=false;
    }
    if (rondas[i][0]==10 && rondas[i][1]!=0) {
      console.log("Error 3")
      correcto=false;
    }

    if (rondas[i][0]<0 || rondas[i][1]<0) {
      console.log("Error 4")
      correcto=false;
    }
    
    if (typeof rondas[i][0] != 'number' || typeof rondas[i][1] != 'number') {
      console.log("Error 5")
      correcto=false;
    }
  }
  return correcto;
}

function putuanacion(rondas,bonus){
  if (partida(rondas)!=10) {
    return "Error rondas";
  }
  if (rondasCorrectas(rondas)==false) {
    return "Error tipo";
  }

  var puntos=0;
  for (var i = 0; i < rondas.length; i++) {
    if (rondas[i][0]==10) {
      puntos = puntos + rondaStrike(rondas, i, bonus);
    }else if (rondas[i][0]+rondas[i][1]==10) {
      puntos = puntos + rondaSpare(rondas, i);
    }else {
      puntos = puntos + rondaNormal(rondas, i);
    }
  }
  return puntos;
}

function rondaStrike(rondas, i, bonus){
  if(i<8){
    return 10+rondas[i+1][0]+rondas[i+1][1];
  }
  else{
    return 10+bonus[0][0]+bonus[0][1];
  }
}

function rondaSpare(rondas, i){
  return 10+rondas[i+1][0];
}

function rondaNormal(rondas, i){
  return rondas[i][0]+rondas[i][1];
}

module.exports = {
  partida,
  rondasCorrectas,
  putuanacion
  
};
