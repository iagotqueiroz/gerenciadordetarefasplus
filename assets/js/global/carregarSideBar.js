export async function carregarSideBar() {
  const resposta = await fetch("../../../sidebar.html");
  const html = await resposta.text();

  const sidebar = document.getElementById('sidebar')

  sidebar.innerHTML = html;
}

carregarSideBar();