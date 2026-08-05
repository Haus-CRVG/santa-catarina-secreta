/* ==========================================================
   DA GARAGEM ATÉ O MAR
   ROTA.JS
========================================================== */

let dadosUltimaRota = null;

/* ==========================================================
   ATUALIZA PAINEL DA ROTA
========================================================== */

function atualizarPainelRota(distancia, tempo) {

    const km =
        document.getElementById("rotaKm");

    const tempoHtml =
        document.getElementById("rotaTempo");

    const pedagio =
        document.getElementById("rotaPedagios");

    if (km)
        km.innerHTML = formatarKm(distancia);

    if (tempoHtml)
        tempoHtml.innerHTML = converterHoras(tempo);

    if (pedagio)
        pedagio.innerHTML = "Em desenvolvimento";

    salvarUltimaRota({

        distancia,

        tempo,

        data: new Date()

    });

}

/* ==========================================================
   CARREGA RODOVIAS
========================================================== */

function carregarRota() {

    const rodovias = [

        {
            nome: "BR-277",
            estado: "PR",
            tipo: "Rodovia Federal"
        },

        {
            nome: "BR-376",
            estado: "PR",
            tipo: "Rodovia Federal"
        },

        {
            nome: "BR-101",
            estado: "SC",
            tipo: "Rodovia Federal"
        }

    ];

    const lista =
        document.getElementById("listaRota");

    if (!lista) return;

    lista.innerHTML = "";

    rodovias.forEach(item => {

        lista.innerHTML += `

            <li>

                <strong>${item.nome}</strong>

                <br>

                <small>

                    ${item.estado} • ${item.tipo}

                </small>

            </li>

        `;

    });

}

/* ==========================================================
   SALVAR ÚLTIMA ROTA
========================================================== */

function salvarUltimaRota(rota) {

    dadosUltimaRota = rota;

}

/* ==========================================================
   RETORNA ÚLTIMA ROTA
========================================================== */

function obterUltimaRota() {

    return dadosUltimaRota;

}

/* ==========================================================
   LIMPA PAINEL
========================================================== */

function limparPainelRota() {

    const lista =
        document.getElementById("listaRota");

    const km =
        document.getElementById("rotaKm");

    const tempo =
        document.getElementById("rotaTempo");

    const pedagio =
        document.getElementById("rotaPedagios");

    if (lista) lista.innerHTML = "";

    if (km) km.innerHTML = "--";

    if (tempo) tempo.innerHTML = "--";

    if (pedagio) pedagio.innerHTML = "--";

}

console.log("🛣 rota.js carregado");