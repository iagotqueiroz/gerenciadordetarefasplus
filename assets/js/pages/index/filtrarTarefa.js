import { buscarDados, listarTarefas } from "./tarefas.js";

let campoBusca = document.getElementById("busca");
let campoSelect = document.getElementById("select_status_filtro");

campoSelect.addEventListener("change", () => {
  filtrarTarefa();
});
campoBusca.addEventListener("input", () => {
  filtrarTarefa();
});

async function filtrarTarefa() {
  let tarefas = await buscarDados();

  let tarefasFiltradas = tarefas.filter((tarefa) => {
    if (
      tarefa.titulo.toLowerCase().includes(campoBusca.value.toLowerCase()) &&
      (tarefa.status === campoSelect.value ||
        campoSelect.value === "todas_tarefas")
    ) {
      return true;
    } else {
      return false;
    }
  });
  console.log(tarefasFiltradas);

  await listarTarefas(tarefasFiltradas);
}
