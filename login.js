//LocalStorage Cadastro LOGIN
let cadastros = JSON.parse(localStorage.getItem("cad")) || [];

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
            localStorage.setItem("logado", "true");
            alert('Login Realizado Com Sucesso');
        }
    })
}

function logout(){
    localStorage.setItem("logado", "false");
    alert('Logout Realizado Com Sucesso');
}

function finalizaCompra(){
    if(localStorage.getItem("logado") == true){
        //chama função pra limpar carrinho
    }
}