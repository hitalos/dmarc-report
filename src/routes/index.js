const router = require('express').Router()

const { data } = require('../controllers')

const root = `${__dirname}/../../node_modules/`

router.get('/css/bulma.min.css', (req, res) => {
  res.sendFile('bulma/css/bulma.css', { root })
})

router.get('/js/d3.js', (req, res) => {
  res.sendFile('d3/build/d3.min.js', { root })
})

router.get('/report.json', data.json)

router.get('/report.csv', data.csv)

module.exports = router
