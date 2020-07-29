const router = require('express').Router()

const { data } = require('../controllers')

const highchartsJS = require.resolve('highcharts/highcharts.js')

router.get('/js/highcharts.js', (req, res) => {
  res.sendFile(highchartsJS)
})

router.get('/report.json', data.json)

router.get('/report.csv', data.csv)

module.exports = router
