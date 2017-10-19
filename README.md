# Consolide your "DMARC" reports!

## The Problem

The DMARC reports are received on email attachments in XML format (compressed).
I don't know a default viewer and we receive one file by day by external domain.
I needed join the data and build a visual report.

## The Solution

I decided build a script that:
* Access the dmarc mail account
* Reads the messages
* Extracts the attachments and
* consolidates the data to showing some graphs in a web server.

## Instructions

### Install Dependencies

    npm i --only=production

### Configuration

Copy or rename `.env-example` to `.env` and set the values to your environment.

### Run

    npm start
