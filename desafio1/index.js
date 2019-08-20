const express = require("express");

const server = express();

server.use(express.json());

const projects = [];
let count = 0;

function checkProjectExists(req, res, next) {
  const { id } = req.params;

  const project = projects.findIndex(p => p.id === id);

  if (project < 0) {
    return res.status(400).json({ error: "Id is required" });
  }

  return next();
}

function countRequests(req, res, next) {
  count++;
  console.log(`foram feitas ${count} requests`);

  return next();
}

server.get("/projects", countRequests, (req, res) => {
  return res.json(projects);
});

server.post("/projects", countRequests, (req, res) => {
  const { id, title } = req.body;

  projects.push({ id, title, tasks: [] });

  return res.json(projects);
});

server.post(
  "/projects/:id/tasks",
  checkProjectExists,
  countRequests,
  (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id === id);

    project.tasks.push(title);

    return res.json(projects);
  }
);

server.put("/projects/:id", checkProjectExists, countRequests, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = projects.find(p => p.id === id);

  project.title = title;

  return res.json(projects);
});

server.delete(
  "/projects/:id",
  checkProjectExists,
  countRequests,
  (req, res) => {
    const { id } = req.params;

    const project = projects.findIndex(p => p.id === id);

    projects.splice(project, 1);

    return res.json(projects);
  }
);

server.listen(3000);
