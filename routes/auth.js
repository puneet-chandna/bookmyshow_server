const jwt = require('jsonwebtoken');
const { userModel }  = require('../models/users');
require('dotenv').config();

const login = async (req, res) => {
    try{

        const { username, email, number, password,images } = req.body;
        const user = new userModel({
            username: username,
            email: email,
            number: number,
            password: password,
            images :images         
        });
        console.log(user);
        if (!username || !email || !number || !password) {
            res.status(400).send({ msg: 'Please fill in all details' });
        }
        
        const savedObj = await user.save();
        res.status(200).json({ msg: 'User signed up ', user: savedObj });
    }
    catch (err) {
        res.status(400).json({ msg: err.message });
    }

};

const dashboard = async (req, res, next) => {
    try {

        console.log(req.user);
        const obj = req.user;
        const myObj = {
            _id: obj._id.toString(),
            username: obj.username,
            email: obj.email,
            number: obj.number,
            password: obj.password,
        };
        const token = jwt.sign(myObj, process.env.JWT_SECRET, { expiresIn: '10d' });
        const finalObj = { token: token, userObj: obj }
        // console.log(finalObj);

        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        res.status(200).send(finalObj);

    }

    catch (err) {
        res.status(400).json({ msg: err.message });
        console.log(err);
    }
}

module.exports = {
    login,
    dashboard
};
