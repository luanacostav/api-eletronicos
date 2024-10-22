const nome = document.getElementById("nome")
const categoria = document.getElementById("categoria")
const descricao = document.getElementById("descricao")
const preco = document.getElementById("preco")
const estoque = document.getElementById("estoque")
const fornecedor = document.getElementById("fornecedor")
const imagem = document.getElementById("imagem")
const formulario = document.getElementById('formulario')

const url = "http://localhost:3000"
let produtoEditar = null

// BUSCAR OS PRODUTOS
async function buscarProdutos() {
  try {
    const result = await fetch(`${url}/eletronicos`)
    const produtos = await result.json()
    console.log(produtos)

    const tbody = document.getElementById("tabelaProdutos")
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
          <td><img src="${produto.imagem}" alt="img-produto" width="200px"></td>
          <td>
              <button id="btn-editar" onclick="editar(${produto.id})">Editar</button>
              <button id="btn-excluir" onclick="excluir(${produto.id})">Excluir</button>
          </td>
        </tr>
      `
    })

  } catch (error) {
    alert("Erro na busca de produtos")
    console.error(error)
  }
}

// ADICIONAR PRODUTOS
formulario.addEventListener("submit", async (e) => {
  e.preventDefault()

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
    buscarPordutos()

  } catch (error) {
    alert("Erro ao adicionar Produto")
    console.error(error)
  }
})


let nomeEditar = document.getElementById("nome-editar").value
let categoriaEditar = document.getElementById("categoria-editar").value
let descricaoEditar = document.getElementById("descricao-editar").value
let precoEditar = document.getElementById("preco-editar").value
let estoqueEditar = document.getElementById("estoque-editar").value
let fornecedorEditar = document.getElementById("fornecedor-editar").value
let imagemEditar = document.getElementById("imagem-editar").value
const formularioEditar = document.getElementById('formulario-editar')


async function editar(id) {
  const divEditar = document.getElementById("div-editar")
  divEditar.style.display = "flex"

  const btnFechar = document.getElementById("fechar-editar")
  if (btnFechar) {
    btnFechar.addEventListener("click", (e) => {
      divEditar.style.display = "none"
    })
  }

  try {
    const res = await fetch(`${url}/eletronicos/${id}`, {
      method: "GET",
    })
    const produto = await res.json()
    console.log(produto)

    if (produto) {
      nomeEditar = produto.nome
      categoriaEditar = produto.categoria
      descricaoEditar = produto.descricao
      precoEditar = produto.preco
      estoqueEditar = produto.estoque
      fornecedorEditar = produto.fornecedor
      imagemEditar = produto.imagem
    } else {
      alert("Não foi possível encontrar o produto")
    }
    if (formularioEditar) {
      formularioEditar.addEventListener("submit", async (e) => {
        e.preventDefault()

        const res = await fetch(`${url}/eletronicos/${id}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            nome: nomeEditar,
            categoria: categoriaEditar,
            descricao: descricaoEditar,
            preco: precoEditar,
            estoque: estoqueEditar,
            fornecedor: fornecedorEditar,
            imagem: imagemEditar
          })
        })
        

        const produto = await res.json()
        if (produto) {
          divEditar.style.display = "none"
          buscarProdutos()
        } else {
          alert("Erro ao atualizar dados")
        }
      })
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

buscarProdutos()
