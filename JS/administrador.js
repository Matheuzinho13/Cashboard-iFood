// recupera o tbody
const tbody = document.querySelector('#tbody');

// variável para contar o número de colaboradores
let numeroColaborador = 5; // Inicializa com 5 pois já há 5 colaboradores na tabela

// Recupera o elemento do título
const tituloColaboradores = document.querySelector('#numeroColaboradores');

// Função para atualizar o título com o número de colaboradores
function atualizarTituloColaboradores() {
    const numeroColaboradores = tbody.querySelectorAll('tr').length;
    tituloColaboradores.textContent = `${numeroColaboradores} colaborador${numeroColaboradores !== 1 ? 'es' : ''} encontrada${numeroColaboradores !== 1 ? 's' : ''}`;
}

// pega o formulário quando clica no submit
document.querySelector('#formColaboradores').addEventListener('submit', function (e) {
    // cancela o evento padrão de submit
    e.preventDefault();

    // Função para obter o nome completo
    function obterNomeCompleto() {
        const nome = document.querySelector('#nomeColaborador').value;
        const sobrenome = document.querySelector('#sobrenomeColaborador').value;
        return `${nome} ${sobrenome}`;
    }

    // Define os campos a serem adicionados na tabela
    const campos = [
        { campo: obterNomeCompleto(), label: 'Nome' }, // Nome completo como string
        { campo: document.querySelector('#emailColaborador').value, label: 'Email' }, // Valor direto do input
        { campo: document.querySelector('#dataAsmissão').value, label: 'Data de Admissão' }, // Valor direto do input
        { campo: document.querySelector('#nivelColaborador').value, label: 'Nível de Acesso' } // Valor direto do input
    ];

    // criar a tr/linha para cada formulário enviado
    const tr = document.createElement('tr');

    // criar a th para o número do colaborador
    const th = document.createElement('th');
    th.scope = 'row';
    th.textContent = numeroColaborador; // Adiciona o número do colaborador
    tr.appendChild(th);

    // criar a td para cada campo enviado
    campos.forEach(item => {
        const td = document.createElement('td');

        if (item.label === 'Data de Admissão') {
            // Pegar a data como string no formato original "aaaa-mm-dd"
            const data = item.campo;
            // Separar ano, mês e dia
            const [ano, mes, dia] = data.split('-');
            // Formatar a data no formato "dd/mm/aaaa"
            td.textContent = `${dia}/${mes}/${ano}`;
        } else {
            // recuperar o valor do campo e mandar pra td
            td.textContent = item.campo; // Aqui não é necessário usar `.value`
        }

        // atribuir td a tr
        tr.appendChild(td);
    });

    // adicionar a tr ao tbody
    tbody.appendChild(tr);

    // incrementar o número de colaboradores
    numeroColaborador++;

    // atualizar o título com o número atual de colaboradores
    atualizarTituloColaboradores();

    // limpar formulário
    this.reset();
});

// Atualiza o título com o número de colaboradores inicial
atualizarTituloColaboradores();
