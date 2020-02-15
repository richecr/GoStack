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
- Multer
- Nodemailer
- date-fns

## Funcionalidades:

## Autenticação de um administrador:

Um usuário pode se autenticar usando email e senha.

Foi criado um usuário administrador por meio do `seeders do sequelize`. Esse usuário será usado para todos os logins que eu realizar.

Foi feita validação de token por meio do JWT. E também a validação dos dados da entrada.

## Destinatários:

Destinatários podem ser cadastrados/atualizados na aplicação e devem ter nome e campos de endereço: rua, número, complemento, estado, cidade e CEP.

O CRUD de destinatários só pode ser feito por administradores cadastrados na aplicação.

## Gestão de entregadores:

O administrador pode cadastrar entregadores para a plataforma.

O CRUD de entregadores só pode ser feito por administradores cadastrados na aplicação.

## Gestão de encomendas:

Entregadores não são independentes dentro da plataforma, e o administrador deve cadastrar encomendas para os entregadores.

O CRUD de encomendas só pode ser feito por administradores cadastrados na aplicação.

## Funcionalidades do entregador:

**Visualizar encomendas:**

Para que o entregador possa visualizar suas encomendas, ele deverá informar apenas seu ID de cadastro (ID do entregador no banco de dados). Essa funcionalidade deve retornar as encomendas atribuidas a ele, que não estejam entregues ou canceladas.
Ele também pode listar as encomendas que já foram entregues.

**Alterar status de encomendas:**

Você deve permitir que o entregador tenha rotas para incluir uma data de retirada (start_date) e data de entrega (end_date) para as encomendas. O entregador só pode fazer 5 retiradas por dia.

Para a funcionalidade de finalizar a entrega, você deverá permitir o envio de uma imagem que irá preencher o campo signature_id da tabela de encomendas.

## Cadastrar problemas nas entregas:

O entregador nem sempre conseguirá entregar as encomendas com sucesso, algumas vezes o destinatário pode estar ausente, ou o próprio entregador poderá ter algum problema com seu veículo na hora de entregar.

Crie uma rota para o entregador cadastrar problemas na entrega apenas informando seu ID de cadastro (ID da encomenda no banco de dados) e a descrição do problema.

Crie uma rota para a distribuidora cancelar uma entrega baseado no ID do problema. Esse cancelamento pode acontecer devido a gravidade do problema da entrega, por exemplo, em caso de perda da encomenda. O entregador deve receber um email.

- [Link para especificação do desafio 1/4](https://github.com/Rocketseat/bootcamp-gostack-desafio-02)
- [Link para especificação do desafio 2/4](https://github.com/Rocketseat/bootcamp-gostack-desafio-03)

**OBS: Esse texto foi tirado da especificação do Desafio FastFeet da RocketSeat**
