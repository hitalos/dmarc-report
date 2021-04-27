(() => {
  fetch('report.json')
    .then((resp) => resp.json())
    .then((data) => data.map(({ Org, ReportDate, Msgs }) => ({
      Org,
      ReportDate: new Date(ReportDate).toLocaleDateString(),
      Msgs,
    })))
    .then((data) => {
      const orgs = data.reduce((accum, item) => {
        if (!accum.includes(item.Org)) accum.push(item.Org)
        return accum
      }, [])
      const dates = data.reduce((accum, item) => {
        if (!accum.includes(item.ReportDate)) accum.push(item.ReportDate)
        return accum
      }, [])
      const series = orgs.map((org) => ({
        name: org,
        data: dates.map((date) => {
          const list = data
            .filter((item) => item.Org === org)
            .filter((item) => item.ReportDate === date)
          if (list.length) return list[0].Msgs
          return 0
        })
      }))

      Highcharts.chart('chart', {
        chart: {
          type: 'bar',
          height: 600,
        },
        title: {
          text: 'Messages by Organization',
        },
        xAxis: {
          categories: dates,
        },
        yAxis: {
          allowDecimals: false,
          orgs,
          title: {
            text: 'Msgs',
          }
        },
        series,
      })
    })
})()
