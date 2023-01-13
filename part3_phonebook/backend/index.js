const express = require('express');
// const morgan = require('morgan');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(express.static('build'))
// morgan.token('body', function (req, res) {
//     return JSON.stringify(req.body);
// })
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
app.use(cors());

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
    const date = new Date();
    response.send(`<p>phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons', (request, response) => {
    response.json(persons);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);

    response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const body = request.body;
    const existingPerson = persons.find(person => person.name === body.name);
    if (existingPerson) {
        return response.status(409).json({
            error: 'Conflict! Name must be unique'
        })
    }
    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    }

    const max = 100;
    const min = 5;
    const id = Math.floor(Math.random() * (max - min) * min);


    const person = {
        id: id,
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person);
    response.json(person);
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})