import { test } from "node:test";
import assert from "node:assert/strict";
import {
  criarTarefa,
  adicionar,
  alternar,
  remover,
  contarPendentes,
  proximoId,
} from "../site/tasks.js";

test("criarTarefa remove espaços e começa pendente", () => {
  const t = criarTarefa("  Estudar Git  ", 1);
  assert.deepEqual(t, { id: 1, titulo: "Estudar Git", feita: false });
});

test("criarTarefa rejeita título vazio", () => {
  assert.throws(() => criarTarefa("   ", 1), /vazio/);
  assert.throws(() => criarTarefa(undefined, 1), /vazio/);
});

test("proximoId começa em 1 e incrementa", () => {
  assert.equal(proximoId([]), 1);
  assert.equal(proximoId([{ id: 4 }, { id: 2 }]), 5);
});

test("adicionar não altera a lista original", () => {
  const original = [];
  const nova = adicionar(original, "Fazer slides");
  assert.equal(original.length, 0);
  assert.equal(nova.length, 1);
  assert.equal(nova[0].id, 1);
});

test("alternar marca e desmarca uma tarefa", () => {
  let lista = adicionar([], "Revisar PR");
  lista = alternar(lista, 1);
  assert.equal(lista[0].feita, true);
  lista = alternar(lista, 1);
  assert.equal(lista[0].feita, false);
});

test("remover tira apenas a tarefa indicada", () => {
  let lista = adicionar(adicionar([], "A"), "B");
  lista = remover(lista, 1);
  assert.equal(lista.length, 1);
  assert.equal(lista[0].titulo, "B");
});

test("contarPendentes ignora tarefas concluídas", () => {
  let lista = adicionar(adicionar([], "A"), "B");
  lista = alternar(lista, 1);
  assert.equal(contarPendentes(lista), 1);
});
