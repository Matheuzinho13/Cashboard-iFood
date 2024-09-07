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

document.addEventListener('DOMContentLoaded', function () {
    // -------------------------------- Gráfico de Colunas --------------------------------
    const barCanvas = document.getElementById('colunaGrafico');
    const barCtx = barCanvas.getContext('2d');
    const barDataReceitas = [450, 360, 400, 410, 350, 410, 450];
    const barDataDespesas = [350, 430, 380, 250, 300, 380, 380];
    const barColorsReceitas = '#51C13F';
    const barColorsDespesas = '#FF001B';
    const barLabels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const barWidth = (barCanvas.width - 60) / (barDataReceitas.length * 2);
    const padding = 5;

    // Desenhar eixos
    barCtx.beginPath();
    barCtx.moveTo(40, 0);
    barCtx.lineTo(40, barCanvas.height - 20);
    barCtx.lineTo(barCanvas.width - 10, barCanvas.height - 20);
    barCtx.stroke();

    // Adicionar rótulos do eixo Y
    const barYLabels = [100, 200, 300, 400];
    barCtx.font = '14px Arial';
    barYLabels.forEach((label, index) => {
        const y = barCanvas.height - 5 - (index + 1) * (barCanvas.height / (barYLabels.length + 1.5));
        barCtx.fillText(label, 10, y);
        barCtx.moveTo(35, y);
        barCtx.lineTo(40, y);
    });
    barCtx.stroke();

    // Adicionar rótulos do eixo X
    barLabels.forEach((label, index) => {
        const x = 45 + index * barWidth * 2 + barWidth; // Mover para a direita
        barCtx.fillText(label, x - barWidth / 2, barCanvas.height - 5);
    });

    // Desenhar barras de receitas com padding
    const maxBarHeight = barCanvas.height - 40; // Ajuste para espaço dos eixos
    const maxValue = Math.max(...barDataReceitas, ...barDataDespesas);
    barDataReceitas.forEach((value, index) => {
        const barHeight = (value / maxValue) * maxBarHeight;
        barCtx.fillStyle = barColorsReceitas;
        barCtx.fillRect(40 + index * barWidth * 2 + padding, barCanvas.height - 20 - barHeight, barWidth - padding, barHeight);
    });

    // Desenhar barras de despesas com padding
    barDataDespesas.forEach((value, index) => {
        const barHeight = (value / maxValue) * maxBarHeight;
        barCtx.fillStyle = barColorsDespesas;
        barCtx.fillRect(40 + index * barWidth * 2 + barWidth, barCanvas.height - 20 - barHeight, barWidth - padding, barHeight);
    });


    // -------------------------------- Gráfico de Linhas --------------------------------
    const lineCanvas = document.getElementById('linhaGrafico');
    const lineCtx = lineCanvas.getContext('2d');
    const lineData = [20, 60, 40, 80, 40, 100, 60];
    const lineColors1 = '#D31D30';
    const lineColors2 = '#CCCCCC';
    const lineLabels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

    // Desenhar eixos
    lineCtx.beginPath();
    lineCtx.moveTo(40, 0);
    lineCtx.lineTo(40, lineCanvas.height - 20);
    lineCtx.lineTo(lineCanvas.width, lineCanvas.height - 20);
    lineCtx.stroke();

    lineCtx.stroke();
    // Adicionar rótulos do eixo Y
    const yLineLabels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    lineCtx.font = '14px Arial';
    const yGap = (lineCanvas.height - 25) / (yLineLabels.length + 1);
    yLineLabels.forEach((label, index) => {
        const y = lineCanvas.height - 20 - (index + 1) * yGap;
        lineCtx.fillText(label, 10, y);
        lineCtx.moveTo(35, y);
        lineCtx.lineTo(40, y);
    });
    lineCtx.stroke();

    // Adicionar rótulos do eixo X
    lineLabels.forEach((label, index) => {
        const x = 40 + index * (lineCanvas.width - 60) / lineLabels.length + (lineCanvas.width - 60) / (2 * lineLabels.length);
        lineCtx.fillText(label, x - 5, lineCanvas.height - 5);
    });

    // Desenhar linha
    lineCtx.beginPath();
    lineCtx.moveTo(40, lineCanvas.height - 20 - (lineData[0] / 100) * (lineCanvas.height - 40));
    lineData.forEach((value, index) => {
        const x = 40 + index * (lineCanvas.width - 60) / lineLabels.length + (lineCanvas.width - 60) / (2 * lineLabels.length);
        const y = lineCanvas.height - 20 - (value / 100) * (lineCanvas.height - 40);
        lineCtx.lineTo(x, y);
    });
    lineCtx.strokeStyle = lineColors1;
    lineCtx.stroke();

    // Desenhar linha com pontos nos vértices e linhas verticais
    lineCtx.beginPath();
    lineCtx.moveTo(40, lineCanvas.height - 20 - (lineData[0] / 100) * (lineCanvas.height - 40));
    lineData.forEach((value, index) => {
        const x = 40 + index * (lineCanvas.width - 60) / lineLabels.length + (lineCanvas.width - 60) / (2 * lineLabels.length);
        const y = lineCanvas.height - 20 - (value / 100) * (lineCanvas.height - 40);
        lineCtx.lineTo(x, y);
        // Adicionar ponto no vértice
        lineCtx.fillStyle = lineColors1;
        lineCtx.beginPath();
        lineCtx.arc(x, y, 3, 0, 2 * Math.PI);
        lineCtx.fill();
        // Adicionar linha vertical do topo até o eixo x
        lineCtx.strokeStyle = '#CCCCCC'; // Cor da linha
        lineCtx.beginPath();
        lineCtx.moveTo(x, 0);
        lineCtx.lineTo(x, lineCanvas.height - 20);
        lineCtx.stroke();
    });
    lineCtx.strokeStyle = lineColors2;
    lineCtx.stroke();


    // -------------------------------- Gráfico de Pizza --------------------------------
    const pieCanvas = document.getElementById('pizzaGrafico');
    const pieCtx = pieCanvas.getContext('2d');
    const pieData = [10, 5, 35, 30, 20];
    const pieColors = ['#E73B3B', '#E27F7F', '#84111E', '#FF001B', '#B2323F'];
    const pieTotal = pieData.reduce((acc, value) => acc + value, 0);
    let pieStartAngle = 0;

    // Desenhar fatias de pizza com porcentagens centralizadas apenas para 30%
    pieData.forEach((value, index) => {
        const sliceAngle = (value / pieTotal) * 2 * Math.PI;
        const pieRadius = pieCanvas.height / 2;
        const pieCenterX = pieCanvas.width / 2;
        const pieCenterY = pieCanvas.height / 2;

        // Desenhar fatia
        pieCtx.beginPath();
        pieCtx.moveTo(pieCenterX, pieCenterY);
        pieCtx.arc(pieCenterX, pieCenterY, pieRadius, pieStartAngle, pieStartAngle + sliceAngle);
        pieCtx.closePath();
        pieCtx.fillStyle = pieColors[index];
        pieCtx.fill();

        // Adicionar texto de porcentagem
        let textX, textY;
        if (value === 30) {
            // Centralizar para 30%
            textX = pieCenterX + (pieRadius / 2) * Math.cos(pieStartAngle + sliceAngle / 2);
            textY = pieCenterY + (pieRadius / 2) * Math.sin(pieStartAngle + sliceAngle / 2);
        } else {
            // Posição original para os outros valores
            textX = pieCenterX + (pieRadius / 1.5) * Math.cos(pieStartAngle + sliceAngle / 2);
            textY = pieCenterY + (pieRadius / 1.5) * Math.sin(pieStartAngle + sliceAngle / 2);
        }
        const percentage = Math.round((value / pieTotal) * 100) + '%';
        pieCtx.fillStyle = '#FFFFFF';
        pieCtx.font = '12px Poppins';
        pieCtx.textAlign = 'center';
        pieCtx.textBaseline = 'middle';
        pieCtx.fillText(percentage, textX, textY);

        pieStartAngle += sliceAngle;
    });


    // -------------------------------- Gráfico de Barras Horizontais --------------------------------
    const horizontalBarCanvas = document.getElementById('barraGrafico');
    const horizontalBarCtx = horizontalBarCanvas.getContext('2d');
    const horizontalBarData = [10, 20, 40, 30, 50, 70, 60];
    const horizontalBarColors = ['#C60D20'];
    const barHeight = (horizontalBarCanvas.height - 20) / horizontalBarData.length;

    // Desenhar eixos
    horizontalBarCtx.beginPath();
    horizontalBarCtx.moveTo(40, 0);
    horizontalBarCtx.lineTo(40, horizontalBarCanvas.height - 20);
    horizontalBarCtx.lineTo(horizontalBarCanvas.width, horizontalBarCanvas.height - 20);
    horizontalBarCtx.stroke();

    // Adicionar rótulos do eixo X
    const xLabels = [10, 20, 30, 40, 50, 60, 70];
    horizontalBarCtx.font = '12px Arial';
    xLabels.forEach((label, index) => {
        const x = 55 + index * (horizontalBarCanvas.width - 60) / xLabels.length + (horizontalBarCanvas.width - 60) / (2 * xLabels.length);
        horizontalBarCtx.fillText(label, x - 5, horizontalBarCanvas.height - 5);
    });

    // Adicionar rótulos do eixo Y
    const horizontalBarYLabels = ['S', 'S', 'Q', 'Q', 'T', 'S', 'D'];
    horizontalBarYLabels.forEach((label, index) => {
        const y = index * barHeight + barHeight / 2;
        horizontalBarCtx.fillText(label, 20, y);
    });

    // Desenhar barras horizontais com linhas verticais para facilitar a leitura
    horizontalBarData.forEach((value, index) => {
        horizontalBarCtx.fillStyle = horizontalBarColors[index % horizontalBarColors.length];
        const barLength = (value / 70) * (horizontalBarCanvas.width - 60);
        horizontalBarCtx.fillRect(40, index * barHeight, barLength, barHeight - 10);

        // Adicionar linha vertical do final da barra até o eixo x
        horizontalBarCtx.strokeStyle = '#CCCCCC'; // Cor da linha
        horizontalBarCtx.beginPath();
        horizontalBarCtx.moveTo(40 + barLength, index * barHeight);
        horizontalBarCtx.lineTo(40 + barLength, horizontalBarCanvas.height - 20);
        horizontalBarCtx.stroke();
    });
});