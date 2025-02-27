const mongoose = require('mongoose')
const { userSchema } = require('./users')

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter event name"]
    },
    id: {
        type: String,
        required: [true, "Enter event id"]
    },
    usersList: [
        {
            user: userSchema,
            isPresent : {
                type: Boolean,
                default: false
            },
            token: {
                type: String,
                default: ""
            }
        }

    ],
    totalEntry :{
        type: Number
    }
})

module.exports = mongoose.model('eventModel', eventSchema)
