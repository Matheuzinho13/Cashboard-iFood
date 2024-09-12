// Função para abrir o modal
function abrirModalEditarCadastro() {
    const modalEditarCadastro = document.getElementById('modalEditarCadastro');
    const modal = new bootstrap.Modal(modalEditarCadastro);
    modal.show();
}

// Adicionando evento de clique ao botão "Editar Informações"
const btnEditar = document.getElementById('linkeditar');
btnEditar.addEventListener('click', abrirModalEditarCadastro);

// Adicionando evento de clique ao botão "Concluir"
const btnSalvar = document.getElementById('btnSalvar');
btnSalvar.addEventListener('click', salvarAlteracoesCadastro);