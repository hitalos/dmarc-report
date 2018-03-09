const router = require('express').Router()

const { data } = require('../controllers')

const bulmaCSS = require.resolve('bulma/css/bulma.css');
const highchartsJS = require.resolve('highcharts/highcharts.js');

router.get('/css/bulma.min.css', (req, res) => {
  res.sendFile(bulmaCSS)
})

router.get('/js/highcharts.js', (req, res) => {
  res.sendFile(highchartsJS)
})

router.get('/report.json', data.json)

router.get('/report.csv', data.csv)

module.exports = router
