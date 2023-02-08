const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        required: [true, 'User phone number required'],
        validate: {
            validator: (number) => {
                return /\d{2}-\d+/.test(number) || /\d{3}-\d+/.test(number)
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    }
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)