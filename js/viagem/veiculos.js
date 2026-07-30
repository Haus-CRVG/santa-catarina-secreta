/* ==========================================================
   VEICULOS.JS
========================================================== */

const VEICULOS = {

    palio:{

        nome:"Fiat Palio 1.4",

        consumo:10.5,

        tanque:48

    },

    peugeot:{

        nome:"Peugeot 207 1.4",

        consumo:10.5,

        tanque:50

    },

    outro:{

        nome:"Outro",

        consumo:12,

        tanque:50

    }

};

function obterVeiculoSelecionado(){

    const select = document.getElementById("veiculo");

    switch(select.selectedIndex){

        case 0:
            return VEICULOS.palio;

        case 1:
            return VEICULOS.peugeot;

        default:
            return VEICULOS.outro;

    }

}

function atualizarPainelVeiculo(distancia){

    const v = obterVeiculoSelecionado();

    const autonomia =
        calcularAutonomia(v.consumo, v.tanque);

    const abastecimentos =
        calcularAbastecimentos(
            distancia,
            autonomia
        );

    document.getElementById("dadosVeiculo").innerHTML =

    `

    <div class="item-veiculo">

        <strong>Modelo</strong>

        <span>${v.nome}</span>

    </div>

    <div class="item-veiculo">

        <strong>Consumo</strong>

        <span>${v.consumo} km/L</span>

    </div>

    <div class="item-veiculo">

        <strong>Tanque</strong>

        <span>${v.tanque} litros</span>

    </div>

    <div class="item-veiculo">

        <strong>Autonomia</strong>

        <span>${autonomia.toFixed(0)} km</span>

    </div>

    <div class="item-veiculo">

        <strong>Abastecimentos</strong>

        <span>${abastecimentos}</span>

    </div>

    `;

}