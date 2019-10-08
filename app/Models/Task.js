'use strict'

const Model = use('Model')

class Task extends Model {
  static boot () {
    super.boot()

    // disparado depois da criação
    this.addHook('afterCreate', 'TaskHook.sendNewTaskMail')
    // disparado depois da criação
    this.addHook('beforeUpdate', 'TaskHook.sendNewTaskMail')
  }

  project () {
    return this.belongsTo('App/Models/Project')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

  file () {
    return this.belongsTo('App/Models/File')
  }
}

module.exports = Task
