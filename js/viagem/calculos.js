/* ==========================================================
   CALCULOS.JS
   Toda a matemática da viagem
========================================================== */

/**
 * Calcula quantidade de litros
 */
function calcularLitros(distancia, consumo){

    return distancia / consumo;

}

/**
 * Calcula custo da viagem
 */
function calcularCusto(litros, precoCombustivel){

    return litros * precoCombustivel;

}

/**
 * Calcula autonomia do tanque
 */
function calcularAutonomia(consumo, capacidadeTanque){

    return consumo * capacidadeTanque;

}

/**
 * Calcula quantidade de abastecimentos
 */
function calcularAbastecimentos(distancia, autonomia){

    if(autonomia <= 0){

        return 0;

    }

    return Math.max(0, Math.ceil(distancia / autonomia) - 1);

}

/**
 * Calcula tempo de viagem
 */
function calcularTempo(distancia, velocidadeMedia = 80){

    const horas = distancia / velocidadeMedia;

    return converterHoras(horas);

}

/**
 * Calcula custo ida e volta
 */
function calcularIdaVolta(custo){

    return custo * 2;

}

/**
 * Calcula custo por pessoa
 */
function calcularCustoPorPessoa(valorTotal, pessoas){

    if(pessoas <= 0){

        return valorTotal;

    }

    return valorTotal / pessoas;

}

/**
 * Calcula gasto médio por km
 */
function calcularValorKm(custo, distancia){

    if(distancia <= 0){

        return 0;

    }

    return custo / distancia;

}


function atualizarResumoViagem(distancia, tempo, consumo, gasolina){

    const litros = calcularLitros(distancia, consumo);

    const custo = calcularCusto(litros, gasolina);

    atualizarElemento("km", formatarKm(distancia));

    atualizarElemento("tempo", converterHoras(tempo));

    atualizarElemento("litros", formatarLitros(litros));

    atualizarElemento("valor", formatarMoeda(custo));

    return {

        litros,

        custo

    };

}