require('dotenv').config()
const express = require('express')
// const morgan = require('morgan')
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(express.static('build'))
// morgan.token('body', function (req, res) {
//     return JSON.stringify(req.body)
// })
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use(cors())
const Person = require('./models/person')

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.messsage })
    }

    next(error)
}

app.use(errorHandler)

app.get('/info', (request, response) => {
    const date = new Date()
    Person.find({}).then(persons => {
        response.send(`<p>phonebook has info for ${persons.length} people</p><p>${date}</p>`)
    })
})

// mongo ver
app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

// app.get('/api/persons', (request, response) => {
//     response.json(persons)
// })

// app.get('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     const person = persons.find(person => person.id === id)

//     if (person) {
//         response.json(person)
//     } else {
//         response.status(404).end()
//     }
// })

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
        .then(person => {
            response.json(person)
        })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

// app.delete('/api/persons/:id', (request, response) => {
//     const id = Number(request.params.id)
//     persons = persons.filter(person => person.id !== id)

//     response.status(204).end()
// })

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({ error: 'name missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save()
        .then(savedPerson => {
            response.json(savedPerson)
        })
        .catch(error => next(error))
})

// app.post('/api/persons', (request, response) => {
//     const body = request.body
//     const existingPerson = persons.find(person => person.name === body.name)
//     if (existingPerson) {
//         return response.status(409).json({
//             error: 'Conflict! Name must be unique'
//         })
//     }
//     if (!body.name) {
//         return response.status(400).json({
//             error: 'name missing'
//         })
//     }
//     if (!body.number) {
//         return response.status(400).json({
//             error: 'number missing'
//         })
//     }

//     const max = 100
//     const min = 5
//     const id = Math.floor(Math.random() * (max - min) * min)


//     const person = {
//         id: id,
//         name: body.name,
//         number: body.number
//     }

//     persons = persons.concat(person)
//     response.json(person)
// })

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(request.params.id, person, { number: body.number })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})