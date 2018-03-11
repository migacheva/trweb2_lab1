const config = require('./serverConfig.json');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
let idCounter = 1;
let tasks = [];

app.use(cors(config.cors));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/todos', (req, res) => {
    console.log('GET request');
    res.send(tasks);
});

app.post('/todos/add', (req, res) => {
    const body = req.body;
    console.log('POST request: ', body);
    if (body && body.text) {
        for (let i = 0; i < tasks.length; i++) {
            if (tasks[i].text.trim() === body.text) {
                sendError(res, 'У вас уже есть такая задача!');
                return;
            }
        }
        tasks = addTodo(body.text);
        res.send(tasks);
    } else {
        sendError(res, 'Ошибка запроса');
    }
});

app.post('/todos/delete', (req, res) => {
    const body = req.body;
    console.log('POST request: ', body);
    if (body && body.id) {
        allTasks = tasks;
        tasks = [];
        idCounter = 1;

        allTasks.forEach(todo => {
            if (todo.id !== body.id) {
                tasks = addTodo(todo.text);
            }
        });
        console.log("result: " + tasks);
        res.send(tasks);
    } else {
        sendError(res, 'Задача не найдена');
    }
});

app.listen(config.port, err => {
    if (err) {
        throw err;
    }
    console.log(`Server started on port ${config.port}`);
});

function sendError(response, error) {
    response.send({error});
}

function addTodo(text) {
    return [
        ...tasks,
        {
            id: idCounter++,
            text
        }
    ]
}
