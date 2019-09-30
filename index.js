const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan('tiny'))
app.use(cors())

let persons = [
    { 
        name: "Arto Hellas",
        number: "040-123566",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-53232323",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-2252525",
        id: 3
    },
    {
        name: "Mary Poppoo",
        number: "46-24-4674644",
        id: 4
    }
]

app.get('/', (req, res) => {
    res.send('<p>testi</p>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    res.send(`<div>
                <p>Phonebook has ${persons.length} people</p>
                <p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'content missing'
        })
    }
    else if (persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    console.log("body:",body);

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(person)

    res.json(person)
})

const generateId = () => Math.floor(Math.random() * (1000000 - 1)) + 1

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
})