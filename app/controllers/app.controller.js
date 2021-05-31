class AppController {

  constructor(service) {
    this.service = service

    this.insert = this.insert.bind(this)
    this.count = this.count.bind(this)
    this.find = this.find.bind(this)
    this.findOne = this.findOne.bind(this)
    this.update = this.update.bind(this)
    this.remove = this.remove.bind(this)
  }

  async insert(req, res, next) {
    const { body } = req

    try {
      const data = await this.service.insert(body)
      res.json(data)
    } catch (error) {
      next(error)
    }
  }

  async count(req, res, next) {
    let { params } = req.query

    try {
      const data = await this.service.count(params)
      res.json(data)
    } catch (error) {
      next(error)
    }
  }

  async find(req, res, next) {
    let { params, fields, sort, skip, limit } = req.query

    try {
      const data = await this.service.find(params, fields, sort, Number(skip), Number(limit))
      res.json(data)
    } catch (error) {
      next(error)
    }
  }

  async findOne(req, res, next) {
    const _id = req.params.id
    const { fields } = req.query

    try {
      const data = await this.service.findOne({ _id }, fields)
      res.json(data)
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    const _id = req.params.id
    const { body } = req

    try {
      const updateStatus = await this.service.updateOne({ _id }, body)
      res.json(updateStatus)
    } catch (error) {
      next(error)
    }
  }

  async remove(req, res, next) {
    const _id = req.params.id

    try {
      const deleteStatus = await this.service.removeOne({ _id })
      res.json(deleteStatus)
    } catch (error) {
      next(error)
    }
  }

}

module.exports = AppController