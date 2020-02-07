const express = require('express');

const server = express();

// Query Params = ?teste=1
// Route Params = /users/1
// Request Body = { "name": "Rick", "email": "rich@elton.com" }

server.get('/users/:id', (req, res) => {
  const { id } = req.params;

  return res.json({ message: `Buscando por user com ID: ${id}` });
})

server.listen(3000);