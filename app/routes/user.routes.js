const UserController = require('../controllers/user.controller')
const user = new UserController()
const { userValidation, idValidation } = require('../validation')

module.exports = scope => {

  const { app, passportJWT } = scope
  const basePath = '/user'

  app.post(
    `${basePath}/login`,
    userValidation.login,
    user.login
  )

  app.get(
    `${basePath}/profile`,
    passportJWT.authenticate(),
    user.profile
  )

  app.post(
    basePath,
    passportJWT.authenticate(),
    userValidation.create,
    user.insert
  )

  app.get(
    basePath,
    passportJWT.authenticate(),
    user.find
  )

  app.get(
    `${basePath}/count`,
    passportJWT.authenticate(),
    user.count
  )

  app.get(
    `${basePath}/:id`,
    passportJWT.authenticate(),
    idValidation,
    user.findOne
  )

  app.put(
    `${basePath}/:id`,
    passportJWT.authenticate(),
    idValidation,
    user.update
  )

  app.delete(
    `${basePath}/:id`,
    passportJWT.authenticate(),
    idValidation,
    user.remove
  )

}
