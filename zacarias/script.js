// alert("Olá JavaScript externo!")

// let botao = document.querySelector("a#add");
// botao.addEventListener("click", () =>{alert("Clicado")});

// botao.addEventListener("click", funcaoA);
// botao.addEventListener("click", funcaoB);

// function funcaoA(){
//     alert("A");
// }

// function funcaoB(){
//     alert("B");
// }


let selectTema = document.querySelector("select#tema")

selectTema.addEventListener("change", evento => {
    let temaSelecionado = evento.target.value;
    // console.log(temaSelecionado)
    if(temaSelecionado){
        mudaTema(temaSelecionado);
        localStorage.setItem("tema", temaSelecionado)
    }

});

const mudaTema = (temaSelecionado) => {
    let linkTema = document.querySelector("#link-tema");
    let url = "css/estilo-tema-"+temaSelecionado+".css"
    linkTema.href = url;
}

let tema = localStorage.getItem("tema")
if(tema){
    mudaTema(tema);
};

const carregarProfisionais = () =>{
    let url = "https://my-json-server.typicode.com/juniorlimeiras/json/profissionais"
    let tabela = document.querySelector("table");
    fetch(url).then(resposta => {
        return resposta.json();
    }).then(dados => {
        for (const item of dados){
            inserirProfissional(item);
        }
        eventoExcluir();
    }).catch(error => {
        console.error(erro);
    })
    // let xhr = new XMLHttpRequest();
    // xhr.open("GET", url);
    // xhr.addEventListener("readystatechange", () => {
    //     if(xhr.readyState === 4 && xhr.status === 200){
    //             dados = JSON.parse(xhr.responseText);
    //             // console.log(dados);
    //             for (const item of dados){
    //                 // Criando os Elementos HTML
    //                 let linha = document.createElement("tr");
    //                 let id = document.createElement("td");
    //                 let nome = document.createElement("td");
    //                 let registroConselho = document.createElement("td");
    //                 let telefone = document.createElement("td");
    //                 let email = document.createElement("td");
    //                 let unidade = document.createElement("td");
    //                 let especialidade = document.createElement("td");
    //                 let acoes = document.createElement("td");
    //                 // Preenchendo os Elementos
    //                 id.textContent = item.id;
    //                 nome.textContent = item.nome;
    //                 registroConselho.textContent = item.registro;
    //                 telefone.textContent = item.telefone;
    //                 email.textContent = item.email;
    //                 unidade.textContent = item.unidade;
    //                 especialidade.textContent = item.especialidade;
    //                 acoes.innerHTML = `<a class="botao" href="javascript:void(0)">Editar</a>  <a class="botao" id="excluir" href="javascript:void(0)">Excluir</a>`
    //                 // Preenchendo a linha
    //                 // linha.appendChild(id);
    //                 // linha.appendChild(nome);
    //                 // linha.appendChild(registroConselho);
    //                 // linha.appendChild(email);
    //                 // linha.appendChild(telefone);
    //                 // linha.appendChild(unidade);
    //                 // linha.appendChild(especialidade);
    //                 // linha.appendChild(acoes);
    //                 // Preenchendo a tabela com uma linha
    //                 tabela.tBodies[0].appendChild(linha);
    //             }
    //         };
    //         eventoExcluir();
    // });
    // xhr.send();
};

carregarProfisionais();

// Criar uma função para excluir um profissional
const eventoExcluir = () => {
    let botoesExcluir = document.querySelectorAll("a.botao#excluir");
    for (const bt of botoesExcluir){
        bt.addEventListener("click", () => {
            bt.parentNode.parentNode.remove();
        });
    };
};

let botaoAdicionar = document.querySelector("a.botao#add");
let form = document.querySelector("form")
let botaoCancelar = document.querySelector("input#excluir");
// cria uma funcão para adicionar o grid na tela
botaoAdicionar.addEventListener("click", () => {
    form.classList.remove("inativo");
});
// cria uma funcão para excluir o grid na tela
botaoCancelar.addEventListener("click", () => {
    form.classList.add("inativo")
    form.reset();
});

let tabela = document.querySelector("table");
// Adicionar um funcionamento para enviar os dados do form para a tabela

form.addEventListener("submit", (evento) => {
    evento.preventDefault(); //Evita que a pagina seja carregada
    let profissional = {
        id : tabela.tBodies[0].rows.length + 1,
        nome : form.nome.value,
        registro : form.registro.value,
        telefone : form.telefone.value,
        email : form.email.value,
        unidade : form.unidade.options[form.unidade.selectedIndex].label,
        especialidade : form.especialidade.options[form.especialidade.selectedIndex].label
    };
    // console.log(profissional);
    inserirProfissional(profissional);
    form.reset();
    form.classList.add("inativo");
    eventoExcluir();
});

// Função que insere um objeto profissional na tabela HTML
const inserirProfissional = (item) => {
    // Criando os Elementos HTML
    let linha = document.createElement("tr");
    let id = document.createElement("td");
    let nome = document.createElement("td");
    let registroConselho = document.createElement("td");
    let telefone = document.createElement("td");
    let email = document.createElement("td");
    let unidade = document.createElement("td");
    let especialidade = document.createElement("td");
    let acoes = document.createElement("td");
    // Preenchendo os Elementos
    id.textContent = item.id;
    nome.textContent = item.nome;
    registroConselho.textContent = item.registro;
    telefone.textContent = item.telefone;
    email.textContent = item.email;
    unidade.textContent = item.unidade;
    especialidade.textContent = item.especialidade;
    acoes.innerHTML = `<a class="botao" href="javascript:void(0)">Editar</a>  <a class="botao" id="excluir" href="javascript:void(0)">Excluir</a>`
    // Preenchendo a linha
    linha.appendChild(id);
    linha.appendChild(nome);
    linha.appendChild(registroConselho);
    linha.appendChild(email);
    linha.appendChild(telefone);
    linha.appendChild(unidade);
    linha.appendChild(especialidade);
    linha.appendChild(acoes);
    // Preenchendo a tabela com uma linha
    tabela.tBodies[0].appendChild(linha);
}