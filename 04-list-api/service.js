// const axios = require('axios')
// const baseURL = `https://pokeapi.co/api/v2`

// async function obterPokemon() {
//   const request = await axios.get(`${baseURL}/pokemon/?limit=150`)
//   const pokemons = request.data.results

//   console.time('FOR')

//   const pokemonNames = []

//   for (let i = 0; i < pokemons.length; i++) {
//     pokemonNames.push(pokemons[i].name)
//   }
//   // console.log(pokemonNames)
//   // console.log(`${pokemonNames.length} Pokemon names`)

//   console.timeEnd('FOR')
// }

// obterPokemon()


// const axios = require('axios')
// const baseURL = `https://pokeapi.co/api/v2`

// async function obterPokemon() {
//   const request = await axios.get(`${baseURL}/pokemon/?limit=150`)
//   const pokemons = request.data.results

//   console.time('FOR IN')

//   const pokemonNames = []

//   for (let i in pokemons) {
//     pokemonNames.push(pokemons[i].name)
//   }
//   // console.log(pokemonNames)
//   // console.log(`${pokemonNames.length} Pokemon names`)

//   console.timeEnd('FOR IN')
// }

// obterPokemon()

const axios = require('axios')
const baseURL = `https://pokeapi.co/api/v2`

async function obterPokemon() {
  const request = await axios.get(`${baseURL}/pokemon/?limit=150`)
  const pokemons = request.data.results

  console.time('FOR OF')

  const pokemonNames = []

  for (let pokemon of pokemons) {
    pokemonNames.push(pokemon.name)
  }
  console.log(pokemonNames)
  console.log(`${pokemonNames.length} Pokemon names`)

  console.timeEnd('FOR OF')
}

obterPokemon()