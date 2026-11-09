import { buscarDados, listarTarefas } from "../index/tarefas.js";

async function carregarModal() {
  const resposta = await fetch("./popup_editar.html");
  const html = await resposta.text();

  document.body.insertAdjacentHTML("beforeend", html)

   const closeButton = document.getElementById("fecharModal");

   closeButton.addEventListener("click", () => {
     fecharPopup();
   });

   const cancellButton = document.getElementById("cancelarEdicao");

   cancellButton.addEventListener('click', () => {
    fecharPopup()
   })

   const salvarAlteracoesButton = document.getElementById("salvarAlteracoes");
   salvarAlteracoesButton.addEventListener("click", (e) => {
     e.preventDefault();
     salvarAlteracoes();
   });
}
carregarModal()

let tarefa;
let id;
const listaTarefas = document.querySelector('#listaTarefas');
listaTarefas.addEventListener('click', (e) => {
  const botaoEditar = e.target.closest(".editar_tarefa");
  if (!botaoEditar) return;
  const linha = botaoEditar.closest('tr');
  const select = linha.querySelector('.select_tarefa');
  id = Number(select.dataset.id);

  const tarefas = JSON.parse(localStorage.getItem("tarefas"));
  tarefa = tarefas.find((item) => {
    return item.id === id;
  })

  console.log(id)
  mostrarPopup(tarefa)
})


function mostrarPopup(tarefa) {
  let editar_titulo = document.getElementById("editar_titulo");
  let editar_descricao = document.getElementById("editar_descricao");
  let editar_prazo = document.getElementById("editar_prazo");
  let editar_status = document.getElementById("editar_status");

  const dataSalva = tarefa.date;
  const [dia, mes, ano] = dataSalva.split('/')
  const dataFormatada = `${ano}-${mes}-${dia}`
  console.log(dataSalva)

  editar_titulo.value = tarefa.titulo;
  editar_descricao.value = tarefa.descricao;
  editar_prazo.value = dataFormatada;
  editar_status.value = tarefa.status

  let popup = document.getElementById("modalEditar");
  popup.showModal();
}


function fecharPopup() {
  let popup = document.getElementById("modalEditar");
  popup.close()
}

function salvarAlteracoes() {
  let editar_titulo = document.getElementById("editar_titulo").value;
  let editar_descricao = document.getElementById("editar_descricao").value;
  let editar_prazo = document.getElementById("editar_prazo").value;
  const [ano, mes, dia] = editar_prazo.split('-')
  editar_prazo = `${dia}/${mes}/${ano}`;

  let editar_status = document.getElementById("editar_status").value;

  let tarefas = buscarDados();

  let tarefa = tarefas.find((item) => {
    return item.id === id;
  })

  tarefa.titulo = editar_titulo;
  tarefa.descricao = editar_descricao;
  tarefa.date = editar_prazo;
  tarefa.status = editar_status;

  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  listarTarefas();
  fecharPopup();
}