//Autenticacao

function verificarAutenticacao() {
  const auth = localStorage.getItem('auth');
  if (auth !== 'true') {
    alert('Por favor, faça login primeiro!');
    window.location.href = 'login.html';
  } else {
    carregarProdutosAdmin();
  }
}

function carregarProdutosAdmin() {
  const listaProdutos = document.getElementById('lista-produtos-admin');
  listaProdutos.innerHTML = '';
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  produtos.forEach((produto, index) => {
    const produtoElemento = document.createElement('div');
    produtoElemento.className = 'product-admin';
    produtoElemento.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}">
      <h3>${produto.nome}</h3>
      <p>${produto.descricao}</p>
      <p>R$${produto.preco.toFixed(2)}</p>
      <button onclick="removerProduto(${index})">Remover Produto</button>
      <button onclick="prepararEdicao(${index})">Editar Produto</button>
    `;
    listaProdutos.appendChild(produtoElemento);
  });
}

//Adiciona e edita produtos
function adicionarOuEditarProduto() {
  const index = document.getElementById('produto-index').value;
  const nome = document.getElementById('nome-produto').value;
  const preco = parseFloat(document.getElementById('preco-produto').value);
  const descricao = document.getElementById('descricao-produto').value;
  const imagem = document.getElementById('imagem-produto').value;

  if (!nome || !preco || !descricao || !imagem) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];

  if (index === '') {
    produtos.push({ nome, preco, descricao, imagem });
  } else {
    produtos[index] = { nome, preco, descricao, imagem };
  }

  localStorage.setItem('produtos', JSON.stringify(produtos));
  carregarProdutosAdmin();

  document.getElementById('produto-index').value = '';
  document.getElementById('nome-produto').value = '';
  document.getElementById('preco-produto').value = '';
  document.getElementById('descricao-produto').value = '';
  document.getElementById('imagem-produto').value = '';
  document.getElementById('btn-adicionar').textContent = 'Adicionar Produto';
}

//Remove produto
function removerProduto(index) {
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  produtos.splice(index, 1);
  localStorage.setItem('produtos', JSON.stringify(produtos));
  carregarProdutosAdmin();
}

//prepara edição
function prepararEdicao(index) {
  const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
  const produto = produtos[index];

  document.getElementById('produto-index').value = index;
  document.getElementById('nome-produto').value = produto.nome;
  document.getElementById('preco-produto').value = produto.preco;
  document.getElementById('descricao-produto').value = produto.descricao;
  document.getElementById('imagem-produto').value = produto.imagem;
  document.getElementById('btn-adicionar').textContent = 'Salvar Alterações';
}

function irParaProdutos() {
  window.location.href = 'index.html';
}
