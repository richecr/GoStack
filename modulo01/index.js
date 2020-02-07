const express = require('express');

const server = express();

server.use(express.json());

// Query Params = ?teste=1
// Route Params = /users/1
// Request Body = { "name": "Rick", "email": "rich@elton.com" }

// CRUD - Create, Read, Update, Delete

const users = ['Rick', 'Lucas', 'Davi'];

server.get('/users', (req, res) => {
  return res.json(users)
})

server.get('/users/:index', (req, res) => {
  const { index } = req.params;

  return res.json( users[index] );
})

server.post('/users', (req, res) => {
  const { nome } = req.body;

  users.push(nome);

  return res.json(users);  
})

server.put('/users/:index', (req, res) => {
  const { index } = req.params;
  const { nome } = req.body;

  users[index] = nome;

  return res.json(users);
})

server.delete('/users/:index', (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
})

server.listen(3000);