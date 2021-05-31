const passport = require('passport')
const passportJWT = require('passport-jwt')
const UserService = require('../services/user.service')
const userService = new UserService()

const { ExtractJwt, Strategy } = passportJWT

const params = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

module.exports = () => {
  const strategy = new Strategy(params, async (payload, done) => {
    const { id } = payload
    const user = await userService.findById(id)

    if (!user) return done(new Error('User not found'), null)

    return done(null, user)
  })

  passport.use(strategy)

  return {
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', { session: false })
  }
}