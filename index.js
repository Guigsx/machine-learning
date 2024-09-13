// Função para calcular os mínimos quadrados
function calcularMinimosQuadrados(dados) {
    const amostra = dados.slice(0, 7);

    const numberAmostra = amostra.length;
    let somaX = 0, somaY = 0, somaXY = 0, somaX2 = 0;

    amostra.forEach(dado => {
        somaX += dado.peso;
        somaY += dado.altura;
        somaXY += dado.peso * dado.altura;
        somaX2 += dado.peso * dado.peso;
    });

    const a = (numberAmostra * somaXY - somaX * somaY) / (numberAmostra * somaX2 - somaX * somaX);
    const b = (somaY - a * somaX) / numberAmostra;

    return { a, b };
}

// Função para prever a altura com base no peso
function preverAltura(peso, a, b) {
    return a * peso + b;
}

// Função para calcular o erro relativo
function erroRelativo(alturaReal, alturaPrevista) {
    return Math.abs(alturaReal - alturaPrevista) / alturaReal * 100;
}

// Função para comparar os resultados e exibir no HTML
function compararPrevisao(dados, a, b) {
    const restantes = dados.slice(7);
    let somaErroRelativo = 0;
    let resultadosHTML = '';

    restantes.forEach(dado => {
        const alturaPrevista = preverAltura(dado.peso, a, b);
        const erro = erroRelativo(dado.altura, alturaPrevista);
        somaErroRelativo += erro;

        resultadosHTML += `<p>Peso real: ${dado.peso}, Altura prevista: ${alturaPrevista.toFixed(2)}, Altura real: ${dado.altura}, Erro relativo: ${erro.toFixed(2)}%</p>`;
    });

    const erroRelativoMedio = somaErroRelativo / restantes.length;
    document.getElementById('resultados').innerHTML = resultadosHTML;
    document.getElementById('erroMedio').innerHTML = `<p>Erro relativo médio: ${erroRelativoMedio.toFixed(2)}%</p>`;
}

const dataset1 = [
    { peso: 57, altura: 167 },
    { peso: 65, altura: 174 },
    { peso: 98.0, altura: 163 },
    { peso: 83, altura: 170 },
    { peso: 75, altura: 175 },
    { peso: 57, altura: 167 },
    { peso: 82.1, altura: 174 },
    { peso: 51, altura: 163 },
    { peso: 120, altura: 180 },
    { peso: 60, altura: 156 }
]

// Calcula os coeficientes a e b
const resultado = calcularMinimosQuadrados(dataset1)

document.getElementById('equacao').innerHTML = `<p>A equação da reta é: y = ${resultado.a.toFixed(2)}x + ${resultado.b.toFixed(2)}</p>`

compararPrevisao(dataset1, resultado.a, resultado.b)