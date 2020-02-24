const express = require('express')
const webpack = require('webpack')
const jsonServer = require('json-server')
const webpackConfig = require('./webpack.config')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')

const app = express()
const compiler = webpack(webpackConfig)

app.use(devMiddleware(compiler))

app.use(hotMiddleware(compiler))

app.use('/api', jsonServer.router(__dirname + '/db.json'))

const listener = app.listen(process.env.PORT, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
