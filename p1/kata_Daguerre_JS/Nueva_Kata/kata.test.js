
const op = require('./kata');

test("Comprobar nº rondas", () => {
    partida = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    expect(op.numeroDeRondas(partida)).toBe(10);
})

test("Comprobar nº rondas < 10", () => {
    partida = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    expect(op.numeroDeRondas(partida)).toBe("ERROR el numero de rondas es distinto de 10");
})

test("Comprobar nº rondas > 10", () => {
    partida = [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    expect(op.numeroDeRondas(partida)).toBe("ERROR el numero de rondas es distinto de 10");
})

test("Suma de puntuación = 10",() =>{
    partida = [[5,0],[0,5],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    expect(op.puntuacion(partida)).toBe(10);
});

test("Suma de puntuación = 10 #2",() =>{
    partida = [[5,5],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    expect(op.puntuacion(partida)).toBe(10);
});

test("Puntos negativos",() =>{
    partida = [[-5,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    expect(op.puntuacion(partida)).toBe("ERROR no puedes tirar bolos negativos");
});

test("Puntos negativos #2",() =>{
    partida = [[5,0],[0,-5],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    expect(op.puntuacion(partida)).toBe("ERROR no puedes tirar bolos negativos");
});

test("Exceso de puntuacion por ronda",() =>{
    partida = [[11,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    expect(op.puntuacion(partida)).toBe("ERROR no puedes tirar mas de 10 bolos en una ronda");
});

test("Exceso de puntuacion por ronda #2",() =>{
    partida = [[5,6],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    expect(op.puntuacion(partida)).toBe("ERROR no puedes tirar mas de 10 bolos en una ronda");
});

test("Suma de Strike",() =>{
    partida = [[10,0],[2,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    expect(op.puntuacion(partida)).toBe(14);
});

test("Suma de Strike #2",() =>{
    partida = [[10,0],[10,0],[2,2],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    expect(op.puntuacion(partida)).toBe(38);
});

test("Suma de Spare",() =>{
    partida = [[0,10],[2,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    expect(op.puntuacion(partida)).toBe(14);
});

test("Suma de Spare #2",() =>{
    partida = [[0,10],[2,2],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
    expect(op.puntuacion(partida)).toBe(16);
});




