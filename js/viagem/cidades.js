/* ==========================================================
   DA GARAGEM ATÉ O MAR
   CIDADES.JS
========================================================== */

const cidadesViagem = [

    "Cascavel - PR",

    "Laranjeiras do Sul - PR",

    "Guarapuava - PR",

    "Irati - PR",

    "Curitiba - PR",

    "Joinville - SC",

    "Balneário Camboriú - SC",

    "Florianópolis - SC",

    "Palhoça - SC",

    "Praia da Pinheira - SC"

];

/* ==========================================================
   CARREGA CIDADES
========================================================== */

function carregarCidades() {

    const lista =
        document.getElementById("listaCidades");

    if (!lista) return;

    lista.innerHTML = "";

    cidadesViagem.forEach(cidade => {

        lista.innerHTML += `

            <span class="badge bg-success m-2 p-2">

                <i class="bi bi-geo-alt-fill"></i>

                ${cidade}

            </span>

        `;

    });

}

/* ==========================================================
   RETORNA AS CIDADES DA ROTA
========================================================== */

function obterCidadesRota() {

    return cidadesViagem.map(cidade => {

        return {

            nome: cidade.split(" - ")[0],

            descricao: cidade

        };

    });

}

console.log("🏙 cidades.js carregado");