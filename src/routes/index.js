const router = require('express').Router()

const { data } = require('../controllers')

router.get('/report.json', data.json)

router.get('/report.csv', data.csv)

module.exports = router
