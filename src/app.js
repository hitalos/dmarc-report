const json2csv = require('json2csv')
const express = require('express')

const imapSearch = require('./imapSearch')

const app = express()

app.get('/', (req, res) => {
  imapSearch().then((data) => {
    const csv = data.reduce((accum, item) => {
      const date = new Date(item.date)
      const count = item.report.reduce((sum, report) =>
        sum + report.row.reduce((counts, row) =>
          counts + parseInt(row.count[0], 10), 0), 0)
      accum.push({ Org: item.org, Data: date.toLocaleDateString(), Msgs: count })
      return accum
    }, [])
    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="report.csv"'
    })
    const result = json2csv({ data: csv })
    res.send(result)
  }).catch((err) => {
    console.error(err)
  })
})

  module.exports = app
