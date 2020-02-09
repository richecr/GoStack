# [Desafio 2 - Fastfeet](https://github.com/Rocketseat/bootcamp-gostack-desafio-02)
A aplicação que iremos dar início ao desenvolvimento a partir de agora é um app para uma transportadora fictícia, o FastFeet.

## Tecnologias utilizadas:

- NodeJS
- Express
- Nodemon
- Sucrase
- Docker
- Sequelize
- MVC
- ESLint
- Prettier
- Migrations do sequelize
- Seeders do sequelize
- Bcryptjs
- JWT
- Yup

## Funcionalidades:

## Autenticação de um administrador:

Um usuário pode se autenticar usando email e senha.

Foi criado um usuário administrador por meio do `seeders do sequelize`. Esse usuário será usado para todos os logins que eu realizar.

Foi feita validação de token por meio do JWT. E também a validação dos dados da entrada.

## Destinatários:

Destinatários podem ser cadastrados/atualizados na aplicação e devem ter nome e campos de endereço: rua, número, complemento, estado, cidade e CEP.

O cadastro de destinatários só pode ser feito por administradores cadastrados na aplicação.
