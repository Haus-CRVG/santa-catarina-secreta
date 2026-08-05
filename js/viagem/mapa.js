/* ==========================================================
   MAPA.JS
   Sprint 4.1
========================================================== */

let mapa;
let rotaAtual;
let marcadorOrigem;
let marcadorDestino;

/* futuras camadas */
let camadaPostos;
let camadaPraias;
let camadaTurismo;
let camadaRestaurantes;

/* ==========================================================
   ÍCONES
========================================================== */

const iconeOrigem = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25,41],
    iconAnchor: [12,41],
    popupAnchor: [1,-34]
});

const iconeDestino = L.icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25,41],
    iconAnchor: [12,41],
    popupAnchor: [1,-34]
});

/* ==========================================================
   MAPA
========================================================== */

function iniciarMapa() {

    mapa = L.map("map", {

        zoomControl: true,
        attributionControl: true

    }).setView([-25.43,-49.27],7);

    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {

            maxZoom:19,

            attribution:"© OpenStreetMap"

        }

    ).addTo(mapa);

    camadaPostos = L.layerGroup().addTo(mapa);
    camadaPraias = L.layerGroup().addTo(mapa);
    camadaTurismo = L.layerGroup().addTo(mapa);
    camadaRestaurantes = L.layerGroup().addTo(mapa);

}

/* ==========================================================
   COORDENADAS
========================================================== */

async function buscarCoordenadas(local){

    const resposta = await fetch(

        "https://nominatim.openstreetmap.org/search?format=json&q=" +
        encodeURIComponent(local)

    );

    const dados = await resposta.json();

    if(!dados.length){

        throw new Error("Cidade não encontrada.");

    }

    return{

        lat:Number(dados[0].lat),

        lon:Number(dados[0].lon)

    };

}

/* ==========================================================
   DESENHAR ROTA
========================================================== */

async function desenharRota(origem,destino){

    const pontoOrigem =
        await buscarCoordenadas(origem);

    const pontoDestino =
        await buscarCoordenadas(destino);

    const url =

`https://router.project-osrm.org/route/v1/driving/${pontoOrigem.lon},${pontoOrigem.lat};${pontoDestino.lon},${pontoDestino.lat}?overview=full&geometries=geojson`;

    const resposta = await fetch(url);

    if(!resposta.ok){

        throw new Error("Erro ao calcular rota.");

    }

    const dados = await resposta.json();

    limparMapa();

    rotaAtual = L.geoJSON(

        dados.routes[0].geometry,

        {

            style:{

                color:"#0d6efd",

                weight:6,

                opacity:0.9

            }

        }

    ).addTo(mapa);

    marcadorOrigem =

        L.marker(

            [pontoOrigem.lat,pontoOrigem.lon],

            {

                icon:iconeOrigem

            }

        )

        .addTo(mapa)

        .bindPopup("<strong>🚗 Origem</strong>");

    marcadorDestino =

        L.marker(

            [pontoDestino.lat,pontoDestino.lon],

            {

                icon:iconeDestino

            }

        )

        .addTo(mapa)

        .bindPopup("<strong>🏖 Destino</strong>");

    mapa.flyToBounds(

        rotaAtual.getBounds(),

        {

            padding:[60,60],

            duration:1.3

        }

    );

    salvarUltimaRota(dados.routes[0]);

    return dados.routes[0];

}

/* ==========================================================
   LIMPAR
========================================================== */

function limparMapa(){

    if(rotaAtual){

        mapa.removeLayer(rotaAtual);

        rotaAtual=null;

    }

    if(marcadorOrigem){

        mapa.removeLayer(marcadorOrigem);

        marcadorOrigem=null;

    }

    if(marcadorDestino){

        mapa.removeLayer(marcadorDestino);

        marcadorDestino=null;

    }

    camadaPostos.clearLayers();
    camadaPraias.clearLayers();
    camadaTurismo.clearLayers();
    camadaRestaurantes.clearLayers();

}

/* ==========================================================
   CENTRALIZAR
========================================================== */

function centralizarMapa(){

    if(!rotaAtual) return;

    mapa.flyToBounds(

        rotaAtual.getBounds(),

        {

            padding:[60,60],

            duration:1

        }

    );

}

/* ==========================================================
   ZOOM
========================================================== */

function aproximarMapa(){

    mapa.zoomIn();

}

function afastarMapa(){

    mapa.zoomOut();

}

console.log("🗺 mapa.js carregado");