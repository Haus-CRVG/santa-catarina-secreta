/* ==========================================================
   CRONOGRAMA.JS
   Inteligência do cronograma da viagem
========================================================== */

/* ==========================================================
   LÊ OS DADOS INFORMADOS PELO USUÁRIO
========================================================== */

function obterCronograma() {

    return {

        horaSaida:
            document.getElementById("horaSaida")?.value || "05:00",

        horaCafe:
            document.getElementById("horaCafe")?.value || "09:30",

        horaAlmoco:
            document.getElementById("horaAlmoco")?.value || "12:30",

        horaCafeTarde:
            document.getElementById("horaCafeTarde")?.value || "16:00",

        tempoCafe:
            parseInt(document.getElementById("tempoCafe")?.value || 20),

        tempoAlmoco:
            parseInt(document.getElementById("tempoAlmoco")?.value || 60),

        tempoCafeTarde:
            parseInt(document.getElementById("tempoCafeTarde")?.value || 20)

    };

}

/* ==========================================================
   CONVERTE HH:MM PARA MINUTOS
========================================================== */

function horaParaMinutos(hora) {

    if (!hora) return 0;

    const partes = hora.split(":");

    return (

        parseInt(partes[0]) * 60 +

        parseInt(partes[1])

    );

}

/* ==========================================================
   CONVERTE MINUTOS PARA HH:MM
========================================================== */

function minutosParaHora(minutos) {

    minutos = minutos % (24 * 60);

    if (minutos < 0) {

        minutos += 24 * 60;

    }

    const h = Math.floor(minutos / 60);

    const m = minutos % 60;

    return (

        String(h).padStart(2, "0") +

        ":" +

        String(m).padStart(2, "0")

    );

}

/* ==========================================================
   SOMA MINUTOS A UM HORÁRIO
========================================================== */

function adicionarMinutos(hora, minutos) {

    return minutosParaHora(

        horaParaMinutos(hora) + minutos

    );

}

/* ==========================================================
   CALCULA HORÁRIO ESTIMADO DE CHEGADA
========================================================== */

function calcularHorarioChegada(tempoHoras) {

    const cronograma = obterCronograma();

    const minutosViagem =

        Math.round(tempoHoras * 60);

    return adicionarMinutos(

        cronograma.horaSaida,

        minutosViagem

    );

}

/* ==========================================================
   RETORNA DURAÇÃO TOTAL DAS PARADAS
========================================================== */

function tempoTotalParadas() {

    const c = obterCronograma();

    return (

        Number(c.tempoCafe) +

        Number(c.tempoAlmoco) +

        Number(c.tempoCafeTarde)

    );

}

/* ==========================================================
   CALCULA CHEGADA FINAL
========================================================== */

function calcularChegadaFinal(tempoHoras) {

    const minutos =

        Math.round(tempoHoras * 60)

        +

        tempoTotalParadas();

    return adicionarMinutos(

        obterCronograma().horaSaida,

        minutos

    );

}

/* ==========================================================
   MOSTRA O CRONOGRAMA NO CONSOLE
========================================================== */

function imprimirCronograma() {

    const c = obterCronograma();

    console.log("===== CRONOGRAMA =====");

    console.table(c);

}

console.log("⏰ cronograma.js carregado");