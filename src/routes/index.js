const router = require('express').Router()

const { data } = require('../controllers')

const root = `${__dirname}/../../node_modules/`

router.get('/css/bulma.min.css', (req, res) => {
  res.sendFile('bulma/css/bulma.css', { root })
})

router.get('/report.json', data.json)

router.get('/report.csv', data.csv)

module.exports = router
