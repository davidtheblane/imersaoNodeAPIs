// npm install @hapi/hapi
//npm i @hapi/vision @hapi/inert hapi-swagger
//npm i jsonwebtoken
//npm i hapi-auth-jwt2

const Hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')

const HeroRoute = require('./routes/heroRoutes')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')

const AuthRoute = require('./routes/authRoutes')
const HapiSwagger = require('hapi-swagger')
const Vision = require('@hapi/vision')
const Inert = require('@hapi/inert')
const Jwt = require('jsonwebtoken')

const HapiJwt = require('hapi-auth-jwt2')
const JWT_SECRET = 'MEU_SEGREDO_12345'

const swaggerOptions = {
  info: {
    title: 'API Herois - #CursoNodeBR',
    version: 'v1.0'
  },
}

const app = new Hapi.Server({
  port: 5000
})

function mapRoutes(instance, methods) {
  return methods.map(method => instance[method]())
}

async function main() {
  const connection = MongoDb.connect()
  const context = new Context(new MongoDb(connection, HeroiSchema))

  await app.register([
    HapiJwt,
    Vision,
    Inert,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  app.auth.strategy('jwt', 'jwt', {
    key: JWT_SECRET,
    // options: {
    //   expiresIn: 20
    // }
    validate: (dado, request) => {
      //verifica no banco se o user continua ativo
      //verifica no banco se o user continua pagando
      return {
        isValid: true
      }
    }
  })

  app.auth.default('jwt')

  app.route([
    ...mapRoutes(new HeroRoute(context), HeroRoute.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET), AuthRoute.methods())
  ])

  await app.start()
  console.log('Servidor rodando na porta', app.info.port)

  return app
}

module.exports = main()