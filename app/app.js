const fs = require('fs')
const express = require('express')

const cors = require('cors')
const bodyParser = require('body-parser')
const errorHandler = require('./middlewares/errorHandler')

const { color } = require('./constants')
const swaggerUi = require('swagger-ui-express');
// const YAML = require('yamljs');
// const swaggerDocument = YAML.load('./swagger.yml');
const { LOG_START } = process.env

class App {

  constructor() {
    this.express = express()
    this.passportJWT = null
  }

  requireDirectory(path, execute) {
    const files = fs.readdirSync(`${__dirname}/${path}`)

    if (LOG_START) console.log(color.BLUE, `\nLoading ${path}`)

    files.forEach(file => {
      const fileSplit = file.split('.')
      const extension = fileSplit[fileSplit.length - 1]

      if (extension === 'js') {
        if (LOG_START) console.log(color.GREEN, file)

        if (execute) require(`${__dirname}/${path}/${file}`)({ app: this.express, passportJWT: this.passportJWT })
        else require(`${__dirname}/${path}/${file}`)
      }
    })
  }

  loadMiddlewares() {
    this.passportJWT = require('./middlewares/passportJWT')()

    this.express.use(cors())
    // this.express.use(errorHandler)
    this.express.use(bodyParser.json())
    this.express.use(this.passportJWT.initialize())
  }

  loadModels() {
    this.requireDirectory('models')
  }

  loadControllers() {
    this.requireDirectory('controllers')
  }

  loadRoutes() {
    this.requireDirectory('routes', true)
  }

  loadBootstraps() {
    this.requireDirectory('bootstraps')
  }

  start() {
    this.loadModels()
    this.loadMiddlewares()
    this.loadRoutes()
    this.loadControllers()
    this.loadBootstraps()

    this.express.use(errorHandler)
    // this.express.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

}

module.exports = new App()