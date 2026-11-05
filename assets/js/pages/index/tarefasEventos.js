import { cadastrarTarefa, trocarStatus } from "./tarefas.js";

export function iniciarEventosTarefa() {
  let btn_cadastrar = document.getElementById("btn_cadastro");
  const listaTarefas = document.getElementById("listaTarefas");

  btn_cadastrar.addEventListener("click", cadastrarTarefa);

  listaTarefas.addEventListener("change", (event) => {
    if(event.target.matches(".select_tarefa")) {
      trocarStatus(event)
    }
  })
}

