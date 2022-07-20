console.log('START');

// Inicializa as variáveis
let materiaPrima = [];
let dosagem = [];
let unidade = [];
let qtd = 0;

// Botões
const addAtivo = document.querySelector('.addAtivo');
addAtivo.onclick = adicionaAtivos;

const submit = document.querySelector('.enviar');
submit.onclick = orcamento;
//submit.onclick = orcamento;

// Seleciona o campo de nome do ativo
document.querySelector("#nomeativo").focus();

// Função para buscar o nome dos ativos

$('#nomeativo').focus();
    $('#nomeativo').autocomplete({
        source: function(request, response) {
            $.getJSON("http://localhost:3000/mps/search",{nome:request.term}, function(data) {
                var transformed = data.map(function(mps){
                    return {
                        nome: mps.nome,
                        label: mps.nome
                    }
                })
                //console.log(transformed)
                response(transformed)
            })
            
        },
        minLength: 3,
        select: function(event, ui) {            
            // var url = ui.item.value;
            // location.href = url;
        },
    });


// Função para adicionar as informações dos ativos nas arrays
function adicionaAtivos () {
    console.log('adicionaAtivos');
    // materiaPrima[qtd] = document.querySelector("#nomeativo").value;
    materiaPrima.push(document.querySelector("#nomeativo").value)
    document.querySelector("#nomeativo").value = "";
    document.querySelector("#nomeativo").focus();
    console.log(materiaPrima);
    // dosagem[qtd] = document.querySelector("#dosagem").value;
    dosagem.push(document.querySelector("#dosagem").value);
    document.querySelector("#dosagem").value = "";
    console.log(dosagem);
    //unidade[qtd] = document.querySelector("#unidade").legend;
    unidade.push(document.querySelector("#unidade").legend);
    document.querySelector("#unidade").legend = "";
    console.log(unidade);

    adicionaLinha(materiaPrima[qtd],dosagem[qtd]);

    qtd = qtd +1;
    console.log(qtd);
}

// Função para adicionar linhas na tabela de ativos
function adicionaLinha(materiaPrima,dosagem) {
    var table = document.getElementById("composicaoFormula");
    var row = table.insertRow(qtd+1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = materiaPrima;
    cell2.innerHTML = dosagem;

}

// Calcula o orçamento
function orcamento() {
    alert('Total de ativos = ' + qtd)
}
