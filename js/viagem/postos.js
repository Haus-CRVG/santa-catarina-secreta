/* ==========================================================
   POSTOS REAIS DA BR-277 / BR-376 / BR-101
========================================================== */

const postosViagem = [

    {
        km: 280,
        cidade: "Laranjeiras do Sul - PR",
        nome: "Posto Três Pinheiros",
        bandeira: "Shell",
        nota: 4.8,
        aberto: "24h"
    },

    {
        km: 365,
        cidade: "Guarapuava - PR",
        nome: "Posto Mahle",
        bandeira: "Ipiranga",
        nota: 4.7,
        aberto: "24h"
    },

    {
        km: 520,
        cidade: "Irati - PR",
        nome: "Posto Pelanda",
        bandeira: "Shell",
        nota: 4.8,
        aberto: "24h"
    },

    {
        km: 640,
        cidade: "Curitiba - PR",
        nome: "Auto Posto Pinheirão",
        bandeira: "Ipiranga",
        nota: 4.7,
        aberto: "24h"
    },

    {
        km: 825,
        cidade: "Joinville - SC",
        nome: "Posto Rudnick",
        bandeira: "Shell",
        nota: 4.9,
        aberto: "24h"
    },

    {
        km: 960,
        cidade: "Balneário Camboriú - SC",
        nome: "Posto Mime",
        bandeira: "Ipiranga",
        nota: 4.8,
        aberto: "24h"
    }

];

function procurarPosto(km){

    let melhor = postosViagem[0];

    let menor = Math.abs(postosViagem[0].km - km);

    postosViagem.forEach(p=>{

        const diferenca = Math.abs(p.km-km);

        if(diferenca < menor){

            menor = diferenca;

            melhor = p;

        }

    });

    return melhor;

}