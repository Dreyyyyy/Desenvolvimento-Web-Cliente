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

function validarNome(){
    let nome = document.getElementById("nomeContato").value;
    if(nome.length>3) {
        return true;
    } else {
        return false;
    }
}

function validarEmail(){
    let email = document.getElementById("emailContato").value;
    var re = /\S+@\S+\.\S+/;
    if(re.test(email)) {
        return true;
    } else {
        return false;
    }
}

function validarAssunto(){
    let assunto = document.getElementById("assunto").value;
    if(assunto.length>0) {
        return true;
    } else {
        return false;
    }
}
function validarMensagem(){
    let msg = document.getElementById("mensagem").value;
    if(msg.length>0) {
        return true;
    } else {
        return false;
    }
}

function validarTudoContato() {
    let retornoValidacao = document.getElementById("retornoValidacao");
    if(validarNome() && validarAssunto() && validarEmail() && validarMensagem()){
        alert("dados enviados com sucesso");
        return true;
    } else {
        //alert("Erro ao enviar");
        retornoValidacao.textContent = "* PREENCHA OS CAMPOS CORRETAMENTE!"
        return false;
    }
    
}