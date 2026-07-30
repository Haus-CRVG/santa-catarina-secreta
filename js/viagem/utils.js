/* ==========================================================
   UTILS.JS
   Funções auxiliares utilizadas em todo o projeto
========================================================== */

/**
 * Formata valores monetários
 */
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

/**
 * Formata quilômetros
 */
function formatarKm(km) {
    return Number(km).toFixed(0) + " km";
}

/**
 * Formata litros
 */
function formatarLitros(litros) {
    return Number(litros).toFixed(1) + " L";
}

/**
 * Arredonda números
 */
function arredondar(numero, casas = 2) {
    return Number(numero).toFixed(casas);
}

/**
 * Atualiza qualquer elemento pelo ID
 */
function atualizarElemento(id, valor) {

    const elemento = document.getElementById(id);

    if (!elemento) return;

    elemento.innerHTML = valor;

}

/**
 * Mostra um elemento
 */
function mostrarElemento(id){

    const elemento = document.getElementById(id);

    if(elemento){

        elemento.style.display = "block";

    }

}

/**
 * Esconde um elemento
 */
function esconderElemento(id){

    const elemento = document.getElementById(id);

    if(elemento){

        elemento.style.display = "none";

    }

}

/**
 * Remove espaços extras
 */
function limparTexto(texto){

    return texto.trim();

}

/**
 * Converte horas decimais
 * Ex.: 12.75 => 12h45
 */
function converterHoras(horas){

    const h = Math.floor(horas);

    const m = Math.round((horas - h) * 60);

    return `${h}h${String(m).padStart(2,"0")}`;

}

/**
 * Delay (útil para animações)
 */
function sleep(ms){

    return new Promise(resolve => setTimeout(resolve, ms));

}

/**
 * Número aleatório
 */
function numeroAleatorio(min,max){

    return Math.floor(Math.random() * (max-min+1)) + min;

}