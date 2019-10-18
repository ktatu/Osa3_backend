const mongoose = require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
  `mongodb+srv://testikayttaja:${password}@cluster0-ivc41.mongodb.net/puhelinluettelo-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})

const shutdown = () => process.exit(1)

if (process.argv.length === 3) {
    console.log("phonebook:")
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person.name, person.number);
        })
        mongoose.connection.close()
        shutdown()
    })
}
else if (process.argv.length !== 5) {
  console.log(`incorrect amount of command-line arguments given`)
  shutdown()
}
else {
    person.save().then(response => {
        console.log(`added ${name}, number ${number} to phonebook`);
        mongoose.connection.close();
        shutdown()
      })
}
