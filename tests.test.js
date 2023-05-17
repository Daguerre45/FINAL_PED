const { getNumeroDePuerto } = require('./Servidor');

test("Comprobar el número de puerto", () => {
	grupo = 4
	posicion = 1
	expect(getNumeroDePuerto(grupo,posicion)).toBe(3000);
});

