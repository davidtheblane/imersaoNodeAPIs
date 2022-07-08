const service = require('./service')

async function main () {
  try {
    //! FOR
    // const result = await service.obterPessoas('a')
    // // console.log('result', result)
    // const names = []
    // for (let i = 0; i <= result.results.length - 1; i++) {
    //   const pessoa = result.results[i]
    //   names.push(pessoa.name)
    // }
    // console.log('names', names)

    //! FOR IN
    // const result = await service.obterPessoas('a')
    // // console.log('result', result)
    // const names = []
    // for (const i in result.results) {
    //   const pessoa = result.results[i]
    //   names.push(pessoa.name)
    // }
    // console.log('names', names)

    //! FOR OF
    const result = await service.obterPessoas('a')
    // console.log('result', result)
    const names = []
    for (const pessoa of result.results) {
      names.push(pessoa.name)
    }
    console.log('names', names)
  } catch (error) {
    console.log('error', error)
  }
}

main()
