# Comandos

## Criar container docker mongo:

```sh
$ docker run --name mongogobaber -p 27017:27017 -d -t mongo
```

* Isso irá iniciar um banco de dados mongoDB.

* Pode ser testado acessando no navegador: http://localhost:27017/

* Se a mensagem: `It looks like you are trying to access MongoDB over HTTP on the native driver port.` aparecer, então está tudo certo.

