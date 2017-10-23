const request = new XMLHttpRequest()
request.open('GET', '/report.json', true)

function onLoad() {
  if (this.status >= 200 && this.status < 400) {
    const data = JSON.parse(this.response)
    const orgs = data.reduce((accum, item) => {
      if (!accum.includes(item.Org)) accum.push(item.Org)
      return accum
    }, [])
    const dates = data.reduce((accum, item) => {
      if (!accum.includes(item.Data)) accum.push(new Date(item.Data).toLocaleDateString())
      return accum
    }, [])
    const series = orgs.map(item => ({
      name: item,
      data: data.reduce((accum, item2) => {
        if (item2.Org === item) accum.push(item.Msgs)
        return accum
      }, [])
    }))

    Highcharts.chart('chart', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Messages by Organization'
      },
      xAxis: {
        dates
      },
      yAxis: {
        title: {
          text: 'Msgs'
        }
      },
      series
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
