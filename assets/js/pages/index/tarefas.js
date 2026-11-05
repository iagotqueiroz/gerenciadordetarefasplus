class Tarefa {
  constructor(id, titulo, descricao, status) {
    this.id = id;
    this.titulo = titulo;
    this.descricao = descricao;
    this.status = status;
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

  // Verifico se o título está preenchido
  if (titulo.value.trim() === "") {
    console.log("Titulo inválido!");
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
  );
  console.log(ultimoId);

  tarefas.push(tarefa);
  localStorage.setItem("ultimoId", JSON.stringify(ultimoId));

  localStorage.setItem("tarefas", JSON.stringify(tarefas));
  console.log(localStorage.getItem("tarefas"));

  titulo.value = "";
  descricao.value = "";
  status.value = "";

  listarTarefas();
}

//Função que cria os elementos de listar tarefas em html e lista as tarefas
export function listarTarefas() {
  let listaTarefas = document.getElementById("listaTarefas");
  listaTarefas.textContent = "";

  tarefas = buscarDados();
  tarefas.forEach((tarefa) => {
    let divTarefa = document.createElement("div");
    divTarefa.className = "tarefa_show";
    let divTd = document.createElement("div");
    let divS = document.createElement("div");
    divS.className = "divs-style";

    let titulo = document.createElement("h3");
    titulo.textContent = tarefa.titulo;
    titulo.className = "titulo_tarefa";
    divTd.appendChild(titulo);

    let descricao = document.createElement("p");
    descricao.textContent = tarefa.descricao;
    divTd.appendChild(descricao);

    let excluir = document.createElement("img");
    excluir.src = "icons8-lixo.svg";

    let status = document.createElement("p");

    status.appendChild(CriarStatusNaLista(tarefa.status, tarefa.id));
    divS.appendChild(status);
    divS.appendChild(excluir);
    divTarefa.appendChild(divTd);
    divTarefa.appendChild(divS);
    listaTarefas.appendChild(divTarefa);

    excluirTarefa(excluir, tarefa.id, tarefas);
  });
}

// Função que cria o select de Status na tarefa
function CriarStatusNaLista(status, id) {
  let select = document.createElement("select");
  select.className = "select_tarefa input_field";
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
}

//Fução que busca os dados no localStorage para a outra função listarTarefas
function buscarDados() {
  let tarefas = localStorage.getItem("tarefas");
  if (tarefas) {
    tarefas = JSON.parse(tarefas);
    return tarefas;
  } else {
    return [];
  }
}