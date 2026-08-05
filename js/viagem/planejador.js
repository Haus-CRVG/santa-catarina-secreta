/* ==========================================================
   PLANEJADOR.JS
   Motor Inteligente da Viagem
========================================================== */

let roteiroViagem = [];

/* ==========================================================
   LIMPA O ROTEIRO
========================================================== */

function limparRoteiro(){

    roteiroViagem = [];

}

/* ==========================================================
   ADICIONA EVENTO AO ROTEIRO
========================================================== */

function adicionarEvento(

    tipo,
    titulo,
    descricao,
    horario,
    duracao = 0,
    dados = {}

){

    roteiroViagem.push({

        tipo,
        titulo,
        descricao,
        horario,
        duracao,
        ...dados

    });

}

/* ==========================================================
   ORDENA PELO HORÁRIO
========================================================== */

function ordenarRoteiro(){

    roteiroViagem.sort(

        (a,b)=>

        horaParaMinutos(a.horario)

        -

        horaParaMinutos(b.horario)

    );

}

/* ==========================================================
   RETORNA O ROTEIRO
========================================================== */

function obterRoteiro(){

    ordenarRoteiro();

    return roteiroViagem;

}

/* ==========================================================
   GERA O ROTEIRO INTELIGENTE
========================================================== */

function gerarRoteiroInteligente(distancia, tempo){

    limparRoteiro();

    const cronograma = obterCronograma();

    /* ------------------------------------------
       SAÍDA
    ------------------------------------------ */

    adicionarEvento(

        "saida",

        "Saída",

        document.getElementById("origem").value,

        cronograma.horaSaida

    );

    /* ------------------------------------------
       ABASTECIMENTOS
    ------------------------------------------ */

    const paradas = obterParadas();

    paradas.forEach((parada, indice)=>{

        adicionarEvento(

            "abastecimento",

            `${indice+1}º Abastecimento`,

            `${parada.nome} - ${parada.cidade}`,

            calcularHorarioKm(

                cronograma.horaSaida,

                distancia,

                tempo,

                parada.km

            ),

            10,

            {

                km: parada.km,

                cidade: parada.cidade,

                posto: parada.nome,

                bandeira: parada.bandeira,

                nota: parada.nota

            }

        );

    });

    /* ------------------------------------------
       CAFÉ DA MANHÃ
    ------------------------------------------ */

    adicionarEvento(

        "cafe",

        "Café",

        "Parada programada",

        cronograma.horaCafe,

        cronograma.tempoCafe

    );

    /* ------------------------------------------
       ALMOÇO
    ------------------------------------------ */

    adicionarEvento(

        "almoco",

        "Almoço",

        "Parada programada",

        cronograma.horaAlmoco,

        cronograma.tempoAlmoco

    );

    /* ------------------------------------------
       CAFÉ DA TARDE
    ------------------------------------------ */

    adicionarEvento(

        "cafe",

        "Café da tarde",

        "Parada programada",

        cronograma.horaCafeTarde,

        cronograma.tempoCafeTarde

    );

    /* ------------------------------------------
       CHEGADA
    ------------------------------------------ */

    adicionarEvento(

        "chegada",

        "Destino",

        document.getElementById("destino").value,

        calcularChegadaFinal(tempo)

    );

    ordenarRoteiro();

}

/* ==========================================================
   ADICIONA ATRAÇÃO AO ROTEIRO
========================================================== */

function adicionarAtracaoRoteiro(atracao){

    adicionarEvento(

        "turismo",

        atracao.nome,

        atracao.cidade,

        atracao.horario || "",

        60,

        atracao

    );

    ordenarRoteiro();

}

/* ==========================================================
   REMOVE ATRAÇÃO
========================================================== */

function removerAtracao(nome){

    roteiroViagem = roteiroViagem.filter(

        item => item.titulo !== nome

    );

}

/* ==========================================================
   PROCURA EVENTOS POR TIPO
========================================================== */

function obterEventos(tipo){

    return roteiroViagem.filter(

        e => e.tipo === tipo

    );

}

/* ==========================================================
   IMPRIME O ROTEIRO
========================================================== */

function imprimirRoteiro(){

    console.clear();

    console.log("===== ROTEIRO DA VIAGEM =====");

    roteiroViagem.forEach(item=>{

        console.log(

            item.horario,

            "-",

            item.titulo,

            "-",

            item.descricao

        );

    });

}

/* ==========================================================
   GERA O ROTEIRO COMPLETO
========================================================== */

function atualizarPlanejamento(distancia, tempo){

    gerarRoteiroInteligente(

        distancia,

        tempo

    );

    imprimirRoteiro();

}