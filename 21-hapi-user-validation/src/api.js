// npm install @hapi/hapi
//npm i @hapi/vision @hapi/inert hapi-swagger
//npm i jsonwebtoken
//npm i hapi-auth-jwt2
//npm i bcrypt

const Hapi = require('@hapi/hapi')
const Context = require('./db/strategies/base/contextStrategy')
const MongoDb = require('./db/strategies/mongodb/mongodb')

const HeroRoute = require('./routes/heroRoutes')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')

const Postgres = require('./db/strategies/postgres/postgres')
const AuthRoute = require('./routes/authRoutes')
const UsersSchema = require('./db/strategies/postgres/schemas/usersSchema')

const HapiSwagger = require('hapi-swagger')
const Inert = require('@hapi/inert')
const Vision = require('@hapi/vision')
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
  const contextMongoDb = new Context(new MongoDb(connection, HeroiSchema))

  const connectionPostgres = await Postgres.connect()
  const userModel = await Postgres.defineModel(connectionPostgres, UsersSchema)
  const contextPostgres = new Context(new Postgres(connectionPostgres, userModel))

  await app.register([
    HapiJwt,
    Inert,
    Vision,
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
    validate: async (dado, request) => {
      const [result] = await contextPostgres.read({
        username: dado.username.toLowerCase(),
      })

      if (!result) return { isValid: false }
      //verifica no banco se o user continua ativo
      //verifica no banco se o user continua pagando
      return {
        isValid: true
      }
    }
  })

  app.auth.default('jwt')

  app.route([
    ...mapRoutes(new HeroRoute(contextMongoDb), HeroRoute.methods()),
    ...mapRoutes(new AuthRoute(JWT_SECRET, contextPostgres), AuthRoute.methods())
  ])

  await app.start()
  console.log('Servidor rodando na porta', app.info.port)

  return app
}

module.exports = main()