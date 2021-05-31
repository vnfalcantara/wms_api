class AppService {

  constructor(Model) {
    this.Model = Model
  }

  insert(data) {
    const model = new this.Model(data)
    return model.save()
  }

  find(params = {}, fields = {}, sort, skip, limit) {
    return this.Model.find(params, fields)
      .sort(sort)
      .skip(skip)
      .limit(limit)
  }

  findOne(query = {}, fields) {
    return this.Model.findOne(query, fields)
  }

  findById(_id, fields) {
    return this.Model.findOne({ _id }, fields)
  }

  count(query = {}) {
    return this.Model.countDocuments(query)
  }

  updateOne(_id, data) {
    return this.Model.updateOne({ _id }, data)
  }

  removeOne(_id) {
    return this.Model.deleteOne({ _id })
  }

}

module.exports = AppService