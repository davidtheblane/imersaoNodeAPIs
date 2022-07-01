const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('@hapi/boom')
const Jwt = require('jsonwebtoken')
const PasswordHelper = require('../helpers/passwordHelper')

const failAction = (request, headers, error) => {
  throw error
}

const USER = {
  username: 'xuxa',
  password: '123'
}

class AuthRoutes extends BaseRoute {
  constructor(secret, db) {
    super()
    this.secret = secret
    this.db = db
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

      handler: async (request, headers) => {
        const { username, password } = request.payload
        const [usuario] = await this.db.read({
          username: username.toLowerCase()
        })
        if (!usuario) return Boom.unauthorized('Usuario não existe!')
        const match = await PasswordHelper.comparePassword(password, usuario.password)
        if (!match) return Boom.unauthorized('Usuário ou senha inválida!')
        // if (username.toLowerCase() !== USER.username || password !== USER.password) return Boom.unauthorized()


        return {
          token: Jwt.sign({
            username: username,
            id: usuario.id
          }, this.secret)
        }
      }
    }
  }
}

module.exports = AuthRoutes