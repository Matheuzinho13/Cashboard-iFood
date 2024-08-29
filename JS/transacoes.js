// recupera o tbody
const tbody = document.querySelector('#tbody');

// variável para contar o número das despesas
let numeroDespesa = 3; // Inicializa com 3 pois já há 2 despesas na tabela

// Recupera o elemento do título
const tituloDespesas = document.querySelector('#modalLabelDespesasContagem');

// Função para atualizar o título com o número de despesas
function atualizarTituloDespesas() {
    const numeroDespesas = tbody.querySelectorAll('tr').length;
    tituloDespesas.textContent = `${numeroDespesas} despesa${numeroDespesas !== 1 ? 's' : ''} encontrada${numeroDespesas !== 1 ? 's' : ''}`;
}

// pega o formulário quando clica no submit
document.querySelector('#formDespesa').addEventListener('submit', function (e) {
    // cancela o evento padrão de submit
    e.preventDefault();

    const campos = [
        { campo: document.querySelector('#tipoDespesa'), label: 'Categoria' },
        { campo: document.querySelector('#valorDespesa'), label: 'Valor' },
        { campo: document.querySelector('#dataDespesa'), label: 'Data' },
        { campo: document.querySelector('#descDespesa'), label: 'Descrição' }
    ];

    // criar a tr/linha para cada formulário enviado
    const tr = document.createElement('tr');

    // criar a th para o número da despesa
    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = numeroDespesa; // Adiciona o número da despesa
    tr.appendChild(th);

    // criar a td para cada campo enviado
    campos.forEach(item => {
        const td = document.createElement('td');

        if (item.campo.id === 'dataDespesa') {
            // Pegar a data como string no formato original "aaaa-mm-dd"
            const data = item.campo.value;
            // Separar ano, mês e dia
            const [ano, mes, dia] = data.split('-');
            // Formatar a data no formato "dd/mm/aaaa"
            td.textContent = `${dia}/${mes}/${ano}`;
        } else {
            // recuperar o valor do campo e mandar pra td
            td.textContent = item.campo.value;
        }

        // atribuir td a tr
        tr.appendChild(td);
    });

    // adicionar a tr ao tbody
    tbody.appendChild(tr);

    // incrementar o número da despesa
    numeroDespesa++;

    // atualizar o título com o número atual de despesas
    atualizarTituloDespesas();

    // limpar formulário
    this.reset();
});

atualizarTituloDespesas();

// preencher os inputs de "data" e "valor" no modal de editar despesa
document.querySelectorAll('.editar').forEach(button => {
    button.addEventListener('click', function () {
        // Pega a linha da tabela (tr) correspondente ao botão clicado
        const linha = this.closest('tr');

        // Recupera os valores das células da linha
        const data = linha.querySelector('td:nth-child(1)').textContent; 
        const valor = linha.querySelector('td:nth-child(4)').textContent; 

        // Preenche os inputs do modal com os valores recuperados
        document.querySelector('#dataEditar').value = formatarDataParaInput(data);
        document.querySelector('#valorEditar').value = valor;
    });
});

// Função para formatar a data no formato "dd/mm/aaaa" para "aaaa-mm-dd"
function formatarDataParaInput(data) {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
}