//todo 0 - Obter um usuario
//todo 1 - Obter o numero de telefone de um usuario a partir de seu Id
//todo 2 - Obter o endereço do usuario pelo Id


// importamos o modulo interno do nodeJS
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      // return reject(new Error('deu ruim de verdade'))
      return resolve({
        id: 1,
        nome: 'Alan',
        dataNascimento: new Date()
      })
    }, 1000)
  })
}

function obterTelefone(idUsuario) {
  return new Promise(function resolvePromise(resolve, reject) {
    setTimeout(function () {
      return resolve({
        telefone: '1199025050',
        ddd: '11'
      })
    }, 2000)
  })
}


function obterEndereco(idUsuario, callback) {
  setTimeout(() => {
    return callback(null, {
      rua: "dos bobos",
      numero: 0
    })
  }, 2000)
}

// Ao adicionar a palavra async automaticamente ela retornara uma Promise
main()
async function main() {
  try {
    console.time('medida-promise')

    const usuario = await obterUsuario()
    // const telefone = await obterTelefone(usuario.id)
    // const endereco = await obterEnderecoAsync(usuario.id)
    const resultado = await Promise.all([
      obterTelefone(usuario.id),
      obterEnderecoAsync(usuario.id)
    ])
    const endereco = resultado[1]
    const telefone = resultado[0]
    console.log(`
    Nome: ${usuario.nome},  
    Telefone: ${telefone.ddd} ${telefone.telefone},
    Endereço: ${endereco.rua}, ${endereco.numero}
    `)
    console.timeEnd('medida-promise')
  } catch (error) {
    console.error("deu ruim", error)
  }
}


// const usuarioPromise = obterUsuario()
// // para manipular sucesso usamos .then
// //para manipular erros, usarmos .catch

// usuarioPromise
//   .then(function (usuario) {
//     return obterTelefone(usuario.id)
//       .then(function resolverTelefone(result) {
//         return {
//           usuario: {
//             nome: usuario.nome,
//             id: usuario.id
//           },
//           telefone: result
//         }
//       })

//   })
//   .then(function (resultado) {
//     const endereco = obterEnderecoAsync(resultado.usuario.id)
//     return endereco.then(function resolverEndereco(result) {
//       return {
//         usuario: resultado.usuario,
//         telefone: resultado.telefone,
//         endereco: result
//       }
//     })
//   })
//   .then(function (resultado) {
//     console.log(`
//     Nome: ${resultado.usuario.nome}
//     Endereço: ${resultado.endereco.rua}, ${resultado.endereco.numero}
//     Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
//     `)
//   })
//   .catch(function (error) {
//     console.error("deu ruim", error)
//   })

// obterUsuario(function resolverUsuario(err, usuario) {
//   if (err) {
//     console.err('Deu ruim em usuário', err)
//     return;
//   }
//   obterTelefone(usuario.id, function resolverTelefone(err1, telefone) {
//     if (err1) {
//       console.err('Deu ruim em telefone', err)
//       return;
//     }
//     obterEndereco(usuario.id, function resolverEndereco(err2, endereco) {
//       if (err2) {
//         console.err('Deu ruim em telefone', err)
//         return;
//       }

//       console.log(`
//       Nome: ${usuario.nome},
//       Endereço: ${endereco.rua}, ${endereco.numero},
//       Telefone: (${telefone.ddd})${telefone.telefone}  
//       `)
//     })
//   })
// })


