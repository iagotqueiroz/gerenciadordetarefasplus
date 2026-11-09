import { cadastrarTarefa, trocarStatus } from "./tarefas.js";

export function iniciarEventosTarefa() {
  let formulario = document.getElementById("form_tarefa");
  const listaTarefas = document.getElementById("listaTarefas");

  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    cadastrarTarefa();
  });

  listaTarefas.addEventListener("change", (event) => {
    if(event.target.matches(".select_tarefa")) {
      trocarStatus(event)
    }
  })

}

