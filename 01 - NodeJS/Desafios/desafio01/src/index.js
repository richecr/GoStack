const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let countRequest = 0;

// Middlewares global -> Conta o total de requisições feitas.
server.use((req, res, next) => {
  countRequest += 1;
  console.log(countRequest);
  next();
})

// Método que procura o index do projeto no array de projects com 
// aquele ID
function foundIndexProjectForID(id) {
  let indexProject = -1;

  for (let index = 0; index < projects.length; index++) {
    const project = projects[index];
    if (project.id == id) {
      indexProject = index;
    }
  }

  return indexProject;
}

// Middlewares específico -> Verificam se existe projeto com o ID,
// para os métodos que utilizam o ID
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  let index = foundIndexProjectForID(id);

  if (index != -1) {
    next();
  } else {
    return res.status(404).json({ error: 'Não existe projeto com esse ID' });
  }
}

// POST -> Cadastrar um novo projeto.
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: [],
  });

  return res.json(projects);
});

// GET -> Listar todos os projetos.
server.get('/projects', (req, res) => {
  return res.json(projects);
})

// PUT -> Atualizar um projeto com o ID passado.
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  let isUpdated = false;

  projects.map(project => {
    if (project.id == id) {
      project.title = title;
      isUpdated = true;
    }
  })

  if (isUpdated) {
    return res.json(projects);
  } else {
    return res.status(404).json({ error: 'Não existe projeto com esse ID' });
  }
})

// DELETE -> Deletar um projeto com o ID passado.
server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  let index = foundIndexProjectForID(id);

  if (index == -1) {
    return res.status(404).json({ error: 'Não existe projeto com esse ID' });
  }

  projects.splice(index, 1);

  return res.json(projects);
})

// POST -> Cadastrar um nova tasks em um projeto existente.
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const index = foundIndexProjectForID(id);
  projects[index].tasks.push(title);

  return res.json(projects);
})

server.listen(3000);