console.log('START');

let materiaPrima = [];
let dosagem = [];
let unidade = [];
let qtd = 0;

const listaDeTeclas = document.querySelectorAll('.addAtivo');

for (let contador = 0; contador < listaDeTeclas.length; contador++) {

    const tecla = listaDeTeclas[contador];
    const instrumento = tecla.classList[1];
    const idAudio = `#som_${instrumento}`; //template string

    tecla.onclick = function () {
        adicionaAtivos();
        
    };

}

function adicionaAtivos () {
    console.log('adicionaAtivos');
    materiaPrima[qtd] = document.querySelector("#nomeativo").value;
    console.log(materiaPrima);
    dosagem[qtd] = document.querySelector("#dosagem").value;
    console.log(dosagem);
    unidade[qtd] = document.querySelector("#unidade").legend;
    console.log(unidade);

    adicionaLinha(materiaPrima[qtd],dosagem[qtd]);

    qtd = qtd +1;
    console.log(qtd);
}

function adicionaLinha(materiaPrima,dosagem) {
    var table = document.getElementById("composicaoFormula");
    var row = table.insertRow(qtd+1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = materiaPrima;
    cell2.innerHTML = dosagem;

}
