// Função para calcular os mínimos quadrados
function calcularMinimosQuadrados(dados) {
    console.log('Calculando mínimos quadrados com dados:', dados)
    
    const amostra = dados.slice(0, 7)

    const numberAmostra = amostra.length
    let somaX = 0, somaY = 0, somaXY = 0, somaX2 = 0

    amostra.forEach(dado => {
        somaX += dado.peso
        somaY += dado.altura
        somaXY += dado.peso * dado.altura
        somaX2 += dado.peso * dado.peso
    })

    // Formula
    const a = (numberAmostra * somaXY - somaX * somaY) / (numberAmostra * somaX2 - somaX * somaX)
    const b = (somaY - a * somaX) / numberAmostra

    return { a, b }
}

// Função para prever a altura com base no peso
function preverAltura(peso, a, b) {
    return a * peso + b
}

// Função para calcular o erro relativo
function erroRelativo(alturaReal, alturaPrevista) {
    return Math.abs(alturaReal - alturaPrevista) / alturaReal * 100
}

// Função para comparar os resultados e exibir no HTML
function compararPrevisao(dados, a, b) {
    const restantes = dados.slice(7)
    let somaErroRelativo = 0
    let resultadosHTML = ''

    restantes.forEach((dado, index) => {
        const alturaPrevista = preverAltura(dado.peso, a, b)
        const erro = erroRelativo(dado.altura, alturaPrevista)
        somaErroRelativo += erro

        resultadosHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${dado.peso}</td>
                <td>${alturaPrevista.toFixed(2)}</td>
                <td>${dado.altura}</td>
                <td>${erro.toFixed(2)}%</td>
            </tr>
        `
    })

    const erroRelativoMedio = somaErroRelativo / restantes.length
    document.getElementById('resultadosTabela').innerHTML = resultadosHTML
    document.getElementById('erroMedio').innerHTML = `<p>Erro relativo médio: <strong>${erroRelativoMedio.toFixed(2)}%</strong></p>`
}

// Função para atualizar os resultados com o dataset selecionado
function atualizarResultados() {
    const datasetName = document.getElementById('datasetSelect').value
    console.log('Dataset selecionado:', datasetName)
    
    const datasets = {
        'dataset1': dataset1,
        'dataset2': dataset2,
        'dataset3': dataset3,
        'dataset4': dataset4,
        'dataset5': dataset5,
        'dataset6': dataset6,
    }

    const dataset = datasets[datasetName]
    console.log('Dados do dataset selecionado:', dataset)

    if (dataset && dataset.length > 0) {
        const resultado = calcularMinimosQuadrados(dataset)
        document.getElementById('equacao').innerHTML = `<p>A equação da reta é: <strong>y = ${resultado.a.toFixed(2)}x + ${resultado.b.toFixed(2)}</strong></p>`
        compararPrevisao(dataset, resultado.a, resultado.b)
    } else {
        console.error('Dataset não encontrado ou vazio')
    }
}

// Adiciona um listener para quando o conteúdo da página for carregado
document.addEventListener('DOMContentLoaded', function() {
    atualizarResultados()
    document.getElementById('datasetSelect').addEventListener('change', atualizarResultados)
})