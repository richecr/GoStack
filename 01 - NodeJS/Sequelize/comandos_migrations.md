# Comandos

## Criar uma migrations:

```sh
$ yarn sequelize migration:create --name=create-users
```

* Aqui será criado o arquivo de migrations, onde poderá ser criado a tabela.

* O Arquivo fica na pasta que selecionei nas configs do arquivo `.sequelizer`.

## Fazer migração:

```sh
$ yarn sequelize db:migrate
```

* Se você abrir o `postbird` verá que a tabela foi criada.

## Desfazer última migração:

```sh
$ yarn sequelize db:migrate:undo
```

* A tabela será excluída do banco. Assim como a migração.

## Desfazer todas as migrações:

```sh
$ yarn sequelize db:migrate:undo:all
```

* Após esses dois últimos comandos `undo` e `undo:all` eu posso rodar o `db:migrate` e ele irá fazer todas as migrações.