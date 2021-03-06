const path = require('path')
const express = require('express')
const serveStatic = require('serve-static')

const app = express()

// here we are configuring dist to serve app files
app.use('/', serveStatic(path.join(__dirname, '/dist')))

// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'))
})

const port = process.env.PORT || 4000
app.listen(port, '0.0.0.0')
console.log(`app is listening on port: ${port}`)
