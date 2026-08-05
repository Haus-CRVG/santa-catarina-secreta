/* ==========================================================
   TURISMO.JS
   Turismo Inteligente
========================================================== */

const PONTOS_TURISTICOS = [

    /* =====================================================
       GUARAPUAVA
    ===================================================== */

    {
        cidade: "Guarapuava",
        nome: "Parque do Lago",
        categoria: "Natureza",
        tempo: "40 min",
        nota: 4.8,
        emoji: "🌳",
        lat: -25.3904,
        lng: -51.4620
    },

    {
        cidade: "Guarapuava",
        nome: "Salto São Francisco",
        categoria: "Cachoeira",
        tempo: "2h",
        nota: 4.9,
        emoji: "💦",
        lat: -25.3149,
        lng: -51.3443
    },

    /* =====================================================
       CURITIBA
    ===================================================== */

    {
        cidade: "Curitiba",
        nome: "Jardim Botânico",
        categoria: "Cartão Postal",
        tempo: "1h30",
        nota: 5.0,
        emoji: "🌺",
        lat: -25.4411,
        lng: -49.2396
    },

    {
        cidade: "Curitiba",
        nome: "Museu Oscar Niemeyer",
        categoria: "Museu",
        tempo: "2h",
        nota: 4.9,
        emoji: "🏛",
        lat: -25.4106,
        lng: -49.2667
    },

    {
        cidade: "Curitiba",
        nome: "Ópera de Arame",
        categoria: "Turismo",
        tempo: "1h",
        nota: 4.8,
        emoji: "🎭",
        lat: -25.3857,
        lng: -49.2756
    },

    /* =====================================================
       JOINVILLE
    ===================================================== */

    {
        cidade: "Joinville",
        nome: "Mirante de Joinville",
        categoria: "Mirante",
        tempo: "30 min",
        nota: 4.8,
        emoji: "🌄",
        lat: -26.3044,
        lng: -48.8487
    },

    {
        cidade: "Joinville",
        nome: "Pórtico de Joinville",
        categoria: "Turismo",
        tempo: "20 min",
        nota: 4.6,
        emoji: "📸",
        lat: -26.2712,
        lng: -48.8465
    },

    /* =====================================================
       BALNEÁRIO CAMBORIÚ
    ===================================================== */

    {
        cidade: "Balneário Camboriú",
        nome: "Cristo Luz",
        categoria: "Mirante",
        tempo: "1h",
        nota: 4.8,
        emoji: "✨",
        lat: -26.9913,
        lng: -48.6349
    },

    {
        cidade: "Balneário Camboriú",
        nome: "Parque Unipraias",
        categoria: "Teleférico",
        tempo: "3h",
        nota: 4.9,
        emoji: "🚡",
        lat: -27.0035,
        lng: -48.6077
    },

    /* =====================================================
       PALHOÇA
    ===================================================== */

    {
        cidade: "Palhoça",
        nome: "Praia da Pinheira",
        categoria: "Praia",
        tempo: "Livre",
        nota: 5.0,
        emoji: "🏖",
        lat: -27.8638,
        lng: -48.5927
    },

    {
        cidade: "Palhoça",
        nome: "Guarda do Embaú",
        categoria: "Praia",
        tempo: "Livre",
        nota: 5.0,
        emoji: "🌊",
        lat: -27.9076,
        lng: -48.6264
    }

];

/* ==========================================================
   BUSCA AS ATRAÇÕES DAS CIDADES DA ROTA
========================================================== */

function buscarAtracoesRota() {

    const cidades = obterCidadesRota();

    let atracoes = [];

    cidades.forEach(cidade => {

        const locais = PONTOS_TURISTICOS.filter(

            p => p.cidade === cidade.nome

        );

        atracoes.push(...locais);

    });

    atracoes.sort((a, b) => b.nota - a.nota);

    return atracoes;

}

/* ==========================================================
   MOSTRAR PONTOS TURÍSTICOS
========================================================== */

function atualizarTurismo() {

    const container =
        document.getElementById("listaTurismo");

    if (!container) return;

    container.innerHTML = "";

    const atracoes =
        buscarAtracoesRota();

    if (atracoes.length === 0) {

        container.innerHTML = `

        <div class="alert alert-info">

            Nenhum ponto turístico encontrado.

        </div>

        `;

        return;

    }

    atracoes.forEach(local => {

        container.innerHTML += `

        <div class="card-turismo">

            <div class="d-flex justify-content-between">

                <h5>

                    ${local.emoji} ${local.nome}

                </h5>

                <span class="badge bg-success">

                    ⭐ ${local.nota}

                </span>

            </div>

            <small>

                📍 ${local.cidade}

            </small>

            <p class="mt-2">

                <strong>${local.categoria}</strong>

            </p>

            <p>

                ⏱ Tempo médio:

                ${local.tempo}

            </p>

            <div class="d-flex gap-2 mt-3">

                <button

                    class="btn btn-outline-primary btn-sm"

                    onclick="verAtracaoMapa('${local.nome}')">

                    🗺 Ver no mapa

                </button>

                <button

                    class="btn btn-success btn-sm"

                    onclick="adicionarAtracaoRoteiro('${local.nome}')">

                    ➕ Adicionar

                </button>

            </div>

        </div>

        `;

    });

}

/* ==========================================================
   LOCALIZA A ATRAÇÃO
========================================================== */

function localizarAtracao(nome){

    return PONTOS_TURISTICOS.find(

        p => p.nome === nome

    );

}

/* ==========================================================
   VER NO MAPA
========================================================== */

let marcadorTurismo;

function verAtracaoMapa(nome){

    const atracao =
        localizarAtracao(nome);

    if(!atracao) return;

    if(marcadorTurismo){

        mapa.removeLayer(marcadorTurismo);

    }

    marcadorTurismo =

        L.marker([

            atracao.lat,

            atracao.lng

        ])

        .addTo(mapa)

        .bindPopup(`

            <strong>

                ${atracao.emoji} ${atracao.nome}

            </strong>

            <br>

            ${atracao.cidade}

            <br>

            ⭐ ${atracao.nota}

        `)

        .openPopup();

    mapa.flyTo(

        [

            atracao.lat,

            atracao.lng

        ],

        14,

        {

            duration:1.5

        }

    );

}

/* ==========================================================
   ADICIONAR AO ROTEIRO
========================================================== */

function adicionarAtracaoRoteiro(nome){

    const atracao =
        localizarAtracao(nome);

    if(!atracao) return;

    pontosTimeline.splice(

        pontosTimeline.length-1,

        0,

        {

            hora:"",

            titulo:atracao.nome,

            descricao:atracao.cidade,

            icone:atracao.emoji,

            lat:atracao.lat,

            lng:atracao.lng

        }

    );

    desenharTimeline();

    alert(

        `"${atracao.nome}" adicionado ao roteiro.`

    );

}

/* ==========================================================
   QUANTIDADE DE PONTOS
========================================================== */

function quantidadeTurismo(){

    return PONTOS_TURISTICOS.length;

}

console.log("🌴 turismo.js carregado");