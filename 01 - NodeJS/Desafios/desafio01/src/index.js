const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
let countRequest = 0;

/**
 *  Middlewares global -> Conta o total de requisições feitas.
 */
server.use((req, res, next) => {
  countRequest += 1;
  console.log(countRequest);
  next();
})

// Middlewares específico -> Verificam se existe projeto com o ID,
// para os métodos que utilizam o ID

/**
 *  Middlewares específico -> Verificam se existe projeto com o ID, para
 *  os métodos que utilizam o ID.
 */
function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(project => project.id == id);

  if (!project) {
    return res.status(404).json({ error: 'Não existe projeto com esse ID' });
  }

  next();
}

/**
 * Request body: id, title
 * Cadastrar um novo projeto.
 */
server.post('/projects', (req, res) => {
  const { id, title } = req.body;

  projects.push({
    id,
    title,
    tasks: [],
  });

  return res.json(projects);
});

/**
 * Listar todos os projetos.
 */
server.get('/projects', (req, res) => {
  return res.json(projects);
})

/**
 * Request body: title
 * Request params: id
 * Atualizar um projeto.
 */
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(project => project.id == id);

  project.title = title;

  return res.json(project);
})

/**
 * Request params: id
 * Deletar um projeto com o ID passado.
 */
server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex(project => project.id == id);

  projects.splice(projectIndex, 1);

  return res.send();
})

/**
 * Request body: title
 * Request params: id
 * Cadastrar uma nova tasks em um projeto existente.
 */
server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(project => project.id == id);

  project.tasks.push(title);

  return res.json(projects);
})

server.listen(3000);