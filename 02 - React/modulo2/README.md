# Modulo 2 - ReactJS

- [Especificação](https://github.com/Rocketseat/bootcamp-gostack-desafio-05#desafio-05-aplica%C3%A7%C3%A3o-com-reactjs)

# Funcionalidades

## Captando erros :heavy_check_mark:

Adicione um try/catch por volta do código presente na função handleSubmit presente no componente Main e caso um repositório não seja encontrado na API do Github adicione uma borda vermelha por volta do input em que o usuário digitou o nome do repositório.

## Repositório duplicado :heavy_check_mark:

Antes de fazer a chamada à API na função handleSubmit faça uma verificação para ver se o repositório não está duplicado, ou seja, se ele ainda não existe no estado de repositories.

Caso exista, dispare um erro, e com isso o código cairá no catch do try/catch criado na funcionalidade anterior.

~~~js
throw new Error('Repositório duplicado');
~~~

## Filtro de estado :heavy_check_mark:

Adicione um filtro de estado na listagem de Issues que criamos no detalhe do repositório. O estado representa se a issue está em aberto, fechada ou uma opção para exibir todas.

Exemplos de requisição:

~~~bash
https://api.github.com/repos/rocketseat/unform/issues?state=all
https://api.github.com/repos/rocketseat/unform/issues?state=open
https://api.github.com/repos/rocketseat/unform/issues?state=closed
~~~

Você pode encontrar a documentação nesse link;

## Paginação :heavy_check_mark:

Adicione paginação nas issues listadas no detalhe do repositório. A API do Github lista no máximo 30 issues por página e você pode controlar o número da página atual por um parâmetro no endereço da requisição:

~~~bash
https://api.github.com/repos/rocketseat/unform/issues?page=2
~~~
