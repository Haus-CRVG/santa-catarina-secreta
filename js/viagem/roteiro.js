/* ==========================================================
   DA GARAGEM ATÉ O MAR
   ROTEIRO.JS
========================================================== */

let timelineViagem = [];

/* ==========================================================
   GERA TIMELINE
========================================================== */

function atualizarTimelineViagem(distancia, tempoHoras) {

    timelineViagem = [];

    const horaSaida = new Date();

    const velocidadeMedia = distancia / tempoHoras;

    timelineViagem.push({

        hora: formatarHora(horaSaida),

        titulo: "🚗 Saída",

        descricao: document.getElementById("origem").value

    });

    const paradas = obterParadas();

    paradas.forEach((parada, indice) => {

        const horasPercorridas = parada.km / velocidadeMedia;

        const horario = new Date(

            horaSaida.getTime() +
            (horasPercorridas * 3600000)

        );

        timelineViagem.push({

            hora: formatarHora(horario),

            titulo: `⛽ ${indice + 1}ª parada`,

            descricao: `${parada.nome} (${parada.cidade})`

        });

    });

    const chegada = new Date(

        horaSaida.getTime() +
        (tempoHoras * 3600000)

    );

    timelineViagem.push({

        hora: formatarHora(chegada),

        titulo: "🏖 Chegada",

        descricao: document.getElementById("destino").value

    });

    desenharTimeline();

}

/* ==========================================================
   DESENHA TIMELINE
========================================================== */

function desenharTimeline(){

    const div =
        document.getElementById("timelineViagem");

    div.innerHTML = "";

    timelineViagem.forEach(item=>{

        div.innerHTML += `

            <div class="timeline-item">

                <div class="timeline-hora">

                    ${item.hora}

                </div>

                <div class="timeline-conteudo">

                    <h5>

                        ${item.titulo}

                    </h5>

                    <p>

                        ${item.descricao}

                    </p>

                </div>

            </div>

        `;

    });

}

/* ==========================================================
   RETORNA TIMELINE
========================================================== */

function obterTimeline(){

    return timelineViagem;

}

console.log("🕒 roteiro.js carregado");