import { adicionar, alternar, remover, contarPendentes } from "./tasks.js";

const CHAVE = "todo-site:tarefas";

const form = document.querySelector("#form-tarefa");
const input = document.querySelector("#titulo");
const lista = document.querySelector("#lista");
const contador = document.querySelector("#contador");
const erro = document.querySelector("#erro");

let tarefas = carregar();

function carregar() {
  try {
    const salvo = localStorage.getItem(CHAVE);
    return salvo ? JSON.parse(salvo) : [];
  } catch {
    return [];
  }
}

function salvar() {
  try {
    localStorage.setItem(CHAVE, JSON.stringify(tarefas));
  } catch {
    // Sem armazenamento disponível: a lista continua funcionando em memória.
  }
}

function atualizar() {
  salvar();
  render();
}

function render() {
  lista.replaceChildren();

  for (const t of tarefas) {
    const li = document.createElement("li");
    li.className = "tarefa" + (t.feita ? " feita" : "");

    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = t.feita;
    check.setAttribute("aria-label", `Concluir ${t.titulo}`);
    check.addEventListener("change", () => {
      tarefas = alternar(tarefas, t.id);
      atualizar();
    });

    const texto = document.createElement("span");
    texto.textContent = t.titulo;

    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "remover";
    botao.textContent = "Remover";
    botao.setAttribute("aria-label", `Remover ${t.titulo}`);
    botao.addEventListener("click", () => {
      tarefas = remover(tarefas, t.id);
      atualizar();
    });

    li.append(check, texto, botao);
    lista.append(li);
  }

  const pendentes = contarPendentes(tarefas);
  contador.textContent =
    pendentes === 1 ? "1 tarefa pendente" : `${pendentes} tarefas pendentes`;
}

form.addEventListener("submit", (evento) => {
  evento.preventDefault();
  try {
    tarefas = adicionar(tarefas, input.value);
    erro.hidden = true;
    input.value = "";
    atualizar();
  } catch (e) {
    erro.textContent = e.message;
    erro.hidden = false;
  }
  input.focus();
});

render();
