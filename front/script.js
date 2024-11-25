const nome = document.getElementById("nome")
const categoria = document.getElementById("categoria")
const descricao = document.getElementById("descricao")
const preco = document.getElementById("preco")
const estoque = document.getElementById("estoque")
const fornecedor = document.getElementById("fornecedor")
const imagem = document.getElementById("imagem")
const formulario = document.getElementById("formulario")

const divImg = document.getElementById("divImg")
const imagemIns = document.getElementById("iconImg")
const btnProdutos = document.getElementById("btnProdutos")
const btnForms = document.getElementById("btnForms")
const btnGrafico = document.getElementById("btnGrafico")

const url = "http://localhost:3000"
let produtoEditar = null

if(imagem) {
  imagem.addEventListener("input", () => {
    if(imagem.value) {
      imagemIns.src = imagem.value
      imagemIns.style.width = "50%";
      imagemIns.style.height = "70%";
      imagemIns.style.boxShadow = "0px 4px 8px rgba(0, 0, 0, 0.2)";
    } else {
      imagemIns.src = "/front/assets/img/icon-img.png"
    }
  })
}

if(btnProdutos) {
  btnProdutos.addEventListener("click", () => {
    window.location.href = "/front/produtos.html"
  })
}

if(btnForms) {
  btnForms.addEventListener("click", () => {
    window.location.href = "/front/index.html"
  })
}

if(btnGrafico) {
  btnGrafico.addEventListener("click", () => {
    window.location.href = "/front/graficos.html"
  })
}

let chartProdutos = null

async function atualizarGrafico() {
  const result = await fetch(`${url}/eletronicos`)
  const produtos = await result.json()

  const ctx = document.getElementById('myChart')
  console.log(ctx)
  
  const labels = produtos.map(produto => produto.categoria)
  const data = produtos.map(produto => produto.estoque)

  chartProdutos = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'Estoque de Produtos',
        data: data,
        backgroundColor: 'rgb(56, 56, 176)',
        borderColor: 'rgb(56, 56, 176)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

// BUSCAR OS PRODUTOS
async function buscarProdutos() {
  try {
    const result = await fetch(`${url}/eletronicos`)
    const produtos = await result.json()

    const tbody = document.getElementById("tbodyProdutos")
    tbody.innerHTML = ""
    produtos.map((produto) => {
      tbody.innerHTML += `
        <tr>
          <td>${produto.nome}</td>
          <td>${produto.categoria}</td>
          <td>${produto.descricao}</td>
          <td>${produto.preco}</td>
          <td>${produto.estoque}</td>
          <td>${produto.fornecedor}</td>
          <td>
            <div class="img-tabela">
              <img src="${produto.imagem}" alt="img-produto" width="200px">
            </div>
          </td>
          <td>
              <button id="btn-editar" class="btn-acao" onclick="editar(${produto.id})">Editar</button>
              <button id="btn-excluir" class="btn-acao" onclick="excluir(${produto.id})">Excluir</button>
          </td>
        </tr>
      `
    })

    atualizarGrafico()

  } catch (error) {
    console.error(error)
  }
}

// ADICIONAR PRODUTOS
if(formulario) {
  formulario.addEventListener("submit", async (e) => {
    e.preventDefault()
    console.log('Formulário submetido')
  
    try {
      const res = await fetch(`${url}/eletronicos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nome: nome.value,
          categoria: categoria.value,
          descricao: descricao.value,
          preco: preco.value,
          estoque: estoque.value,
          fornecedor: fornecedor.value,
          imagem: imagem.value
        })
      })
      const data = await res.json()
      console.log("response: ", res)
      console.log(data)
      formulario.reset()
      buscarProdutos()
  
    } catch (error) {
      alert("Erro ao adicionar Produto")
      console.error(error)
    }
  })
}


let nomeEditar = document.getElementById("nome-editar")
let categoriaEditar = document.getElementById("categoria-editar")
let descricaoEditar = document.getElementById("descricao-editar")
let precoEditar = document.getElementById("preco-editar")
let estoqueEditar = document.getElementById("estoque-editar")
let fornecedorEditar = document.getElementById("fornecedor-editar")
let imagemEditar = document.getElementById("imagem-editar")
const formularioEditar = document.getElementById('formulario-editar')

const divEditar = document.getElementById("div-editar")

if (formularioEditar) {
  formularioEditar.addEventListener("submit", async (e) => {
    e.preventDefault()

    if(produtoEditar) {
      try {
        const res = await fetch(`${url}/eletronicos/${produtoEditar}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            nome: nomeEditar.value,
            categoria: categoriaEditar.value,
            descricao: descricaoEditar.value,
            preco: precoEditar.value,
            estoque: estoqueEditar.value,
            fornecedor: fornecedorEditar.value,
            imagem: imagemEditar.value
          })
        })

        if(res.ok) {
          divEditar.style.display = "none"
          buscarProdutos()
        } else {
          alert("Erro ao atualizar dados")
        }
      } catch(error) {
        console.error(error)
      }
    }
  })
}

async function editar(id) {
  divEditar.style.display = "flex"
  produtoEditar = id

  const btnFechar = document.getElementById("fechar-editar")
  if (btnFechar) {
    btnFechar.addEventListener("click", () => {
      divEditar.style.display = "none"
    })
  }

  try {
    const res = await fetch(`${url}/eletronicos/${produtoEditar}`, {
      method: "GET",
    })
    const produto = await res.json()

    if (produto) {
      nomeEditar.value = produto.nome
      categoriaEditar.value = produto.categoria
      descricaoEditar.value = produto.descricao
      precoEditar.value = produto.preco
      estoqueEditar.value = produto.estoque
      fornecedorEditar.value = produto.fornecedor
      imagemEditar.value = produto.imagem
    } else {
      alert("Não foi possível encontrar o produto")
    }
  } catch (error) {
    console.error(error)
  }
}

async function excluir(id) {
  try {
    const res = await fetch(`${url}/eletronicos/${id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      buscarProdutos()
    } else {
      alert("Erro ao deletar produto")
    }

  } catch (error) {
    console.error(error)
  }
}

window.onload = () => {
  buscarProdutos()
  atualizarGrafico()
}
