/* ==========================================================
   DA GARAGEM ATÉ O MAR
   Controller Principal
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarMapa();

    carregarRota();

    carregarParadas();

    carregarCidades();

    inicializarVeiculos();

    document
        .getElementById("btnCalcular")
        .addEventListener("click", calcularViagem);

});

/* ==========================================================
   CALCULAR TODA A VIAGEM
========================================================== */

async function calcularViagem() {

    try {

        const painelClima = document.getElementById("painelClima");

        if (painelClima) {

            painelClima.innerHTML = "";

            await mostrarClima("Cascavel");
            await mostrarClima("Guarapuava");
            await mostrarClima("Curitiba");
            await mostrarClima("Palhoça");

        }

        const origem =
            document.getElementById("origem").value;

        const destino =
            document.getElementById("destino").value;

        const consumo =
            parseFloat(document.getElementById("consumo").value);

        const gasolina =
            parseFloat(document.getElementById("gasolina").value);

        const rota =
            await desenharRota(origem, destino);

        const distancia =
            rota.distance / 1000;

        const tempo =
            rota.duration / 3600;

        const chegadaPrevista =
            calcularChegadaFinal(tempo);

        console.log("Chegada prevista:", chegadaPrevista);

        atualizarResumoViagem(
            distancia,
            tempo,
            consumo,
            gasolina
        );

        gerarParadasAutomaticas(
            distancia
        );

        atualizarPainelVeiculo(
            distancia
        );

        atualizarPainelViagem(
            distancia,
            tempo,
            consumo
        );

        atualizarPainelRota(
            distancia,
            tempo
        );

        atualizarPlanejamento(
            distancia,
            tempo
        );

        gerarTimelineViagem(
            distancia,
            tempo
        );

        atualizarTurismo();

        desenharTimeline();

    }

    catch (erro) {

        console.error("ERRO COMPLETO:");

        console.error(erro);

        alert(erro.message);

    }

}


console.log("🚙 Controller carregado.");