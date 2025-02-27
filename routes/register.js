
const jwt = require('jsonwebtoken');
require('dotenv').config();
const eventModel = require('../models/eventDetails');
const { userModel } = require('../models/users');


const register = async (req, res) => {
    // const token = req.header("x-auth-token");
    // const event = req.header("event");
    try {
        const id = req.body.id;
        const event = req.body.event;
        const user = await userModel.findById(id);
        const eventDetails = await eventModel.findOne({ id: event });
        let i = 0;
        let isFound = false;
        eventDetails.usersList.forEach((u, index) => {
            if (u.user._id == id) {
                i = index;
                isFound = true;
            }

        })

        if (isFound) {
            res.status(400).send({ "error": "user already registered" })
        }

        else {

            const existingUser = {
                id: user._id,
                eventid: eventDetails._id,
            }

            const token = jwt.sign({ existingUser }, "passwordKey");
            user.event.push({ id: eventDetails.id, token: token });
            await user.save();
            eventDetails.usersList.push({ user, token });
            eventDetails.totalEntry++;
            await eventDetails.save();
            console.log(user);

            res.status(200).send({ userObj: user });
        }


    }
    catch (err) {
        console.log(err);
    }
}

const scanQr = async (req, res) => {

    const token = req.body.token;
    // const event = req.body.event;
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, "passwordKey");
    try {
        const event = await eventModel.findById(decoded.existingUser.eventid);

        let user = {
            id: decoded.existingUser.id,
        };
        let usertoken = "";
        let i = 0;

        event.usersList.forEach((u, index) => {
            if (u.user._id == decoded.existingUser.id) {
                user = u.user;
                usertoken = u.token;
                i = index;
            }

        })

        if (!event.usersList[i].isPresent) {
            // event.usersList[i].isPresent=true;
            // event.save();
            res.status(200).send({ "images": event.usersList[i].user.images });
        }
        else {
            res.status(400).send({ "error": "user already entered" });
        }


    }
    catch (err) {
        res.status(401).send(err.message);
        console.log(err);
    }
}

const facereg = async (req, res) => {

    const token = req.body.token;
    // const event = req.body.event;
    // const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const decoded = jwt.verify(token, "passwordKey");
    try {
        const event = await eventModel.findById(decoded.existingUser.eventid);


        let usertoken = "";
        let i = 0;

        event.usersList.forEach((u, index) => {
            if (u.user._id == decoded.existingUser.id) {
                usertoken = u.token;
                i = index;
            }

        })

        let user = await userModel.findById(decoded.existingUser.id);

        if (!event.usersList[i].isPresent) {
            event.usersList[i].isPresent = true;
            event.save();
            user.event.forEach((u, index) => {
                if (u.id == event.id) {
                    const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));

                    // Generate a random number between 0 and 99
                    const randomNumber = Math.floor(Math.random() * 100);

                    // Format the token
                    u.token = `${randomLetter}${randomNumber}`;
                    // user.save();
                }
            })
            res.status(200).send({ "success": "user verified successfully" });
            user.save();
        }

        else {
            res.status(400).send({ "error": "user already entered" });
        }


    }
    catch (err) {
        res.status(401).send(err.message);
        console.log(err);
    }
}


module.exports = { register, scanQr, facereg };