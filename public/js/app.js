const request = new XMLHttpRequest()
request.open('GET', '/report.json', true)

function onLoad() {
  if (this.status >= 200 && this.status < 400) {
    const data = JSON.parse(this.response)
    d3.select('#app')
      .selectAll('div')
      .data(data)
      .enter()
      .append('div')
      .style('width', d => `${d.Msgs}px`)
      .text((d) => {
        const date = new Date(d.Data)
        return `${d.Org} ${date.toLocaleDateString()}`
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
