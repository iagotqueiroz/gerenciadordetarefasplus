import { listarTarefas } from "./app.js";
export function excluirTarefa(excluir, tarefa_id, tarefas_lista) {
  excluir.addEventListener("click", () => {
    let tarefasAtualizadas = tarefas_lista.filter((tarefa) => {
      return tarefa.id !== tarefa_id
    })

    
    localStorage.setItem("tarefas", JSON.stringify(tarefasAtualizadas));
    listarTarefas()
  });
}