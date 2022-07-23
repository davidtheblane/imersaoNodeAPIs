const axios = require('axios')
const baseURL = 'https://pokeapi.co/api/v2'

async function getPokemon() {
  const request = await axios.get(`${baseURL}/pokemon/?limit=1500`)
  const pokemons = request.data.results

  const pokemonNames = []

  let count = 0
  while (count < 20) {
    console.time('FOR - Runtime')
    for (let i = 0; i < pokemons.length; i++) {
      pokemonNames.push(pokemons[i].name)
    }
    console.log(pokemonNames)
    console.log(`${pokemonNames.length} Pokemon names`)
    console.timeEnd('FOR - Runtime')
    count++
  }

  console.log('count', count)
}

getPokemon()

// FOR Runtimes with console.log [13.594, 13.529, 13.758, 13.549, 13.449]
// FOR Runtimes without console.log [0.676, 0.658, 0.656, 0.684, 0.727]

/// /////////

// const axios = require('axios')
// const baseURL = 'https://pokeapi.co/api/v2'

// async function getPokemon() {
//   const request = await axios.get(`${baseURL}/pokemon/?limit=1000`)
//   const pokemons = request.data.results

//   const pokemonNames = []

//   console.time('FOR IN - Runtime')
//   for (const i in pokemons) {
//     pokemonNames.push(pokemons[i].name)
//   }
//   console.timeEnd('FOR IN - Runtime')

//   console.log(pokemonNames)
//   console.log(`${pokemonNames.length} Pokemon names`)
// }

// getPokemon()

// FOR IN Runtimes with console.log [13.824, 13.791, 14.619, 14.585, 13.772]
// FOR IN Runtimes without console.log [0.941, 0.928, 1.090, 1.003, 0.695]

/// //////

// const axios = require('axios')
// const baseURL = 'https://pokeapi.co/api/v2'

// async function getPokemon () {
//   const request = await axios.get(`${baseURL}/pokemon/?limit=1000`)
//   const pokemons = request.data.results

//   const pokemonNames = []

//   console.time('FOR OF - Runtime')
//   for (const pokemon of pokemons) {
//     pokemonNames.push(pokemon.name)
//   }
//   console.timeEnd('FOR OF - Runtime')

//   console.log(pokemonNames)
//   console.log(`${pokemonNames.length} Pokemon names`)
// }

// getPokemon()

// FOR IN Runtimes with console.log [14.324, 13.377, 13.662, 14.061, 13.849]
// FOR IN Runtimes without console.log [0.739, 0.758, 0.733, 0.779, 0.752]
