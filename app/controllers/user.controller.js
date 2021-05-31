const AppController = require('./app.controller')
const UserService = require('../services/user.service')
const jwt = require('jwt-simple')
const userService = new UserService()

class UserController extends AppController {

  constructor() {
    super(userService)

    this.profile = this.profile.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  async profile(req, res) {
    const { user } = req

    if (!user) res.send(null)
    else res.json(user)
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const user = await userService.findOne({ email }).select('+password')
      let validPassword
      let token

      if (!user) {
        const error = new Error('Wrong credentials')
        error.statusCode = 401
        throw error
      }

      validPassword = await user.validatePassword(password)

      if (!validPassword) {
        const error = new Error('Wrong credentials')
        error.statusCode = 401
        throw error
      }

      token = jwt.encode({ id: user._id }, process.env.JWT_SECRET)
      delete user.password

      return res.json({ user, token })
    } catch (error) {
      return next(error)
    }
  }

  logout() {}

}

module.exports = UserController