const { connection } = require("mongoose");
const ICrud = require("./../interfaces/interfaceCrud")

class ContextStrategy extends ICrud {
  constructor(strategy) {
    super()
    this._database = strategy
  }

  isConnected() {
    return this._database.isConnected();
  }

  static connect() {
    return this._database.connect()
  }

  create(item) {
    return this._database.create(item)
  }

  read(item, skip, limit) {
    return this._database.read(item, skip, limit)
  }

  update(id, item, upsert) {
    return this._database.update(id, item, upsert)
  }

  delete(id) {
    return this._database.delete(id)
  }

  close() {
    connection.close()
  }
}

module.exports = ContextStrategy