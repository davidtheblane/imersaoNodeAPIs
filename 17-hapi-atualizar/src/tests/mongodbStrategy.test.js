const assert = require('assert')
const MongoDb = require('./../db/strategies/mongodb/mongodb')
const HeroiSchema = require('./../db/strategies/mongodb/schemas/heroisSchema')
const Context = require('./../db/strategies/base/contextStrategy')

const MOCK_HEROI_CADASTRAR = {
  nome: 'Mulher Maravilha',
  poder: 'Laço da Verdade'
}

const MOCK_HEROI_DEFAULT = {
  nome: `Homem Aranha-${Date.now()}}`,
  poder: 'Super Força e Teia de Aranha'
}

const MOCK_HEROI_ATUALIZAR = {
  nome: `Patolino-${Date.now()}}`,
  poder: 'Bico Doce'
}
let MOCK_HEROI_ID = ''

let context = {}

describe('mongodb suite de testes', function () {
  this.beforeAll(async () => {
    const connection = MongoDb.connect()
    context = new Context(new MongoDb(connection, HeroiSchema))

    await context.create(MOCK_HEROI_DEFAULT)
    const result = await context.create(MOCK_HEROI_ATUALIZAR)
    MOCK_HEROI_ID = result._id
  })

  it('verificar conexão', async () => {
    const result = await context.isConnected()
    const expected = 'Conectado'
    assert.deepEqual(result, expected)
  })

  it('cadastrar', async () => {
    const { nome, poder } = await context.create(MOCK_HEROI_CADASTRAR)
    assert.deepEqual({ nome, poder }, MOCK_HEROI_CADASTRAR)
  })

  it('listar', async () => {
    //abaixo [{nome, poder}] significa obter a primeira posição do array
    //da resposta e desse objeto obtido pegar apenas nome e poder. (destructuring)
    const [{ nome, poder }] = await context.read({ nome: MOCK_HEROI_DEFAULT.nome })
    const result = { nome, poder }
    assert.deepEqual(result, MOCK_HEROI_DEFAULT)
  })

  it('atualizar', async () => {
    const result = await context.update(MOCK_HEROI_ID, {
      nome: 'Pernalonga'
    })
    assert.deepEqual(result.modifiedCount, 1)
  })

  it('remover', async () => {
    const result = await context.delete(MOCK_HEROI_ID)
    assert.deepEqual(result.deletedCount, 1)
  })

  after(async function () {
    await context.close()
  });

})
