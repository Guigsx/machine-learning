function calcularMinimosQuadrados(dados) {
    // Limitando aos 7 primeiros
    const amostra = dados.slice(0, 7)

    const numberAmostra = amostra.length
    let somaX = 0, somaY = 0, somaXY = 0, somaX2 = 0

    // Pegando todos os dados da pessoa do array, e fazer as somas necessárias da formula de minimos quadrados
    amostra.forEach(dado => {
        somaX += dado.peso
        somaY += dado.altura
        somaXY += dado.peso * dado.altura
        somaX2 += dado.peso * dado.peso
    })

    // Calculando os coeficientes a e b
    const a = (numberAmostra * somaXY - somaX * somaY) / (numberAmostra * somaX2 - somaX * somaX)
    const b = (somaY - a * somaX) / numberAmostra

    return { a, b }
}

function preverAltura(peso, a, b) {
    return a * peso + b // Equação da reta y = ax + b
}

function erroRelativo(alturaReal, alturaPrevista) {
    return Math.abs(alturaReal - alturaPrevista) / alturaReal * 100 // Erro relativo em porcentagem
}

function compararPrevisao(dados, a, b) {
    const restantes = dados.slice(7) // Pegando as 3 pessoas restantes
    let somaErroRelativo = 0 // Inicializa a soma dos erros relativos

    console.log('\nTestando o modelo:')

    restantes.forEach(dado => {
        const alturaPrevista = preverAltura(dado.peso, a, b)
        const erro = erroRelativo(dado.altura, alturaPrevista)

        somaErroRelativo += erro // Soma o erro relativo

        console.log(`Peso real: ${dado.peso}, Altura prevista: ${alturaPrevista.toFixed(2)}, Altura real: ${dado.altura}, Erro relativo: ${erro.toFixed(2)}%`)
    })

    // Calcula o erro relativo médio
    const erroRelativoMedio = somaErroRelativo / restantes.length
    console.log(`Erro relativo médio: ${erroRelativoMedio.toFixed(2)}%`)
}

const { dataset1, dataset2, dataset3, dataset4, dataset5, dataset6 } = require('./dados')
const resultado = calcularMinimosQuadrados(dataset1)

console.log('------------------------------')

console.log(`A equação da reta é: y = ${resultado.a.toFixed(2)}x + ${resultado.b.toFixed(2)}`)

// Teste do modelo, com as 3 pessoas de teste.
compararPrevisao(dataset1, resultado.a, resultado.b)
console.log('------------------------------')