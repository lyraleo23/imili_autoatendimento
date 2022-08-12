// Inicializa as variáveis
let materiaPrima = [];
let dosagem = [];
let unidade = [];
let qtd = 0;
var ativosFormula = [];

// Botões
const addAtivo = document.querySelector('.addAtivo');
addAtivo.onclick = adicionaAtivos;

const submit = document.querySelector('.enviar');
// submit.onsubmit = orcamento;
submit.onclick = orcamento;

// Seleciona o campo de nome do ativo
document.querySelector("#nomeativo").focus();

//Função para buscar o nome dos ativos

$('#nomeativo').focus();
    $('#nomeativo').autocomplete({
        source: function(request, response) {
            $.getJSON("https://apimp-exk5ljhrwq-ue.a.run.app/mps/search",{nome:request.term}, function(data) {
                var transformed = data.map(function(mps){
                    return {
                        nome: mps.nome,
                        label: mps.nome,
                        id: mps._id
                    }
                })
                console.log(transformed)
                response(transformed)
            })
            
        },
        minLength: 3,
        select: function(event, ui) {            
            $('#idativo').val( ui.item.id );
        },
    });


// Função para adicionar as informações dos ativos nas arrays
async function adicionaAtivos () {
    console.log('adicionaAtivos');

    const ativo =
    {
        "ativo": String(document.querySelector("#idativo").value),
        "nome": String(document.querySelector("#nomeativo").value),
        "dosagem": Number(document.querySelector("#dosagem").value),
        "unidade": String(document.querySelector("#unidade").value),
        "densidade": "",
        "diluicao": "",
        "fatoreq": "",
        "margem": "",
        "custoMedio": "",
    };
    console.log(ativo);

    document.querySelector("#nomeativo").value = "";
    document.querySelector("#nomeativo").focus();
    document.querySelector("#dosagem").value = "";
    document.querySelector("#unidade").value = "";

    adicionaLinha(ativo.nome, ativo.dosagem, ativo.unidade);
    ativosFormula.push(ativo);
    console.log(ativosFormula);

    qtd = qtd +1;
    //console.log(qtd);
    return 
}

// Função para adicionar linhas na tabela de ativos
function adicionaLinha(materiaPrima, dosagem, unidade) {

    var table = document.getElementById("composicaoFormula");
    var row = table.insertRow(qtd+1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.innerHTML = materiaPrima;
    cell2.innerHTML = dosagem;
    cell3.innerHTML = unidade;

    return
}

function adicionaAtivoJason(ativo) {
    ativosFormula.push(ativo)

    return
}


// Calcula o orçamento
function orcamento() {
    //alert('Total de ativos = ' + qtd)
    console.log(ativosFormula);

    const data = {
        "id": "",
        "nome": "Anônimo",
        "composicao": ativosFormula,
        "custo": '',
        "precoVenda": '',
        "quantidade": document.querySelector("#quantidade").value,
        "quantidadeExcipiente": "",
        "dose": "",
        "tipoCapsula": ""
    }
        
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };

    fetch("https://apimp-exk5ljhrwq-ue.a.run.app/orcamentos", options)
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
            //window.location.href=`https://fmiligrama.com.br?data=${data}`
        })
        .catch((error) => {
            console.error("Error POST:", error);
        });

}
