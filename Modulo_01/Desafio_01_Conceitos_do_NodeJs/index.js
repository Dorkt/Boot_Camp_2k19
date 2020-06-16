const express = require('express');

const server = express();

server.use(express.json());

const projects = [];

function checkIdExists(req, res, next){

    const { id } = req.params;
    const project = projects.find(lookId => lookId.id == id);


    if(!project){
        return res.status(400).json({ error: 'Id does not exists'});
    }
    return next();
}

function countRequests(req, res, next){
    console.count("Número de requisições: ");

    return next();
}


server.get('/projects', countRequests, (req, res) => {
    return res.json(projects);
})

server.post('/projects', countRequests, (req, res) => {

    const { id, title } = req.body;

    const project = {
        id,
        title,
        tasks: []
    };
    
    projects.push(project);

    return res.json(project);
})

server.delete('/projects/:id', checkIdExists, countRequests, (req, res) => {
    const { id } = req.params;

    const projectIndex = projects.findIndex(lookId => lookId.id == id);

    projects.splice(projectIndex, 1);

    return res.send();
})

server.put('/projects/:id', checkIdExists, countRequests, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const newProject = projects.find(lookId => lookId.id == id);

    newProject.title = title;

    return res.json(newProject);
})

server.post('/projects/:id/tasks', checkIdExists, countRequests, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const newProject = projects.find(lookId => lookId.id == id);

    newProject.tasks.push(title);

    return res.json(newProject);
})

server.listen(3000);