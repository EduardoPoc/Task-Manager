// Lógica pura das tarefas (sem DOM), fácil de testar.

export function criarTarefa(titulo, id) {
  const limpo = String(titulo ?? "").trim();
  if (!limpo) {
    throw new Error("O título não pode ser vazio");
  }
  return { id, titulo: limpo, feita: false };
}

export function proximoId(tarefas) {
  return tarefas.reduce((maior, t) => Math.max(maior, t.id), 0) + 1;
}

export function adicionar(tarefas, titulo) {
  return [...tarefas, criarTarefa(titulo, proximoId(tarefas))];
}

export function alternar(tarefas, id) {
  return tarefas.map((t) => (t.id === id ? { ...t, feita: !t.feita } : t));
}

export function remover(tarefas, id) {
  return tarefas.filter((t) => t.id !== id);
}

export function contarPendentes(tarefas) {
  return tarefas.filter((t) => !t.feita).length;
}
