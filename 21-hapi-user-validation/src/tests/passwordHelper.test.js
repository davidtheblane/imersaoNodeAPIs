const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

const SENHA = '123'
const HASH = '$2b$04$uuNuEZFXYtvgaQs168jr/.Y7.GX0Cy9g5WFAC3DbGjoz59DvlwXP.'


describe('UserHelper test suite', function () {

  it('Deve gerar um hash a partir de uma senha', async () => {
    const result = await PasswordHelper.hashPassword(SENHA)

    assert.ok(result.length > 10)
  })

  it('Deve compara a senha e o hash', async () => {
    const result = await PasswordHelper.comparePassword(SENHA, HASH)
    assert.ok(result == true)
  })
})