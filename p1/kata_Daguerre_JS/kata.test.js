//para hacer el test comando npx jest
const op = require('./kata');

test('Nº Rondas = 10', () => {
    partida = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(op.numeroDeRondas(partida)).toBe(10);
    //expect(2 + 2).toBe(4);
});

test('Nº Rondas > 10', () => {
    partida = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(op.numeroDeRondas(partida)).toBe("ERROR Solo puede haber 10 rondas");
    //expect(2 + 2).toBe(4);
});

test('Nº Rondas < 10', () => {
    partida = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(op.numeroDeRondas(partida)).toBe("ERROR Solo puede haber 10 rondas");
    //expect(2 + 2).toBe(4);
});

test('Ha tirado 1 bolo',() =>{
    partida = [[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(op.bolosTirados(partida)).toBe(1);
});

test('Ha tirado 15 bolos',() =>{
    partida = [[1,0],[4,5],[0,0],[0,5],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(op.bolosTirados(partida)).toBe(15);
});

test('Ha tirado -1 bolos',() =>{
    partida = [[-1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(op.comprobarNBolosNegativos(partida)).toBe("ERROR no puede haber puntos negativos");
});

test('Ha tirado bolos negativos',() =>{
    partida = [[-1,7],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(op.comprobarNBolosNegativos(partida)).toBe("ERROR no puede haber puntos negativos");
});

test('Ha tirado bolos negativos_1',() =>{
    partida = [[1,-7],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(op.comprobarNBolosNegativos(partida)).toBe("ERROR no puede haber puntos negativos");
});

test('Ha superado el numero de bolos permitidos en una ronda',() =>{
    partida = [[11,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(op.bolosTirados(partida)).toBe("ERROR solo se pueden tirar como máximo 10 bolos por jugada");
});

test('Ha superado el numero de bolos permitidos en una ronda nº2',() =>{
    partida = [[5,6],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(op.bolosTirados(partida)).toBe("ERROR solo se pueden tirar como máximo 10 bolos por jugada");
});

test('Se ha realizado un Strike', () => {
    partida = [[10,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(op.bolosTirados(partida)).toBe("STRIKE");
});

test('Se ha realizado un Strike_2', () => {
    partida = [[0,0],[10,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(op.bolosTirados(partida)).toBe("STRIKE");
});

test('NO se ha realizado un Strike', () => {
    partida = [[0,10],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(op.bolosTirados(partida)).toBe(10);
});

/*test('La suma del Strike', () =>{
    partida = [[10,0],[2,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]];
    expect(op.SumaStrike(partida)).toBe(14);
});*/
