'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  async index ({ request }) {
    const projects = await Project.query()
      .with('user')
      .fetch()
    return projects
  }

  async store ({ request, auth }) {
    const data = request.only(['title', 'description'])

    const project = await Project.create({ ...data, user_id: auth.user.id })

    return project
  }

  async show ({ params, response }) {
    try {
      const project = await Project.findOrFail(params.id)

      await project.load('user')
      await project.load('tasks')

      return project
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Projeto nao encontrado' } })
    }
  }

  async update ({ params, request, response }) {
    try {
      const project = await Project.findOrFail(params.id)
      const data = await request.only(['title', 'description'])

      project.merge(data)

      await project.save()

      return project
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Projeto nao encontrado' } })
    }
  }

  async destroy ({ params, response }) {
    try {
      const project = await Project.findOrFail(params.id)

      await project.delete()
    } catch (error) {
      return response
        .status(error.status)
        .send({ error: { message: 'Projeto nao encontrado' } })
    }
  }
}

module.exports = ProjectController
