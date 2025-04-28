# API Eletrônicos

Este projeto é uma aplicação web para gerenciar produtos eletrônicos. Ele inclui uma API desenvolvida em Node.js com Express e um front-end simples em HTML, CSS e JavaScript.


## Funcionalidades

### Back-end
- **API REST** para gerenciar produtos eletrônicos:
  - `GET /eletronicos`: Lista todos os produtos.
  - `POST /eletronicos`: Adiciona um novo produto.
  - `GET /eletronicos/:id`: Busca um produto pelo ID.
  - `PUT /eletronicos/:id`: Atualiza um produto pelo ID.
  - `DELETE /eletronicos/:id`: Remove um produto pelo ID.
- Conexão com banco de dados PostgreSQL.
- Criação automática da tabela `produto` caso ela não exista.

### Front-end
- **Cadastro de Produtos**: Formulário para adicionar novos produtos.
- **Listagem de Produtos**: Tabela com todos os produtos cadastrados.
- **Edição e Exclusão**: Funcionalidades para editar ou excluir produtos.
- **Gráficos**: Visualização do estoque de produtos por categoria usando Chart.js.

## Tecnologias Utilizadas

### Back-end
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [dotenv](https://github.com/motdotla/dotenv)

### Front-end
- HTML5, CSS3 e JavaScript
- [Chart.js](https://www.chartjs.org/)
