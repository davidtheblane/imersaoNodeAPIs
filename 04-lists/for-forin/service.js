const axios = require('axios')
const URL = 'https://swapi.dev/api/people/'

async function obterPessoas (nome) {
  const url = `${URL}/?search=${nome}&format=json`
  const response = await axios.get(url)
  return response.data
}

// obterPessoas('Luke Skywalker')
//   .then(function (resultado) {
//     console.log('resultado', resultado)
//   }).catch(function (error) {
//     console.error('deu ruim', error)
//   })

module.exports = { obterPessoas }
