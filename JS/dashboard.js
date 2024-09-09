// Atualiza o Mês conforme o valor escolhido no select e o ano conforme o ano atual
document.getElementById('tipoMes').addEventListener('change', function () {
    const mesSelecionado = this.value; // Obtém o valor selecionado
    const anoAtual = new Date().getFullYear(); // Obtém o ano atual
    document.getElementById('mesTexto').textContent = mesSelecionado + " de " + anoAtual;
});

window.onload = function () {
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
    const marginLeft = 10;
    const bars = [];

    function drawAxesAndLabels() {
        // Desenhar eixos
        barCtx.beginPath();
        barCtx.moveTo(40, 0);
        barCtx.lineTo(40, barCanvas.height - 20);
        barCtx.lineTo(barCanvas.width - 10, barCanvas.height - 20);
        barCtx.strokeStyle = '#000000';
        barCtx.lineWidth = 1;
        barCtx.stroke();

        // Adicionar rótulos do eixo Y
        const barYLabels = [100, 200, 300, 400];
        barCtx.font = '14px Arial';
        barCtx.fillStyle = '#000000';
        barYLabels.forEach((label, index) => {
            const y = barCanvas.height - 5 - (index + 1) * (barCanvas.height / (barYLabels.length + 1.5));
            barCtx.fillText(label, 0, y);
            barCtx.moveTo(35, y);
            barCtx.lineTo(40, y);
        });
        barCtx.stroke();

        // Adicionar rótulos do eixo X
        barCtx.font = '10px Arial';
        barLabels.forEach((label, index) => {
            const x = 45 + marginLeft + index * barWidth * 2 + barWidth; // Mover para a direita
            barCtx.fillText(label, x - barWidth / 2, barCanvas.height - 5);
        });
    }

    function drawBars() {
        const maxBarHeight = barCanvas.height - 40;
        const maxValue = 430;

        // Desenhar barras de receitas com padding
        barDataReceitas.forEach((value, index) => {
            const barHeight = (value / maxValue) * maxBarHeight;
            const x = 40 + marginLeft + index * barWidth * 2 + padding;
            const y = barCanvas.height - 20 - barHeight;
            barCtx.fillStyle = barColorsReceitas;
            barCtx.fillRect(x, y, barWidth - padding, barHeight);
            bars.push({ x, y, width: barWidth - padding, height: barHeight, value });
        });

        // Desenhar barras de despesas com padding
        barDataDespesas.forEach((value, index) => {
            const barHeight = (value / maxValue) * maxBarHeight;
            const x = 40 + marginLeft + index * barWidth * 2 + barWidth;
            const y = barCanvas.height - 20 - barHeight;
            barCtx.fillStyle = barColorsDespesas;
            barCtx.fillRect(x, y, barWidth - padding, barHeight);
            bars.push({ x, y, width: barWidth - padding, height: barHeight, value });
        });
    }

    drawAxesAndLabels();
    drawBars();

    barCanvas.addEventListener('mousemove', (event) => {
        const rect = barCanvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        barCtx.clearRect(0, 0, barCanvas.width, barCanvas.height);

        drawAxesAndLabels();
        drawBars();

        // Destacar barra ao passar o mouse
        bars.forEach(bar => {
            if (mouseX >= bar.x && mouseX <= bar.x + bar.width && mouseY >= bar.y && mouseY <= bar.y + bar.height) {
                barCtx.lineWidth = 1;
                barCtx.strokeStyle = '#000000';
                barCtx.strokeRect(bar.x, bar.y, bar.width, bar.height);

                // Mostrar tooltip
                barCtx.font = '12px Arial';
                barCtx.fillStyle = '#000000';
                barCtx.fillText(bar.value, bar.x + bar.width / 2 - 10, bar.y - 5);
            }
        });
    });


    // -------------------------------- Gráfico de Linhas --------------------------------
    const lineCanvas = document.getElementById('linhaGrafico');
    const lineCtx = lineCanvas.getContext('2d');
    const lineData = [20, 60, 40, 80, 40, 100, 60];
    const lineColors1 = '#D31D30';
    const lineColors2 = '#CCCCCC';
    const lineLabels = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
    const points = [];

    function drawLineChart() {
        lineCtx.clearRect(0, 0, lineCanvas.width, lineCanvas.height);

        // Desenhar eixos
        lineCtx.beginPath();
        lineCtx.moveTo(40, 0);
        lineCtx.lineTo(40, lineCanvas.height - 20);
        lineCtx.lineTo(lineCanvas.width, lineCanvas.height - 20);
        lineCtx.strokeStyle = '#000000';
        lineCtx.lineWidth = 1;
        lineCtx.stroke();

        // Adicionar rótulos do eixo Y
        const yLineLabels = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
        lineCtx.font = '14px Arial';
        lineCtx.fillStyle = '#000000';
        const yGap = (lineCanvas.height - 40) / (yLineLabels.length - 1);
        yLineLabels.forEach((label, index) => {
            const y = lineCanvas.height - 30 - index * yGap;
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

        // Normalizar os dados da linha
        const maxYValue = Math.max(...yLineLabels);
        const normalizedLineData = lineData.map(value => (value / maxYValue) * (lineCanvas.height - 40));

        // Desenhar linha
        lineCtx.beginPath();
        lineCtx.moveTo(40, lineCanvas.height - 20 - normalizedLineData[0]);
        normalizedLineData.forEach((value, index) => {
            const x = 40 + index * (lineCanvas.width - 60) / lineLabels.length + (lineCanvas.width - 60) / (2 * lineLabels.length);
            const y = lineCanvas.height - 20 - value;
            lineCtx.lineTo(x, y);
            points.push({ x, y, value: lineData[index] });
        });
        lineCtx.strokeStyle = lineColors1;
        lineCtx.lineWidth = 2;
        lineCtx.stroke();

        // Desenhar pontos
        points.forEach(point => {
            lineCtx.beginPath();
            lineCtx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
            lineCtx.fillStyle = lineColors1;
            lineCtx.fill();
        });
    }

    drawLineChart();

    lineCanvas.addEventListener('mousemove', (event) => {
        const rect = lineCanvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        drawLineChart();

        points.forEach(point => {
            if (Math.abs(mouseX - point.x) < 5 && Math.abs(mouseY - point.y) < 5) {
                lineCtx.beginPath();
                lineCtx.arc(point.x, point.y, 7, 0, 2 * Math.PI);
                lineCtx.fillStyle = '#000000';
                lineCtx.fill();

                lineCtx.font = '12px Arial';
                lineCtx.justify = 10;
                lineCtx.fillText(point.value, point.x - 10, point.y - 10);
            }
        });
    });


    // -------------------------------- Gráfico de Pizza --------------------------------
    function drawPieChart(canvasId, data, colors) {
        const canvas = document.getElementById(canvasId);
        const ctx = canvas.getContext('2d');
        const total = data.reduce((acc, value) => acc + value, 0);
        let startAngle = 0;
        const slices = [];

        data.forEach((value, index) => {
            const sliceAngle = (value / total) * 2 * Math.PI;
            const radius = canvas.height / 2;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = colors[index];
            ctx.fill();

            const textX = centerX + (radius / 1.5) * Math.cos(startAngle + sliceAngle / 2);
            const textY = centerY + (radius / 1.5) * Math.sin(startAngle + sliceAngle / 2);
            const percentage = Math.round((value / total) * 100) + '%';

            // Adicionar contorno ao texto para melhorar o contraste
            ctx.fillStyle = '#000000';
            ctx.font = '14px Poppins';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.lineWidth = 2;
            ctx.strokeText(percentage, textX, textY);

            ctx.fillStyle = '#FFFFFF';
            ctx.fillText(percentage, textX, textY);

            slices.push({ startAngle, endAngle: startAngle + sliceAngle, color: colors[index] });
            startAngle += sliceAngle;
        });

        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = canvas.height / 2;
            const angle = Math.atan2(mouseY - centerY, mouseX - centerX);
            const distance = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);

            // Ajustar o ângulo para estar no intervalo [0, 2 * Math.PI]
            let adjustedAngle = angle;
            if (adjustedAngle < 0) {
                adjustedAngle += 2 * Math.PI;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            slices.forEach((slice, index) => {
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, slice.startAngle, slice.endAngle);
                ctx.closePath();
                ctx.fillStyle = slice.color;
                ctx.fill();

                if (distance < radius && adjustedAngle >= slice.startAngle && adjustedAngle < slice.endAngle) {
                    ctx.lineWidth = 2;
                    ctx.strokeStyle = '#000000';
                    ctx.stroke();
                }

                const textX = centerX + (radius / 1.5) * Math.cos((slice.startAngle + slice.endAngle) / 2);
                const textY = centerY + (radius / 1.5) * Math.sin((slice.startAngle + slice.endAngle) / 2);
                const percentage = Math.round((data[index] / total) * 100) + '%';

                ctx.fillStyle = '#000000';
                ctx.font = '14px Poppins';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.lineWidth = 2;
                ctx.strokeText(percentage, textX, textY);

                ctx.fillStyle = '#FFFFFF';
                ctx.fillText(percentage, textX, textY);
            });
        });
    }

    // Chamar a função para desenhar os gráficos de pizza
    drawPieChart('pizzaGrafico', [35, 30, 20, 10, 5], ['#E73B3B', '#E27F7F', '#84111E', '#FF001B', '#B2323F']);


    // -------------------------------- Gráfico de Barras Horizontais --------------------------------
    const horizontalBarCanvas = document.getElementById('barraGrafico');
    const horizontalBarCtx = horizontalBarCanvas.getContext('2d');
    const horizontalBarData = [10, 20, 40, 30, 50, 70, 60];
    const horizontalBarColors = ['#C60D20'];
    const barHeight = (horizontalBarCanvas.height - 20) / horizontalBarData.length;
    const horizontalBars = [];

    function drawHorizontalAxesAndLabels() {
        // Desenhar eixos
        horizontalBarCtx.beginPath();
        horizontalBarCtx.moveTo(40, 0);
        horizontalBarCtx.lineTo(40, horizontalBarCanvas.height - 20);
        horizontalBarCtx.lineTo(horizontalBarCanvas.width, horizontalBarCanvas.height - 20);
        horizontalBarCtx.strokeStyle = '#000000';
        horizontalBarCtx.lineWidth = 1;
        horizontalBarCtx.stroke();

        // Adicionar rótulos do eixo X
        const xLabels = [10, 20, 30, 40, 50, 60, 70];
        horizontalBarCtx.font = '12px Arial';
        horizontalBarCtx.fillStyle = '#000000';
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
    }

    function drawHorizontalBars() {
        // Desenhar barras horizontais com linhas verticais para facilitar a leitura
        horizontalBarData.forEach((value, index) => {
            horizontalBarCtx.fillStyle = horizontalBarColors[index % horizontalBarColors.length];
            const barLength = (value / 70) * (horizontalBarCanvas.width - 60);
            const y = index * barHeight;
            horizontalBarCtx.fillRect(40, y, barLength, barHeight - 10);
            horizontalBars.push({ x: 40, y, width: barLength, height: barHeight - 10, value });

            // Adicionar linha vertical do final da barra até o eixo x
            horizontalBarCtx.strokeStyle = '#CCCCCC'; // Cor da linha
            horizontalBarCtx.beginPath();
            horizontalBarCtx.moveTo(40 + barLength, y);
            horizontalBarCtx.lineTo(40 + barLength, horizontalBarCanvas.height - 20);
            horizontalBarCtx.stroke();
        });
    }

    drawHorizontalAxesAndLabels();
    drawHorizontalBars();

    horizontalBarCanvas.addEventListener('mousemove', (event) => {
        const rect = horizontalBarCanvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        horizontalBarCtx.clearRect(0, 0, horizontalBarCanvas.width, horizontalBarCanvas.height);

        drawHorizontalAxesAndLabels();
        drawHorizontalBars();

        // Destacar barra ao passar o mouse
        horizontalBars.forEach(bar => {
            if (mouseX >= bar.x && mouseX <= bar.x + bar.width && mouseY >= bar.y && mouseY <= bar.y + bar.height) {
                horizontalBarCtx.lineWidth = 2;
                horizontalBarCtx.strokeStyle = '#000000';
                horizontalBarCtx.strokeRect(bar.x, bar.y, bar.width, bar.height);

                // Mostrar tooltip
                horizontalBarCtx.font = '12px Arial';
                horizontalBarCtx.fillStyle = '#000000';
                horizontalBarCtx.fillText(bar.value, bar.x + bar.width + 5, bar.y + bar.height);
            }
        });
    });
});