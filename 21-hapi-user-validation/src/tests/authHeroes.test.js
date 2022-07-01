const assert = require('assert')
const api = require('../api')
const Context = require('../db/strategies/base/contextStrategy')
const Postgres = require('../db/strategies/postgres/postgres')
const PostGres = require('../db/strategies/postgres/postgres')
const USersSchema = require('../db/strategies/postgres/schemas/usersSchema')

let app = {}
const USER = {
  username: 'xuxa',
  password: '123'
}

const USER_DB = {
  username: USER.username.toLowerCase(),
  password: '$2b$04$wvU/Fcbtede2/dxaWR0g2ujEqtM1W3J5pe560IITM7/n33.FbxNCG'
}

describe('Auth test suite', function () {
  this.beforeAll(async () => {
    app = await api

    const connectionPostgres = await PostGres.connect()
    const model = await PostGres.defineModel(connectionPostgres, USersSchema)
    const postgres = new Context(new Postgres(connectionPostgres, model))
    await postgres.update(null, USER_DB, true)
  })

  it('Deve obter um token', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: USER
    })

    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    assert.deepEqual(statusCode, 200)
    assert.ok(dados.token.length > 10)
  })

  it('Deve retornar não autorizado ao tentar obter um login errado', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/login',
      payload: {
        username: 'davibernardo',
        password: '123'
      }
    })
    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    assert.deepEqual(statusCode, 401)
    assert.deepEqual(dados.error, 'Unauthorized')
  })

})