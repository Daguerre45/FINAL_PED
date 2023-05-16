const partida = require('./bolos');

test("fallar todas las bolas resultado 0", () =>{
    const tabla = '00 00 00 00 00 00 00 00 00 00';

    expect(partida(tabla)).toEqual(0);
});

test("tirar un bolo en todas las rondas deberia dar resultado 10", () =>{
    const tabla = '10 10 10 10 10 10 10 10 10 10';

    expect(partida(tabla)).toEqual(10);
});

test("tirar un bolo cada primera tirada y dos en cada segunda ", () =>{
    const tabla = '12 12 12 12 12 12 12 12 12 12';

    expect(partida(tabla)).toEqual(30);
});

test("tirar bolos aleatorios", () =>{
    const tabla = '12 34 21 43 51 32 22 11 81 63';

    expect(partida(tabla)).toEqual(55);
});

test("spare", () =>{
    const tabla = '7/ 00 00 00 00 00 00 00 00 00';

    expect(partida(tabla)).toEqual(10);
});

// Test eliminado debido a que ya no debería funcionar al añadir la regla de spare
//test("spare + otro puntuacion (sin tener en cuenta propiedad de spare)", () =>{
//    const tabla = '7/ 60 00 00 00 00 00 00 00 00';

//    expect(partida(tabla)).toEqual(16);
//});

test("spare teniendo en cuenta propiedad de spare", () =>{
    const tabla = '7/ 50 00 00 00 00 00 00 00 00';

    expect(partida(tabla)).toEqual(20);
});

test("varios spare en una partida", () =>{
    const tabla = '7/ 5/ 62 7/ 04 6/ 62 00 00 00';

    expect(partida(tabla)).toEqual(77);
});