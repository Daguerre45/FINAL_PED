const partida = require('./funcionalidadBolos').partida;
const putuanacion = require('./funcionalidadBolos').putuanacion;
const assert = require('assert');

test('Numero de rondas', () => {
  assert.strictEqual(partida([(0,0),(0,0),(0,0),(0,0),(0,0),(0,0),(0,0),(0,0),(0,0),(0,0)]), 10)
});

test('Numero de rondas', () => {
  assert.strictEqual(partida([0,0,0,0,0,0,0,0,0,0]), 10)
});

test('Rondas2', () => {
  assert.strictEqual(putuanacion([[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[9,0]]), "Error rondas")
});

test('Rondas limits1', () => {
  assert.strictEqual(putuanacion([[10,1],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]), "Error tipo")
});

test('Rondas limits2', () => {
  assert.strictEqual(putuanacion([[10,0],[7,5],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]), "Error tipo")
});

test('Rondas limits3', () => {
  assert.strictEqual(putuanacion([[-10,0],[7,5],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]), "Error tipo")
});

test('Rondas limits4', () => {
  assert.strictEqual(putuanacion([["gola",0],[7,5],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]), "Error tipo")
});

test('Puntos', () => {
  assert.strictEqual(putuanacion([[1,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]), 1)
});

test('Puntos 2', () => {
  assert.strictEqual(putuanacion([[1,0],[0,0],[5,0],[0,0],[0,0],[0,0],[1,3],[0,0],[0,0],[0,0]]), 10)
});

test('Puntos con pleno', () => {
  assert.strictEqual(putuanacion([[10,0],[3,2],[5,0],[0,0],[0,0],[0,0],[1,3],[0,0],[0,0],[0,0]]), 29)
});

test('Puntos con 2 plenos', () => {
  assert.strictEqual(putuanacion([[10,0],[3,2],[5,0],[0,0],[10,0],[6,3],[1,3],[0,0],[0,0],[0,0]]), 57)
});

test('Puntos con 2 plenos y semipleno', () => {
  assert.strictEqual(putuanacion([[10,0],[3,2],[5,0],[0,0],[10,0],[6,3],[1,3],[6,4],[6,0],[0,0]]), 79)
});

test('Puntos con 2 plenos y con 2 semipleno', () => {
  assert.strictEqual(putuanacion([[10,0],[3,2],[5,5],[1,0],[10,0],[6,3],[1,3],[6,4],[6,0],[0,0]]), 86)
});

test('Puntos con pleno con bonus', () => {
  assert.strictEqual(putuanacion([[10,0],[3,2],[5,0],[0,0],[0,0],[0,0],[1,3],[0,0],[0,0],[10,0]],[[3,3]]), 45)
});