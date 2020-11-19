# Consolide your "DMARC" reports!

[![NPM](https://nodei.co/npm/dmarc-report.png)](https://nodei.co/npm/dmarc-report/)

## The Problem

The DMARC reports are received on email attachments in XML format (compressed).
I don't know a default viewer and we receive one file by day by external domain.
I needed join the data and build a visual report.

## The Solution

I decided build a script that:
* Access the dmarc mail account
* Reads the messages
* Extracts the attachments and
* consolidate the data to show some graphs in a webserver.

## Instructions

### Install the project

    git clone https://github.com/hitalos/dmarc-report
    npm i --only=production

### Install for express as a middleware

    npm i dmarc-report

### Configuration

Copy or rename `.env-example` to `.env` and set the values to your environment.

**Use a exclusive account to this or choose a folder in your account, move the reports to it and set it to IMAP_FOLDER.**

### Running as standalone app

    npm start

### Using as a middleware

Example:
```js
const express = require('express')
const dmarc = require('dmarc-report')

const app = express()
app.use('/dmarc', dmarc)
app.listen(3000)
```

> `SERVER_PORT` has no effect when running as a middleware

Certify yourself that expose environment variables or use `dotenv` module to load it.

`.env` example:
```properties
IMAP_HOST=yourdomain.com
IMAP_USER=dmarc
IMAP_PASS=password
IMAP_FOLDER=INBOX
IMAP_READ_ONLY=1
SERVER_PORT=3000
```
