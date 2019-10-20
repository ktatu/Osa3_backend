const express = require("express")
const app = express()
require("dotenv").config()
const bodyParser = require("body-parser")

const Person = require("./models/person")

const morgan = require("morgan")

app.use(bodyParser.json())
const cors = require("cors")

app.use(morgan("tiny"))
app.use(cors())

const logger = (req, res, next) => {
	console.log("Method:", req.method)
	console.log("Path:  ", req.path)
	console.log("Body:  ", req.body)
	console.log("---")
	next()
}
app.use(logger)

app.use(express.static("build"))

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

app.get("/", (req, res) => {
	res.send("<p>testi</p>")
})

app.get("/api/persons", (req, res) => {
	Person.find({}).then(people => {
		res.json(people)
	})
})

app.get("/info", (req, res) => {
	Person.count({}).then(response => {

		if (Number(response) === 1) {
			res.send(`<div>
                        <p>Phonebook has ${response} person</p>
                        <p>${new Date()}</p>
                    </div>`)
		}
		else {
			res.send(`<div>
                        <p>Phonebook has ${response} people</p>
                        <p>${new Date()}</p>
                    </div>`)
		}
	})
})

app.get("/api/persons/:id", (req, res, next) => {
	Person.findById(req.params.id)
		.then(person => {
			console.log(person)
			if (person) {
				res.json(person.toJSON())
			} else {
				res.status(404).end()
			}
		})
		.catch(error => next(error))
})

app.delete("/api/persons/:id", (req, res, next) => {
	Person.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => next(error))
})

app.post("/api/persons", (req, res, next) => {
	const body = req.body

	if (!body.name || !body.number) {
		return res.status(400).json({
			error: "content missing"
		})
	}
	else if (persons.find(person => person.name === body.name)) {
		return res.status(400).json({
			error: "name must be unique"
		})
	}

	console.log("body:",body)

	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save()
		.then(savedPerson => {
			res.json(savedPerson.toJSON())
		})
		.catch(error => {
			next(error)
		})
})

app.put("/api/persons/:id", (req, res, next) => {
	const body = req.body
	Person.findByIdAndUpdate(req.params.id, {number: body.number}, {new: true})
		.then(updatedPerson => {
			console.log(updatedPerson)
			res.json(updatedPerson.toJSON())
		})
		.catch(error => next(error))
})

//const generateId = () => Math.floor(Math.random() * (1000000 - 1)) + 1

const unknownEndpoint = (res) => {
	res.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
	console.error(error.message)
  
	if (error.name === "CastError" && error.kind == "ObjectId") {
		return res.status(400).send({error: "malformatted id"})
	} 
	else if (error.name === "ValidationError") {
		return res.status(400).json({error: error.message})
	}
	next(error)
}
app.use(errorHandler)



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Running on port ${PORT}`)
})