const request = new XMLHttpRequest()
request.open('GET', 'report.json', true)

function onLoad() {
  if (this.status >= 200 && this.status < 400) {
    const data = JSON.parse(this.response).map(({ Org, Data, Msgs }) => ({
      Org,
      Data: new Date(Data).toLocaleDateString(),
      Msgs,
    }))
    const orgs = data.reduce((accum, item) => {
      if (!accum.includes(item.Org)) accum.push(item.Org)
      return accum
    }, [])
    const dates = data.reduce((accum, item) => {
      if (!accum.includes(item.Data)) accum.push(item.Data)
      return accum
    }, [])
    const series = orgs.map((org) => ({
      name: org,
      data: dates.map((date) => {
        const list = data
          .filter((item) => item.Org === org)
          .filter((item) => item.Data === date)
        if (list.length) return list[0].Msgs
        return 0
      })
    }))

    Highcharts.chart('chart', {
      chart: {
        type: 'bar',
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
  } else {
    console.error(this.response)
  }
}

request.onload = onLoad
request.onerror = () => {
  console.error('Error loading data')
}

request.send()
