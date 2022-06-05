// Selecionar elemento
const produtosEl = document.querySelector(".produtos");
const itemCarrinhoEl = document.querySelector(".item-carrinho");
const totalEl = document.querySelector(".carrinho");

//Renderizar os produtos
function renderizarProdutos() {
    produtos.forEach( (produto) => {
        produtosEl.innerHTML += `
            <section class="produto">
                <img
                src="${produto.imgSrc}"
                alt="${produto.nome}"
                />
                <h1>${produto.nome}</h1>
                <p>R$</small>${produto.preco}</p>
                <div class="comprar">
                <button onclick="addCarrinho(${produto.id})">Comprar</button>
                </div>
            </section>
            `;
    });
}
renderizarProdutos();

// Array do carrinho
let carrinho = [];

//Adicionar ao carrinho
function addCarrinho(id) {
    //verifica se o produto já está no carrinho
    if(carrinho.some((item) => item.id === id)) {
        mudarNumeroUnidades("mais", id);
    }
    else {
        const item = produtos.find((produto) => produto.id === id)
        carrinho.push({
            ...item,
            numUnidades : 1,
        });
    }    
    atualizarCarrinho();
}

//Atualizar o carrinho
function atualizarCarrinho() {
    renderizarItensCarrinho();
    renderizarTotal();
}

//Calcular e renderizar o total
function renderizarTotal() {
    let valorTotal = 0, qtdItens = 0;
    carrinho.forEach((item) => {
        valorTotal += item.preco * item.numUnidades;
        qtdItens += item.numUnidades;
    }); 
    if (qtdItens == 1) {
        totalEl.innerHTML = ` <p>Valor Total (${qtdItens} Item): R$${valorTotal.toFixed(2)}</p> `;
    }
    else {
        totalEl.innerHTML = ` <p>Valor Total (${qtdItens} Itens): R$${valorTotal.toFixed(2)}</p> `;
    }    
}

//Renderizar itens do carrinho
function renderizarItensCarrinho() {
    itemCarrinhoEl.innerHTML = ""; //Limpa a "queue" dos itens no carrinho para não duplicar
    carrinho.forEach((item) => {
        itemCarrinhoEl.innerHTML += `
            <section class="carrinho">
                <img src="${item.imgSrc}" alt="${item.nome}">
                <h1>${item.nome}</h1>
                <p>Quantidade:</p>
                <span class="btn-menos" onclick="mudarNumeroUnidades('menos',  ${item.id})">-</span>
                <span class="num">${item.numUnidades}</span>
                <span class="btn-mais" onclick="mudarNumeroUnidades('mais', ${item.id})">+</span>           
                <p>R$${item.preco}</p>
                <div class="remover">
                    <button onclick="removeItemCarrinho(${item.id})">Remover</button>
                </div>
            </section>
            `;
    });
}

//Remove itens do carrinho
function removeItemCarrinho(id) {
    carrinho = carrinho.filter((item) => item.id !== id);
    atualizarCarrinho();
}

//Altera o número de unidades de um item
function mudarNumeroUnidades(acao, id) {
    carrinho = carrinho.map((item) => {
        let numUnidades = item.numUnidades;
        if(item.id === id) {
            if(acao === "mais") {
                numUnidades++;
                console.log(acao);
            }
            else if (acao === "menos" && numUnidades > 1) {
                numUnidades--;
            }
        }
        return {
            ...item,
            numUnidades: numUnidades,
        };    
    });

    atualizarCarrinho();
}