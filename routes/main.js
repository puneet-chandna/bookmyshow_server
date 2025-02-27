const express = require('express')
const router = express.Router()

const { login, dashboard } = require('./auth')

const authMiddleware = require('../middleware/auth')
const { register, scanQr ,facereg} = require('./register')
const { events ,findEvent} = require('./event')

router.route('/signin').post(authMiddleware, dashboard)
router.route('/signup').post(login)
router.route('/register').post(register)
router.route('/events').get(events)
router.route('/findEvent').post(findEvent)
router.route('/scanqr').post(scanQr)
router.route('/facescan').post(facereg)

module.exports = router
