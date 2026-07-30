/* ==========================================================
   AUTONOMIA.JS
========================================================== */

function gerarPlanoAbastecimento(distancia){

    const v = obterVeiculoSelecionado();

    const autonomia =
        calcularAutonomia(v.consumo, v.tanque);

    const pontos = [];

    let km = autonomia;

    while(km < distancia){

        pontos.push(km);

        km += autonomia;

    }

    return pontos;

}