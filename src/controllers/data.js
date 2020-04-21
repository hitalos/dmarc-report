const json2csv = require('json2csv')

const imapSearch = require('../imapSearch')

module.exports = {
  json: (req, res) => {
    imapSearch().then((data) => {
      res.send(data)
    }).catch((err) => {
      res.status(500).send(err.message)
    })
  },
  csv: (req, res) => {
    imapSearch().then((data) => {
      const csv = data.map((item) => ({
        ...item,
        Data: item.Data.toLocaleDateString(),
      }))
      res.set({
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="report.csv"'
      })
      const result = json2csv({ data: csv })
      res.send(result)
    }).catch((err) => {
      console.error(err)
    })
  },
}
