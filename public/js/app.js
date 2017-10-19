const request = new XMLHttpRequest()
request.open('GET', '/report.json', true)

function onLoad() {
  if (this.status >= 200 && this.status < 400) {
    const data = JSON.parse(this.response)
    console.log(data)
  } else {
    console.error(this.response)
  }
}

request.onload = onLoad
request.onerror = () => {
  console.error('Error loading data')
}

request.send()
