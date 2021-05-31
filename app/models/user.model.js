const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
  cpf: { type: String, required: true, unique: true },
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
})

UserSchema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(5)
  const hash = await bcrypt.hash(password, salt)

  return hash
}

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password)
}

UserSchema.pre('save', async function (next) {
  this.password = await this.encryptPassword(this.password)
  next()
})

module.exports = mongoose.model('User', UserSchema)