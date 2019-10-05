'use strict'

const Model = use('Model')

class Task extends Model {
  project () {
    return this.belongsTo('App/models/Project')
  }

  user () {
    return this.belongsTo('App/models/User')
  }

  file () {
    return this.belongsTo('App/models/File')
  }
}

module.exports = Task
