const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('@hapi/boom')
const Jwt = require('jsonwebtoken')

const failAction = (request, headers, error) => {
  throw error
}

const USER = {
  username: 'xuxa',
  password: '123'
}

class AuthRoutes extends BaseRoute {
  constructor(secret) {
    super()
    this.secret = secret
  }

  login() {
    return {
      path: '/login',
      method: 'POST',
      config: {
        auth: false,
        tags: ['api'],
        description: 'Obter Token',
        notes: 'Faz login com user e senha no banco',
        validate: {
          failAction,
          payload: Joi.object({
            username: Joi.string().required(),
            password: Joi.string().required(),
          })
        }
      },

      handler: (request) => {
        const { username, password } = request.payload

        if (username.toLowerCase() !== USER.username || password !== USER.password) return Boom.unauthorized()

        const token = Jwt.sign({
          username: username,
          id: 1
        }, this.secret)

        return {
          token
        }
      }
    }
  }
}

module.exports = AuthRoutes