module.exports = (result) => result
  .reduce((accum, item) => {
    const date = new Date(item.date)
    const count = item.report.reduce(
      (sum, report) => sum + report.row.reduce(
        (counts, row) => counts + parseInt(row.count[0], 10),
        0,
      ),
      0,
    )
    accum.push({ Org: item.org, ReportDate: date, Msgs: count })
    return accum
  }, [])
  .sort((a, b) => {
    if (a.ReportDate < b.ReportDate) return -1
    if (a.ReportDate > b.ReportDate) return 1
    return 0
  })
