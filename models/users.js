const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'user name must be entered']
    },
    email: {
        type: String,
        required: [true, 'user mail id must be provided'],
    },
    number: {
        type: Number,
        required: [true, 'contact no is required '],
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    event: 
    [
      { 

        id: {
            type : String,
            required: [true, 'event id is required']
        },
        token :
        {
            type: String,
            required: [true, 'token is required']
        }
    }
    ],

    images: [
        {
            type: String,

        }
    ]
})

const userModel=mongoose.model('userModel', userSchema);
module.exports = {userModel,userSchema};
