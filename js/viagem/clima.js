/* ==========================================
   CLIMA
========================================== */

async function buscarClima(cidade){

    try{

        const url =

`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)},BR&units=metric&lang=pt_br&appid=${CONFIG.OPEN_WEATHER_KEY}`;

        const resposta = await fetch(url);

        if(!resposta.ok){

            return null;

        }

        return await resposta.json();

    }

    catch(erro){

        console.error("Erro ao buscar clima:", erro);

        return null;

    }

}

async function mostrarClima(cidade){

    const painel =
        document.getElementById("painelClima");

    if(!painel){

        return;

    }

    const clima =
        await buscarClima(cidade);

    if(!clima){

        return;

    }

    painel.innerHTML += `

        <div class="card-clima">

            <h5>${cidade}</h5>

            <h2>${Math.round(clima.main.temp)}°C</h2>

            <p>${clima.weather[0].description}</p>

        </div>

    `;

}

console.log("🌦 clima.js carregado");