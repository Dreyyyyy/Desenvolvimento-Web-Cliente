//LocalStorage Cadastro LOGIN
let cadastros = JSON.parse(localStorage.getItem("cad")) || [];
const loginEL = document.querySelector(".login");
const msgFinalEL = document.querySelector(".msg-final");

function armazenaCadastro(email, senha){
    cadastros.push({
        email: email,
        senha: senha
    });
    localStorage.setItem("cad", JSON.stringify(cadastros));
}

function validaLogin(e, s){
    cadastros.forEach((item) => {
        if(item.email == e && item.senha == s){
            localStorage.setItem("logado", "1");
            loginEL.innerHTML = `<span>Login realizado com sucesso!</span>`;
        }
        else loginEL.innerHTML = `<span>E-mail ou senha incorretos/não cadastrados!</span>`;
    })
}

function logout(){
    localStorage.setItem("logado", "0");
    loginEL.innerHTML = `<span>Logout realizado com sucesso!</span>`;
}

function finalizaCompra(){
    let op = 1;
    if(localStorage.getItem("logado") == op) {
        msgFinalEL.innerHTML = `<p>Compra realizada com sucesso!</p>`;
        carrinho.forEach((item) => {
            removeItemCarrinho(item.id);
        });
    } 
    else {
        msgFinalEL.innerHTML = `<p>Você precisa estar logado para finalizar a compra!</p>`;
    }   
}