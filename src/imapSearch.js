const Imap = require('imap')
const { simpleParser } = require('mailparser')

const processAttach = require('./processAttach')
const processResult = require('./processResult')

const imapOptions = {
  host: process.env.IMAP_HOST || '',
  user: process.env.IMAP_USER || '',
  password: process.env.IMAP_PASS || '',
  tls: true,
  port: 993,
}

if (!imapOptions.user || !imapOptions.password) {
  console.error('Missing imap user and/or password!')
  process.exit(1)
}

module.exports = () => new Promise((resolv, reject) => {
  const result = []
  const imap = new Imap(imapOptions)
  imap.connect()
  imap.on('error', reject)
  imap.once('ready', () => {
    imap.openBox('INBOX', true, (err, box) => {
      if (err) throw err
      const filter = imap.seq.fetch(`1:${box.messages.total}`, {
        bodies: '',
      })
      console.log(`Found ${box.messages.total} messages`)
      filter.on('message', (msg) => {
        const buf = []
        msg.on('body', (stream) => {
          stream.on('data', (chunk) => {
            buf.push(chunk.toString('utf8'))
          })
        })
        msg.once('end', () => {
          simpleParser(buf.join(''))
            .then(processAttach)
            .then((data) => {
              result.push(data)
              if (result.length === box.messages.total) {
                resolv(processResult(result))
              }
            }).catch(reject)
        })
      })
      filter.once('end', () => {
        imap.end()
      })
    })
  })
})

