'use strict'

const Task = use('App/Models/Task')

class TaskController {
  async index ({ params }) {
    console.log(params.projects_id)
    // busca as tasks do projeto
    const tasks = await Task.query()
      .where('project_id', params.projects_id)
      .with('user')
      .fetch()

    return tasks
  }

  async store ({ request, params }) {
    const data = request.only([
      'user_id',
      'title',
      'description',
      'due_date',
      'file_id'
    ])

    const task = await Task.create({ ...data, project_id: params.projects_id })

    return task
  }

  async show ({ params, response }) {
    try {
      const task = await Task.findOrFail(params.id)
      return task
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'task nao encontrada' } })
    }
  }

  async update ({ params, request, response }) {
    try {
      const task = await Task.findOrFail(params.id)
      const data = request.only([
        'user_id',
        'title',
        'description',
        'due_date',
        'file_id'
      ])

      task.merge(data)
      task.save()

      return task
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'task nao encontrada' } })
    }
  }

  async destroy ({ params, response }) {
    try {
      const task = await Task.findOrFail(params.id)

      await task.delete()
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'task nao encontrada' } })
    }
  }
}

module.exports = TaskController
