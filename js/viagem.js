/* ==========================================================
   DA GARAGEM ATÉ O MAR
   viagem.js
   Parte 1/3
========================================================== */

let mapa;
let rotaAtual;

/* ==========================================================
   INICIAR MAPA
========================================================== */

function iniciarMapa() {

    mapa = L.map("map").setView([-25.43, -49.27], 7);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "© OpenStreetMap"
        }
    ).addTo(mapa);

}

/* ==========================================================
   BUSCAR COORDENADAS
========================================================== */

async function buscarCoordenadas(local) {

    const resposta = await fetch(

        "https://nominatim.openstreetmap.org/search?format=json&q=" +
        encodeURIComponent(local)

    );

    const dados = await resposta.json();

    if (dados.length === 0) {

        throw new Error("Local não encontrado.");

    }

    return {

        lat: parseFloat(dados[0].lat),

        lon: parseFloat(dados[0].lon)

    };

}

/* ==========================================================
   DESENHAR ROTA
========================================================== */

async function desenharRota(origem, destino) {

    const p1 = await buscarCoordenadas(origem);

    const p2 = await buscarCoordenadas(destino);

    const url =
        `https://router.project-osrm.org/route/v1/driving/${p1.lon},${p1.lat};${p2.lon},${p2.lat}?overview=full&geometries=geojson`;

    const resposta = await fetch(url);

    const dados = await resposta.json();

    if (rotaAtual) {

        mapa.removeLayer(rotaAtual);

    }

    rotaAtual = L.geoJSON(dados.routes[0].geometry, {

        color: "#0d6efd",

        weight: 6

    }).addTo(mapa);

    mapa.fitBounds(rotaAtual.getBounds());

    return dados.routes[0];

}

/* ==========================================================
   CALCULAR VIAGEM
========================================================== */

async function calcularViagem() {

    try {

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

        // Agora os cálculos ficam no calculos.js
        atualizarResumoViagem(
            distancia,
            tempo,
            consumo,
            gasolina
        );

        document.getElementById("rotaKm").innerHTML =
            distancia.toFixed(0) + " km";

        document.getElementById("rotaTempo").innerHTML =
            converterHoras(tempo);

        document.getElementById("rotaPedagios").innerHTML =
            "Em breve";

        carregarParadas();

        carregarCidades();

        atualizarPainelVeiculo(distancia);

        const abastecimentos =
            gerarPlanoAbastecimento(distancia);

        const div =
            document.getElementById("planoAbastecimento");

        if (abastecimentos.length === 0) {

            div.innerHTML =
                "<p>✅ Nenhum abastecimento será necessário.</p>";

        } else {

            div.innerHTML = "";

        abastecimentos.forEach((km, indice) => {

    const posto = procurarPosto(km);

    div.innerHTML += `

        <div class="item-abastecimento">

            <h5>
                ⛽ ${indice + 1}º abastecimento
            </h5>

            <strong>${posto.nome}</strong><br>

            📍 ${posto.cidade}<br>

            🏷 ${posto.bandeira}<br>

            ⭐ ${posto.nota}<br>

            🕒 ${posto.aberto}<br>

            <small>Km ${posto.km}</small>

        </div>

    `;

});

}    

    catch (erro) {

        alert("Erro ao calcular a rota.");

        console.error(erro);

    }

}

/* ==========================================================
   PARADAS DA VIAGEM
========================================================== */

function carregarParadas() {

    const paradas = [

        {
            hora: "08:15",
            titulo: "☕ Café da manhã",
            local: "Posto Três Pinheiros",
            cidade: "Laranjeiras do Sul - PR",
            tipo: "Shell"
        },

        {
            hora: "10:40",
            titulo: "🍽 Almoço",
            local: "Restaurante Anila",
            cidade: "Guarapuava - PR",
            tipo: "Restaurante"
        },

        {
            hora: "13:30",
            titulo: "⛽ Abastecimento",
            local: "Auto Posto Shell",
            cidade: "Curitiba - PR",
            tipo: "Combustível"
        },

        {
            hora: "16:10",
            titulo: "☕ Café da tarde",
            local: "Graal Serra",
            cidade: "Joinville - SC",
            tipo: "Lanche"
        },

        {
            hora: "18:20",
            titulo: "🏖 Destino",
            local: "Praia da Pinheira",
            cidade: "Palhoça - SC",
            tipo: "Chegada"
        }

    ];

    const lista = document.getElementById("listaParadas");

    lista.innerHTML = "";

    paradas.forEach(parada => {

        lista.innerHTML += `

                <div class="parada">

                <h4>

                    ${parada.hora} — ${parada.titulo}

                </h4>

                <p>

                    <strong>${parada.local}</strong>

                </p>

                <p>

                    ${parada.cidade}

                </p>

                <span class="badge bg-primary">

                    ${parada.tipo}

                </span>

            </div>

                `;

    });

}

/* ==========================================================
   CIDADES DA VIAGEM
========================================================== */

function carregarCidades() {

    const cidades = [

        "Cascavel",

        "Laranjeiras do Sul",

        "Guarapuava",

        "Irati",

        "Curitiba",

        "Joinville",

        "Itajaí",

        "Balneário Camboriú",

        "Florianópolis",

        "Palhoça",

        "Praia da Pinheira"

    ];

    const lista = document.getElementById("listaCidades");

    lista.innerHTML = "";

    cidades.forEach(cidade => {

        lista.innerHTML += `

                <span class="badge bg-success m-2 p-3">

                    <i class="bi bi-geo-alt-fill"></i>

                ${cidade}

            </span>

                `;

    });

}

/* ==========================================================
   ROTA SUGERIDA
========================================================== */

function carregarRota() {

    const rota = [

        "BR-277",

        "BR-376",

        "BR-101"

    ];

    const lista = document.getElementById("listaRota");

    lista.innerHTML = "";

    rota.forEach(item => {

        lista.innerHTML += `

                <li>

                🛣 ${ item }

            </li>

                `;

    });

}

/* ==========================================================
   EVENTOS
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    iniciarMapa();

    carregarRota();

    carregarParadas();

    carregarCidades();

    document
        .getElementById("btnCalcular")
        .addEventListener("click", calcularViagem);

});

/* ==========================================================
   ALTERAÇÃO AUTOMÁTICA DO CONSUMO
========================================================== */

document
    .getElementById("veiculo")
    .addEventListener("change", function () {

        const consumo =
            document.getElementById("consumo");

        switch (this.selectedIndex) {

            case 0:

                consumo.value = 10.5;   // Palio

                break;

            case 1:

                consumo.value = 10.5;   // Peugeot

                break;

            case 2:

                consumo.value = 12;

                break;

        }

    });

/* ==========================================================
   ATALHO (ENTER)
========================================================== */

document.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        calcularViagem();

    }

});

/* ==========================================================
   FUTURAS INTEGRAÇÕES
========================================================== */

// Sprint 2.1
//
// Google Maps Directions API
//
// Google Places API
//
// OpenRouteService
//
// Weather API
//
// Radar de trânsito
//
// Pedágios automáticos
//
// Postos Shell
//
// Postos Ipiranga
//
// Graal
//
// Hotéis
//
// Restaurantes
//
// Comparativo entre rotas
//
// Exportar PDF
//
// Exportar GPX
//
// Compartilhar roteiro

console.log("🚙 Da Garagem até o Mar carregado com sucesso.");