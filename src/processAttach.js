const { Writable, PassThrough } = require('stream')
const unzip = require('unzip')
const { parseString } = require('xml2js')
const zlib = require('zlib')

const types = [
  'application/zip',
  'application/x-zip-compressed',
  'application/gzip',
  'application/x-gzip',
]

module.exports = mail => new Promise((resolv, reject) => {
  mail.attachments.forEach((attach) => {
    if (types.includes(attach.contentType) && attach.content) {
      const pt = new PassThrough()
      const xmlArray = []
      const file = new Writable({
        write(chunk, encoding, callback) {
          xmlArray.push(chunk)
          callback()
        },
      })
      switch (attach.contentType) {
        case types[0]:
        case types[1]:
          pt.end(attach.content)
          pt.pipe(unzip.Parse()).on('entry', (entry) => {
            entry.pipe(file)
          })
          break
        case types[2]:
        case types[3]:
          file.end(zlib.unzipSync(attach.content))
          break
        default:
          console.log(`Unknow attachment content-type: ${attach.contentType}`)
      }
      file.on('finish', () => {
        parseString(xmlArray.join(''), (error, xml) => {
          resolv({
            org: xml.feedback.report_metadata.map(item => item.org_name.join(' ')).join(' '),
            report: xml.feedback.record,
            date: xml.feedback.report_metadata[0].date_range[0].begin[0] * 1000,
          })
        })
      })
    }
  })
})
