let categoriaCount = 3;
let itemCount = 1;

function abrirModalAlterarOrdem() {
  const modal = new bootstrap.Modal(document.getElementById('modalAlterarOrdem'));
  modal.show();

  atualizarListaCategorias();
  atualizarListaItens();
}

function atualizarListaCategorias() {
  const listaCategorias = document.getElementById('listaCategorias');
  listaCategorias.innerHTML = '';

  // Adiciona as categorias à lista
  const categorias = [
    'Menu Principal',
    'Sobremesa',
    'Bebidas'
  ];

  categorias.forEach((categoria, index) => {
    const itemLista = document.createElement('li');
    itemLista.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    itemLista.innerHTML = `<span>${categoria}</span><i class="bi bi-list"></i>`;
    listaCategorias.appendChild(itemLista);
  });
}

function atualizarListaItens() {
  const listaItens = document.getElementById('listaItens');
  listaItens.innerHTML = '';

  // Adiciona os itens à lista
  const itens = [
    'Costela',
    'Legumes a vapor',
    'Fritas',
    'Havanna Thunder',
    'Chopp Colorado',
    'Super Milkshake'
  ];

  itens.forEach((item, index) => {
    const itemLista = document.createElement('li');
    itemLista.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    itemLista.innerHTML = `<span>${item}</span><i class="bi bi-list"></i>`;
    listaItens.appendChild(itemLista);
  });
}

function abrirModalAdicionarCategoria() {
  const modal = new bootstrap.Modal(document.getElementById('modalAdicionarCategoria'));
  modal.show();
}

function inserirCategoria() {
  // Obtém o nome da nova categoria do input
  const nomeCategoria = document.getElementById('nomeCategoria').value;

  // Cria a nova categoria
  const novaCategoria = document.createElement('div');
  novaCategoria.id = 'categoria-' + (categoriaCount + 1);
  novaCategoria.innerHTML = `
    <div class="container pt-5"> 
      <div class="row">
        <div class="col-12 col-md-6">
          <h2 class="titulo" id="nome-categoria-${categoriaCount + 1}">
            <span id="nome-categoria-${categoriaCount + 1}-texto">${nomeCategoria}</span>
            <i class="bi bi-pencil-square ms-3 text-danger" onclick="editarNomeCategoria('nome-categoria-${categoriaCount + 1}-texto')"></i>
          </h2>
        </div>
        <div class="categoria col-12 col-md-4 justify-content-between">
          <button class="btn btn-outline-danger">+ Item</button>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="categoria-status-${categoriaCount + 1}" onchange="toggleStatus(this)" checked>
            <label class="form-check-label" for="categoria-status-${categoriaCount + 1}">Ativo</label>
          </div>
          <i class="bi bi-trash text-danger me-lg-4" onclick="excluirCategoria('categoria-${categoriaCount + 1}')"></i>
        </div>
      </div>
    </div>
    <div class="container mt-4 col-lg-12 pe-4"> 
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Descrição</th>
            <th scope="col">Status</th>
            <th scope="col">Valor</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  `;

  // Adiciona a nova categoria ao final da página
  document.getElementById('containerCategorias').appendChild(novaCategoria);

  // Incrementa o contador de categorias
  categoriaCount++;

  // Limpa o input do nome da categoria
  document.getElementById('nomeCategoria').value = '';
}

function editarNomeCategoria(idCategoria) {
  // Seleciona o elemento <span> com o id da categoria
  const nomeCategoria = document.getElementById(idCategoria);
  
  // Verifica se o nome da categoria está sendo editado
  if (nomeCategoria.contentEditable === 'true') {
    nomeCategoria.contentEditable = 'false';
    nomeCategoria.classList.remove('editando');
    console.log('Novo nome da categoria:', nomeCategoria.textContent);
  } else {
    nomeCategoria.contentEditable = 'true';
    nomeCategoria.classList.add('editando');
    nomeCategoria.focus();
  }
}

function abrirModalAdicionarItem(idCategoria) {
  // Obtem o nome da categoria do elemento
  const categoria = document.getElementById(idCategoria);
  const nomeCategoria = categoria.querySelector('h2 > span').textContent;

  // Preenche o input da categoria no modal
  document.getElementById('categoriaItem').value = nomeCategoria; 

  // Mostra a modal
  const modal = new bootstrap.Modal(document.getElementById('modalAdicionarItem'));
  modal.show();
}

function toggleStatus(checkbox) {
  const label = checkbox.nextElementSibling;
  if (checkbox.checked) {
    label.textContent = "Ativo";
  } else {
    label.textContent = "Inativo";
  }
}

function excluirCategoria(idCategoria) {
  // Atualiza o texto da modal
  const textoConfirmacao = document.getElementById('textoConfirmacaoCategoria');
  textoConfirmacao.innerHTML = '<p>Caso você clique em sim, também serão excluídos os itens da categoria. Deseja continuar?</p>';

  // Mostra a modal de confirmação
  const modal = new bootstrap.Modal(document.getElementById('modalConfirmacaoCategoria'));
  modal.show();

  // Adiciona um evento de clique ao botão "Sim"
  const botaoConfirma = document.getElementById('confirmaExcluirCategoria');
  botaoConfirma.addEventListener('click', () => {
    const categoria = document.getElementById(idCategoria);
    categoria.remove();
    modal.hide();
  });
}

function excluirItem(idItem) {
  // Atualiza o texto da modal
  const textoConfirmacao = document.getElementById('textoConfirmacaoItem');
  textoConfirmacao.innerHTML = '<p>Caso você clique em sim, o item será excluído. Deseja continuar?</p>';

  // Mostra a modal de confirmação
  const modal = new bootstrap.Modal(document.getElementById('modalConfirmacaoItem'));
  modal.show();

  // Adiciona um evento de clique ao botão "Sim"
  const botaoConfirma = document.getElementById('confirmaExcluirItem');
  botaoConfirma.addEventListener('click', () => {
    const linhaItem = document.getElementById(idItem).closest('tr');
    linhaItem.remove();
    modal.hide();
  });
}