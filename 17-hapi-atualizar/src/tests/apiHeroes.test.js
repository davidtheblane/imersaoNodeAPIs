const assert = require('assert')
const api = require('./../api')
let app = {}

const MOCK_HEROI_CADASTRAR = {
  nome: 'Chapolin Colorado',
  poder: 'Marreta Bionica'
}

const MOCK_HEROI_INICIAL = {
  nome: 'Gavião Arqueiro',
  poder: 'Mira Certeira'
}

let MOCK_ID = ''
describe('Suite de testes da API Heroes', function () {
  this.beforeAll(async () => {
    app = await api
    const result = await app.inject({
      method: 'POST',
      url: '/herois',
      payload: JSON.stringify(MOCK_HEROI_INICIAL)
    })
    const dados = JSON.parse(result.payload)
    MOCK_ID = dados._id
  })

  //!LISTAR
  it('listar /herois', async () => {
    const result = await app.inject({
      method: 'GET',
      url: '/herois?skip=0&limit=10'
    })
    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.ok(Array.isArray(dados))
  })

  it('Listar /herois - deve retonar 3 registros', async () => {
    const TAMANHO_LIMITE = 3
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
    })
    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.ok(dados.length === TAMANHO_LIMITE)
  })

  it('Listar /herois - deve retonar um erro com um limit incorreto', async () => {
    const TAMANHO_LIMITE = 'AAA'
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=${TAMANHO_LIMITE}`
    })

    const errorResult = {
      "statusCode": 400, "error": "Bad Request", "message": "\"limit\" must be a number", "validation": { "source": "query", "keys": ["limit"] }
    }
    assert.deepEqual(result.statusCode, 400)
    assert.deepEqual(result.payload, JSON.stringify(errorResult))

  })

  it('Listar /herois - deve filtrar um item', async () => {

    const NAME = "Batman"
    const result = await app.inject({
      method: 'GET',
      url: `/herois?skip=0&limit=1000&nome=${NAME}`
    })

    const dados = JSON.parse(result.payload)
    const statusCode = result.statusCode

    assert.deepEqual(statusCode, 200)
    assert.deepEqual(dados[0].nome, NAME)

  })

  //! CADASTRAR
  it('Cadastrar POST /herois', async () => {
    const result = await app.inject({
      method: 'POST',
      url: '/herois',
      payload: JSON.stringify(MOCK_HEROI_CADASTRAR)
    })

    const statusCode = result.statusCode
    const { message, _id } = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.notStrictEqual(_id, undefined)
    assert.deepEqual(message, 'Heroi cadastrado com sucesso!')
  })

  //! ATUALIZAR
  it('Atualizar PATCH - /herois/:id', async () => {
    const _id = MOCK_ID
    const expected = {
      poder: 'Super Mira'
    }

    const result = await app.inject({
      method: 'PATCH',
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected)
    })
    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.deepEqual(dados.message, 'Heroi atualizado com sucesso!')
  })

  it('Atualizar PATCH - /herois/:id - não deve atualizar com ID incorreto', async () => {
    const _id = `62b4d8210a5a26e13ef5c2b5`
    const expected = {
      poder: 'Super Mira'
    }

    const result = await app.inject({
      method: 'PATCH',
      url: `/herois/${_id}`,
      payload: JSON.stringify(expected)
    })
    const statusCode = result.statusCode
    const dados = JSON.parse(result.payload)

    assert.ok(statusCode === 200)
    assert.deepEqual(dados.message, 'Não foi possível atualizar!')
  })

})