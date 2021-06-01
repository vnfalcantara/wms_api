const AppController = require('./app.controller')
const UserService = require('../services/user.service')
const userService = new UserService()

class UserController extends AppController {

  constructor() {
    super(userService)
  }

}

module.exports = UserController