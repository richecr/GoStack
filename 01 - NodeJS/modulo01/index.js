const express = require('express');

const server = express();

server.use(express.json());

// Query Params = ?teste=1
// Route Params = /users/1
// Request Body = { "name": "Rick", "email": "rich@elton.com" }

// CRUD - Create, Read, Update, Delete

const users = ['Rick', 'Lucas', 'Davi'];

// Middlewares global
server.use((req, res, next) => {
  console.time('Request')
  console.log(`Método ${req.method}; ${req.url}; `);

  next();

  console.timeEnd('Request');
})

// Middlewares específico: POST, PUT
function checkUsersExists(req, res, next) {
  if (!req.body.nome) {
    return res.status(400).json({ error: 'User name is required' })
  }

  return next();
}

// Middlewares específico: GET, PUT, DELETE
function checkUsersInArray(req, res, next) {
  const { index } = req.params;
  const user = users[index];

  if (!user) {
    return res.status(400).json({ error: 'User does not exists' })
  }

  req.user = user;

  return next();
}

server.get('/users', (req, res) => {
  return res.json(users)
})

server.get('/users/:index', checkUsersInArray, (req, res) => {
  return res.json( req.user );
})

server.post('/users', checkUsersExists, (req, res) => {
  const { nome } = req.body;

  users.push(nome);

  return res.json(users);  
})

server.put('/users/:index', checkUsersExists, checkUsersInArray, (req, res) => {
  const { index } = req.params;
  const { nome } = req.body;

  users[index] = nome;

  return res.json(users);
})

server.delete('/users/:index', checkUsersInArray, (req, res) => {
  const { index } = req.params;

  users.splice(index, 1);

  return res.send();
})

server.listen(3000);