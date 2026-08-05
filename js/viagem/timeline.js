/* ==========================================================
   TIMELINE.JS
   Timeline Inteligente da Viagem
========================================================== */

let pontosTimeline = [];

/* ==========================================================
   GERA TIMELINE
========================================================== */

function gerarTimelineViagem(distancia, tempo) {

    pontosTimeline = [];

    const cronograma = obterCronograma();

    /* ---------------------------------------
       SAÍDA
    --------------------------------------- */

    pontosTimeline.push({

        hora: cronograma.horaSaida,

        titulo: "Saída",

        descricao:
            document.getElementById("origem").value,

        icone: "🚗",

        lat: null,

        lng: null

    });

    /* ---------------------------------------
       PARADAS DE ABASTECIMENTO
    --------------------------------------- */

    const paradas = obterParadas();

    paradas.forEach((parada, indice) => {

        pontosTimeline.push({

            hora: calcularHorarioKm(

                cronograma.horaSaida,

                distancia,

                tempo,

                parada.km

            ),

            titulo: `${indice + 1}º Abastecimento`,

            descricao:

                `${parada.nome} - ${parada.cidade}`,

            icone: "⛽",

            lat: null,

            lng: null

        });

    });

    /* ---------------------------------------
       CAFÉ
    --------------------------------------- */

    pontosTimeline.push({

        hora: cronograma.horaCafe,

        titulo: "Café",

        descricao: "Parada programada",

        icone: "☕",

        lat: null,

        lng: null

    });

    /* ---------------------------------------
       ALMOÇO
    --------------------------------------- */

    pontosTimeline.push({

        hora: cronograma.horaAlmoco,

        titulo: "Almoço",

        descricao: "Parada programada",

        icone: "🍽",

        lat: null,

        lng: null

    });

    /* ---------------------------------------
       CAFÉ DA TARDE
    --------------------------------------- */

    pontosTimeline.push({

        hora: cronograma.horaCafeTarde,

        titulo: "Café da tarde",

        descricao: "Parada programada",

        icone: "☕",

        lat: null,

        lng: null

    });

    /* ---------------------------------------
       CHEGADA
    --------------------------------------- */

    pontosTimeline.push({

        hora: calcularChegadaFinal(tempo),

        titulo: "Destino",

        descricao:
            document.getElementById("destino").value,

        icone: "🏖",

        lat: null,

        lng: null

    });

    desenharTimeline();

}

/* ==========================================================
   DESENHAR TIMELINE
========================================================== */

function desenharTimeline() {

    const div =
        document.getElementById("timelineViagem");

    if (!div) return;

    div.innerHTML = "";

    pontosTimeline.forEach((item, indice) => {

        div.innerHTML += `

        <div class="timeline-card"

             onclick="irParaTimeline(${indice})">

            <div class="timeline-ponto">

                ${item.icone}

            </div>

            <div class="timeline-info">

                <small>${item.hora}</small>

                <h5>${item.titulo}</h5>

                <p>${item.descricao}</p>

            </div>

        </div>

        `;

    });

}

/* ==========================================================
   DESENHAR TIMELINE
========================================================== */

function desenharTimeline() {

    const div =
        document.getElementById("timelineViagem");

    if (!div) return;

    div.innerHTML = "";

    pontosTimeline.forEach((item, indice) => {

        div.innerHTML += `

        <div class="timeline-card"
             onclick="irParaTimeline(${indice})">

            <div class="timeline-ponto">

                ${item.icone}

            </div>

            <div class="timeline-info">

                <small>${item.hora}</small>

                <h5>${item.titulo}</h5>

                <p>${item.descricao}</p>

            </div>

        </div>

        `;

    });

}

/* ==========================================================
   CALCULA HORÁRIO EM UM KM DA ROTA
========================================================== */

function calcularHorarioKm(

    horaSaida,

    distanciaTotal,

    tempoTotal,

    kmAtual

) {

    if (!horaSaida) return "--:--";

    const partes = horaSaida.split(":");

    const data = new Date();

    data.setHours(parseInt(partes[0]));
    data.setMinutes(parseInt(partes[1]));
    data.setSeconds(0);

    const percentual = kmAtual / distanciaTotal;

    const horasPercorridas =
        tempoTotal * percentual;

    data.setTime(

        data.getTime() +

        (horasPercorridas * 3600000)

    );

    return formatarHora(data);

}

/* ==========================================================
   CENTRALIZA NO MAPA
========================================================== */

function irParaTimeline(indice) {

    const ponto = pontosTimeline[indice];

    if (!ponto) return;

    if (

        ponto.lat == null ||

        ponto.lng == null

    ) {

        return;

    }

    mapa.flyTo(

        [ponto.lat, ponto.lng],

        11,

        {

            duration: 1.5

        }

    );

}

/* ==========================================================
   RETORNA TIMELINE
========================================================== */

function obterTimeline() {

    return pontosTimeline;

}

console.log("🕒 timeline.js carregado");

