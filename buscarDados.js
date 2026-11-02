export function buscarDados() {
  let tarefas = localStorage.getItem('tarefas')
  if (tarefas) {
    tarefas = JSON.parse(tarefas);
    return tarefas
  } else {
    return []
  }
}