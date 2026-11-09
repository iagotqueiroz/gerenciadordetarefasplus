class Tarefa {
  constructor(id, titulo, descricao, status, date) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.status = status;
    this.date = date;
  }
}

let tarefas = [];
//Função que cadastra a tarefa no localstorage
export function cadastrarTarefa() {
  let ultimoId = localStorage.getItem("ultimoId");
  ultimoId = Number(JSON.parse(ultimoId));
  //Puxo os valores dos inputs
  let titulo = document.getElementById("title_input");
  let descricao = document.getElementById("description_input");
  let status = document.getElementById("select_status");
  let date = document.getElementById("prazo_input");
  
  let dataFormatada;
  if (date.value) {
    const [ano, mes, dia] = date.value.split('-').map(Number);
    const dataLocal = new Date(ano, mes - 1, dia);
    const formatador = new Intl.DateTimeFormat("pt-BR");
    dataFormatada = formatador.format(dataLocal);
  } else {
    dataFormatada = 'Sem Data';
  }

  // Verifico se o título está preenchido
  if (titulo.value.trim() === "") {
    return;
  }
  let tituloTratado = titulo.value.trim();

  //Verifico se os status está vazio.
  // Se for vazio, muda a variavél status para pendente
  if (status.value === "") {
    status.value = "pendente";
  }
  ultimoId += 1;
  //crio uma nova instância da classe Tarefa
  let tarefa = new Tarefa(
    ultimoId,
    tituloTratado,
    descricao.value,
    status.value,
    dataFormatada,
  );
  tarefas = buscarDados();
  tarefas.push(tarefa);
  localStorage.setItem("ultimoId", JSON.stringify(ultimoId));

  localStorage.setItem("tarefas", JSON.stringify(tarefas));

  titulo.value = "";
  descricao.value = "";
  status.value = "";
  date.value = "";

  listarTarefas();
}

//Função que cria os elementos de listar tarefas em html e lista as tarefas
export function listarTarefas() {
  let listaTarefas = document.getElementById("listaTarefas");
  listaTarefas.textContent = "";

  tarefas = buscarDados();
  tarefas.forEach((tarefa) => {
    let status = CriarStatusNaLista(tarefa.status, tarefa.id);
    status.className = "input_field select_tarefa";
    let linha = document.createElement("tr");
    linha.innerHTML = `
                <td class="name_tarefa">
                  <strong>${tarefa.titulo}</strong>
                  <span>${tarefa.descricao}</span>
                </td>
                <td class="prazo_tarefa">${tarefa.date}</td>
                <td class="status_tarefa">
                
                </td>
                <td class="editar_tarefa icon_tarefa">
                  <img src="assets/images/pages/index/edit-icon.svg" alt="" />
                </td>
                <td class="excluir_tarefa icon_tarefa">
                  <img src="assets/images/pages/index/trash-icon.svg" alt="" />
                </td>`;
    linha.querySelector(".status_tarefa").appendChild(status);

    listaTarefas.appendChild(linha);
    let excluir = linha.querySelector(".excluir_tarefa");

    excluirTarefa(excluir, tarefa.id, tarefas);
  });

  updateResumo();
  contarTotalTarefas();
}

// Função que cria o select de Status na tarefa
function CriarStatusNaLista(status, id) {
  let select = document.createElement("select");
  select.dataset.id = id;

  let statusDisponiveis = ["pendente", "em_andamento", "concluida"];

  statusDisponiveis.forEach((item) => {
    let option = document.createElement("option");

    option.value = item;

    if (item === "em_andamento") {
      option.textContent = "Em andamento";
    } else if (item === "concluida") {
      option.textContent = "Concluída";
    } else {
      option.textContent = "Pendente";
    }

    if (item === status) {
      option.selected = true;
    }

    select.appendChild(option);
  });

  return select;
}

//Função que exclui uma tarefa e atualiza o local Storage
function excluirTarefa(excluir, tarefa_id, tarefas_lista) {
  excluir.addEventListener("click", () => {
    let tarefasAtualizadas = tarefas_lista.filter((tarefa) => {
      return tarefa.id !== tarefa_id;
    });

    localStorage.setItem("tarefas", JSON.stringify(tarefasAtualizadas));
    listarTarefas();
  });
}

//Função que muda os Status da tarefa no local Storage
export function trocarStatus(event) {
  let eventoAlterado = event.target.value;
  let id = Number(event.target.dataset.id);
  let tarefas = JSON.parse(localStorage.getItem("tarefas"));

  tarefas.find((tarefa) => {
    if (tarefa.id === id) {
      tarefa.status = eventoAlterado;
      return true;
    }
  });

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  updateResumo();
}

//Fução que busca os dados no localStorage para a outra função listarTarefas
export function buscarDados() {
  let tarefas = localStorage.getItem("tarefas");
  if (tarefas) {
    tarefas = JSON.parse(tarefas);
    return tarefas;
  } else {
    return [];
  }
}

let updatePendentes = 0;
let updateEmAndamento = 0;
let updateConcluidas = 0;

function updateResumo() {
  let update_pendente = document.getElementById("update_pendente");
  let update_em_andamento = document.getElementById("update_em_andamento");
  let update_concluida = document.getElementById("update_concluidas");

  let tarefaJson = buscarDados();
  updatePendentes = 0;
  updateEmAndamento = 0;
  updateConcluidas = 0;

  tarefaJson.filter((tarefa) => {
    if (tarefa.status === "em_andamento") {
      updateEmAndamento += 1;
    } else if (tarefa.status === "concluida") {
      updateConcluidas += 1;
    } else if (tarefa.status === "pendente") {
      updatePendentes += 1;
    }
  });
  update_pendente.textContent = updatePendentes;
  update_em_andamento.textContent = updateEmAndamento;
  update_concluida.textContent = updateConcluidas;
}

function contarTotalTarefas() {
  let totalTarefaSpan = document.getElementById("total_tarefas");
  let totalTarefas = buscarDados().length;

  if (totalTarefas > 1) {
    totalTarefaSpan.textContent = totalTarefas + ' Tarefas';
  } else {
    totalTarefaSpan.textContent = totalTarefas + " Tarefa";
  }
}
