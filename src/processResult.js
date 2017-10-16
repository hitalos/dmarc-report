module.exports = result =>
  result
    .reduce((accum, item) => {
      const date = new Date(item.date)
      const count = item.report.reduce((sum, report) =>
        sum + report.row.reduce((counts, row) =>
          counts + parseInt(row.count[0], 10), 0), 0)
      accum.push({ Org: item.org, Data: date, Msgs: count })
      return accum
    }, [])
    .sort((a, b) => {
      if (a.Data < b.Data) return -1
      if (a.Data > b.Data) return 1
      return 0
    })
