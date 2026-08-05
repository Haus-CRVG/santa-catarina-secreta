/* ==========================================================
   DA GARAGEM ATÉ O MAR
   PARADAS.JS
========================================================== */

let paradasViagem = [];

/* ==========================================================
   CARREGA PARADAS NA TELA
========================================================== */

function carregarParadas() {

    const container =
        document.getElementById("listaParadas");

    if (!container) return;

    container.innerHTML = "";

    if (paradasViagem.length === 0) {

        container.innerHTML = `

            <div class="alert alert-info">

                Nenhuma parada planejada.

            </div>

        `;

        return;

    }

    paradasViagem.forEach((parada, indice) => {

        container.innerHTML += `

            <div class="card-parada">

                <h5>

                    ⛽ ${indice + 1}ª Parada

                </h5>

                <p>

                    <strong>${parada.nome}</strong>

                </p>

                <p>

                    📍 ${parada.cidade}

                </p>

                <p>

                    🛣 Km ${Math.round(parada.km)}

                </p>

                <p>

                    ⭐ ${parada.nota}

                </p>

                <span class="badge bg-primary">

                    ${parada.bandeira}

                </span>

            </div>

        `;

    });

}

/* ==========================================================
   GERA PARADAS AUTOMÁTICAS
========================================================== */

function gerarParadasAutomaticas(distancia) {

    paradasViagem = [];

    const abastecimentos =
        gerarPlanoAbastecimento(distancia);

    abastecimentos.forEach(km => {

        const posto =
            procurarPosto(km);

        if (posto) {

            paradasViagem.push({

                nome: posto.nome,
                cidade: posto.cidade,
                km: posto.km,
                bandeira: posto.bandeira,
                nota: posto.nota,
                aberto: posto.aberto

            });

        }

    });

    // Atualiza a tela automaticamente
    carregarParadas();

}

/* ==========================================================
   RETORNA PARADAS
========================================================== */

function obterParadas() {

    return paradasViagem;

}

/* ==========================================================
   RETORNA PRÓXIMA PARADA
========================================================== */

function obterProximaParada() {

    if (paradasViagem.length === 0) {

        return null;

    }

    return paradasViagem[0];

}

/* ==========================================================
   LIMPA PARADAS
========================================================== */

function limparParadas() {

    paradasViagem = [];

    carregarParadas();

}

console.log("⛽ paradas.js carregado");