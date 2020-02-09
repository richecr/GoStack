# [Desafio 1](https://github.com/Rocketseat/bootcamp-gostack-desafio-01)
Conceitos do NodeJS

## Tecnologias utilizadas:

- NodeJS
- Express
- Nodemon
- Yarn
- Insomnia

## O que foi feito ?
Uma API REST para armazenar projetos e suas tarefas do zero utilizando Express.

### Rotas:

|   |   |   |   |
|---|---|---|---|
Método | Rota | Parâmetros | O que faz
`POST` | `/projects` | `id`, `title` | Cadastrar um novo projeto.
`GET` | `/projects` | --- | Lista todos os projetos cadastrados.
`PUT` | `/projects/:id` | `id` e `title` | Alterar o título do projeto com o `id` passado.
`DELETE` | `/projects/:id` | `id` | Deletar o projeto com o `id` passado.
`POST` | `/projects/:id/tasks` | `id` e `title` | Armazenar uma nova tarefa no array de tarefas de um projeto específico escolhido através do `id` presente nos parâmetros da rota.

### Middlewares:

- Um middleware em todas as rotas que recebem o parâmetro `id` para verificar se existe um projeto com aquele `id`.

- Um middleware global que imprime quantas requisições foram feitas até o momento.
