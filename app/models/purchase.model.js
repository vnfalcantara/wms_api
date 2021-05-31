const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PurchaseSchema = new Schema({
  code: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  cashbackTax: { type: Number, min: 0, max: 100 },
  cashbackValue: { type: Number, min: 0, default: 0 },
  user: { type: mongoose.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'Em validação', enum: ['Em validação'] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
})

PurchaseSchema.pre('save', async function (next) {
  // this.password = await this.encryptPassword(this.password)
  next()
})

module.exports = mongoose.model('Purchase', PurchaseSchema)