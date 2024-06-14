//Login
function login() {
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  
  if (usuario === 'igor' && senha === 'igor') {
    localStorage.setItem('auth', 'true');
    window.location.href = 'admin.html';
  } else {
    document.getElementById('erro-login').innerText = 'Usuário ou senha incorretos';
  }
}

//Carrega os produtos
function carregarProdutos() {
  const listaProdutos = document.getElementById('lista-produtos');
  listaProdutos.innerHTML = '';
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  produtos.forEach((produto, index) => {
    const produtoElemento = document.createElement('div');
    produtoElemento.className = 'product';
    produtoElemento.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <div class="product-info">
        <h3>${produto.nome}</h3>
        <p>${produto.descricao}</p>
        <p>R$${produto.preco.toFixed(2)}</p>
      </div>
      <button onclick="adicionarAoCarrinho(${index})">Adicionar ao Carrinho</button>
    `;
    listaProdutos.appendChild(produtoElemento);
  });
}

//adiciona no carrinho
function adicionarAoCarrinho(index) {
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.push(produtos[index]);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
}

//carrega o carrinho
function carregarCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const carrinhoDiv = document.getElementById('carrinho');
  carrinhoDiv.innerHTML = '<h2>Carrinho de Compras</h2>';
  carrinho.forEach((item, index) => {
    const itemElemento = document.createElement('div');
    itemElemento.className = 'cart-item';
    itemElemento.innerHTML = `
      <img src="${item.imagem}" alt="${item.nome}">
      <div class="product-info">
        <h3>${item.nome}</h3>
        <p>${item.descricao}</p>
        <p>R$${item.preco.toFixed(2)}</p>
      </div>
      <button onclick="removerDoCarrinho(${index})">Remover</button>
    `;
    carrinhoDiv.appendChild(itemElemento);
  });
  atualizarTotalCarrinho();
}

//remove do carrinho
function removerDoCarrinho(index) {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  carrinho.splice(index, 1);
  localStorage.setItem('carrinho', JSON.stringify(carrinho));
  carregarCarrinho();
}

//total do carrinho
function atualizarTotalCarrinho() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
  const totalElemento = document.createElement('p');
  totalElemento.innerHTML = `Total: R$${total.toFixed(2)}`;
  document.getElementById('carrinho').appendChild(totalElemento);
}

//finalizar compra
function finalizarCompra() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio.');
    return;
  }
  
  const formularioCompra = document.createElement('div');
  formularioCompra.innerHTML = `
    <h2>Finalizar Compra</h2>
  <input type="text" id="nome-cliente" placeholder="Nome">
  <input type="text" id="cpf-cliente" placeholder="CPF">
  <textarea id="endereco-cliente" placeholder="Endereço"></textarea>
  <select id="metodo-pagamento">
    <option value="" disabled selected>Escolha o método de pagamento</option>
    <option value="cartao-credito">Cartão de Crédito</option>
    <option value="boleto-bancario">Boleto Bancário</option>
    <option value="pix">Pix</option>
  </select>
  <button onclick="confirmarCompra()">Confirmar Compra</button>
`;
  document.body.appendChild(formularioCompra);
}

//confirma compra
function confirmarCompra() {
  const nome = document.getElementById('nome-cliente').value;
  const cpf = document.getElementById('cpf-cliente').value;
  const endereco = document.getElementById('endereco-cliente').value;
  const metodoPagamento = document.getElementById('metodo-pagamento').value;

  if (!nome || !cpf || !endereco) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  alert(`Compra confirmada!\nNome: ${nome}\nCPF: ${cpf}\nEndereço: ${endereco}\n Metodo de Pagamento: ${metodoPagamento}`);
  localStorage.removeItem('carrinho');
  location.reload();
}

function irParaAdmin() {
  window.location.href = 'admin.html';
}

document.addEventListener('DOMContentLoaded', function() {
  carregarProdutos();
  carregarCarrinho();
});
