// -------------------------------- GRÁFICO DE PIZZA --------------------------------------
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
drawPieChart('pizzaGrafico', [33, 26, 16, 14, 11], ['#E73B3B', '#E27F7F', '#84111E', '#FF001B', '#B2323F']);
drawPieChart('novoPizzaGrafico', [35, 30, 20, 10, 5], ['#E73B3B', '#E27F7F', '#84111E', '#FF001B', '#B2323F']);


// -------------------------------- GRÁFICO DE LINHAS --------------------------------
const lineCanvas = document.getElementById('linhaGrafico');
const lineCtx = lineCanvas.getContext('2d');
const lineData = [300, 450, 250, 450, 350, 500, 250];
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
    const yLineLabels = [50, 100, 150, 200, 250, 300, 350, 400, 450, 500];
    lineCtx.font = '14px Arial';
    lineCtx.fillStyle = '#000000';
    const yGap = (lineCanvas.height - 30) / (yLineLabels.length - 1);
    yLineLabels.forEach((label, index) => {
        const y = lineCanvas.height - 20 - index * yGap;
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


// -------------------------------- GRÁFICO DE COLUNAS --------------------------------------
const barCanvas = document.getElementById('colunaGrafico');
const barCtx = barCanvas.getContext('2d');
const barDataReceitas = [1800, 2000, 1600, 1400, 1500, 2100, 2000, 1600, 1400, 1500, 1600, 2100];
const barDataDespesas = [1750, 1850, 1650, 1450, 1400, 1800, 2050, 1600, 1450, 800, 1550, 2000];
const barColorsReceitas = '#51C13F';
const barColorsDespesas = '#FF001B';
const barLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
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
    const barYLabels = [200, 400, 600, 800, 1000, 1200, 1400, 1600, 1800, 2000];
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
        const x = 45 + index * barWidth * 2 + barWidth; // Mover para a direita
        barCtx.fillText(label, x - barWidth / 2, barCanvas.height - 5);
    });
}

function drawBars() {
    const maxBarHeight = barCanvas.height - 40;
    const maxValue = 2000;

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


// -------------------------------- GRÁFICO DE BARRAS HORIZONTAIS --------------------------------
const horizontalBarCanvas = document.getElementById('barraGrafico');
const horizontalBarCtx = horizontalBarCanvas.getContext('2d');
const horizontalBarDataReceitas = [500, 450, 360, 500];
const horizontalBarDataDespesas = [400, 500, 340, 500];
const horizontalBarColorsReceitas = '#51C13F';
const horizontalBarColorsDespesas = '#FF001B';
const barHeight = (horizontalBarCanvas.height - 20) / (horizontalBarDataReceitas.length * 2);
const paddingq = 5;
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
    const xLabels = [150, 250, 350, 500];
    horizontalBarCtx.font = '12px Arial';
    horizontalBarCtx.fillStyle = '#000000';
    xLabels.forEach((label, index) => {
        const x = 55 + index * (horizontalBarCanvas.width - 60) / xLabels.length + (horizontalBarCanvas.width - 60) / (2 * xLabels.length);
        horizontalBarCtx.fillText(label, x - 5, horizontalBarCanvas.height - 5);
    });

    // Adicionar rótulos do eixo Y
    const horizontalBarYLabels = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'];
    horizontalBarYLabels.forEach((label, index) => {
        const y = index * barHeight * 2 + barHeight;
        horizontalBarCtx.fillText(label, 0, y);
    });
}

function drawHorizontalBars() {
    // Desenhar barras horizontais de receitas com padding
    horizontalBarDataReceitas.forEach((value, index) => {
        horizontalBarCtx.fillStyle = horizontalBarColorsReceitas;
        const barLength = (value / 500) * (horizontalBarCanvas.width - 60);
        const y = index * barHeight * 2 + barHeight / 6;
        horizontalBarCtx.fillRect(40, y, barLength, barHeight - paddingq);
        horizontalBars.push({ x: 40, y, width: barLength, height: barHeight - paddingq, value });
    });

    // Desenhar barras horizontais de despesas com padding
    horizontalBarDataDespesas.forEach((value, index) => {
        horizontalBarCtx.fillStyle = horizontalBarColorsDespesas;
        const barLength = (value / 500) * (horizontalBarCanvas.width - 60);
        const y = index * barHeight * 2 + barHeight / 1.2;
        horizontalBarCtx.fillRect(40, y, barLength, barHeight - paddingq);
        horizontalBars.push({ x: 40, y, width: barLength, height: barHeight - paddingq, value });
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
            horizontalBarCtx.lineWidth = 1;
            horizontalBarCtx.strokeStyle = '#000000';
            horizontalBarCtx.strokeRect(bar.x, bar.y, bar.width, bar.height);

            // Mostrar tooltip ao lado direito da barra
            horizontalBarCtx.font = '10px Arial';
            horizontalBarCtx.fillStyle = '#000000';
            horizontalBarCtx.fillText(bar.value, bar.x + bar.width + 3, bar.y + bar.height - 3);
        }
    });
});


// -------------------------------- GRÁFICO DE COLUNAS - NOVO --------------------------------
const novoCanvas = document.getElementById('novoColunaGrafico');
const novoCtx = novoCanvas.getContext('2d');
const novoDataReceitas = [900, 700, 1000, 750, 600, 950, 650];
const novoColorsReceitas = '#FF001D';
const novoLabels = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const novoYLabels = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];
const novoBarWidth = (novoCanvas.width) / (novoDataReceitas.length * 2);
const novoPadding = 5;
const novoMarginLeft = 10;
const novoBars = [];

function drawNovoAxesAndLabels() {
    // Desenhar eixos
    novoCtx.beginPath();
    novoCtx.moveTo(40, 0);
    novoCtx.lineTo(40, novoCanvas.height - 20);
    novoCtx.lineTo(novoCanvas.width - 10, novoCanvas.height - 20);
    novoCtx.strokeStyle = '#000000';
    novoCtx.lineWidth = 1;
    novoCtx.stroke();

    // Adicionar rótulos do eixo Y
    novoCtx.font = '14px Arial';
    novoCtx.fillStyle = '#000000';
    novoYLabels.forEach((label, index) => {
        const y = novoCanvas.height - 5 - (index + 1) * (novoCanvas.height / (novoYLabels.length + 1.5));
        novoCtx.fillText(label, 0, y);
        novoCtx.moveTo(35, y);
        novoCtx.lineTo(40, y);
    });
    novoCtx.stroke();

    // Adicionar rótulos do eixo X com fonte menor
    novoCtx.font = '10px Arial'; // Reduzir o tamanho da fonte
    novoLabels.forEach((label, index) => {
        const x = 45 + index * novoBarWidth * 2 + novoBarWidth; // Mover para a direita
        novoCtx.fillText(label, x - novoBarWidth / 2, novoCanvas.height - 5);
    });
}

function drawNovoBars() {
    const novoMaxBarHeight = novoCanvas.height - 40;
    const novoMaxValue = 1000;

    // Desenhar barras de receitas com padding
    novoDataReceitas.forEach((value, index) => {
        const barHeight = (value / novoMaxValue) * novoMaxBarHeight;
        const x = 40 + novoMarginLeft + index * novoBarWidth * 2 + novoPadding;
        const y = novoCanvas.height - 20 - barHeight;
        novoCtx.fillStyle = novoColorsReceitas;
        novoCtx.fillRect(x, y, novoBarWidth - novoPadding, barHeight);
        novoBars.push({ x, y, width: novoBarWidth - novoPadding, height: barHeight, value });
    });
}

drawNovoAxesAndLabels();
drawNovoBars();

novoCanvas.addEventListener('mousemove', (event) => {
    const rect = novoCanvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    novoCtx.clearRect(0, 0, novoCanvas.width, novoCanvas.height);

    drawNovoAxesAndLabels();
    drawNovoBars();

    // Destacar barra ao passar o mouse
    novoBars.forEach(bar => {
        if (mouseX >= bar.x && mouseX <= bar.x + bar.width && mouseY >= bar.y && mouseY <= bar.y + bar.height) {
            novoCtx.lineWidth = 3;
            novoCtx.strokeStyle = '#000000';
            novoCtx.strokeRect(bar.x, bar.y, bar.width, bar.height);

            // Mostrar tooltip
            novoCtx.font = '12px Arial';
            novoCtx.fillStyle = '#000000';
            novoCtx.fillText(bar.value, bar.x + bar.width / 2 - 10, bar.y - 10);
        }
    });
});