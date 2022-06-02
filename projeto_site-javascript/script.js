// Carrossel de imagens HOME
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(){
    slideIndex++;
    if (slideIndex == 4) {slideIndex = 1};
    showSlides(slideIndex);
}

function minusSlides(){
    slideIndex--;
    if (slideIndex == 0) {slideIndex = 3};
    showSlides(slideIndex);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    var dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i<slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";

}

setInterval(plusSlides, 4000);
// Fim carrossel imagens HOME


// Validação página CONTATO
var erro = "";

function validarNome(){
    let nome = document.getElementById("nome").value;
    if(nome.length>0) {
        return true;
    } else {
        erro = "NOME preenchido incorretamente.";
        return false;
    }
}

function validarEmail(){
    let email = document.getElementById("email").value;
    var re = /\S+@\S+\.\S+/;
    if(re.test(email)) {
        return true;
    } else {
        erro = "EMAIL preenchido incorretamente.";
        return false;
    }
}

function validarAssunto(){
    let assunto = document.getElementById("assunto").value;
    if(assunto.length>0) {
        return true;
    } else {
        erro = "ASSUNTO preenchido incorretamente.";
        return false;
    }
}
function validarMensagem(){
    let msg = document.getElementById("mensagem").value;
    if(msg.length>0) {
        return true;
    } else {
        erro = "MENSAGEM preenchido incorretamente.";
        return false;
    }
}

function validarTudoContato() {
    let retornoValidacao = document.getElementById("retornoValidacao");
    if(validarNome() && validarAssunto() && validarEmail() && validarMensagem()){
        return true;
    } else {
        //alert("Erro ao enviar");
        retornoValidacao.textContent =  "* Erro ao enviar formulário: " + erro;
        return false;
    }
    
}

//VALIDAÇÃO TELA CADASTRO
function validarCep(){
    let cep = document.getElementById("cep").value;
    if(cep.length == 8 && !isNaN(cep)) {
        return true;   
    } else {
        erro = "CEP preenchido incorretamente."
        return false;
    }
}

function consultaCep(){
    
    let cep = document.getElementById("cep").value;
    var url = "https://viacep.com.br/ws/" + cep + "/json/";
    var request = new XMLHttpRequest();

    // Reseta os INPUTS caso usuário precise digitar manualmente
    document.getElementById("rua").value = '';
    document.getElementById("rua").disabled = false;
    document.getElementById("bairro").value = '';
    document.getElementById("bairro").disabled = false;
    document.getElementById("cidade").value = '';
    document.getElementById("cidade").disabled = false;
    document.getElementById("uf").value = '';
    document.getElementById("uf").disabled = false;

    request.open('GET', url);
    request.onerror = function (e) {
        document.getElementById("retornoValidacao").textContent = "CEP inválido (o CEP precisa conter 8 números), ou sistema fora do ar.";
    }

    request.onload = () => {
        var response = JSON.parse(request.responseText);
        if (response.erro == "true") {
            document.getElementById("retornoValidacao").textContent = "CEP não encontrado, digite os dados manualmente!";
        } else {
            document.getElementById("rua").value = response.logradouro;
            document.getElementById("rua").disabled = true;
            document.getElementById("bairro").value = response.bairro;
            document.getElementById("bairro").disabled = true;
            document.getElementById("cidade").value = response.localidade;
            document.getElementById("cidade").disabled = true;
            document.getElementById("uf").value = response.uf;
            document.getElementById("uf").disabled = true;
        }
    }

    request.send();
}

function validarData(){
    let data = document.getElementById("dataNasc").value;
    if(data.length == 10) {
        if (validaMaioridade(data)){
            return true;
        } else {
            erro = "Não é permitido o cadasto de menores de 18 anos!"
        }
        
    } else {
        erro = "DATA DE NASCIMENTO preenchido incorretamente."
        return false;
    }
}

function validaMaioridade(data){

    data = data.replace(/\//g, "-"); 
    var data_array = data.split("-"); // quebra a data
    
   
    if(data_array[0].length != 4){
       data = data_array[2]+"-"+data_array[1]+"-"+data_array[0]; // reescreve data no formato yyyy/MM/dd
    }
    
    var hoje = new Date();
    var nasc  = new Date(data);
    var idade = hoje.getFullYear() - nasc.getFullYear();
    var m = hoje.getMonth() - nasc.getMonth();
    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) idade--;
    
    if(idade < 18){
       return false;
    }
 
    if(idade >= 18){
       return true;
    }
    
 }



function validarCpf(){
    let cpf = document.getElementById("cpf").value;
    if(cpf.length == 11 && !isNaN(cpf)) {
        if(TestaCPF(cpf)){
            return true;
        }else{
            erro = "CPF inválido!"
            return false;
        }
    } else {
        erro = "CPF preenchido incorretamente, mínimo 11 dígitos com apenas números."
        return false;
    }
}

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}


function validarSenha(){
    let senha = document.getElementById("senha").value;
    if(senha.length >= 8) {
        return true;
    } else {
        erro = "SENHA deve possuir no mínimo 8 caracteres!"
        return false;
    }
}

function validarEndereco(){
    let rua = document.getElementById("rua").value;
    let numero = document.getElementById("numero").value;
    let bairro = document.getElementById("bairro").value;
    let cidade = document.getElementById("cidade").value;
    let uf = document.getElementById("uf").value;

    if (rua.length > 0 && numero.length > 0 && bairro.length > 0 && cidade.length > 0 && uf.length >0) {
        return true;
    } else {
        erro = "RUA, NÚMERO, BAIRRO, CIDADE E UF devem ser preenchidos!"
        return false;
    }
}


function validarTudoCadastro(){
    let retorno = document.getElementById("retornoValidacao");
    if(validarNome() && validarEmail() && validarCep() && validarData() && validarCpf() && validarSenha() && validarEndereco()){
        return true;
    } else {
        retorno.textContent = "* Erro ao enviar formulário: " + erro;
        return false;
    }
}

//FIM validação PÁGINA CADASTRO

// ORDENAR DIVS: https://pt.stackoverflow.com/questions/46368/como-ordenar-tr%C3%AAs-divs-de-acordo-com-um-atributo-dela

