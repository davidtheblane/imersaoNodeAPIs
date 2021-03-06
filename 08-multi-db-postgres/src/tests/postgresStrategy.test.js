const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = { nome: 'Gavião Negro', poder: 'Flechas' }
const MOCK_HEROI_ATUALIZAR = { nome: 'Dr. Estranho', poder: 'Artes Místicas' }


describe('Postgres Strategy', function () {
  this.timeout(Infinity)
  this.beforeAll(async function () {
    await context.connect()
    await context.delete()
    await context.create(MOCK_HEROI_ATUALIZAR)
  })

  it('PostgresSQL Connection', async function () {
    const result = await context.isConnected()
    assert.equal(result, true)
  })

  it('Cadastrar', async function () {
    const result = await context.create(MOCK_HEROI_CADASTRAR)
    delete result.id
    delete result.createdAt
    delete result.createdat
    delete result.updatedAt
    delete result.updatedat
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
  })

  it('Listar', async function () {
    const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
    delete result.id
    delete result.updatedat
    delete result.createdat
    assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    //pegar a primeira posicao
    // const posicaoZero = result[0]
    //const [posicao1, posicao2]= ['esse e o 1, esse e o 2']
  })
  it('atualizar', async function () {
    const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome })
    const novoItem = {
      ...MOCK_HEROI_ATUALIZAR,
      nome: 'Mulher Maravilha'
    }
    const [result] = await context.update(itemAtualizar.id, novoItem)
    const [itemAtualizado] = await context.read({ id: itemAtualizar.id })
    assert.deepEqual(result, 1)
    assert.deepEqual(itemAtualizado.nome, novoItem.nome)
  })

  it('remover por id', async function () {
    const [item] = await context.read({})
    const result = await context.delete(item.id)
    assert.deepEqual(result, 1)
  })
})
