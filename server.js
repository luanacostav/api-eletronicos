const express = require('express')
const cors = require('cors')
const port = 3000
// const path = require('path')
const pg = require('pg')
const { Pool } = pg

const app = express()
app.use(express.json())
app.use(cors())

const pool = new Pool({
  user: 'postgres',
  port: 5432,
  host: 'localhost',
  database: 'eletronicos',
  password: 'Guitar21!'
})

async function criarTabela() {
  const tabela = await pool.query(
    `CREATE TABLE IF NOT EXISTS produto(
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      descricao TEXT,
      preco DECIMAL(10, 2) NOT NULL,
      estoque INT NOT NULL,
      categoria VARCHAR(50),
      fornecedor VARCHAR(100),
      imagem TEXT
    )`
  )
  console.log('Tabela criada!')
}
// criarTabela()

app.get('/eletronicos', async (req, res) => {
  try {
    const getAll = await pool.query(
      `SELECT * FROM produto`
    )
    console.log(getAll.rows)
    res.status(200).json(getAll.rows)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

app.post('/eletronicos', async (req, res) => {
  try {
    const { nome, categoria, descricao, preco, estoque,
      fornecedor, imagem } = req.body

    const postProduto = await pool.query(
      `INSERT INTO produto (nome, categoria, descricao, preco, estoque, fornecedor, imagem)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [nome, categoria, descricao, preco, estoque, fornecedor, imagem]
    )
    res.status(200).json(postProduto.rows)

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

app.get('/eletronicos/:id', async (req, res) => {
  try {
    const { id } = req.params

    const getProduto = await pool.query(
      `SELECT * FROM produto
      WHERE id = $1`, [id]
    )
    if (getProduto.rows === 0) {
      return res.status(404).json({ message: "Produto não encontrado" })
    }
    res.status(200).json(getProduto.rows[0])

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

app.put('/eletronicos/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { nome, categoria, descricao, preco, estoque, 
      fornecedor, imagem } = req.body

    const updProduto = await pool.query(
      `UPDATE produto SET
      nome = $1, categoria = $2, descricao = $3, preco = $4,
      estoque = $5, fornecedor = $6, imagem = $7 
      WHERE id = $8 RETURNING *`,
      [nome, categoria, descricao, preco, estoque, fornecedor, imagem, id]
    )
    if (updProduto.rows === 0) {
      res.status(404).json({ message: "Produto não encontrado" })
    }
    res.status(200).json(updProduto.rows[0])

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

app.delete('/eletronicos/:id', async (req, res) => {
  try {
    const { id } = req.params

    const dltProduto = await pool.query(
      `DELETE FROM produto
      WHERE id = $1`, [id]
    )
    if (dltProduto.rows === 0) {
      res.status(404).json({ message: "Produto não encontrado" })
    }
    res.status(200).json({ message: "Produto deletado com sucesso" })

  } catch(error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
})

// Servidor
app.listen(port, (error) => {
  if (error) {
    console.error(error)
  }
  console.log(`http://localhost:${port}`)
})