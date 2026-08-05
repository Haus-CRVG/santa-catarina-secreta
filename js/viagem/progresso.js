/* ==========================================================
   PROGRESSO.JS
   Painel da viagem
========================================================== */

function atualizarPainelViagem(distancia, tempo, consumo) {

    const litrosRestantes =
        calcularLitros(distancia, consumo);

    atualizarElemento(
        "restanteKm",
        formatarKm(distancia)
    );

    atualizarElemento(
        "restanteTempo",
        converterHoras(tempo)
    );

    atualizarElemento(
        "combustivelRestante",
        formatarLitros(litrosRestantes)
    );

    const abastecimentos =
        gerarPlanoAbastecimento(distancia);

    if(abastecimentos.length > 0){

        atualizarElemento(
            "proximaParada",
            "Km " + Math.round(abastecimentos[0])
        );

    }else{

        atualizarElemento(
            "proximaParada",
            "Destino"
        );

    }

    atualizarBarraProgresso(0);

}

/* ==========================================================
   BARRA DE PROGRESSO
========================================================== */

function atualizarBarraProgresso(percentual){

    const barra =
        document.getElementById("barraProgresso");

    if(!barra) return;

    barra.style.width = percentual + "%";

    barra.innerHTML = percentual + "%";

}