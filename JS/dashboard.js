// Atualiza o Mês conforme o valor escolhido no select e o ano conforme o ano atual
document.getElementById('tipoMes').addEventListener('change', function() {
    const mesSelecionado = this.value; // Obtém o valor selecionado
    const anoAtual = new Date().getFullYear(); // Obtém o ano atual
    document.getElementById('mesTexto').textContent = mesSelecionado + " de " + anoAtual;
});

window.onload = function() {
    const mesAtual = document.getElementById('mesTexto').textContent.split(" ")[0]; // Obtém o mês atual do texto
    const anoAtual = new Date().getFullYear(); // Obtém o ano atual
    document.getElementById('mesTexto').textContent = mesAtual + " de " + anoAtual;
};
